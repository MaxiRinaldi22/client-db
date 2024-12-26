import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Bell } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface NotificationProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export function Notification({ message, isVisible, onClose }: NotificationProps) {
  const [isShaking, setIsShaking] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)

      // Start shaking animation
      setIsShaking(true)
      const shakeTimer = setTimeout(() => {
        setIsShaking(false)
      }, 1000)

      return () => {
        clearTimeout(timer)
        clearTimeout(shakeTimer)
      }
    }
  }, [isVisible, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '100%' }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: '100%' }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <motion.div
            animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-72 shadow-lg overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Bell className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{message}</p>
                  </div>
                  <button onClick={onClose} className="text-black hover:text-black/80">
                    <X size={18} />
                  </button>
                </div>
              </CardContent>
              <motion.div
                className="h-1 bg-white/30"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

