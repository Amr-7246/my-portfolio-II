import React from 'react'
import {logo ,  ninga, allNinga} from '.'

const YoutubeBaner = () => {
  return (
    <section className='w-[1280px] h-[720px] flex  relative overflow-hidden' >
      <div id='hero-lear-mask' className="w-full h-full absolute z-[2] overflow-hidden">
        <div id='amr' className=' px-5 absolute text-[100px] bottom-[10%] left-[18%]  '>
          <h2 className='absolute top-[-5px] right-2 opacity-30 '>
            <span>Dr.</span>co<span>der</span>()
          </h2>
          <h2  className=''>
            <span>Dr.</span>co<span>der</span>()
          </h2>
        </div>
      </div>
      <div className='w-[400px] absolute bottom-[10%] left-[0%] '>
        <img className='w-full ' src={logo} alt="" />
      </div>
      <div className='w-[350px] absolute top-[0%] right-0'>
        <img className='' src={ninga} alt="" />
      </div>
    </section>
  )
}

export default YoutubeBaner
