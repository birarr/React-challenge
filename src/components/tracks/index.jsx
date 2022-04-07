import React, { useEffect, useState } from 'react'
import { useQuery, useQueries, useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import Card from '../Card'

import './styles.css'

export const Tracks = ({ searchTerm, searchSubmit, setSearchSubmit }) => {
  const [tracks, setTracks] = useState([])
  const [color, setColor] = useState('#DADADA')
  const [loading, setLoading] = useState(true)
  // const [intervalMs, setIntervalMs] = useState(3000)
  console.log(searchSubmit)

  const fetchTracks = async ({ pageParam = 0 }) => {
    console.log({ pageParam })

    let offset = 0
    if (pageParam !== 0) {
      const pageParamSplit = pageParam?.split('offset=')
      offset = pageParamSplit[1].substring(0, 2)
      console.log({ offset })
    }

    const token = localStorage.getItem('token')
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
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
    isFetchingNextPage,
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

  console.log({ trackData })
  console.log(trackStatus === 'loading')
  return (
    <div className="container">
      {trackStatus === 'loading' && (
        <div className="fetchLoading">
          <ClipLoader color={color} loading={loading} size={50} />
          Loading data...
        </div>
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
          style={{
            maxHeight: '100%',
            maxWidth: '70%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            rowGap: '10px',
            columnGap: '20px',
            justifyContent: 'center',
          }}
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
  )
}
