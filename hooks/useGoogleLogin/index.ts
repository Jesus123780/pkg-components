'use client'

import { useEffect, useRef, useState } from 'react'
import loadScript from './loadScript'
import removeScript from './removeScript'

/**
 * Types for the hook options
 */
export type UseGoogleLoginOptions = {
  clientId?: string
  onSuccess?: (payload: any) => void
  onFailure?: (err: Error) => void
  /**
   * Called when we heuristically detect the chooser/popup was closed/blocked.
   * Receives a reason: 'user' (closed by user) or 'auto' (closed automatically after profile selection).
   */
  onPopupClosed?: (reason?: 'user' | 'auto') => void
  onScriptLoadFailure?: (err: Error) => void
  onAutoLoadFinished?: (didAutoLoad: boolean) => void
  prompt?: string
  autoLoad?: boolean
  /**
   * Timeout to consider the popup closed/blocked (ms).
   * When callback doesn't arrive in this time we assume popup was closed.
   */
  popupTimeoutMs?: number
}

/**
 * Internal shape to track pending signIn attempts
 */
type Pending = {
  resolve: () => void
  reject: (err: Error) => void
  timeoutId: number
  focusHandler: EventListener
}

/* global google typing fallback */
declare global {
  interface Window {
    google?: any
  }
}

/**
 * useGoogleLogin
 *
 * Loads Google Identity Services script, initializes token client,
 * and exposes `signIn` that detects popup cancellation reliably by
 * intercepting window.open and polling popup.closed.
 */
