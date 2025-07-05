'use client'

import { useEffect, useState } from 'react'
import loadScript from './loadScript'
import removeScript from './removeScript'

/**
 * Custom hook for Google login using Google Identity Services (GIS)
 */
export const useGoogleLogin = ({
  clientId = '',
  onSuccess = () => { },
  onFailure = () => { },
  onScriptLoadFailure = () => { },
  onAutoLoadFinished = () => { },
  prompt = 'select_account',
  autoLoad = false
}) => {
  const [loaded, setLoaded] = useState(false)
  const [tokenClient, setTokenClient] = useState(null)

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

        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'profile email openid',
          prompt,
          callback: (response) => {
            if (response?.access_token) {
              fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                  Authorization: `Bearer ${response.access_token}`
                }
              })
                .then(async res => await res.json())
                .then(profile => {
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
                  onSuccess(fullResponse)
                })
                .catch(err => {
                  onFailure(err)
                })
            } else {
              onFailure(new Error('No access token received'))
            }
          }
        })

        setTokenClient(client)
        setLoaded(true)
        onAutoLoadFinished(false)
      },
      (err) => {
        onScriptLoadFailure(err)
        onFailure(err)
      }
    )

    return () => {
      unmounted = true
      removeScript(document, scriptId)
    }
  }, [])

  useEffect(() => {
    if (autoLoad && loaded) {
      signIn()
    }
  }, [loaded, autoLoad])

  const signIn = (e) => {
    if (e?.preventDefault) e.preventDefault()
    if (tokenClient) {
      tokenClient.requestAccessToken()
    } else {
      onFailure(new Error('Google Token Client not initialized'))
    }
  }

  return {
    signIn,
    loaded
  }
}
