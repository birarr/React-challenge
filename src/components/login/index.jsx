import React, { useEffect, useState } from 'react'
import { LoginButton } from '../../components/loginButton'

import './styles.css'

export const Login = () => {
  // // const CLIENT_ID = 'ac87a95f875f405f83beff47c9fbbe74'
  // const REDIRECT_URI = 'http://localhost:8080/'
  // const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
  // const RESPONSE_TYPE = 'token'

  console.log(process.env.AUTH_ENDPOINT)

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
    <div className="container">
      {!token ? (
        <a
          href={`${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_ESPONSE_TYPE}`}
          className="loginLink"
        >
          <LoginButton />
        </a>
      ) : (
        <button onClick={logout} className="loginButton">
          Logout
        </button>
      )}
    </div>
  )
}
