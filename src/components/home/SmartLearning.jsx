import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import { FaLightbulb, FaLaptopCode, FaRocket, FaDatabase, FaBrain, FaCloud } from 'react-icons/fa';
import { MdExplore, MdSecurity } from 'react-icons/md';

gsap.registerPlugin(ScrollTrigger);

const SmartLearning = () => {
  const container = useRef();
  const horizMask = useRef();
  const vertMask = useRef();
  const iconRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main reveal animation
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out', duration: 2 },
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
          end: 'bottom top',
          markers: true,
          toggleActions: 'restart none none reset',
        },
      });

      tl.fromTo(
        horizMask.current,
        { clipPath: 'inset(0 50% 0 50%)' },
        { clipPath: 'inset(0 0% 0 0%)' }
      ).fromTo(
        vertMask.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)' }
      );

      // ICON floating animation
      iconRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: gsap.utils.random(20, 50), scale: 0.8 },
          {
            opacity: 1,
            y: `-=${gsap.utils.random(30, 60)}`,
            scale: 1,
            duration: gsap.utils.random(2.5, 4),
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: container.current,
              start: 'top 90%',
              end: 'bottom top',
              toggleActions: 'play pause resume reset',
            },
          }
        );
      });

      // TEXT floating animation
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: gsap.utils.random(20, 50), scale: 0.9 },
          {
            opacity: 1,
            y: `-=${gsap.utils.random(25, 55)}`,
            scale: 1,
            duration: gsap.utils.random(2.5, 4),
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: i * 0.3,
            scrollTrigger: {
              trigger: container.current,
              start: 'top 90%',
              end: 'bottom 85%',
              toggleActions: 'play pause resume reset',
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Bigger set of floating icons
  const icons = [
    <FaLightbulb />, <MdExplore />, <FaLaptopCode />, <FaRocket />,
    <FaDatabase />, <FaBrain />, <FaCloud />, <MdSecurity />
  ];

  // Bigger set of floating texts
  const texts = [
    'Always Learning', 'Discover New Tech', 'Build & Code', 'Innovate Faster', 'Secure by Design'
  ];

  return (
    <div ref={container} className="flex-center flex-row gap-[100px] w-full relative overflow-hidden">

      {/* Icons */}
      {icons.map((icon, i) => (
        <div
          key={`icon-${i}`}
          ref={(el) => (iconRefs.current[i] = el)}
          className="absolute text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] opacity-0"
          style={{
            top: `${gsap.utils.random(10, 80)}%`,
            left: `${gsap.utils.random(5, 90)}%`,
            fontSize: '1.8rem',
            zIndex: 0,
          }}
        >
          {icon}
        </div>
      ))}

      {/* Text phrases */}
      {texts.map((txt, i) => (
        <div
          key={`text-${i}`}
          ref={(el) => (textRefs.current[i] = el)}
          className="absolute text-white text-sm drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] opacity-0"
          style={{
            top: `${gsap.utils.random(15, 85)}%`,
            left: `${gsap.utils.random(5, 90)}%`,
            zIndex: 0,
          }}
        >
          {txt}
        </div>
      ))}

      {/* Main Drawing Section */}
      <div className="flex-center flex-col relative z-10">
        {/* Horizontal reveal */}
        <div
          ref={horizMask}
          className="relative clip-path-container"
          style={{ clipPath: 'inset(0 50% 0 50%)' }}
        >
          <div className=" border-y border-white flex-center flex-row gap-5 p-3 h-[80px]">
            <span className="bg-orange-500 bg-clip-text text-transparent text-[16px]">Backend</span>
            <span className="w-[10vw] h-[2px] bg-white" />
            <span className="bg-orange-500 bg-clip-text text-transparent text-[16px]">AI-based systems</span>
            <span className="w-[10vw] h-[2px] bg-white" />
            <span className="bg-orange-500 bg-clip-text text-transparent text-[16px]">Data Structure</span>
            <span className="w-[10vw] h-[2px] bg-white" />
            <span className="bg-orange-500 bg-clip-text text-transparent text-[16px]">Software building</span>
          </div>
        </div>

        {/* Vertical reveal */}
        <div
          ref={vertMask}
          className="relative clip-path-container mt-[-1px]"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          <div className="flex-center flex-col gap-5 border border-y-0 border-white p-3 w-fit">
            <span className="w-[2px] h-[100px] bg-white" />
            <span className="text-orange-500">Frontend</span>
            <span className="w-[2px] h-[100px] bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartLearning;
