'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
  };
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx.toast;
}

const TOAST_DURATION = 4000;

const TOAST_STYLES: Record<ToastType, { container: string; icon: React.ReactNode }> = {
  success: {
    container: 'border-emerald-200 bg-white',
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />,
  },
  error: {
    container: 'border-red-200 bg-white',
    icon: <XCircle className="h-5 w-5 text-red-500 shrink-0" />,
  },
  info: {
    container: 'border-blue-200 bg-white',
    icon: <Info className="h-5 w-5 text-blue-500 shrink-0" />,
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message: string, type: ToastType) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev.slice(-4), { id, message, type }]);
      setTimeout(() => dismiss(id), TOAST_DURATION);
    },
    [dismiss]
  );

  const toast = useMemo(
    () => ({
      success: (m: string) => push(m, 'success'),
      error: (m: string) => push(m, 'error'),
      info: (m: string) => push(m, 'info'),
    }),
    [push]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2.5 w-80 max-w-[calc(100vw-2rem)]">
        {toasts.map((t) => {
          const style = TOAST_STYLES[t.type];
          return (
            <div
              key={t.id}
              role="status"
              className={`flex items-start gap-3 rounded-2xl border p-4 shadow-xl shadow-zinc-900/5 animate-in fade-in slide-in-from-right-3 duration-200 ${style.container}`}
            >
              {style.icon}
              <p className="flex-1 text-xs font-semibold text-zinc-800 leading-relaxed pt-0.5">
                {t.message}
              </p>
              <button
                onClick={() => dismiss(t.id)}
                className="text-zinc-300 hover:text-zinc-600 transition-colors shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
