/*
 * MongoDB aggregation pipelines for the admin Page Views screen, kept
 * as pure functions with no imports - they only build arrays - so they
 * can be run against sample data in a test without a database
 * connection. pageViewService.js is what actually executes them.
 */

// How many of a visitor's most recent page views are returned with
// their row, for the expandable detail. A visitor with more than this
// still shows their true total in `views`; only the list is capped.
export const MAX_PAGES_PER_VISITOR = 30

export function uniqueVisitorsPipeline(match) {
  return [{ $match: match }, { $group: { _id: '$ipAddress' } }, { $count: 'n' }]
}

export function topPagesPipeline(match, limit = 10) {
  return [
    { $match: match },
    { $group: { _id: '$path', views: { $sum: 1 } } },
    { $sort: { views: -1, _id: 1 } },
    { $limit: limit },
    { $project: { _id: 0, path: '$_id', views: 1 } },
  ]
}

export function topCountriesPipeline(match, limit = 10) {
  return [
    { $match: match },
    { $group: { _id: '$country', views: { $sum: 1 } } },
    { $sort: { views: -1, _id: 1 } },
    { $limit: limit },
    { $project: { _id: 0, country: '$_id', views: 1 } },
  ]
}

/**
 * One row per visitor (grouped by IP address) instead of one row per
 * page view - a person who opens ten pages is one row, not ten. Sorted
 * by most recent activity so whoever just landed is on top. The page
 * list is oldest-first going in (so $last picks up the most recent
 * location) and is reversed and capped coming out, newest first.
 */
export function visitorsPipeline(match, { skip = 0, limit = 25 } = {}) {
  return [
    { $match: match },
    { $sort: { createdAt: 1 } },
    {
      $group: {
        _id: '$ipAddress',
        country: { $last: '$country' },
        city: { $last: '$city' },
        views: { $sum: 1 },
        firstSeen: { $min: '$createdAt' },
        lastSeen: { $max: '$createdAt' },
        pages: { $push: { path: '$path', at: '$createdAt' } },
      },
    },
    { $sort: { lastSeen: -1, _id: 1 } },
    {
      $facet: {
        rows: [
          { $skip: skip },
          { $limit: limit },
          {
            $project: {
              _id: 0,
              ipAddress: '$_id',
              country: 1,
              city: 1,
              views: 1,
              firstSeen: 1,
              lastSeen: 1,
              pages: { $slice: [{ $reverseArray: '$pages' }, MAX_PAGES_PER_VISITOR] },
            },
          },
        ],
        total: [{ $count: 'n' }],
      },
    },
  ]
}
