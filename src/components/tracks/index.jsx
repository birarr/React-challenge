import React, { useEffect, useState } from 'react'
import { useQuery, useQueries, useInfiniteQuery } from 'react-query'
import Card from '../Card'

export const Tracks = () => {
  const [tracks, setTracks] = useState([])

  const fetchTracks = async ({ pageParam = 1 }) => {
    const token = localStorage.getItem('token')
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/37i9dQZEVXbLnolsZ8PSNw/tracks?page=${pageParam}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await response.json()
    console.log(data.items)

    setTracks(data.items)
    return data
  }

  const {
    data: personData,
    status: personStatus,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery('tracks', fetchTracks, {
    getNextPageParam: (lastPage) =>
      lastPage?.next
        ? lastPage?.next.substr(lastPage?.next.length - 1)
        : undefined,
  })

  const renderTracks = () => {
    return tracks?.map((track) => <Card track={track.track} />)
  }

  return renderTracks()
}
