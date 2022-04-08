import React from 'react'
import { useQuery } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { LoginButton } from '../loginButton'
import { IoMdArrowRoundBack } from 'react-icons/io'

import './styles.css'

export const TrackDetails = () => {
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const fetchTrack = async () => {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  }

  const { data: trackData, status: characterStatus } = useQuery(
    'track',
    fetchTrack
  )

  const handleBackPage = () => {
    navigate('/')
  }

  return (
    <>
      {!token ? (
        <div className="loginAlert">
          <h1>Please, login to your spotify account</h1>
          <LoginButton />
        </div>
      ) : (
        <div className="cardDetailsontainer">
          <IoMdArrowRoundBack className="backButton" onClick={handleBackPage} />
          <div className="cardDetails">
            <div className="card-header">
              <img src={trackData?.album?.images[0].url} alt="rover" />
            </div>
            <div className="card-body">
              {trackData?.explicit === true ? (
                <span className="tag tag-red">Explicit</span>
              ) : (
                <span className="tag tag-teal">No explicit</span>
              )}
              <h4>{trackData?.name}</h4>
              <p>Duration {(trackData?.duration_ms / 1000 / 60).toFixed(2)}m</p>
              <div className="user">
                <img
                  src={
                    trackData?.album?.images[1].url ||
                    trackData?.album?.images[0].url
                  }
                  alt="user"
                />
                <div className="user-info">
                  <h5>
                    {trackData?.artists?.map((artist) => (
                      <a
                        href={artist?.external_urls?.spotify}
                        target="_blank"
                        rel="noopener noreferrer external"
                        className="artistLink"
                      >
                        <div>{artist.name}</div>
                      </a>
                    ))}
                  </h5>
                  <small>{trackData?.album?.release_date}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
