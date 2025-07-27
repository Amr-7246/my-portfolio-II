import React from 'react'
import { About, Hero } from '../components'
import LayerMask from '../components/LayerMask'
import PinedProjects from '../components/home/selectedProjects/PinedProjects'
import InfinityScrolling from '../components/home/InfinityScrolling'

const Home = () => {
  return (
    <div >
      <LayerMask/>
      <Hero />
      <PinedProjects/>
      <About />
      <InfinityScrolling/>
    </div>
  )
}

export default Home
