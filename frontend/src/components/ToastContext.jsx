import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });
  let timeoutId = null;

  const showToast = useCallback((message, type = 'success', duration = 2500) => {
    setToast({ message, type, visible: true });
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setToast(t => ({ ...t, visible: false }));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-all duration-300
          ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}; 