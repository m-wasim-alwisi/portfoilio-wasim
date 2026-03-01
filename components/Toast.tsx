'use client'

import { useEffect, useState } from 'react'

type ToastProps = {
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000) // Auto hide after 3 seconds

    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }[type]

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-slide-up">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
        <span>{message}</span>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  )
}