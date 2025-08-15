import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import PostForm from "../components/posts/PostForm";
import { Post, PostsI18n } from "@/types"; // <-- Importamos tipos

interface PostsViewerProps {
  i18n: PostsI18n; // <-- Recibimos todas las traducciones de la página
}

const PostsViewer = ({ i18n }: PostsViewerProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = () => {
    setLoading(true);
    setError(null);
    axios.get("/posts.json")
      .then((response) => setPosts(response.data))
      .catch(() => setError(i18n.viewer.error))
      .finally(() => setLoading(false));
  };
  
  const handlePostCreated = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full mx-auto p-4 sm:p-8 md:p-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{i18n.viewer.title}</h1>
        <div className="flex space-x-2">
            <Button variant="outline" onClick={fetchPosts}>{i18n.viewer.reload_button}</Button>
            {/* Pasamos las traducciones del formulario al componente hijo */}
            <PostForm onPostCreated={handlePostCreated} i18n={i18n.form} />
        </div>
      </div>
      
      {loading && <p>{i18n.viewer.loading}</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent><p>{post.body}</p></CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsViewer;