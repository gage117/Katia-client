import React from 'react'

import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence
  } from "framer-motion"
  
  export const MyComponent = (props) => {
    const x = useMotionValue(0)
    const background = useTransform(
      x,
      [-100, 0, 100],
      ["#C00", "#fff", "#0A0"]
    )
  
    return (
      <motion.div style={{ maxWidth: '80%', margin: 'auto' }}>
        <AnimatePresence>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x, border: `.5vmax solid`, 
          borderColor: background, 
          borderRadius: '7.2vmax', }}
          transition={{ duration: 0.5 }}
        >
        
        {props.children}

        </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }