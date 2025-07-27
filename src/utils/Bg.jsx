import React from 'react'
import "/bg_2/photo_1_2025-07-27_07-50-15.jpg"

const Bg = () => {
  const mainRoute = '/bg_2'
  const dynamicRoute = Array.from({length: 39 }).map((_,idx) => {
    return `${mainRoute}/photo_${idx+1}_2025-07-27_07-50-15.jpg`
  })
  const ThisRoute = ({routeNum , className}) => {
    return <img className={className} src={`${mainRoute}/photo_${routeNum}_2025-07-27_07-50-15.jpg`} alt="any" />
  }
  return (
    <div className='flex flex-wrap gap-6  justify-center py-5 px-10'>
          <ThisRoute routeNum={'16'} className={'size-[240px] rounded-lg overflow-hidden'} />
          <ThisRoute routeNum={'37'} className={'size-[240px] rounded-lg overflow-hidden'} />
          <ThisRoute routeNum={'38'} className={'size-[240px] rounded-lg overflow-hidden'} />
          <ThisRoute routeNum={'35'} className={'size-[240px] rounded-lg overflow-hidden'} />
          <ThisRoute routeNum={'21'} className={'size-[240px] rounded-lg overflow-hidden'} />
          <ThisRoute routeNum={'8'} className={'size-[240px] rounded-lg overflow-hidden'} />
          <ThisRoute routeNum={'36'} className={'size-[240px] rounded-lg overflow-hidden'} />
          <ThisRoute routeNum={'26'} className={'size-[240px] rounded-lg overflow-hidden'} />
          {/* <ThisRoute routeNum={'3'} className={'size-[240px] rounded-lg overflow-hidden'} /> */}
          {/* <ThisRoute routeNum={'30'} className={'size-[240px] rounded-lg overflow-hidden'} /> */}
          {/* <ThisRoute routeNum={'31'} className={'size-[240px] rounded-lg overflow-hidden'} /> */}
          <ThisRoute routeNum={'33'} className={'size-[240px] rounded-lg overflow-hidden'} />
          <ThisRoute routeNum={'24'} className={'size-[240px] rounded-lg overflow-hidden'} />
          <ThisRoute routeNum={'20'} className={'size-[240px] rounded-lg overflow-hidden'} />
          <ThisRoute routeNum={'25'} className={'size-[240px] rounded-lg overflow-hidden'} />
          <ThisRoute routeNum={'23'} className={'size-[240px] rounded-lg overflow-hidden'} />
          <ThisRoute routeNum={'19'} className={'size-[240px] rounded-lg overflow-hidden'} />
          <ThisRoute routeNum={'18'} className={'size-[240px] rounded-lg overflow-hidden'} />
      {dynamicRoute.map((route ,idx) =>(
        <div className=' hidden relative size-[250px] rounded-lg overflow-hidden'>
          <img className='' src={route} alt={idx} />
          <span className='bg-rose-500 absolute p-4 top-5 rounded-full'>{idx+1}</span>
        </div>
      ))}
    </div>
  )
}

export default Bg
