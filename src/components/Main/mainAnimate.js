import React from 'react'

import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence
  } from "framer-motion"
  
  export const Animate = (props) => {
    const x = useMotionValue(0)
    const background = useTransform(
      x,
      [-100, 0, 100],
      ["#C00", "#fff", "#0A0"]
    )
  
    return (
      <motion.div className='main__Animate-div'>
        <AnimatePresence>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x, padding: '0px',
          backgroundColor: background, 
          borderRadius: '2.7vmax', }}
          transition={{ duration: 0.5 }}
        >
        
        {props.children}

        </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }