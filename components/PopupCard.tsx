import React, { useEffect } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface PopupCardProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  CardContetnt?: React.ComponentType<any> ;
  cardStyle?: string;
  CardContetntProps?: object ;
}

const PopupCard: React.FC<PopupCardProps> = ({isOpen, setIsOpen, CardContetnt = null , cardStyle, CardContetntProps}) => {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsOpen]);

  return (
<AnimatePresence>
  {isOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 w-full h-screen
          bg-gradient-to-br from-black/80 via-black/70 to-black/80
          backdrop-blur-md z-40
          flex items-center justify-center"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
          duration: 0.2
        }}
        className={`
          absolute top-[0%] left-[24%]
          w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw]
          max-h-[85vh]
          bg-stone-900/95 backdrop-blur-lg
          border border-[var(--border)]
          shadow-2xl rounded-xl
          p-6 md:p-8
          z-50
          overflow-y-auto
          ${cardStyle}
        `}
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 p-2 rounded-full
            bg-stone-800/50 hover:bg-[var(--orange)]
            text-[var(--text)] hover:text-white
            transition-colors duration-300 text-2xl
            hover:shadow-lg"
        >
          <IoCloseCircle />
        </motion.button>

        {/* Content Area */}
        <div className="mt-4">
          {CardContetnt && <CardContetnt {...CardContetntProps} />}
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
  )
}

export default PopupCard
