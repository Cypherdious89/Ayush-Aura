import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-top'>
        <p className='footer-top-heading'>
          For any queries you can mail us at <span className='mail-contact'>ayushaura.030809@gmail.com</span>
        </p>
        <p className='footer-top-text'>
          All Rights Reserved.
        </p>
      </section>
      <section className='footer-bottom'>
        <div className='footer-bottom-wrap'>
          <div className='footer-logo'>
            <img src={require('../../../../img/logo.png')} alt='logo' style={{width: '150px', height: '150px'}}></img>
          </div>
          <small className='website-rights'>AyushAura © 2022</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;