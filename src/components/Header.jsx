import React from 'react'
import { Link } from 'react-router-dom'
import { Login } from '../components/login'
import logo from '../assets/fxdigitallogo.png'

export const Header = () => {
  return (
    <header>
      <nav>
        <img src={logo} alt="logo" />
        <Link to="/">Home</Link>
        <Login />
      </nav>
    </header>
  )
}

export default Header
