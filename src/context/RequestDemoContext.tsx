'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface RequestDemoContextType {
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
}

const RequestDemoContext = createContext<RequestDemoContextType | undefined>(
  undefined
);

export const RequestDemoProvider = ({ children }: { children: ReactNode }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <RequestDemoContext.Provider value={{ isFormOpen, openForm, closeForm }}>
      {children}
    </RequestDemoContext.Provider>
  );
};

export const useRequestDemo = () => {
  const context = useContext(RequestDemoContext);
  if (!context) {
    throw new Error('useRequestDemo must be used within a RequestDemoProvider');
  }
  return context;
};
