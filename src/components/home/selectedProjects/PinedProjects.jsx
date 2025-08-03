
import React, {useState, useEffect, useRef } from 'react'
import { experiences } from "./ProjectsData"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Topper from '../../Topper';
import SelectedProject, { SideBarShell } from './SelectedProject';
import { openWeb } from '../../../hoc/navigation';

gsap.registerPlugin(ScrollTrigger);

const PinedProjects = () => {
  const ProjectsLength = 3
  const containerRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  //&################################ Start Side bar & projects animation
      useEffect(() => {
        const ctx = gsap.context(() => {
          const projectScrollDistance = window.innerHeight * 1 ;
          const totalScrollDistance = ProjectsLength * projectScrollDistance;

          //& Select project elements
            const items = gsap.utils.toArray('.pagenation');
            const bgImg = gsap.utils.toArray('.bg-image');
            const projectCard = gsap.utils.toArray('.project-card');

          //& Select sidebar elements
            const sidebarItems = gsap.utils.toArray('.sidebar-item');
            const sidebarTitles = gsap.utils.toArray('.sidebar-title');
            const sidebarNumbers = gsap.utils.toArray('.sidebar-number');
            const sidebarContent = gsap.utils.toArray('.sidebar-content');
            const sidebarProgressBars = gsap.utils.toArray('.sidebar-progress-bar');
            const sidebarDescriptions = gsap.utils.toArray('.sidebar-description');

          //& Set initial states for project elementes
            gsap.set(bgImg, { opacity: 0 });
            gsap.set(projectCard, { y: '100%', opacity: 0 });

          //& Set initial states for sidebar
            gsap.set(sidebarTitles, { color: 'var(--text)' });
            gsap.set(sidebarNumbers, { color: 'var(--text)' });
            gsap.set(sidebarContent, { height: 0, opacity: 0 });
            gsap.set(sidebarProgressBars, { scaleX: 0 });
            gsap.set(sidebarDescriptions, { opacity: 0, y: 10 });

          //& Pin the main container
            ScrollTrigger.create({
              trigger: containerRef.current,
              start: 'top top',
              end: () => `+=${totalScrollDistance}`,
              scrub: 1,
              pin: true,
            });

          //! Animate each project and corresponding sidebar
            let cumulativeOffset = 0;
            items.forEach((item, i) => {
              const start = `top+=${cumulativeOffset} top`;
              const end = `+=${projectScrollDistance}`;
              const projectBg = item.querySelector('.bg-image');
              const projectCard = item.querySelector('.project-card');

              //& Get corresponding sidebar elements
                const sidebarItem = sidebarItems[i];
                const sidebarTitle = sidebarTitles[i];
                const sidebarNumber = sidebarNumbers[i];
                const thisSideBarContent = sidebarContent[i];
                const sidebarProgressBar = sidebarProgressBars[i];
                const sidebarDescription = sidebarDescriptions[i];

              //~ Start animating the project area 
                const tl = gsap.timeline({
                  scrollTrigger : ({
                      trigger: item,
                      start: start,
                      end: end,
                      scrub: 1,
                    })
                  })

                tl.to(projectBg, { opacity: 1, })
                .to(projectCard, { opacity: 1, y:'0%'} , "<")
                .to(projectCard, { opacity: 0, y:'-150%'} )
                .to( projectBg ,{opacity:0} )
              //~ End animating the project area 
              //~ Start animating the sidbare area 
                ScrollTrigger.create({
                  trigger: item,
                  start: start,
                  end: end,
                  scrub: 1,
                  onUpdate: (self) => {
                    const progress = self.progress;

                    //& Animate sidebar elements
                      if (progress > 0) {

                        gsap.to([sidebarTitle, sidebarNumber], {
                          color: 'var(--orange)',
                          duration: 0.8,
                          ease: "none"
                        });

                        //* Expand sidebar content
                        gsap.to(thisSideBarContent, {
                          height: 'auto',
                          opacity: 1,
                          duration: 0.8,
                          ease: "none"
                        });

                        //* Animate progress bar
                        gsap.to(sidebarProgressBar, {
                          scaleX: progress,
                          duration: 0.1,
                          ease: "none"
                        });

                        //* Show description
                        gsap.to(sidebarDescription, {
                          opacity: 1 ,
                          y: 0,
                          duration: 0.8,
                          ease: "none"
                        });
                    } else {
                        //* Reset to inactive state
                        gsap.to([sidebarTitle, sidebarNumber], {
                          color: 'var(--text)',
                          duration: 0.8,
                          ease: "none"
                        });

                        gsap.to(thisSideBarContent, {
                          height: 0,
                          opacity: 0,
                          duration: 0.8,
                          ease: "none"
                        });

                        gsap.to(sidebarProgressBar, {
                          scaleX: 0,
                          duration: 0.8,
                          ease: "none"
                        });

                        gsap.to(sidebarDescription, {
                          opacity: 0,
                          y: 10,
                          duration: 0.8 ,
                          ease: "none"
                        });
                    }
                  },
                  onLeave: () => {
                  //* Reset sidebar to inactive state
                    gsap.to([sidebarTitle, sidebarNumber], {
                      color: 'var(--text)',
                      duration: 0.8,
                      ease: "none"
                    });

                    gsap.to(thisSideBarContent, {
                      height: 0,
                      opacity: 0,
                      duration: 0.8,
                      ease: "none"
                    });

                    gsap.to(sidebarProgressBar, {
                      scaleX: 0,
                      duration: 0.8,
                      ease: "none"
                    });

                    gsap.to(sidebarDescription, {
                      opacity: 0,
                      y: 10,
                      duration: 0.8 ,
                      ease: "none"
                    });
                  },
                  // onLeaveBack: () => {
                  //   //* Reset sidebar to inactive state
                  //   gsap.to([sidebarTitle, sidebarNumber], {
                  //     color: 'var(--text)',
                  //     duration: 0.3,
                  //     ease: "power2.out"
                  //   });

                  //   gsap.to(thisSideBarContent, {
                  //     height: 0,
                  //     opacity: 0,
                  //     duration: 0.3,
                  //     ease: "power2.out"
                  //   });
                  // }
                });
              //~ End animating the sidbare area 
              cumulativeOffset += projectScrollDistance;
            });

        }, containerRef);

        return () => ctx.revert();
      }, []);
  //&################################ End Side bar animation
  return (
    <div id='pin' ref={containerRef} className='w-full flex flex-col gap-5 '>

      <Topper text= { {left : 'My Work' , right : 'Selected Projects'} } className={'!w-[90%] !mx-auto'} />

      <div className='w-full h-screen flex flex-row relative' >

        {/* Projects Container */}
          <div className='w-full lg:w-[70%] h-full relative overflow-hidden '>
            <SelectedProject className={''} project={experiences[0]} idx={'0'}/>
            <SelectedProject className={''} project={experiences[1]} idx={'1'}/>
            <SelectedProject className={''} project={experiences[2]} idx={'2'}/>
          </div>

        {/* SideBarShell */}
          <div className='w-[30%] hidden lg:flex h-full flex-col gap-5 pt-[15px]'>
            <SideBarShell activeProject={activeProject} className={''} project={experiences[0]} idx={'0'}/>
            <SideBarShell activeProject={activeProject} className={''} project={experiences[1]} idx={'1'}/>
            <SideBarShell activeProject={activeProject} className={''} project={experiences[2]} idx={'2'}/>
          </div>

      </div>

      <div className='mb-[20px] py-5 flex-center md:gap-[100px] gap-[20px] w-full'>
        <p className='flex flex-row'>just a few <span className='hidden md:flex' >, see more right here</span> . . . </p>
        <a href={'/experines'} className='btn'>All Projects</a>
      </div>

    </div>
  )
}

export default PinedProjects
