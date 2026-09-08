function parseUserAgent(ua) {
  if (!ua || typeof ua !== 'string' || !ua.trim()) {
    return null
  }

  const result = {
    browser: 'Unknown',
    browserVersion: 'Unknown',
    os: 'Unknown',
    osVersion: 'Unknown',
    device: 'Unknown',
    deviceType: 'Unknown',
    engine: 'Unknown',
    architecture: 'Unknown',
    isBot: false,
    botName: null,
    uaReduced: false,
    warnings: [],
  }

  // --- Bot detection first - a bot UA shouldn't also get misidentified
  // as a "browser" below ---
  const botPatterns = [
    { pattern: /Googlebot/i, name: 'Googlebot' },
    { pattern: /Bingbot/i, name: 'Bingbot' },
    { pattern: /Slurp/i, name: 'Yahoo Slurp' },
    { pattern: /DuckDuckBot/i, name: 'DuckDuckBot' },
    { pattern: /Baiduspider/i, name: 'Baiduspider' },
    { pattern: /YandexBot/i, name: 'YandexBot' },
    { pattern: /facebookexternalhit/i, name: 'Facebook Crawler' },
    { pattern: /Twitterbot/i, name: 'Twitterbot' },
    { pattern: /LinkedInBot/i, name: 'LinkedInBot' },
    { pattern: /Applebot/i, name: 'Applebot' },
    { pattern: /AhrefsBot/i, name: 'AhrefsBot' },
    { pattern: /SemrushBot/i, name: 'SemrushBot' },
    { pattern: /\bcrawler\b/i, name: 'Generic crawler' },
    { pattern: /\bspider\b/i, name: 'Generic spider' },
    { pattern: /\bbot\b/i, name: 'Generic bot' },
  ]
  for (const { pattern, name } of botPatterns) {
    if (pattern.test(ua)) {
      result.isBot = true
      result.botName = name
      break
    }
  }

  // --- Rendering engine ---
  if (/Gecko\//.test(ua) && !/like Gecko/.test(ua)) {
    result.engine = 'Gecko'
  } else if (/Edg\//.test(ua) || /Chrome\//.test(ua) || /CriOS\//.test(ua)) {
    result.engine = 'Blink'
  } else if (/AppleWebKit/.test(ua)) {
    result.engine = 'WebKit'
  } else if (/Trident/.test(ua)) {
    result.engine = 'Trident'
  }

  // --- Browser + version - order matters: check more specific tokens
  // (Edg, OPR) before the generic Chrome/Safari tokens they also contain ---
  let m
  if ((m = ua.match(/Edg\/([\d.]+)/))) {
    result.browser = 'Microsoft Edge'
    result.browserVersion = m[1]
  } else if ((m = ua.match(/OPR\/([\d.]+)/))) {
    result.browser = 'Opera'
    result.browserVersion = m[1]
  } else if ((m = ua.match(/Firefox\/([\d.]+)/))) {
    result.browser = 'Firefox'
    result.browserVersion = m[1]
  } else if ((m = ua.match(/CriOS\/([\d.]+)/))) {
    result.browser = 'Chrome'
    result.browserVersion = m[1]
  } else if ((m = ua.match(/Chrome\/([\d.]+)/)) && !/Chromium/.test(ua)) {
    result.browser = 'Chrome'
    result.browserVersion = m[1]
  } else if ((m = ua.match(/Version\/([\d.]+).*Safari/))) {
    result.browser = 'Safari'
    result.browserVersion = m[1]
  } else if ((m = ua.match(/MSIE ([\d.]+)/)) || (m = ua.match(/rv:([\d.]+).*Trident/))) {
    result.browser = 'Internet Explorer'
    result.browserVersion = m[1]
  }

  // --- Operating system ---
  if ((m = ua.match(/Windows NT ([\d.]+)/))) {
    result.os = 'Windows'
    const ntVersion = m[1]
    // Windows 10 and Windows 11 both report as "Windows NT 10.0" - this
    // is a genuine, well-documented limitation, not something a UA
    // string can resolve on its own.
    if (ntVersion === '10.0') {
      result.osVersion = '10 or 11 (indistinguishable from the UA string alone)'
      result.warnings.push('Windows 10 and Windows 11 both report as "Windows NT 10.0" - the User-Agent string cannot tell them apart.')
    } else {
      result.osVersion = ntVersion
    }
  } else if (/Mac OS X/.test(ua) && (m = ua.match(/Mac OS X ([\d_]+)/))) {
    result.os = 'macOS'
    result.osVersion = m[1].replace(/_/g, '.')
  } else if (/iPhone|iPad|iPod/.test(ua)) {
    result.os = 'iOS'
    if ((m = ua.match(/OS ([\d_]+)/))) {
      result.osVersion = m[1].replace(/_/g, '.')
    }
  } else if ((m = ua.match(/Android ([\d.]+)/))) {
    result.os = 'Android'
    // Chrome's User-Agent Reduction freezes the reported Android version
    // to "10" and device model to "K" for privacy, regardless of the
    // real OS version or device - reporting this as a genuine detected
    // version would be actively misleading.
    if (m[1] === '10' && /; K[)\s]/.test(ua)) {
      result.osVersion = '10 (frozen placeholder - see note)'
      result.uaReduced = true
      result.warnings.push('This looks like a reduced Chrome User-Agent string - Android version and device model are frozen to generic placeholder values ("10" and "K") for privacy, not the real device details.')
    } else {
      result.osVersion = m[1]
    }
  } else if (/Linux/.test(ua)) {
    result.os = 'Linux'
  }

  // --- Device type ---
  if (/iPad/.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua))) {
    result.deviceType = 'Tablet'
  } else if (/Mobile|iPhone|Android/.test(ua)) {
    result.deviceType = 'Mobile'
  } else if (result.os !== 'Unknown') {
    result.deviceType = 'Desktop'
  }

  // --- CPU architecture, where genuinely present ---
  if (/Win64|x64|WOW64/.test(ua)) {
    result.architecture = 'x64'
  } else if (/i686|i386/.test(ua)) {
    result.architecture = 'x86'
  } else if (/arm64|aarch64/i.test(ua)) {
    result.architecture = 'ARM64'
  }

  return result
}

export { parseUserAgent }
