import React from 'react'

import './styles.css'
/**
 * This should be a React component that, at the very least, comprises an image component a title and a description or subheading.
 *
 * @param props
 * @returns
 *
 *
 *
 */

const Card = (props) => {
  const { track } = props
  return (
    <div className="cardContainer">
      <div className="card">
        {track?.album?.images?.length ? (
          <img src={track?.album?.images[0].url} alt="" className="imgBx" />
        ) : (
          <div>No Image</div>
        )}
        <div className="contentBx">
          <h3>{track?.name}</h3>
          <h4 className="artistNameTitle">Artist:</h4>
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
  )
}

export default Card
