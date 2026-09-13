const L_CODE = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011']
const G_CODE = ['0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111']
const R_CODE = ['1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100']
const FIRST_DIGIT_PATTERN = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL']

/**
 * EAN-13 checksum, verified against a well-known real reference barcode
 * (400638133393 -> checksum 1) before being ported here.
 */
export function calculateEan13Checksum(digits12) {
  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits12[i], 10) * (i % 2 === 0 ? 1 : 3)
  }
  return (10 - (sum % 10)) % 10
}

/**
 * UPC-A checksum, verified against a well-known real reference barcode
 * (03600029145 -> checksum 2) before being ported here.
 */
export function calculateUpcaChecksum(digits11) {
  let sum = 0
  for (let i = 0; i < 11; i++) {
    sum += parseInt(digits11[i], 10) * (i % 2 === 0 ? 3 : 1)
  }
  return (10 - (sum % 10)) % 10
}

/**
 * Encodes a 13-digit EAN-13 code (checksum included) into its bar
 * pattern as a string of 1s and 0s, using the standard L/G/R encoding
 * tables from the EAN-13 specification. Verified to produce exactly 95
 * bits (the standard EAN-13 length) with correct guard patterns before
 * being ported here.
 */
export function encodeEan13(digits13) {
  const firstDigit = digits13[0]
  const pattern = FIRST_DIGIT_PATTERN[parseInt(firstDigit, 10)]
  let bits = '101'
  for (let i = 1; i <= 6; i++) {
    const digit = parseInt(digits13[i], 10)
    bits += pattern[i - 1] === 'L' ? L_CODE[digit] : G_CODE[digit]
  }
  bits += '01010'
  for (let i = 7; i <= 12; i++) {
    const digit = parseInt(digits13[i], 10)
    bits += R_CODE[digit]
  }
  bits += '101'
  return bits
}

/**
 * Encodes a 12-digit UPC-A code (checksum included) - structurally a
 * special case of EAN-13 with an implicit leading 0, using the L-code
 * table for the left half (no G-code needed since UPC-A doesn't use
 * the parity-switching first-digit system).
 */
export function encodeUpcA(digits12) {
  let bits = '101'
  for (let i = 0; i < 6; i++) {
    bits += L_CODE[parseInt(digits12[i], 10)]
  }
  bits += '01010'
  for (let i = 6; i < 12; i++) {
    bits += R_CODE[parseInt(digits12[i], 10)]
  }
  bits += '101'
  return bits
}

export function generateBarcode(digits, format) {
  const cleanDigits = digits.replace(/\D/g, '')
  if (format === 'EAN13') {
    if (cleanDigits.length !== 12 && cleanDigits.length !== 13) {
      throw new Error('EAN-13 requires 12 digits (checksum calculated automatically) or 13 digits.')
    }
    const base = cleanDigits.slice(0, 12)
    const checksum = calculateEan13Checksum(base)
    const full = base + checksum
    return { code: full, bits: encodeEan13(full) }
  }
  if (format === 'UPCA') {
    if (cleanDigits.length !== 11 && cleanDigits.length !== 12) {
      throw new Error('UPC-A requires 11 digits (checksum calculated automatically) or 12 digits.')
    }
    const base = cleanDigits.slice(0, 11)
    const checksum = calculateUpcaChecksum(base)
    const full = base + checksum
    return { code: full, bits: encodeUpcA(full) }
  }
  throw new Error('Unsupported barcode format.')
}
