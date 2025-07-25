import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { SectionWrapper } from '../../hoc';
import { fadeIn, textVariant } from '../../utils/motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { OverviewCard } from '..';
import { useGlobalContext } from '../../utils/GlobalContext';

import { services as arData } from '../../Data/ar/Techs';
import { services as enData } from '../../Data/en/Techs';
import { AboutDataForCompany as arAboutDataForCompany , AboutDataForClient as arAboutDataForClient } from '../../Data/ar/AboutData';
import { AboutDataForCompany as enAboutDataForCompany , AboutDataForClient as enAboutDataForClient } from '../../Data/en/AboutData';
import Button from "../Balls_Button/Balls_Button"
import ChangeLang from '../ChangeLang';

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    {/* <motion.div variants={fadeIn('top', 'spring', index * 0.5, 0.75)} className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card" > */}
    <div className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card" >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="!bg-[var(--black)] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img src={icon} alt="web-development" className="w-16 h-16 object-contain" loading="lazy" />
        <h3 className="!text-[var(--text)] text-[20px] font-bold text-center">{title}</h3>
      </div>
    </div>
  </Tilt>
);

const About = () => {

  const { WhichLang } = useGlobalContext()
  const [WhoAreThere, setWhoAreThere] = useState('client');
  const [openTab, setOpenTab] = useState(null);
  const dir = WhichLang === 'en' ? 'ltr' : 'rtl';

  //& For Ar/En lang
    const services = WhichLang == 'en' ? enData : arData
    const AboutDataForCompany = WhichLang == 'en' ? enAboutDataForCompany : arAboutDataForCompany
    const AboutDataForClient = WhichLang == 'en' ? enAboutDataForClient : arAboutDataForClient

  //~ Select data source
  const aboutData = WhoAreThere === 'company' ? AboutDataForCompany : WhoAreThere === 'client' ? AboutDataForClient : [];

  // Tab click handler
  const handleTabClick = idx => {
    setOpenTab(openTab === idx ? null : idx);
  };

  return (
    <>
      <motion.div className='mb-10 flex flex-col gap-[40px]' id='about'>
        <h2 className={`font-bold text-[50px] text-transparent bg-clip-text w-fit bg-gradient-to-r from-[var(--from)] via-[var(--via)]  to-[var(--to)]`}>Overview</h2>
        <div>
          <OverviewCard/>
        </div>

      </motion.div>
      <div className="mt-20 flex flex-wrap justify-center gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

const WrappedAbout = SectionWrapper(About, 'about');

export default WrappedAbout;


        // <div dir={dir}>
        //   {/* Select Buttons Controller */}
        //     <div className='flex flex-row justify-between gap-4'>
        //       <Button white
        //         className={` w-full hover:text-amber-300 ${WhoAreThere === 'company' ? 'text-amber-300' : ''}`}
        //         onClick={() => setWhoAreThere(WhoAreThere === 'company' ? '' : 'company')}>
        //           For company
        //       </Button>
        //       <Button white
        //         className={` w-full hover:text-amber-300 ${WhoAreThere === 'client' ? ' text-amber-300' : ''}`}
        //         onClick={() => setWhoAreThere(WhoAreThere === 'client' ? '' : 'client')}>
        //           For client
        //       </Button>
        //       {/* <button className={`btn w-full ${WhoAreThere === 'company' ? 'bg-transparent border-[var(--orange)] text-[var(--orange)]' : ''}`}  onClick={() => setWhoAreThere(WhoAreThere === 'company' ? '' : 'company')} >For company</button>
        //       <button className={`btn w-full ${WhoAreThere === 'client' ? 'bg-transparent border-[var(--orange)] text-[var(--orange)]' : '' }`} onClick={() => setWhoAreThere(WhoAreThere === 'client' ? '' : 'client')} >For client</button> */}
        //     </div>
        //   {/* Tabs Section */}
        //     {WhoAreThere ? (
        //       <div className="w-full mx-auto mt-8 rounded-lg overflow-hidden backdrop-blur-lg">
        //         {aboutData.map((item, idx) => (
        //           <div key={idx}>
        //             <div className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-all duration-300 select-none ${openTab === idx ? 'bg-gradient-to-r from-[var(--orange)]/20 to-[var(--border)]/20 !text-[var(--orange)] shadow-inner ' : 'hover:bg-[var(--border)]/10 !text-[var(--text)]'} font-bold text-lg`} onClick={() => handleTabClick(idx)} >
        //               <span className=' tracking-widest text-transparent bg-gradient-to-r from-[var(--from)] via-[var(--via)] to-[var(--to)] bg-clip-text '>{item.title}</span>
        //               <span className="ml-2 text-xl transition-transform duration-300">
        //                 {openTab === idx ? <FaChevronUp /> : <FaChevronDown />}
        //               </span>
        //             </div>
        //             <motion.div
        //               initial={false}
        //               animate={{ height: openTab === idx ? 'auto' : 0, opacity: openTab === idx ? 1 : 1 }}
        //               transition={{ duration: 0.5, ease: [0.6, 0.05, 0.28, 0.99] }}
        //               style={{ overflow: 'hidden' }}
        //             >
        //               {openTab === idx && (
        //                 <div className=" relative px-8 py-6 ">
        //                   <ChangeLang/>
        //                   <p className=" pt-5 font-rubikDistressed text-transparent bg-gradient-to-r from-[var(--text)] via-[var(--from)] to-[var(--text)] bg-clip-text mb-3">{item.UperContent}</p>
        //                   <p className=" font-joti text-transparent bg-gradient-to-r from-[var(--from)] via-[var(--orange)] to-[var(--from)] bg-clip-text font-bold mb-3">{item.HighlitedContent}</p>
        //                   <p className=" font-frijole text-transparent bg-[var(--text)]/60 bg-clip-text ">{item.DownContent}</p>
        //                 </div>
        //               )}
        //             </motion.div>
        //             {/* Gradient line separator */}
        //             {idx < aboutData.length - 1 && (
        //               <div className="h-[2px] w-full bg-gradient-to-r from-[var(--orange)]/0 via-[var(--orange)]/60 to-[var(--orange)]/0 my-1" />
        //             )}
        //           </div>
        //         ))}
        //       </div>
        //     ) : (
        //       <div>
        //         <motion.p variants={fadeIn('', '', 0.1, 1)} className="md:my-[50px] lg:my-[100px] my-[20px] text-center mx-auto w-fit font-bold !text-[var(--text)]/50 text-[17px] max-w-3xl leading-[30px]">
        //           You can Select What you are looking For
        //         </motion.p>
        //       </div>
        //     )}
        // </div>
