import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'

const SmartLearning = () => {
  const container = useRef()
  const textSpanStyles = 'text-white/50 text-[5px] md:text-[14px] lg:text-[16px]'
  const spanStyles = 'w-[10vw] h-[2px] bg-white/50 '

  const VspanStyles = 'w-[2px] h-[100px] bg-white/50 '
  const VtextSpanStyles = 'text-white/50 '

  const svgPathD = "M 0 10 Q 50 0 100 10";

  //& Animate the Drowen area
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
          end: 'bottom 85%',
          markers: true
        }
      })

    })
    return () => ctx.revert()
  },[])
  return (
    <div ref={container} className='flex-center flex-row gap-[100px] w-full '>
      <div className=' flex-center flex-col '>
        {/* Horizontal learing line */}
          <div className=' h-[80px] flex-center flex-row gap-5 border border-[var(--border)] rounded-lg p-3' >
            <span className={`${textSpanStyles}`} >Backend</span>
            <span className={`${spanStyles}`} />
            <span className={`${textSpanStyles}`} >AI-based systems</span>
            <span className={`${spanStyles}`} />
            <span className={`${textSpanStyles}`} >Data Structuer</span>
            <span className={`${spanStyles}`} />
            <span className={`${textSpanStyles}`} >software building</span>
          </div>
        {/* vertical and deep learing line */}
          <div className='flex-center flex-col gap-5 border border-t-[0px] border-[var(--border)] rounded-b-lg p-3 w-fit' >
            <span className={`${VspanStyles}`} />
            <span className={`${VtextSpanStyles}`}>Frontend</span>
            <span className={`${VspanStyles}`} />
          </div>
      </div>
    </div>
  )
}

export default SmartLearning