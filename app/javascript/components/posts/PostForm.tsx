import React, { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Post, PostsI18n } from "@/types"; // <-- Importamos tipos centralizados

interface FormErrors {
  title?: string[];
  body?: string[];
  form?: string;
}

interface PostFormProps {
  onPostCreated: (post: Post) => void;
  i18n: PostsI18n['form']; // <-- Recibimos las traducciones del formulario
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated, i18n }) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const csrfToken = document.querySelector("meta[name='csrf-token']")?.getAttribute("content");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    axios.post("/posts.json", { post: { title, body } }, { headers: { 'X-CSRF-Token': csrfToken } })
      .then(response => {
        onPostCreated(response.data);
        setTitle("");
        setBody("");
        setOpen(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 422) {
          setErrors(error.response.data);
        } else {
          setErrors({ form: i18n.errors.unexpected });
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{i18n.create_button}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{i18n.title}</DialogTitle>
            <DialogDescription>{i18n.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">{i18n.title_label}</Label>
              <div className="col-span-3">
                <Input
                  id="title"
                  value={title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{i18n.errors.title.replace('%{messages}', errors.title.join(', '))}</p>}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="body" className="text-right">{i18n.body_label}</Label>
              <div className="col-span-3">
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
                  className={errors.body ? "border-red-500" : ""}
                />
                {errors.body && <p className="text-red-500 text-xs mt-1">{i18n.errors.body.replace('%{messages}', errors.body.join(', '))}</p>}
              </div>
            </div>
            {errors.form && <p className="text-red-500 text-sm text-center col-span-4">{errors.form}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? i18n.submitting_button : i18n.submit_button}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostForm;