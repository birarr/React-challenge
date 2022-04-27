import React, { useState } from 'react'
import { Tracks } from '../../components/tracks'

import './styles.css'

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchSubmit, setSearchSubmit] = useState(false)

  const handleSearch = () => {
    setSearchSubmit(true)
  }

  return (
    <>
      <div className="homeTitle">
        <h1 className="homeTitleH1">United Kingdom Spotify tracks</h1>
        <div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSearch()
              }
            }}
            className="inputTitle"
          ></input>
          <button
            onClick={handleSearch}
            onKeyDown={handleSearch}
            className="buttonSearch"
          >
            Search
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
