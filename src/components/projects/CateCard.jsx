import gsap from 'gsap'
import React , {useState,useEffect,useRef} from 'react'

const CateCard = ({ iAmHere, className, text, img , setWhichCate }) => {
  const tlRef = useRef(null);
  const cardRef = useRef(null); 
  const [isHovered, setIsHovered] = useState(false);
  //& Start Card Hover Animation 
    useEffect(() => {
      tlRef.current = gsap.timeline({ paused: true });
      tlRef.current.set(cardRef.current, { zIndex: 10 })
        .to(cardRef.current, {
          duration: 0.5,
          x: 10,
          ease: "power2.out",
        })
        .to(cardRef.current, {
          duration: 0.5,
          scale: 1.1,
          ease: "power2.out",
          rotate: 0,
        });
    }, []);

    useEffect(() => {
      if (isHovered) {
        tlRef.current?.play();
      } else {
        tlRef.current?.reverse();
      }
    }, [isHovered]);
  //& end Card Hover Animation 
  //& start card Shine
    useEffect(() => {
      const shineEl = cardRef.current.querySelector(".shine");

      const shineTl = gsap.timeline({
        repeat: -1,         
        repeatDelay: 2, 
      });

      shineTl.to(shineEl, {
        duration: 1,
        x: "300%", 
        ease: "power2.inOut",
        onStart: () => {
          gsap.set(shineEl, { x: "-220%" }); 
        },
      });

      return () => shineTl.kill(); // Clean up on unmount
    }, []);
  //& end card Shine
  return (
    <>
      <a href="#projects">
        <div
          ref={cardRef}
          onClick={() => setWhichCate(iAmHere)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`${className} overflow-hidden  cursor-pointer absolute translate-x-[-50%] translate-y-[-50%] w-[280px] h-[180px] lg:w-[400px] lg:h-[250px] rounded-xl border border-[var(--border)] flex-center`}
        >
          <img className='absolute z-[-1]' src={img} alt="any" />
          <div className='shine' />
          {text}
        </div>
      </a>
    </>
  );
};
export default CateCard