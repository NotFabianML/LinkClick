// Tipos específicos para la página de inicio

export interface Tech {
  title: string;
  description: string;
}

export interface HomepageI18n {
  title: string;
  subtitle: string;
  posts_button: string;
  source_button: string;
  tech: {
    rails: Tech;
    react: Tech;
    shakapacker: Tech;
    shadcn: Tech;
    axios: Tech;
  };
}