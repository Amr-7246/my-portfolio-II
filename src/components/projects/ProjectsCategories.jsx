import CateCard from "./CateCard"
import { motion } from "framer-motion";

const ProjectsCategories = ({ WhichCate, setWhichCate }) => {
  const allCate = ['All', 'Animations' , 'AI' , 'Front End' , "Full stack", "Bots"]
  return (
    <div className=' w-full flex flex-col items-center border-b border-[var(--border)]'>
      {/* start Top Animated Cards */}
        <div className="pb-10  text-center">
          <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className=" !text-transparent !bg-clip-text !bg-gradient-to-tr from-[var(--orange)] via-[var(--via)]  to-[var(--to)] text-center text-3xl md:text-5xl  col-span-2 row-span-1 font-bold mb-[20px] "
          >
            My Projects
          </motion.h2>
          <p>it absolutly crazy to look back at howmy portfolio have over time! From simple designs to professonal, visual stunning projects, eachilteration reflects a leap in skills and creativity.</p>
        </div>
        <div className='relative w-full min-h-[50vh] lg:h-[60vh] border-b border-[var(--border)]'>
          <CateCard setWhichCate={setWhichCate} img={'/bg_2/photo_37_2025-07-27_07-50-15.jpg'} iAmHere={'AI'} className={`aiFullstack z-0 top-1/2 left-[25%] -rotate-12  `} text={'AI fullstack'} />
          <CateCard setWhichCate={setWhichCate} img={'/bg_2/photo_16_2025-07-27_07-50-15.jpg'} iAmHere={'Animations'} className={`animations z-[1] top-1/2 left-1/2 `} text={'Animations'} />
          <CateCard setWhichCate={setWhichCate} img={'/bg_2/photo_6_2025-07-27_07-50-15.jpg'} iAmHere={'Front End'} className={`frontend z-[2] top-1/2 left-[75%] rotate-12 `} text={'Front End'} />
        </div>
      {/* end Top Animated Cards */}
      {/* cate buttons */}
        <div className=' w-full flex flex-wrap justify-center items-center gap-5'>
          {allCate.map((cate, idx) => (
            <a href="#projects">
              <div key={idx} className={` ${WhichCate == cate ? ' shadow-[var(--shadow)] text-[var(--orange)] border-[var(--orange)] bg-transparent  ' : ''} btn my-5`} onClick={() => setWhichCate(cate)}>
                {cate}
              </div>
            </a>
          ))}
        </div>
      {/* cate buttons */}
    </div>
  )
}

export default ProjectsCategories
