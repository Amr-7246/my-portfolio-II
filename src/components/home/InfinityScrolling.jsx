import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const InfinityScrolling = () => {
  const wrapperRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(() => {
    const items = gsap.utils.toArray('.scroll-item')
    const totalWidth = items.length * 320 // 300px + gap
    const duration = 60

    gsap.to(trackRef.current, {
      x: `-=${totalWidth / 2}`, // move by half total length
      duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) // loop back smoothly
      }
    })
  }, [])

  return (
    <div ref={wrapperRef} className='w-[100%] mx-auto relative overflow-hidden py-[100px]'>
      <div ref={trackRef} className='flex flex-row gap-3 w-fit' >
        {[...Array(2)].flatMap(() =>
          Array.from({ length: 10 }).map((_, idx) => (
            <div
              className='scroll-item rounded-lg w-[250px] h-[80px] bg-[var(--text)] opacity-40 !text-[var(--inverted-text)] flex justify-center items-center flex-shrink-0 border border-[var(--orange)]'
              key={idx + Math.random()}
            >
              {idx == 0 ? 'freelancer' : idx == 1 ? 'developer' : idx == 2 ? 'frontend' : idx == 3 ? 'backend' : idx == 4 ? 'MERN stack' : idx == 5 ? 'system designer' : idx == 6 ? 'project manager' : idx == 7 ? 'AI Developer' : idx == 8 ? 'Full Stack Developer' : 'programmer' }
            </div>
          ))
        )}
      </div>

      {/* Optional: Fades on sides */}
      {/* <div className='bg-gradient-to-r from-[var(--black)] via-transparent to-transparent h-full w-[300px] absolute left-0 top-0 z-10' />
      <div className='bg-gradient-to-l from-[var(--black)] via-transparent to-transparent h-full w-[300px] absolute right-0 top-0 z-10' /> */}
    </div>
  )
}

export default InfinityScrolling
