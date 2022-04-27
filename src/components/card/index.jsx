import React, { useMemo } from 'react'

import './styles.css'

export const Card = ({ track }) => {
  const renderImage = useMemo(() => {
    if (track?.album?.images?.length) {
      return <img src={track?.album?.images[0].url} alt="" className="imgBx" />
    } else {
      return <div>No mage</div>
    }
  }, [track?.album?.images?.length])

  return (
    <div className="cardContainer">
      <div className="card">
        {renderImage}
        <div className="contentBx">
          <h3>{track?.name}</h3>
          <h4 className="artistNameTitle">Artist:</h4>
          <div className="artistNameContainer">
            {track?.artists?.map((artist) => {
              return (
                <div
                  className="artistName"
                  key={track?.id + Math.random(10 * 1000)}
                >
                  {artist?.name}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
