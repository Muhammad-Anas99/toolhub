import React from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

/**
 * Google's official multi-color "G" mark, used here per Google's own
 * branding guidelines for sign-in buttons (the standard way custom
 * "Continue with Google" buttons are built across the web).
 */
function GoogleLogo(props) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
        c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
        c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039
        l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
        c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24
        C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  )
}

/**
 * Redirects the whole page to the backend's OAuth entry point — a full
 * page navigation, not a popup or fetch. The backend handles the entire
 * exchange with Google and, on success, redirects back with the session
 * cookie already set; see server/controllers/authController.js
 * googleAuthCallback for why no token ever needs to pass through this
 * button or the URL at all.
 */
export default function GoogleAuthButton() {
  function handleClick() {
    window.location.href = `${API_BASE_URL}/auth/google`
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
    >
      <GoogleLogo className="h-5 w-5 flex-shrink-0" />
      Continue with Google
    </button>
  )
}
