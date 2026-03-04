"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the toast type
type Toast = {
    id: number;
    message: string;
    type: "success" | "error" | "info";
};

// Define the context type
type ToastContextType = {
    addToast: (message: string, type: "success" | "error" | "info") => void;
};

// Create the context
export const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Create the provider component
export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (message: string, type: "success" | "error" | "info") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Remove toast after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {/* Render toast notifications */}
            <div className="toast-container">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`toast toast-${toast.type}`}>
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

// Custom hook for using the toast context
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
