import React from 'react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import './Section.css';

function Section({
  lightBg, topLine, lightText, lightTextDesc, headline, description, buttonLabel, img, alt, imgStart, route, sectionID
}) {
  return (
    <>
      <div id={sectionID} className={lightBg ? 'home__header-section' : 'home__header-section darkBg'}>
        <div className="container">
          <div className="row home__header-row" 
          style={{display: 'flex', flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'}}>
            <div className="col">
              <div className="home__header-text-wrapper">
                <div className="top-line">{topLine}</div>
                <h1 className={lightText ? 'heading':'heading dark'}>{headline}</h1>
                <p className={lightTextDesc ? 'home__header-subtitle':'home__header-subtitle dark'}>{description}</p>
                <Link to={route}>
                  <Button buttonSize='btn--wide' buttonColor='blue'>{buttonLabel}</Button>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="image__header-text-wrapper">
                <img src={img} alt={alt} className='home__header-img' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Section