'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

// Fade In Animation
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Slide Up Animation
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Slide In From Left
export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Slide In From Right
export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Scale Up Animation
export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// Stagger Children Animation
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

// Child item for stagger
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// Animation Wrapper Components
interface AnimationWrapperProps {
  children: ReactNode
  className?: string
  delay?: number
}

export const FadeIn = ({ children, className = '', delay = 0 }: AnimationWrapperProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={fadeInVariants}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export const SlideUp = ({ children, className = '', delay = 0 }: AnimationWrapperProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={slideUpVariants}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export const SlideInLeft = ({ children, className = '', delay = 0 }: AnimationWrapperProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={slideInLeftVariants}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export const SlideInRight = ({ children, className = '', delay = 0 }: AnimationWrapperProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={slideInRightVariants}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export const ScaleUp = ({ children, className = '', delay = 0 }: AnimationWrapperProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={scaleUpVariants}
    transition={{ delay }}
    className={className}
  >
    {children}
  </motion.div>
)

export const StaggerContainer = ({ children, className = '' }: AnimationWrapperProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={staggerContainerVariants}
    className={className}
  >
    {children}
  </motion.div>
)

export const StaggerItem = ({ children, className = '' }: Omit<AnimationWrapperProps, 'delay'>) => (
  <motion.div
    variants={staggerItemVariants}
    className={className}
  >
    {children}
  </motion.div>
)

// Button Hover Animation
export const ButtonHover = ({ children, className = '' }: Omit<AnimationWrapperProps, 'delay'>) => (
  <motion.div
    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.95 }}
    className={className}
  >
    {children}
  </motion.div>
)

// Card Hover Animation
export const CardHover = ({ children, className = '' }: Omit<AnimationWrapperProps, 'delay'>) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={slideUpVariants}
    whileHover={{
      y: -8,
      transition: { duration: 0.3, ease: 'easeOut' }
    }}
    className={className}
  >
    {children}
  </motion.div>
)
