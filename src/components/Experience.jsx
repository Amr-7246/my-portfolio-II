import React from "react";
import "react-vertical-timeline-component/style.min.css";
import { VerticalTimeline , VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { experiences } from "../Data/ProjectsData";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { FiExternalLink } from "react-icons/fi";
import content from '../AppContent.json';

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
                  <h3 key={index} className = " md:text-[15px] text-[10px] !bg-[var(--purple)]/20 backdrop-blur-md p-1 rounded-lg items-center text-center justify-center flex-center md:w-[150px] w-[100px] font-bold cursor-pointer hover:!text-[var(--orange)] flex hover:underline"
                      onClick={() => openWeb(item.link)}
                      >
                        {item.title}<span className=" m-2 text-center " ><FiExternalLink/></span>
                  </h3>
                ))}
              </div>
              :
              <div className="justify-center flex flex-wrap mt-[20%] gap-2 ">
                <h3 className = "!bg-[var(--border)]/20 border-[1px] !border-[var(--border)] py-2 px-5 rounded-lg items-center w-fit backdrop-blur-lg md:text-[19px] text-[15px] text-center justify-center flex-center  font-bold cursor-pointer hover:!text-[var(--orange)] flex hover:underline"
                    onClick={() => openWeb(experience.link)}
                    >
                      {experience.title}<span className=" m-2 text-center " ><FiExternalLink/></span>
                </h3>
              </div>

            }
            <dev className=" rounded-t-sm pb-2 px-3 list-disc mx-auto w-full h-fit backdrop-blur-md !bg-[var(--black)]/50 space-y-2">
              {experience.points.map((point, index) => (
                <p
                  key={`experience-point-${index}`}
                  className=" !font-black text-[14px] text-center tracking-wider !text-[var(--text)] "
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
  const { intro, subtitle, description,devMessage, button, buttonLink } = content.Experince;
  return (
    <>
      {/* ############# Animated Intro Section */}
      <div className=" w-full grid grid-cols-2 grid-rows-[auto] items-center justify-between gap-10 md:gap-0 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className=" !text-transparent !bg-clip-text !bg-gradient-to-tr from-[var(--orange)] via-[var(--via)]  to-[var(--to)] text-center text-3xl md:text-5xl  col-span-2 row-span-1 font-bold mb-[70px] "
        >
          {subtitle}
        </motion.h2>
        {/* Left: Text */}
          <div className=" col-span-2 lg:col-span-1 row-span-1 flex-1 flex flex-col items-start justify-center px-4 md:px-12">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
              className="text-lg md:text-2xl font-medium text-left mb-4 !text-[var(--text)]"
            >
              {intro}
            </motion.p>
            {/* <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut', delay: 0.4 }}
              className="text-base md:text-lg text-left mb-8 !text-[var(--text)]/80"
            >
              {description}
            </motion.p> */}
            <div className="flex flex-col xl:flex-row w-full gap-4 flex-center border-t mt-[40px] py-4 border-[var(--orange)] ">
              <p>{devMessage}</p>
              <motion.a
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
                className="btn text-sm font-bold shadow-lg hover:shadow-[var(--shadow)]"
              >
                {button}
              </motion.a>
            </div>
          </div>
        {/* Right: SVG */}
          <div className=" col-span-2 lg:col-span-1  row-span-1 flex-1 lg:flex items-center justify-center px-4 md:px-0">
            <motion.img
              src="/assets/SVG/Software code testing-amico.svg"
              alt="Experience Preview"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              className=" w-full max-w-[500px] mx-auto h-auto drop-shadow-xl"
              loading="lazy"
            />
          </div>
      </div>
      {/* ############# text */}
      <div id="work">
        <h2 className={`${styles.sectionHeadText} w-fit mx-auto !text-transparent !bg-clip-text !bg-gradient-to-r from-[var(--from)] via-[var(--via)]  to-[var(--to)] text-center`}>Work Experience</h2>
      </div>
      {/* ############# */}
      {/* ############# Projects itself */}
      <div className="mt-20 max-w-[500px] lg:max-w-[2000px] mx-auto flex flex-col ">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard  key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
      {/* ############# */}
    </>
  );
};

export default SectionWrapper(Experience, "work");
