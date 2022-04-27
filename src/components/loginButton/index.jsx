import React, { useEffect, useState } from 'react'

import './styles.css'

export const LoginButton = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1]

      window.location.hash = ''
      window.localStorage.setItem('token', token)
    }

    setToken(token)
  }, [])

  const logout = () => {
    setToken('')
    window.localStorage.removeItem('token')
  }

  return (
    <>
      <div className="container">
        {!token ? (
          <a
            href={`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_ESPONSE_TYPE}`}
            className="loginLink"
          >
            <button className="loginButton">Login to spotify</button>
          </a>
        ) : (
          <button onClick={logout} className="loginButton">
            Logout
          </button>
        )}
      </div>
    </>
  )
}
