import React from 'react'
import Card from '../components/Card'
import { Tracks } from '../components/tracks'
import dummyData from '../dummyData.json' // To be replaced with your api response data
import { useQuery } from 'react-query'

export const Home = () => {
  // const token = localStorage.getItem('token')
  // console.log({ token })
  // const fetchTracks = async ({ pageParam = 1 }) => {
  //   const response = await fetch(`https://api.spotify.com/v1/tracks`, {
  //     headers: { Authentication: `Bearer ${token}` },
  //   })
  //   console.log(response.json())
  //   return response.json()
  // }

  // const { data, status } = useQuery('tracks', fetchTracks)
  // console.log({ data })
  return (
    <>
      <h1>United Kingdom Spotify tracks</h1>
      <div
        className="App"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          rowGap: '10px',
          columnGap: '20px',
        }}
      >
        {/* <Card
          image={dummyData.image}
          name={dummyData.name}
          home_port={dummyData.home_port}
          roles={dummyData.roles}
        /> */}
        <Tracks />
      </div>
    </>
  )
}

export default Home
