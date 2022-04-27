import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/header'
import { Home } from './pages/home'
import './global.css'
import { Track } from './pages/track'
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
                <Route path="/trackdetails/:id" element={<Track />} />
              </Routes>
            </section>
          </main>
        </BrowserRouter>
      </>
    )
  }
}

export default App