export const useGoogleLogin = (options: UseGoogleLoginOptions = {}) => {
  const {
    clientId = '',
    onSuccess = () => { },
    onFailure = () => { },
    onPopupClosed = () => { },
    onScriptLoadFailure = () => { },
    onAutoLoadFinished = () => { },
    prompt = 'select_account',
    autoLoad = false,
    popupTimeoutMs = 2000
  } = options

  const [loaded, setLoaded] = useState(false)
  const [popupClosed, setPopupClosed] = useState(false)
  const tokenClientRef = useRef<any | null>(null)
  const pendingRef = useRef<Pending | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (pendingRef.current) {
        try {
          window.clearTimeout(pendingRef.current.timeoutId)
          window.removeEventListener('focus', pendingRef.current.focusHandler)
        } catch (e) { }
        pendingRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    let unmounted = false
    const scriptId = 'google-identity'

    loadScript(
      document,
      'script',
      scriptId,
      'https://accounts.google.com/gsi/client',
      () => {
        if (unmounted) return

        try {
          const client = window.google?.accounts?.oauth2?.initTokenClient({
            client_id: clientId,
            scope: 'profile email openid',
            prompt,
            callback: async (response: any) => {
              successRef.current = true
              try {
                if (response?.access_token) {
                  const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                      Authorization: `Bearer ${response.access_token}`
                    }
                  })
                  const profile = await profileRes.json()
                  const fullResponse = {
                    tokenId: response.id_token,
                    accessToken: response.access_token,
                    profileObj: {
                      googleId: profile.sub,
                      email: profile.email,
                      name: profile.name,
                      givenName: profile.given_name,
                      familyName: profile.family_name,
                      imageUrl: profile.picture,
                      ...profile
                    }
                  }

                  try {
                    onSuccess(fullResponse)
                  } catch (err) {
                    // don't let user callback throw break resolution
                    // eslint-disable-next-line no-console
                    console.warn('onSuccess callback threw', err)
                  }

                  if (pendingRef.current) {
                    pendingRef.current.resolve()
                    try {
                      window.clearTimeout(pendingRef.current.timeoutId)
                      window.removeEventListener('focus', pendingRef.current.focusHandler)
                    } catch (e) { }
                    pendingRef.current = null
                  }
                  setPopupClosed(false)

                  // NEW: notify that popup was closed automatically after profile selection
                  try {
                    onPopupClosed('auto')
                  } catch (e) { }
                } else {
                  const err = new Error(response?.error || 'No access token received')
                  try {
                    onFailure(err)
                  } catch (e) { }
                  if (pendingRef.current) {
                    pendingRef.current.reject(err)
                    try {
                      window.clearTimeout(pendingRef.current.timeoutId)
                      window.removeEventListener('focus', pendingRef.current.focusHandler)
                    } catch (e) { }
                    pendingRef.current = null
                  }
                }
              } catch (err: any) {
                const e = err instanceof Error ? err : new Error(String(err))
                try {
                  onFailure(e)
                } catch (e2) { }
                if (pendingRef.current) {
                  pendingRef.current.reject(e)
                  try {
                    window.clearTimeout(pendingRef.current.timeoutId)
                    window.removeEventListener('focus', pendingRef.current.focusHandler)
                  } catch (e) { }
                  pendingRef.current = null
                }
              }
            }
          })

          tokenClientRef.current = client
          setLoaded(true)
          onAutoLoadFinished(false)
        } catch (err: any) {
          const e = err instanceof Error ? err : new Error(String(err))
          onScriptLoadFailure(e)
          onFailure(e)
        }
      },
      (err: any) => {
        const e = err instanceof Error ? err : new Error(String(err))
        onScriptLoadFailure(e)
        onFailure(e)
      }
    )

    return () => {
      unmounted = true
      removeScript(document, scriptId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId])

  useEffect(() => {
    if (autoLoad && loaded) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      signIn()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, autoLoad])

  const resetPopupClosed = () => {
    setPopupClosed(false)
  }
  const successRef = useRef(false)

  /**
   * signIn - improved: intercepts window.open to capture the real popup created by GIS,
   * polls popup.closed to detect immediate cancel, and restores window.open in all cases.
   */
  const signIn = async (e?: Event) => {
    if (e?.preventDefault) e.preventDefault()

    if (!tokenClientRef.current) {
      const err = new Error('Google Token Client not initialized')
      onFailure(err)
      throw err
    }

    setPopupClosed(false)
    successRef.current = false // reset por intento

    if (pendingRef.current) {
      try {
        window.removeEventListener('focus', pendingRef.current.focusHandler)
      } catch { }
      pendingRef.current = null
    }

    let finished = false
    let popupOpened = false
    let popupRef: Window | null = null
    let pollId: number | null = null
    let originalOpen: typeof window.open = window.open

    const stopPolling = () => {
      if (pollId) {
        try { window.clearInterval(pollId) } catch { }
        pollId = null
      }
    }

    const cleanup = () => {
      stopPolling()
      try {
        if (window.open !== originalOpen) {
          window.open = originalOpen
        }
      } catch { }

      try {
        window.removeEventListener('blur', onBlur)
        window.removeEventListener('focus', onFocus)
        document.removeEventListener('visibilitychange', onVisibility)
      } catch { }

      pendingRef.current = null
      popupRef = null
    }

    const finishUserCancel = () => {
      // ❌ Si ya hubo éxito, JAMÁS dispares user
      if (finished || successRef.current) return

      finished = true
      cleanup()
      setPopupClosed(true)

      try { onPopupClosed('user') } catch { }
      try { onFailure(new Error('popup_closed_by_user')) } catch { }
    }

    const finishSuccess = () => {
      if (finished) return

      finished = true
      cleanup()
      setPopupClosed(false)

      try { onPopupClosed('auto') } catch { }
    }

    const onBlur = () => {
      popupOpened = true
    }

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        popupOpened = true
      }
    }

    const onFocus = () => {
      // No-op: el polling decide
    }

    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibility)

    pendingRef.current = {
      resolve: () => {
        finishSuccess()
      },
      reject: () => {
        if (finished) return
        finished = true
        cleanup()
      },
      timeoutId: 0,
      focusHandler: onFocus
    }

    // Interceptar window.open
    try {
      originalOpen = window.open
      window.open = function (...args: any[]) {
        try {
          popupRef = originalOpen.apply(window, args as any)
        } catch {
          try { popupRef = originalOpen.call(window, ...args) } catch { popupRef = null }
        }
        if (popupRef) popupOpened = true
        return popupRef
      }
    } catch {
      console.warn('Could not intercept window.open, fallback to heuristics')
    }

    // Polling: SOLO puede disparar user si NO hay success
    try {
      pollId = window.setInterval(() => {
        try {
          if (popupRef && popupRef.closed) {
            finishUserCancel()
          }
        } catch {
          // ignore
        }
      }, 100) as unknown as number
    } catch {
      // ignore
    }

    // Llamada a Google
    try {
      tokenClientRef.current.requestAccessToken()
    } catch (err) {
      cleanup()
      window.open = originalOpen
      throw err
    }

    return new Promise<void>((resolve, reject) => {
      if (pendingRef.current) {
        const prev = { ...pendingRef.current }
        pendingRef.current = {
          resolve: () => {
            try { prev.resolve() } catch { }
            resolve()
          },
          reject: (err?: Error) => {
            try { prev.reject(err as Error) } catch { }
            reject(err)
          },
          timeoutId: 0,
          focusHandler: onFocus
        }
      } else {
        cleanup()
        resolve()
      }
    })
  }



  return {
    signIn,
    loaded,
    popupClosed,
    resetPopupClosed
  }
}