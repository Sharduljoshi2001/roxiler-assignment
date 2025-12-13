// Base URL for API - change this if backend runs on different port/host
const BASE_URL = '/api'

// Helper to get auth token from localStorage
const getToken = () => localStorage.getItem('token')

// Generic fetch wrapper with JSON handling and auth
async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  // Add auth token if available
  const token = getToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers
  })

  const data = await response.json()

  if (!response.ok) {
    throw { status: response.status, ...data }
  }

  return data
}

// AUTH / USER API

export async function signup(userData) {
  return apiFetch('/users/signup', {
    method: 'POST',
    body: JSON.stringify(userData)
  })
}

export async function login(credentials) {
  const data = await apiFetch('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
  // Store token on successful login
  if (data.token) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user || data))
  }
  return data
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export function getCurrentUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export async function getProfile() {
  return apiFetch('/users/profile')
}

export async function changePassword(passwordData) {
  return apiFetch('/users/change-password', {
    method: 'PUT',
    body: JSON.stringify(passwordData)
  })
}

//STORES API

export async function getStores(params = {}) {
  const query = new URLSearchParams()
  if (params.search) query.append('search', params.search)
  if (params.sortBy) query.append('sortBy', params.sortBy)
  if (params.order) query.append('order', params.order)

  const queryString = query.toString()
  return apiFetch(`/stores${queryString ? '?' + queryString : ''}`)
}

export async function createStore(storeData) {
  return apiFetch('/stores', {
    method: 'POST',
    body: JSON.stringify(storeData)
  })
}

export async function getOwnerDashboard() {
  return apiFetch('/stores/my-dashboard')
}

//RATINGS API

export async function addRating(ratingData) {
  return apiFetch('/ratings', {
    method: 'POST',
    body: JSON.stringify(ratingData)
  })
}

export async function modifyRating(ratingData) {
  return apiFetch('/ratings', {
    method: 'PUT',
    body: JSON.stringify(ratingData)
  })
}

//ADMIN API

export async function getAdminDashboardStats() {
  return apiFetch('/admin/dashboard-stats')
}

export async function getAdminUsers(params = {}) {
  const query = new URLSearchParams()
  if (params.search) query.append('search', params.search)
  if (params.role) query.append('role', params.role)
  if (params.sortBy) query.append('sortBy', params.sortBy)
  if (params.order) query.append('order', params.order)

  const queryString = query.toString()
  return apiFetch(`/admin/users${queryString ? '?' + queryString : ''}`)
}

export async function adminCreateUser(userData) {
  return apiFetch('/admin/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  })
}
