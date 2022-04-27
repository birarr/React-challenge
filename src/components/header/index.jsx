import React from 'react'
import { Link } from 'react-router-dom'
import { Login } from '../login'
import logo from '../../assets/fxdigitallogo.png'

import './styles.css'

export const Header = () => {
  return (
    <div className="header">
      <header>
        <nav>
          <img className="headerLogo" src={logo} alt="logo" />
          <div className="headerLinks">
            <Link to="/" className="headerHomeLink">
              Home
            </Link>
            <Login />
          </div>
        </nav>
      </header>
    </div>
  )
}
