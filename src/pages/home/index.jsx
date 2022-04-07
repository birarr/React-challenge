import React, { useState } from 'react'
import { Tracks } from '../../components/tracks'

import './styles.css'

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchSubmit, setSearchSubmit] = useState(false)

  const handleSearch = (search) => {
    setSearchSubmit(true)
  }

  return (
    <>
      <div className="homeTitle">
        <h1>United Kingdom Spotify tracks</h1>
        <div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(event) => setSearchTerm(event.target.value)}
            className="inputTitle"
          ></input>
          <button onClick={handleSearch} className="buttonSearch">
            search
          </button>
        </div>
      </div>
      <div className="App">
        <Tracks
          searchTerm={searchTerm}
          searchSubmit={searchSubmit}
          setSearchSubmit={setSearchSubmit}
        />
      </div>
    </>
  )
}
