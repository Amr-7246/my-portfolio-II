import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { Amr } from '../../assets';
import { useEffect, useRef, useState } from 'react';
import { changeLang } from '../../utils/lang.js'
import { useGlobalContext } from '../../utils/GlobalContext.tsx';
import arContent from '../../Data/ar/AppContent.json';
import enContent from '../../Data/en/AppContent.json';
import ChangeLang from '../ChangeLang.tsx';
import Topper from '../Topper.jsx';

export const OverviewCard = () => {
  //~ Start Hooks & Data ########################
    const {setWhichLang, WhichLang} = useGlobalContext()
    const { fastPref, button, expirence, ProjectsCount } = WhichLang == "en" ? enContent.about.OverveiwCard :  arContent.about.OverveiwCard
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const dir = WhichLang == "en" ? "ltr" : "rtl"

    //& Number animation
      const [expNum, setExpNum] = useState(0);
      const [projNum, setProjNum] = useState(0);

  //~ end Hooks & Data ########################
  //~ Start logic ########################

    //& Animation function
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

    //& For multi lang
    const HandleLangChange = () => {
      const Lang = changeLang()
      setWhichLang(Lang)
    }
  //~ end logic ########################
  return (
    <div className="flex-center flex-col gap-[60px] py-8 px-4" style={{ color: 'var(--text)', background: 'var(--main)' }}>

      <Topper text= { {left : 'about me' , right : 'Amr Ehab - Software developer'} } className={''} />

      <div className='gap-[60px] flex-col lg:flex-row-reverse flex-center '>
        <div>
          <motion.img src={Amr} alt="Amr" className="rounded-full w-[250px] h-[250px] lg:w-[400px] lg:h-[500px] lg:rounded-md shadow-lg shadow-[var(--shadow)] mb-6" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ objectFit: 'cover' }} ref={ref} />
        </div>
        <div  className='flex flex-col gap-10'>
          <motion.div dir={dir}  className=" relative flex flex-col gap-5 border-b border-dashed border-[var(--orange)] pb-10 text-center text-lg md:text-xl font-medium max-w-xl mb-6" initial={{ opacity: 0, y: 40 }} animate={controls} style={{ wordSpacing: " 5px " , color: 'var(--text)' }} >
            <ChangeLang/>
            {fastPref}
          </motion.div>
          <div className='flex flex-col lg:flex-row gap-x-8 gap-y-4 border-b border-dashed border-[var(--orange)] pb-10 items-center justify-center'>
            <motion.div className="flex flex-row gap-8 justify-center items-center mb-6" initial={{ opacity: 0, y: 40 }} animate={controls} >
              {/* <div className="flex flex-col items-center">
                <span className="text-4xl font-bold orange-text-gradient" style={{ color: 'var(--orange)' }}>{expNum}+</span>
                <span className="text-base mt-1" style={{ color: 'var(--text)' }}>Years Exp.</span>
              </div> */}
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold orange-text-gradient" style={{ color: 'var(--orange)' }}>{projNum}+</span>
                <span className="text-base mt-1" style={{ color: 'var(--text)' }}>Projects</span>
              </div>
            </motion.div>
            <motion.a href="/contact" className="mb-6 btn flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-lg"  initial={{ opacity: 0, y: 40 }} animate={controls} whileHover={{ scale: 0.99 }} whileTap={{ scale: 0.97 }} >
              {button} <FaArrowRight />
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
