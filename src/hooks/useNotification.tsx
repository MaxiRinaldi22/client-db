import { useState, useCallback } from 'react'

export function useNotification() {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')

  const showNotification = useCallback((text: string) => {
    setMessage(text)
    setIsVisible(true)
  }, [])

  const hideNotification = useCallback(() => {
    setIsVisible(false)
  }, [])

  return {
    isVisible,
    message,
    showNotification,
    hideNotification,
  }
}

