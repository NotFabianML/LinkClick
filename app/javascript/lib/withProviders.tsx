import React from 'react';
import { ThemeProvider } from './ThemeProvider';

// Este HOC toma un componente como argumento...
const withProviders = (Component: React.ComponentType<any>) => {
  // ...y devuelve un nuevo componente que renderiza el original DENTRO de los Providers.
  return (props: any) => {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Component {...props} />
      </ThemeProvider>
    );
  };
};

export default withProviders;