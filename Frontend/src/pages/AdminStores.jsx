import { useState } from 'react'
import { createStore } from '../services/api'

export default function AdminStores() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    ownerId: ''
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const storeData = {
        ...form,
        ownerId: form.ownerId ? parseInt(form.ownerId) : undefined
      }
      const result = await createStore(storeData)
      setSuccess(`Store created successfully! ID: ${result.store?.id || result.id}`)
      setForm({ name: '', email: '', address: '', ownerId: '' })
    } catch (err) {
      setError(err.error || err.errors?.[0]?.msg || 'Failed to create store')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create Store</h1>
        <p className="text-gray-500 mt-1">Add a new store to the platform</p>
      </div>

      {/* Create Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">New Store Details</h2>
            <p className="text-sm text-gray-500">Fill in the information below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
              Store Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Enter store name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Store Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="store@example.com"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1.5">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Enter store address"
            />
          </div>

          <div>
            <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700 mb-1.5">
              Owner ID
            </label>
            <input
              type="number"
              id="ownerId"
              name="ownerId"
              value={form.ownerId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="User ID of store owner (optional)"
            />
            <p className="mt-1.5 text-sm text-gray-500">
              Enter the User ID of an existing user with <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">store_owner</code> role
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-green-700">{success}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Store...
                </span>
              ) : (
                'Create Store'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Help Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-medium text-amber-800">Need to create a store owner first?</h3>
            <p className="text-sm text-amber-700 mt-1">
              Go to <a href="/admin/users" className="underline font-medium">User Management</a> to create a new user with the <code className="px-1.5 py-0.5 bg-amber-100 rounded text-xs">store_owner</code> role, then use their ID here.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
