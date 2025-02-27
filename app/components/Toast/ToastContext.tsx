'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';
import Toast from './index';
import './styles.css';

interface ToastContextType {
  showToast: (message: string, duration?: number, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<{ id: string; message: string; duration: number; type: 'success' | 'error' | 'info' | 'warning' }[]>([]);

  const showToast = (message: string, duration = 3000, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = new Date().getTime().toString();
    setToasts((prev) => [...prev, { id, message, duration, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            duration={toast.duration}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
