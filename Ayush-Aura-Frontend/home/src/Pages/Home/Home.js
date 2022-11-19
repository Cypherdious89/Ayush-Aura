import React from 'react'
import Navbar from './components/Navbar/Navbar';
import Section from './components/Section/Section';
import Footer from './components/Footer/Footer'
import {homeObjOne, homeObjTwo, homeObjThree, homeObjFour} from './Data'; 

function Home() {
  return (
    <>
      <Navbar />
      <Section {...homeObjOne} />
      <Section {...homeObjTwo} />
      <Section {...homeObjThree} />
      <Section {...homeObjFour} />
      <Footer />
    </>
  )
}

export default Home