import React from 'react'
import { About, Hero } from '../components'
import LayerMask from '../components/LayerMask'
import PinedProjects from '../components/home/selectedProjects/PinedProjects'

const Home = () => {
  return (
    <div >
      <LayerMask/>
      <Hero />
      <PinedProjects/>
      <About />
    </div>
  )
}

export default Home
