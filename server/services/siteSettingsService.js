import SiteSettings from '../models/SiteSettings.js'

const SINGLETON_KEY = 'site-settings'

/**
 * Site settings are a single document shared by the whole app. This
 * fetches it, creating one with schema defaults on first run so the API
 * never 404s on a fresh database.
 */
export async function getSettings() {
  let settings = await SiteSettings.findOne({ singletonKey: SINGLETON_KEY })
  if (!settings) {
    settings = await SiteSettings.create({ singletonKey: SINGLETON_KEY })
  }
  return settings
}

export async function updateSettings(payload) {
  const settings = await getSettings()
  Object.assign(settings, payload)
  await settings.save()
  return settings
}
