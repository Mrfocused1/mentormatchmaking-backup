'use client'

import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExpandableContextType {
  isExpanded: boolean
  toggle: () => void
  expand: () => void
  collapse: () => void
}

const ExpandableContext = createContext<ExpandableContextType | undefined>(undefined)

function useExpandable() {
  const context = useContext(ExpandableContext)
  if (!context) {
    throw new Error('useExpandable must be used within an Expandable component')
  }
  return context
}

interface ExpandableProps {
  children: React.ReactNode
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  className?: string
}

export function Expandable({
  children,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  className = '',
}: ExpandableProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)

  const isControlled = controlledExpanded !== undefined
  const isExpanded = isControlled ? controlledExpanded : internalExpanded

  const toggle = () => {
    const newValue = !isExpanded
    if (!isControlled) {
      setInternalExpanded(newValue)
    }
    onExpandedChange?.(newValue)
  }

  const expand = () => {
    if (!isControlled) {
      setInternalExpanded(true)
    }
    onExpandedChange?.(true)
  }

  const collapse = () => {
    if (!isControlled) {
      setInternalExpanded(false)
    }
    onExpandedChange?.(false)
  }

  return (
    <ExpandableContext.Provider value={{ isExpanded, toggle, expand, collapse }}>
      <div className={className}>
        {children}
      </div>
    </ExpandableContext.Provider>
  )
}

interface ExpandableCardProps {
  children: React.ReactNode
  className?: string
}

export function ExpandableCard({ children, className = '' }: ExpandableCardProps) {
  const { isExpanded } = useExpandable()

  return (
    <div className={`transition-all duration-300 ${className}`}>
      {children}
    </div>
  )
}

interface ExpandableCardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function ExpandableCardHeader({ children, className = '' }: ExpandableCardHeaderProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

interface ExpandableCardContentProps {
  children: React.ReactNode
  className?: string
}

export function ExpandableCardContent({ children, className = '' }: ExpandableCardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

interface ExpandableCardFooterProps {
  children: React.ReactNode
  className?: string
}

export function ExpandableCardFooter({ children, className = '' }: ExpandableCardFooterProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

interface ExpandableTriggerProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function ExpandableTrigger({ children, className = '', onClick }: ExpandableTriggerProps) {
  const { toggle } = useExpandable()

  const handleClick = () => {
    toggle()
    onClick?.()
  }

  return (
    <div onClick={handleClick} className={`cursor-pointer ${className}`}>
      {children}
    </div>
  )
}

type AnimationPreset = 'fade' | 'blur-md' | 'slide-up' | 'none'

interface ExpandableContentProps {
  children: React.ReactNode
  className?: string
  animationPreset?: AnimationPreset
}

export function ExpandableContent({
  children,
  className = '',
  animationPreset = 'fade',
}: ExpandableContentProps) {
  const { isExpanded } = useExpandable()

  const getAnimationVariants = () => {
    switch (animationPreset) {
      case 'fade':
        return {
          hidden: { opacity: 0, height: 0 },
          visible: { opacity: 1, height: 'auto' },
        }
      case 'blur-md':
        return {
          hidden: { opacity: 0, filter: 'blur(8px)', height: 0 },
          visible: { opacity: 1, filter: 'blur(0px)', height: 'auto' },
        }
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 20, height: 0 },
          visible: { opacity: 1, y: 0, height: 'auto' },
        }
      case 'none':
        return {
          hidden: { height: 0 },
          visible: { height: 'auto' },
        }
      default:
        return {
          hidden: { opacity: 0, height: 0 },
          visible: { opacity: 1, height: 'auto' },
        }
    }
  }

  const variants = getAnimationVariants()

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`overflow-hidden ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { useExpandable }
