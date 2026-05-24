import { getToken, removeToken } from '../utils/auth'

const BASE_URL = 'http://localhost:8080'

/**
 * Reusable HTTP Request Client
 * @param {string} endpoint - The API endpoint path (e.g. '/login', '/upload')
 * @param {object} options - Fetch options override
 * @returns {Promise<{ok: boolean, status: number, data?: any, error?: string}>}
 */
export async function apiRequest(endpoint, options = {}) {
  const token = getToken()

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  // Auto-inject authorization token if present
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const config = {
    ...options,
    headers,
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config)

    // Handle session expiration or unauthorized requests gracefully
    if (response.status === 401) {
      removeToken()
      window.dispatchEvent(new Event('auth-unauthorized'))
    }

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: data.error || data.message || 'An error occurred during request execution',
      }
    }

    return {
      ok: true,
      status: response.status,
      data,
    }
  } catch (error) {
    console.error(`API Request to ${endpoint} failed:`, error)
    return {
      ok: false,
      status: 0,
      error: 'Network connection failed. Please check if your server is running.',
    }
  }
}

export const api = {
  get: (endpoint, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'GET' }),
  
  post: (endpoint, body, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  
  put: (endpoint, body, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  
  delete: (endpoint, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'DELETE' }),
}
