
import React, {useState, useEffect, useRef } from 'react'
import { experiences } from "./ProjectsData"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { GSDevTools } from "gsap/GSDevTools";

gsap.registerPlugin(ScrollTrigger);

const SideBar = ({ activeProject }) => {
      const openWeb = (link) => {
      if (link) {
        window.open(link, "_blank");
      } else {
        console.log("No link provided");
      }
    };
  return (
    <div className='w-[25%] hidden lg:flex h-full flex-col pt-[15px]'>
      {experiences.map((project, idx) => (
        <div 
          onClick={() => openWeb(project.link)}
          key={idx} 
          className={`project-sidebar-item p-4 w-full duration-500 border-b border-[var(--border)] bg-[var(--main)] cursor-pointer text-[var(--text)] hover:text-[var(--orange)] ${
            activeProject === idx ? 'text-[var(--orange)] bg-opacity-20' : ''
          }`}
        >
          <h3 className="font-semibold mb-2">{project.title}</h3>
          <div className={`project-description overflow-hidden transition-all duration-300 ${
            activeProject === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <p className="text-sm text-gray-600 mt-2">{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const PinedProjects = () => {
  const containerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const projectScrollDistance = window.innerHeight * 0.6; 
      const totalScrollDistance = experiences.length * projectScrollDistance;
      //& Pin the main container
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 15%',
          end: () => `+=${totalScrollDistance}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
        });

      //& Animate each project
        experiences.forEach((project, i) => {
          //~ Select elements
            const projectElement = containerRef.current.querySelector(`#project-${i}`);
            const bgElement = containerRef.current.querySelector(`#project-bg-${i}`);
            const cardElement = containerRef.current.querySelector(`#project-card-${i}`);
          //~ Set initial states
            gsap.set(bgElement, { opacity: 0 });
            gsap.set(cardElement, { y: '100%', opacity: 0 });

          //! Create timeline & scrollTrigger for this project
            const startPosition = Math.floor( ( i ) * projectScrollDistance);
            const endPosition = Math.floor( (i + 1) * projectScrollDistance);
            console.log(`Project ${i}: start at ${startPosition}, end at ${endPosition}`);
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: () => `top+=${i * projectScrollDistance} 15%`,
                end: () => `top+=${(i + 1) * projectScrollDistance} 15%`,
                scrub: 1,
                onUpdate: (self) => {
                  //~ Update active project based on scroll progress
                    const progress = self.progress;
                    if (progress > 0.1 && progress < 0.9) {
                      setActiveProject(i);
                    }
                }
              }
            });

          //~ Animate background image
            tl.to(bgElement, {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out'
            }, 0);

          //~ Animate project card
            tl.to(cardElement, {
              y: '0%',
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out'
            }, 0.1);

          //~ Fade out when moving to next project
            if (i < experiences.length - 1) {
              tl.to([bgElement, cardElement], {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
              }, 0.7);
            }
        });

      //& Progressive line animation
        const progressLine = containerRef.current.querySelector('#progress-line');
        if (progressLine) {
          gsap.to(progressLine, {
            scaleY: 1,
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top 15%`,
              end: `top+=${totalScrollDistance} bottom`,
              scrub: 1
            }
          });
        }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className='w-full h-screen flex flex-row relative'>
      {/* Progressive Line */}
        <div className="absolute left-0 top-0 w-1 h-full bg-gray-200 z-10">
          <div 
            id="progress-line"
            className="w-full bg-[var(--orange)] origin-top scale-y-0"
            style={{ height: '100%' }}
          />
        </div>

      {/* Projects Container */}
        <div className='w-full lg:w-[75%] h-full relative overflow-hidden ml-4'>
          {experiences.map((project, idx) => (
            <div key={idx} id={`project-${idx}`} className={ `  absolute inset-0 flex justify-center items-center`}>
              
              {/* Background Image */}
              <div className='absolute inset-0'>
                <img 
                  id={`project-bg-${idx}`}
                  src={project.bgPhoto} 
                  alt="project background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 z-[10]" />
              </div>

              {/* Project Card */}
              <div 
                id={`project-card-${idx}`}
                className='relative z-[15] w-[500px] h-[300px] rounded-lg overflow-hidden shadow-2xl'
              >
                <img 
                  src={project.image || project.bgPhoto} 
                  className='w-full h-full object-cover' 
                  alt="project showcase" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-bold text-xl">{project.title}</h3>
                </div>
              </div>

            </div>
          ))}
        </div>

      {/* Sidebar */}
        <SideBar activeProject={activeProject} />
    </div>
  )
}

export default PinedProjects


// import React, {useState, useEffect, useRef } from 'react'
// import { experiences } from "./ProjectsData"
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const SideBar = ({ activeProject }) => {
//   return (
//     <div className='w-[25%] h-full flex flex-col pt-[15px]'>
//       {experiences.map((project, idx) => (
//         <div 
//           key={idx} 
//           className={`project-sidebar-item p-4 w-full duration-500 border-b border-[var(--border)] bg-[var(--main)] cursor-pointer text-[var(--text)] hover:text-[var(--orange)] ${
//             activeProject === idx ? 'text-[var(--orange)] bg-opacity-20' : ''
//           }`}
//         >
//           <h3 className="font-semibold mb-2">{project.title}</h3>
//           <div className={`project-description overflow-hidden transition-all duration-300 ${
//             activeProject === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//           }`}>
//             <p className="text-sm text-gray-600 mt-2">{project.description}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// const PinedProjects = () => {
//   const containerRef = useRef(null);
//   const [activeProject, setActiveProject] = useState(0);
  
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const projectCount = experiences.length;
//       const sectionHeight = window.innerHeight ;
      
//       //& Set initial states for all projects
//         experiences.forEach((_, i) => {
//           const bgElement = containerRef.current.querySelector(`#project-bg-${i}`);
//           const cardElement = containerRef.current.querySelector(`#project-card-${i}`);
          
//           if (i === 0) {
//             // First project starts visible
//             gsap.set(bgElement, { opacity: 1 });
//             gsap.set(cardElement, { y: '0%', opacity: 1 });
//           } else {
//             // Other projects start hidden
//             gsap.set(bgElement, { opacity: 0 });
//             gsap.set(cardElement, { y: '100%', opacity: 0 });
//           }
//         });

//       //! Create main ScrollTrigger that controls everything
//         ScrollTrigger.create({
//           trigger: containerRef.current,
//           start: 'top 15%',
//           end: `+=${sectionHeight * projectCount} `,
//           scrub: true,
//           pin: true,
//           pinSpacing: true,
//           onUpdate: (self) => {
//             const progress = self.progress;
//             const currentIndex = Math.floor(progress * projectCount);
//             const clampedIndex = Math.min(currentIndex, projectCount - 1);
//             const localProgress = (progress * projectCount) - currentIndex;
            
//             //& Update active project
//               if (clampedIndex !== activeProject) {
//                 setActiveProject(clampedIndex);
//               }
            
//             //& Animate transitions between projects
//               experiences.forEach((_, i) => {
//                 const bgElement = containerRef.current.querySelector(`#project-bg-${i}`);
//                 const cardElement = containerRef.current.querySelector(`#project-card-${i}`);
                
//                 if (i === clampedIndex) {
//                   //~ Current project - animate in
//                     gsap.to(bgElement, { opacity: 1, duration: 0.3, ease: 'power2.out' });
//                     gsap.to(cardElement, { 
//                       y: '0%', 
//                       opacity: 1, 
//                       duration: 0.4, 
//                       ease: 'power2.out' 
//                     });
//                 } else if (i === clampedIndex - 1 && localProgress > 0.7) {
//                   //~ Previous project - animate out
//                     gsap.to(bgElement, { opacity: 0, duration: 0.3, ease: 'power2.in' });
//                     gsap.to(cardElement, { 
//                       y: '-100%', 
//                       opacity: 0, 
//                       duration: 0.3, 
//                       ease: 'power2.in' 
//                     });
//                 } else if (i === clampedIndex + 1 && localProgress > 0.3) {
//                   //~ Next project - prepare to animate in
//                     gsap.to(bgElement, { opacity: 0.3, duration: 0.2 });
//                     gsap.to(cardElement, { 
//                       y: '50%', 
//                       opacity: 0.5, 
//                       duration: 0.3, 
//                       ease: 'power2.out' 
//                     });
//                 } else if (i !== clampedIndex) {
//                   //~ All other projects - keep hidden
//                     gsap.to(bgElement, { opacity: 0, duration: 0.2 });
//                     gsap.to(cardElement, { 
//                       y: i < clampedIndex ? '-100%' : '100%', 
//                       opacity: 0, 
//                       duration: 0.2 
//                     });
//                 }
//               });
//           }
//         });

//       //& Progressive line animation
//         const progressLine = containerRef.current.querySelector('#progress-line');
//         if (progressLine) {
//           gsap.to(progressLine, {
//             scaleY: 1,
//             transformOrigin: 'top',
//             scrollTrigger: {
//               trigger: containerRef.current,
//               start: 'top 15%',
//               end: `+=${sectionHeight * projectCount}`,
//               scrub: 1
//             }
//           });
//         }

//     }, containerRef);

//     return () => ctx.revert();
//   }, [activeProject]);

//   return (
//     <div ref={containerRef} className='w-full h-screen flex flex-row relative'>
//       {/* Progressive Line */}
//       <div className="absolute left-0 top-0 w-1 h-full bg-gray-200 z-10">
//         <div 
//           id="progress-line"
//           className="w-full bg-[var(--orange)] origin-top scale-y-0"
//           style={{ height: '100%' }}
//         />
//       </div>

//       {/* Projects Container */}
//       <div className='w-[75%] h-full relative overflow-hidden ml-4'>
//         {experiences.map((project, idx) => (
//           <div key={idx} id={`project-${idx}`} className='absolute inset-0 flex justify-center items-center'>
            
//             {/* Background Image */}
//             <div className='absolute inset-0'>
//               <img 
//                 id={`project-bg-${idx}`}
//                 src={project.bgPhoto} 
//                 alt="project background"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/30 z-[1]" />
//             </div>

//             {/* Project Card */}
//             <div 
//               id={`project-card-${idx}`}
//               className='relative z-[2] w-[500px] h-[300px] rounded-lg overflow-hidden shadow-2xl'
//             >
//               <img 
//                 src={project.image || project.bgPhoto} 
//                 className='w-full h-full object-cover' 
//                 alt="project showcase" 
//               />
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
//                 <h3 className="text-white font-bold text-xl">{project.title}</h3>
//               </div>
//             </div>

//           </div>
//         ))}
//       </div>

//       {/* Sidebar */}
//       <SideBar activeProject={activeProject} />
//     </div>
//   )
// }

// export default PinedProjects


