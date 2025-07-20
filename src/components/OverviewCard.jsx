import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { Amr } from '../assets';
import content from '../AppContent.json';
import { useEffect, useRef, useState } from 'react';

export const OverviewCard = () => {
  const { fastPref, button, expirence, ProjectsCount } = content.about.OverveiwCard;
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Number animation
  const [expNum, setExpNum] = useState(0);
  const [projNum, setProjNum] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } });
      // Animate numbers
      let start = null;
      const duration = 1200; // ms
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setExpNum(Math.floor(progress * expirence));
        setProjNum(Math.floor(progress * ProjectsCount));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setExpNum(expirence);
          setProjNum(ProjectsCount);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, controls, expirence, ProjectsCount]);

  return (
    <div className="flex flex-col lg:flex-row gap-[60px] items-center justify-center py-8 px-4" style={{ color: 'var(--text)', background: 'var(--main)' }}>
      <div>
        <motion.img src={Amr} alt="Amr" className="rounded-full w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] lg:rounded-md shadow-lg shadow-[var(--shadow)] mb-6" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ objectFit: 'cover', border: '1px solid var(--orange)' }} ref={ref} />
      </div>
      <div className='flex flex-col gap-10'>
        <motion.div className=" border-b border-dashed border-[var(--orange)] pb-10 text-center text-lg md:text-xl font-medium max-w-xl mb-6" initial={{ opacity: 0, y: 40 }} animate={controls} style={{ color: 'var(--text)' }} >
          {fastPref}
        </motion.div>
        <div className='flex flex-col lg:flex-row gap-x-8 gap-y-4 border-b border-dashed border-[var(--orange)] pb-10 items-center justify-center'>
          <motion.div className="flex flex-row gap-8 justify-center items-center mb-6" initial={{ opacity: 0, y: 40 }} animate={controls} >
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold orange-text-gradient" style={{ color: 'var(--orange)' }}>{expNum}+</span>
              <span className="text-base mt-1" style={{ color: 'var(--text)' }}>Years Exp.</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold orange-text-gradient" style={{ color: 'var(--orange)' }}>{projNum}+</span>
              <span className="text-base mt-1" style={{ color: 'var(--text)' }}>Projects</span>
            </div>
          </motion.div>
          <motion.a href="/experines" className="mb-6 btn flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-lg"  initial={{ opacity: 0, y: 40 }} animate={controls} whileHover={{ scale: 0.99 }} whileTap={{ scale: 0.97 }} >
            {button} <FaArrowRight />
          </motion.a>
        </div>
      </div>
    </div>
  );
}
