import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Login = () => {
  const CLIENT_ID = 'ac87a95f875f405f83beff47c9fbbe74'
  const REDIRECT_URI = 'http://localhost:8080/'
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'token'

  const [token, setToken] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [artists, setArtists] = useState([])

  // const getToken = () => {
  //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
  //     let token = urlParams.get('access_token');
  // }

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    // getToken()

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

  const searchArtists = async (e) => {
    e.preventDefault()
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/37i9dQZEVXbLnolsZ8PSNw/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await response.json()
    console.log(data)
    // return response.json()

    // setArtists(data.artists.items)
  }

  return (
    <div className="container">
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  )
}
