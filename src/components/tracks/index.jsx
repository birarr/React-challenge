import React, { useEffect, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import { Card } from '../Card'
import { LoginButton } from '../loginButton'

import './styles.css'

export const Tracks = ({ searchTerm, searchSubmit, setSearchSubmit }) => {
  const [color, setColor] = useState('#DADADA')
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  const myDivStyle = {
    display: 'grid',
    justifyContent: 'center',
    width: '100%',
    gridTemplateColumns: 'repeat(auto-fill, 240px)',
    rowGap: '10px',
    columnGap: '20px',
  }

  const fetchTracks = async ({ pageParam = 0 }) => {
    let offset = 0
    if (pageParam !== 0) {
      const pageParamSplit = pageParam?.split('offset=')
      offset = pageParamSplit[1].substring(0, 2)
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${searchTerm}%2C%20&type=track&artist&market=GB&limit=10&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await response.json()

    return data
  }

  const {
    data: trackData,
    status: trackStatus,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery('tracks', fetchTracks, {
    getNextPageParam: (lastPage) => lastPage?.tracks?.next,
    refetch: searchSubmit,
  })

  useEffect(() => {
    if (searchSubmit === true) {
      refetch()
      setSearchSubmit(false)
    }
  }, [searchSubmit])
  console.log({ trackStatus })
  return (
    <>
      {!token ? (
        <div className="loginAlert">
          <h1>Please, login to your spotify acount</h1>
          <LoginButton />
        </div>
      ) : (
        <div className="container">
          {trackStatus === 'loading' && (
            <div className="fetchLoading">
              <ClipLoader color={color} loading={loading} size={50} />
              Loading data...
            </div>
          )}
          {trackStatus === 'error' && (
            <div className="fetchError">Error fetching data</div>
          )}
          {trackStatus === 'success' && (
            <InfiniteScroll
              hasMore={hasNextPage}
              loadMore={fetchNextPage}
              loader={
                <div className="fetchLoading" key={Math.random(1000 * 1000)}>
                  <ClipLoader color={color} loading={loading} size={50} />
                  Loading data...
                </div>
              }
              style={myDivStyle}
            >
              {trackData?.pages?.map((track) =>
                track?.tracks?.items?.map((track, index) => (
                  <Link
                    key={index}
                    to={`trackdetails/${track?.id}`}
                    className="listLink"
                  >
                    <Card track={track} />
                  </Link>
                ))
              )}
            </InfiniteScroll>
          )}
        </div>
      )}
    </>
  )
}
