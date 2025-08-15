// Tipos específicos para la página de posts

// Modelo de datos de un Post
export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PostsI18n {
  viewer: {
    title: string;
    reload_button: string;
    loading: string;
    error: string;
  };
  form: {
    create_button: string;
    title: string;
    description: string;
    title_label: string;
    body_label: string;
    submit_button: string;
    submitting_button: string;
    errors: {
      title: string; 
      body: string; 
      unexpected: string;
    };
  };
}