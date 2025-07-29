import React , {useEffect, useState} from "react";
import "react-vertical-timeline-component/style.min.css";
import { VerticalTimeline , VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { styles } from "../../styles.js";
import { experiences as arExperiences } from "../../Data/ar/ProjectsData.js";
import { experiences as enExperiences } from "../../Data/en/ProjectsData.js";
import { SectionWrapper } from "../../hoc/index.js";
import { textVariant } from "../../utils/motion.js";
import { FiExternalLink } from "react-icons/fi";
import { useGlobalContext } from '../../utils/GlobalContext.tsx';
import arContent from '../../Data/ar/AppContent.json';
import enContent from '../../Data/en/AppContent.json';
import ChangeLang from "../ChangeLang.tsx";
import ProjectsCategories from "./ProjectsCategories.jsx";
import CanvasLoader from "../Loader.jsx";
import SaturnLoader from "../SaturnLoader.jsx";
import Topper from '../Topper';

// ~ ########### Start Experience Card
  const ExperienceCard = ({ experience }) => {
    const openWeb = (link) => {
      if (link) {
        window.open(link, "_blank");
      } else {
        console.log("No link provided");
      }
    };
    return (
    <VerticalTimelineElement
      contentStyle={{
        backgroundImage: `url(${experience.bgPhoto})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "var(--text)",
        backgroundColor: "var(--black)",
        padding:'0px',
      }}
        contentArrowStyle={{ borderRight: "7px solid var(--border)" }}
        dateClassName="absolute opacity-[0]"
        iconStyle={{ background: experience.iconBg || "var(--black)" }}
        icon={
          <div className="flex justify-center items-center w-full h-full">
            <img
              src={experience.icon}
              alt={experience.company_name}
              onClick={() => openWeb(experience.link)}
              className="w-[60%] h-[60%] object-contain cursor-pointer  hover:scale-[1.2] transition-transform duration-300 hover:rotate-[20deg]"
            />
          </div>
        }
      >
        {/* ############# Card Content */}
          <div className="  flex flex-col md:h-[350px] h-[290px] justify-between !text-[var(--text)] ">
            { experience.IsCollection ?
              <div className=" justify-center flex flex-wrap mt-[10%] gap-2 ">
                {experience.CollectionDeets.map((item , index) => (
                  <h3 key={index} className = " md:text-[15px] text-[10px] !bg-[var(--purple)] backdrop-blur-md p-1 rounded-lg items-center text-center justify-center flex-center md:w-[150px] w-[100px] font-bold cursor-pointer hover:!text-[var(--orange)] flex hover:underline"
                      onClick={() => openWeb(item.link)}
                      >
                        {item.title}<span className=" m-2 text-center " ><FiExternalLink/></span>
                  </h3>
                ))}
              </div>
              :
              <div className="justify-center flex flex-wrap mt-[20%] gap-2 ">
                <h3 className = "!bg-black py-2 px-5 rounded-lg items-center w-fit backdrop-blur-lg md:text-[19px] text-[15px] text-center justify-center flex-center  font-bold cursor-pointer hover:!text-[var(--orange)] flex hover:underline"
                    onClick={() => openWeb(experience.link)}
                    >
                      {experience.title}<span className=" m-2 text-center " ><FiExternalLink/></span>
                </h3>
              </div>

            }
            <dev className=" pb-2 px-3 list-disc mx-auto w-full h-fit backdrop-blur-lg !bg-black/80 space-y-2">
              {experience.points.map((point, index) => (
                <p
                  key={`experience-point-${index}`}
                  className=" !font-black text-[14px] text-center tracking-wider !text-[var(--orange)] "
                >
                  {point}
                </p>
              ))}
            </dev>
          </div>
        {/* ############# Card Content */}
    </VerticalTimelineElement>
    )
  };
// ~ ########### End Experience Card
const Experience = () => {
  const {WhichLang} = useGlobalContext();
  const [IsLoading , setIsLoading] = useState(false);
  const [WhichCate, setWhichCate] = useState('All')
  const { intro, subtitle, title ,devMessage, button, buttonLink } =  WhichLang === 'en' ? enContent.Experince : arContent.Experince;
  const experiences = WhichLang === "en" ? enExperiences : arExperiences
  const dir = WhichLang === "en" ? "ltr" : "rtl";

  //& start Select category
    useEffect(() => {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    }, [WhichCate])

    const animationProjects = experiences.animationProjects
    const fullstackProjects = experiences.fullstackProjects
    const frontendProjects = experiences.frontendProjects
    const botsProjects = experiences.botsProjects
    const AiProjects = experiences.aiProjects

    const selectedCate = WhichCate === 'AI' ? AiProjects :
      WhichCate === 'Animations' ? animationProjects :
      WhichCate === 'Full stack' ? fullstackProjects :
      WhichCate === 'Front End' ? frontendProjects :
      WhichCate === 'Bots' ? botsProjects :
      experiences.allProjects;
  //& end Select category

  return (
    <>
      <ProjectsCategories WhichCate={WhichCate} setWhichCate={setWhichCate} />
      { IsLoading ? <SaturnLoader/> : (
      <div id='projects' className="mt-20 max-w-[500px] lg:max-w-[2000px] mx-auto flex flex-col gap-10">
        <Topper text= { {left : 'My Work' , right : 'Develop Your Dream App Now'} } className={''} />
        <VerticalTimeline>
          {selectedCate.map((experience, index) => (
            <ExperienceCard  key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>

      )}
    </>
  );
};

export default SectionWrapper(Experience, "work");

      // {/* ############# Animated Intro Section */}
      // <div className=" w-full grid grid-cols-2 grid-rows-[auto] items-center justify-between gap-10 md:gap-0 mb-16">
      //   <motion.h2
      //     initial={{ opacity: 0, y: 40 }}
      //     animate={{ opacity: 1, y: 0 }}
      //     transition={{ duration: 0.7, ease: 'easeOut' }}
      //     className=" !text-transparent !bg-clip-text !bg-gradient-to-tr from-[var(--orange)] via-[var(--via)]  to-[var(--to)] text-center text-3xl md:text-5xl  col-span-2 row-span-1 font-bold mb-[70px] "
      //   >
      //     {subtitle}
      //   </motion.h2>
      //   {/* Left: Text */}
      //     <div className=" relative col-span-2 lg:col-span-1 row-span-1 flex-1 flex flex-col items-start justify-center px-4 md:px-12">
      //       <div className="mb-6">
      //         <ChangeLang/>
      //       </div>
      //       <motion.p
      //         initial={{ opacity: 0, y: 40 }}
      //         animate={{ opacity: 1, y: 0 }}
      //         transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
      //         className="text-lg md:text-2xl font-medium mb-4 !text-[var(--text)]"
      //       >
      //         {intro}
      //       </motion.p>
      //       <div dir={dir} className="flex flex-col xl:flex-row w-full gap-4 flex-center border-t mt-[40px] py-4 border-[var(--orange)] ">
      //         <p>{devMessage}</p>
      //         <motion.a
      //           href={buttonLink}
      //           target="_blank"
      //           rel="noopener noreferrer"
      //           initial={{ opacity: 0, y: 40 }}
      //           animate={{ opacity: 1, y: 0 }}
      //           transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
      //           className="btn text-sm font-bold shadow-lg hover:shadow-[var(--shadow)]"
      //         >
      //           {button}
      //         </motion.a>
      //       </div>
      //     </div>
      //   {/* Right: SVG */}
      //     <div className=" col-span-2 lg:col-span-1  row-span-1 flex-1 lg:flex items-center justify-center px-4 md:px-0">
      //       <motion.img
      //         src="/assets/SVG/Software code testing-amico.svg"
      //         alt="Experience Preview"
      //         initial={{ opacity: 0, y: 40 }}
      //         animate={{ opacity: 1, y: 0 }}
      //         transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      //         className=" w-full max-w-[500px] mx-auto h-auto drop-shadow-xl"
      //         loading="lazy"
      //       />
      //     </div>
      // </div>
      // {/* ############# text */}
      // <div id="work">
      //   <h2 className={`${styles.sectionHeadText} w-fit mx-auto !text-transparent !bg-clip-text !bg-gradient-to-r from-[var(--from)] via-[var(--via)]  to-[var(--to)] text-center`}>{title}</h2>
      // </div>
      // {/* ############# */}
