import React, { createContext, useContext } from 'react';

const I18nContext = createContext<any | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode; value: any }> = ({ children, value }) => {
  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within a component wrapped by withProviders');
  }
  return context;
};