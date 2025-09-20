import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { Amr,comingSoonImg, programmer, mern2, mern2_green } from '../../assets';
import { useEffect, useRef, useState } from 'react';
import { changeLang } from '../../utils/lang.js'
import { useGlobalContext } from '../../utils/GlobalContext.tsx';
import arContent from '../../Data/ar/AppContent.json';
import enContent from '../../Data/en/AppContent.json';
import ChangeLang from '../ChangeLang.tsx';
import Topper from '../Topper.jsx';
import TextAnimator from '../../../components/TextAnimator.jsx';
import SmartLearning from './SmartLearning.jsx';
import InfinityScrolling from './InfinityScrolling.jsx';
import { IconicBtn } from '../../../components/Buttons.tsx';

export const OverviewCard = () => {
  //~ Start Hooks & Data ########################
    const {setWhichLang, WhichLang} = useGlobalContext()
    const textContent = enContent
    const { fastPref,experience ,comingSoon, button, expirence, ProjectsCount } = WhichLang == "en" ? enContent.about.OverveiwCard :  arContent.about.OverveiwCard
    const controls = useAnimation();
    const ref = useRef(null);
    const comingSoonRef = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const comingSoonView = useInView(comingSoonRef, { once: true, margin: '-100px' });
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
    <div className="flex-center flex-col gap-[150px] py-8 px-4" style={{ color: 'var(--text)', background: 'var(--main)' }}>

      <Topper text= { {left : 'about me' , right : 'Amr Ehab - Software developer'} } className={''} />
      {/*//& fast pref Section */}
        <div className='gap-[60px] flex-col lg:flex-row-reverse flex-center lg:!items-start '>

          <div>
            <motion.img src={Amr} alt="Amr" className="rounded-full w-[250px] h-[250px] lg:w-[400px] lg:h-[500px] lg:rounded-md shadow-lg shadow-[var(--shadow)] mb-6" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ objectFit: 'cover' }} ref={ref} />
          </div>

          <div  className='flex flex-col gap-6 w-[60%]'>
            <motion.div dir={dir}  className=" !text-[15px] relative flex flex-col gap-5 border-b border-stone-700/50 pb-8 text-lg md:text-xl font-medium w-full mb-6" initial={{ opacity: 0, y: 40 }} animate={controls} style={{ wordSpacing: " 5px " , color: 'var(--text)' }} >
              <ChangeLang/>
              <h2 className='text-[25px] text-[var(--green)] flex justify-start'>My Name is Amr Ehab,</h2>
              <p className=''>
                I`m a <span className='text-white font-frijole'> fullstack software Developer</span> with practical, end-to-end experience crafting scalable, high-performance, and visually dynamic <span className='text-[var(--orange)] font-frijole'> web/moblie applications </span> from clean, <span className='text-[var(--orange)] font-frijole'>animated UIs </span>to backend logics and DB operations . . . . .
                <span className=''> While I operate as a full-stack freelancer, I've intentionally chosen to <span className='text-[var(--green)] font-frijole'>specialize in Frontend Engineering </span>not just coding interfaces, but engineering immersive, interactive, performance-driven, accessible experiences powered by tools like
                  <span className='text-white font-ribeye'> React.js, Next.js, </span>
                  <span className='text-[var(--orange)] font-ribeye'>GSAP, Framer Motion, </span>
                  <span className='text-[var(--green)] font-ribeye'>and TypeScript. . . .</span>
                </span>
              </p>
              {/* <TextAnimator text={fastPref} className={''} animation={'chuncks'} /> */}
            </motion.div>
            <div className='flex flex-col lg:flex-row gap-x-8 gap-y-4 border-b border-stone-700/50 pb-8 items-center justify-center'>
              <motion.div className="  flex flex-row gap-8 justify-center items-center mb-6" initial={{ opacity: 0, y: 40 }} animate={controls} >
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold orange-text-gradient" style={{ color: 'var(--orange)' }}>{expNum}+</span>
                  <span className="text-base mt-1" style={{ color: 'var(--text)' }}>Years Exp.</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold orange-text-gradient" style={{ color: 'var(--orange)' }}>{projNum}+</span>
                  <span className="text-base mt-1" style={{ color: 'var(--text)' }}>Projects</span>
                </div>
              </motion.div>
              <motion.a href="/contact" className="pb-3"  initial={{ opacity: 0, y: 40 }} animate={controls} whileHover={{ scale: 0.99 }} whileTap={{ scale: 0.97 }} >
                <IconicBtn text={button} icon={<FaArrowRight />} iconStyle={" text-orange-500 "} buttonColors={"bg-stone-300/10 shadow-lg shadow-stone-500/10 btn backdrop-blur-6xl text-orange-500 px-8 "} />
              </motion.a>
            </div>
          </div>

        </div>

      {/*//& Mindset Section */}
        <div className='flex flex-col gap-[50px] ' >

          {/*//& Freelancer mindset */}
            <div className='' >

              <h2 className='text-white text-[50px] text-center mb-10 '>
                It Is Super Cretical To Be Aware With
                <span className=' !text-[var(--green)] ml-1 '>Your Freelancer Mindset</span>
              </h2>

              {/*//~ timeLine Element */}
                <div className='flex flex-col gap-[100px] py-5'  >
                  <div className=' flex flex-row gap-10'>

                    <div className='flex justify-start gap-10 ' >

                      <div className='relative p-3 w-[20%]  ' >
                        <span className='text-amber-200 text-[16px] flex flex-nowrap '>Business First.</span>
                        <span className=' absolute -top-[100%] right-[0%] h-[622px] w-[3px] bg-gradient-to-b from-transparent to-transparent via-[var(--orange)] ' />
                        <span className=' absolute top-[10px] -right-[8%] h-[30px] w-[30px] rounded-full bg-[var(--orange)] ' />
                      </div>

                      <TextAnimator text={textContent.about.mindset.businessFirst} className={''} animation={'chuncks'} />

                    </div>
                  </div>

                  <div className=' flex flex-row gap-10'>

                    <div className='flex justify-start gap-10 ' >

                      <div className='relative p-3 w-[20%]  ' >
                        <span className='text-white text-[16px] flex flex-nowrap '>Security && Performance are matter</span>
                        <span className=' absolute top-[10px] -right-[8%] h-[30px] w-[30px] rounded-full bg-[var(--orange)] ' />
                      </div>

                      <TextAnimator text={textContent.about.mindset.performanceFirst} className={'!text-amber-200'} animation={'chuncks'} />
                    </div>
                  </div>
                </div>

            </div>

          {/*//& Companies Emploee mindset */}
              <div className='flex-center flex-col lg:flex-row-reverse gap-[50px] ' >

                <div className=' w-[40%]'>
                  <motion.img src={mern2_green} alt="Amr" className="w-fit" initial={{ opacity: 0, y: 40 }} animate={comingSoonView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ objectFit: 'cover' }} ref={comingSoonRef} />
                </div>

                <h2 className='text-white text-[45px] text-center mb-10 '>
                  And As For The
                  <span className=' !text-[var(--green)] ml-1 '>Employee Mindset</span>
                </h2>

              </div>

            {/*//~ timeLine Element */}
              <div className='flex flex-col gap-[100px] py-5'  >
                <div className=' flex flex-row gap-10'>

                  <div className='flex justify-start gap-10 ' >

                    <div className='relative p-3 w-[20%]  ' >
                      <span className='text-amber-200 text-[16px] flex flex-nowrap '>Bird Eye perspective.</span>
                      <span className=' absolute -top-[133%] right-[0%] h-[750px] w-[3px] bg-gradient-to-b from-transparent to-transparent via-[var(--orange)]  ' />
                      <span className=' absolute top-[10px] -right-[8%] h-[30px] w-[30px] rounded-full bg-[var(--orange)]  ' />
                    </div>

                    <TextAnimator text={textContent.about.mindset.birdEye} className={''} animation={'chuncks'} />
                  </div>
                </div>

                <div className=' flex flex-row gap-10'>

                  <div className='flex justify-start gap-10 ' >

                    <div className='relative p-3 w-[20%]  ' >
                      <span className='text-white text-[16px] flex flex-nowrap '>Specialization.</span>
                      <span className=' absolute top-[10px] -right-[8%] h-[30px] w-[30px] rounded-full bg-[var(--orange)] ' />
                    </div>

                    <TextAnimator text={textContent.about.mindset.specialization} className={'!text-amber-200'} animation={'chuncks'} />
                  </div>
                </div>
              </div>

        </div>

        {/* <InfinityScrolling /> */}

      {/*//& comming soon Section */}
        <div className='flex-center flex-col lg:flex-row-reverse gap-[50px] ' >
          <div className=' w-[50%]'>
            <motion.img src={mern2} alt="Amr" className="w-fit" initial={{ opacity: 0, y: 40 }} animate={comingSoonView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ objectFit: 'cover' }} ref={comingSoonRef} />
          </div>
          <TextAnimator text={comingSoon} className={''} animation={'chuncks'} />
        </div>
      {/*//& Smart Learning section*/}
        <SmartLearning />
    </div>
  );
}
