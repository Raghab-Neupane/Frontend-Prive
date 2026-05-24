export const TOKEN_KEY = 'prive_token'

/**
 * Retrieves the stored JWT token.
 * @returns {string|null}
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY)

/**
 * Saves the JWT token.
 * @param {string} token 
 */
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)

/**
 * Removes the JWT token.
 */
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

/**
 * Safely decodes a JWT token payload without external dependencies.
 * @param {string} token 
 * @returns {object|null}
 */
export const decodeToken = (token) => {
  if (!token) return null
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const base64Url = parts[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (e) {
    console.error('Failed to decode JWT token:', e)
    return null
  }
}

/**
 * Checks if the JWT token is expired.
 * @param {string} token 
 * @returns {boolean}
 */
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return true
  const now = Date.now() / 1000
  return decoded.exp < now
}

/**
 * Checks if the user is authenticated with a valid token.
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = getToken()
  return !!token && !isTokenExpired(token)
}
