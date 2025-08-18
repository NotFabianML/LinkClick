import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { I18nProvider } from '../contexts/I18nContext';
import { Toaster } from '../components/ui/sonner';

// Este HOC toma un componente como argumento...
const withProviders = (Component: React.ComponentType<any>) => {
  // ...y devuelve un nuevo componente que renderiza el original DENTRO de los Providers.
  return (props: any) => {

    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <I18nProvider value={props.i18n}>
          <Component {...props} />
          <Toaster richColors position="top-right" />
        </I18nProvider>
      </ThemeProvider>
    );
  };
};

export default withProviders;