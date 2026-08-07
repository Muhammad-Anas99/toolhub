import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api.js'
import { setAccessToken, clearAccessToken } from '../lib/tokenStore.js'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // "checking" during the initial silent-refresh attempt on app load, so
  // ProtectedRoute can wait for that instead of redirecting a logged-in
  // user to /login just because the access token hasn't loaded yet.
  const [status, setStatus] = useState('checking') // checking | authenticated | unauthenticated
  const [error, setError] = useState(null)

  // On first load, there's no access token in memory yet (page refresh
  // wipes it, by design — see tokenStore.js). Try a silent refresh using
  // the httpOnly cookie; if it succeeds, the session picks back up
  // invisibly. If not, the user is simply signed out.
  useEffect(() => {
    let cancelled = false

    async function attemptSilentRefresh() {
      try {
        const { data } = await api.refreshSession()
        if (cancelled) return
        setAccessToken(data.accessToken)
        setUser(data.user)
        setStatus('authenticated')
      } catch {
        if (cancelled) return
        clearAccessToken()
        setUser(null)
        setStatus('unauthenticated')
      }
    }

    attemptSilentRefresh()
    return () => {
      cancelled = true
    }
  }, [])

  const register = useCallback(async (formData) => {
    setError(null)
    const { data, message } = await api.register(formData)
    setAccessToken(data.accessToken)
    setUser(data.user)
    setStatus('authenticated')
    return message
  }, [])

  const login = useCallback(async (formData) => {
    setError(null)
    const { data } = await api.login(formData)
    setAccessToken(data.accessToken)
    setUser(data.user)
    setStatus('authenticated')
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.logoutRequest()
    } catch {
      // Even if the network call fails, clear local state so the UI
      // reflects "signed out" — the refresh cookie will simply expire
      // naturally server-side if this request didn't reach it.
    }
    clearAccessToken()
    setUser(null)
    setStatus('unauthenticated')
  }, [])

  const refreshUser = useCallback(async () => {
    const { data } = await api.getMe()
    setUser(data)
    return data
  }, [])

  const value = {
    user,
    status,
    isAuthenticated: status === 'authenticated',
    isAdmin: user?.role === 'admin',
    error,
    register,
    login,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
