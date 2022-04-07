import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import { Home } from './pages/home'
import './global.css'
import { TrackDetails } from './components/trackDetails'

/**
 * The starting page for your App
 */

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Header />
          <main>
            <section>
              <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path="/trackdetails/:id" element={<TrackDetails />} />
              </Routes>
            </section>
          </main>
        </BrowserRouter>
      </>
    )
  }
}

export default App
