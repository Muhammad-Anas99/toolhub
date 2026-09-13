function ipToInt(ip) {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0
}

function intToIp(int) {
  return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.')
}

function isValidIp(ip) {
  const parts = ip.split('.')
  if (parts.length !== 4) return false
  return parts.every((p) => /^\d+$/.test(p) && Number(p) >= 0 && Number(p) <= 255)
}

/**
 * Standard CIDR subnet math. Verified against well-known, independently
 * checkable reference examples (192.168.1.0/24 and 10.0.0.0/8) before
 * being ported here.
 */
export function calculateSubnet(ip, prefixLength) {
  if (!isValidIp(ip)) throw new Error('That doesn\u2019t look like a valid IPv4 address.')
  if (prefixLength < 0 || prefixLength > 32) throw new Error('Prefix length must be between 0 and 32.')

  const ipInt = ipToInt(ip)
  const maskInt = prefixLength === 0 ? 0 : (0xffffffff << (32 - prefixLength)) >>> 0
  const networkInt = (ipInt & maskInt) >>> 0
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0
  const totalHosts = Math.pow(2, 32 - prefixLength)
  const usableHosts = prefixLength >= 31 ? 0 : totalHosts - 2

  return {
    network: intToIp(networkInt),
    broadcast: intToIp(broadcastInt),
    subnetMask: intToIp(maskInt),
    firstUsable: prefixLength >= 31 ? intToIp(networkInt) : intToIp(networkInt + 1),
    lastUsable: prefixLength >= 31 ? intToIp(broadcastInt) : intToIp(broadcastInt - 1),
    totalHosts,
    usableHosts,
  }
}
