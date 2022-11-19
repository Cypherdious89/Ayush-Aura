import React from 'react'
import { Button } from '../Button/Button';
import {Link} from 'react-router-dom'
import './Navbar.css'


function Navbar() {
  return (
    <>
      <div className="navbar">
          <div className="navbar-container container">
              <Link className='navbar-logo' to='/'>
                  <img className="navbar-icon" src={require('../../../../img/icon.png')} alt='logo'></img>
                    Ayush Aura
              </Link>
          </div>
          <ul className = 'nav-menu'>
            <li className="nav-item">
              <a href='#home-section' className = 'nav-links'>Home</a>
            </li>
            <li className="nav-item">
              <a href='#about-section' className = 'nav-links'>About</a>
            </li>
            <li className="nav-item">
              <a href='#description-section' className = 'nav-links'>Description</a>
            </li>
            <li className="nav-item">
              <a href='#search-section' className = 'nav-links'>Search</a>
            </li>
            <li className="nav-btn">
                <Link to='/signup' className='btn-link'>
                  <Button buttonStyle = 'btn--outline' >SIGN UP</Button>
                </Link>
            </li>
            <li className="nav-btn">
                <Link to='/login' className='btn-link'>
                  <Button buttonStyle = 'btn--outline' >LOG IN</Button>
                </Link>
            </li>
          </ul>
      </div>
    </>
  )
}

export default Navbar