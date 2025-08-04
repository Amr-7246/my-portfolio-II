import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const SmartLearning = () => {
  const container = useRef()
  const horizontalContainer = useRef()
  const verticalContainer = useRef()
  
  const textSpanStyles = 'text-white/50 text-[5px] md:text-[14px] lg:text-[16px] transition-all duration-700'
  const spanStyles = 'w-[10vw] h-[2px] bg-white/50 relative overflow-hidden'
  const VspanStyles = 'w-[2px] h-[100px] bg-white/50 relative overflow-hidden'
  const VtextSpanStyles = 'text-white/50 transition-all duration-700'

  useEffect(() => {
    const ctx = gsap.context(() => {
      //& Get all elements
      const horizontalLines = horizontalContainer.current.querySelectorAll('.horizontal-line')
      const verticalLines = verticalContainer.current.querySelectorAll('.vertical-line')
      const horizontalTexts = horizontalContainer.current.querySelectorAll('.horizontal-text')
      const verticalTexts = verticalContainer.current.querySelectorAll('.vertical-text')
      const horizontalBorder = horizontalContainer.current
      const verticalBorder = verticalContainer.current

      //& Create pseudo-elements for line drawing animation
      horizontalLines.forEach(line => {
        const drawer = document.createElement('div')
        drawer.className = 'line-drawer'
        drawer.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
          height: 100%;
          background-color: var(--text);
          transition: none;
        `
        line.appendChild(drawer)
      })

      verticalLines.forEach(line => {
        const drawer = document.createElement('div')
        drawer.className = 'line-drawer'
        drawer.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 0%;
          background-color: var(--text);
          transition: none;
        `
        line.appendChild(drawer)
      })

      //& Main timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
          markers: true,
          onEnter: () => {
            //~ Animate borders
            gsap.to([horizontalBorder, verticalBorder], {
              borderColor: 'var(--text)',
              duration: 0.8,
              ease: 'power2.out'
            })
            
            //~ Animate text colors
            gsap.to([...horizontalTexts, ...verticalTexts], {
              color: 'var(--orange)',
              textShadow: '0 0 10px var(--orange)',
              duration: 1,
              ease: 'power2.out',
              stagger: 0.1
            })
          },
          onLeave: () => {
            //~ Reset borders
            gsap.to([horizontalBorder, verticalBorder], {
              borderColor: 'var(--border)',
              duration: 0.5
            })
            
            //~ Reset text colors
            gsap.to([...horizontalTexts, ...verticalTexts], {
              color: 'rgba(255, 255, 255, 0.5)',
              textShadow: 'none',
              duration: 0.5
            })
          },
          onEnterBack: () => {
            //~ Re-animate on scroll back
            gsap.to([horizontalBorder, verticalBorder], {
              borderColor: 'var(--text)',
              duration: 0.8,
              ease: 'power2.out'
            })
            
            gsap.to([...horizontalTexts, ...verticalTexts], {
              color: 'var(--orange)',
              textShadow: '0 0 10px var(--orange)',
              duration: 1,
              ease: 'power2.out',
              stagger: 0.1
            })
          },
          onLeaveBack: () => {
            //~ Reset when leaving back
            gsap.to([horizontalBorder, verticalBorder], {
              borderColor: 'var(--border)',
              duration: 0.5
            })
            
            gsap.to([...horizontalTexts, ...verticalTexts], {
              color: 'rgba(255, 255, 255, 0.5)',
              textShadow: 'none',
              duration: 0.5
            })
          }
        }
      })

      //& Animate horizontal lines drawing
      if (horizontalLines == null ) {
        console.log(horizontalLines)
      }else{
        console.log(horizontalLines)
        tl.to(Array.from(horizontalLines).map(line => line.querySelector('.line-drawer')), {
          width: '100%',
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.15
        }, 0)
      }

      //& Animate vertical lines drawing
      tl.to(Array.from(verticalLines).map(line => line.querySelector('.line-drawer')), {
        height: '100%',
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1
      }, 0.3)

      //! Text typing animation
      const textElements = [...horizontalTexts, ...verticalTexts]
      textElements.forEach((textEl, index) => {
        const originalText = textEl.textContent
        textEl.textContent = ''

        tl.add(() => {
          textEl.textContent = ''
        }, 0.5 + index * 0.1 - 0.01) // clear text right before typing begins

        tl.to({}, {
          duration: originalText.length * 0.03,
          ease: 'none',
          onUpdate: function () {
            const progress = this.progress()
            const currentLength = Math.floor(progress * originalText.length)
            textEl.textContent = originalText.substring(0, currentLength)
          }
        }, 0.5 + index * 0.1)
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div className=" flex items-center justify-center">
      <div ref={container} className='flex-center flex-row gap-[100px] w-full '>
        <div className='flex-center flex-col'>

          {/*//* Horizontal learning line */}
          <div 
            ref={horizontalContainer}
            className='h-[80px] flex-center flex-row gap-5 border border-[var(--border)] rounded-lg p-3 transition-colors duration-700'
            style={{'--border': 'rgba(255, 255, 255, 0.2)', '--text': 'rgb(255, 255, 255)', '--orange': '#ff6b35'}}
          >
            <span className={`${textSpanStyles} horizontal-text`}>Backend</span>
            <span className={`${spanStyles} horizontal-line`} />
            <span className={`${textSpanStyles} horizontal-text`}>AI-based systems</span>
            <span className={`${spanStyles} horizontal-line`} />
            <span className={`${textSpanStyles} horizontal-text`}>Data Structure</span>
            <span className={`${spanStyles} horizontal-line`} />
            <span className={`${textSpanStyles} horizontal-text`}>software building</span>
          </div>
          
          {/*//* Vertical and deep learning line */}
          <div 
            ref={verticalContainer}
            className='flex-center flex-col gap-5 border border-t-[0px] border-[var(--border)] rounded-b-lg p-3 w-fit transition-colors duration-700'
            style={{'--border': 'rgba(255, 255, 255, 0.2)', '--text': 'rgb(255, 255, 255)', '--orange': '#ff6b35'}}
          >
            <span className={`${VspanStyles} vertical-line`} />
            <span className={`${VtextSpanStyles} vertical-text`}>Frontend</span>
            <span className={`${VspanStyles} vertical-line`} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default SmartLearning