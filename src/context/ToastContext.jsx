// src/context/ToastContext.jsx
import { createContext, useContext, useState, useCallback } from 'react'
import Toast from '../components/Toast'

const ToastContext = createContext()

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  // Fungsi untuk menghapus toast berdasarkan ID
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  // Fungsi untuk menambah toast baru
  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now()
    
    // Menambahkan toast ke dalam array
    setToasts((prev) => [...prev, { id, message, type, duration }])

    // Otomatis hapus setelah durasi berakhir (opsional, karena di komponen Toast sudah ada setTimeout)
    // Namun tetap ada di sini sebagai fallback jika komponen gagal trigger onClose
    setTimeout(() => {
      removeToast(id)
    }, duration + 500) // Beri buffer 500ms untuk animasi exit
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {/* Toast Container - Diposisikan agar rapi saat menumpuk */}
      <div className="fixed top-20 right-0 z-[9999] p-4 pointer-events-none flex flex-col gap-3 items-end overflow-hidden max-w-full">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
