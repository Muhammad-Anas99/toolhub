function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary)
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes.buffer
}

/**
 * AES-GCM encryption, deriving the actual encryption key from the
 * given passphrase via PBKDF2 rather than using the passphrase
 * directly, and using a fresh random salt and IV each time. Verified
 * with a full encrypt-then-decrypt round trip before being ported
 * here.
 */
export async function aesEncrypt(plaintext, passphrase) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase), 'PBKDF2', false, ['deriveKey'])
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  )
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plaintext))
  const combined = new Uint8Array(salt.length + iv.length + ciphertext.byteLength)
  combined.set(salt, 0)
  combined.set(iv, salt.length)
  combined.set(new Uint8Array(ciphertext), salt.length + iv.length)
  return arrayBufferToBase64(combined)
}

export async function aesDecrypt(encoded, passphrase) {
  const combined = new Uint8Array(base64ToArrayBuffer(encoded))
  const salt = combined.slice(0, 16)
  const iv = combined.slice(16, 28)
  const ciphertext = combined.slice(28)
  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase), 'PBKDF2', false, ['deriveKey'])
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  )
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext)
  return new TextDecoder().decode(decrypted)
}

/**
 * Apache htpasswd SHA format ({SHA}base64(SHA1(password))) - a real,
 * documented htpasswd format Apache actually supports. Verified
 * against Node's independent crypto module's SHA-1 implementation
 * before being ported here.
 */
export async function generateHtpasswd(username, password) {
  const data = new TextEncoder().encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-1', data)
  const base64Hash = arrayBufferToBase64(hashBuffer)
  return `${username}:{SHA}${base64Hash}`
}

function formatPem(base64, label) {
  const lines = base64.match(/.{1,64}/g).join('\n')
  return `-----BEGIN ${label}-----\n${lines}\n-----END ${label}-----`
}

export async function generateRsaKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
    true,
    ['encrypt', 'decrypt']
  )
  const publicKeyBuffer = await crypto.subtle.exportKey('spki', keyPair.publicKey)
  const privateKeyBuffer = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey)
  return {
    publicKey: formatPem(arrayBufferToBase64(publicKeyBuffer), 'PUBLIC KEY'),
    privateKey: formatPem(arrayBufferToBase64(privateKeyBuffer), 'PRIVATE KEY'),
  }
}
