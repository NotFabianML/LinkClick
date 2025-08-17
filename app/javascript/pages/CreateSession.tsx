"use client";

import React, { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import {
  Clock,
  Users,
  BookOpen,
  MessageSquare,
  Palette,
  Code,
  Database,
  Globe,
  Smartphone,
  Brain,
  Lightbulb,
  Target,
  X,
  Zap,
  GraduationCap,
  Briefcase,
} from "lucide-react";

import { CreateSessionPageProps } from "../types";
import { useAppNavigation } from "../hooks/useAppNavigation";
import axios from "axios";

const sessionTypes = [
  {
    value: "quick-tutoring",
    label: "Quick Tutoring",
    icon: Zap,
    description: "Short focused help session",
    category: "tutoring",
    suggestedDuration: ["0.5", "1", "1.5"],
  },
  {
    value: "deep-study",
    label: "Deep Study Session",
    icon: GraduationCap,
    description: "In-depth learning session",
    category: "study",
    suggestedDuration: ["2", "3", "4", "6"],
  },
  {
    value: "project-collab",
    label: "Project Collaboration",
    icon: Briefcase,
    description: "Work on projects together",
    category: "project",
    suggestedDuration: ["4", "6", "8", "12", "24"],
  },
  {
    value: "workshop",
    label: "Workshop",
    icon: BookOpen,
    description: "Hands-on learning session",
    category: "workshop",
    suggestedDuration: ["2", "3", "4"],
  },
  {
    value: "study-group",
    label: "Study Group",
    icon: Users,
    description: "Collaborative learning",
    category: "group",
    suggestedDuration: ["1.5", "2", "3"],
  },
  {
    value: "discussion",
    label: "Discussion",
    icon: MessageSquare,
    description: "Topic-based conversation",
    category: "discussion",
    suggestedDuration: ["1", "1.5", "2"],
  },
];

const skillCategories = [
  {
    category: "Frontend",
    icon: Palette,
    skills: [
      "React",
      "Vue.js",
      "Angular",
      "HTML/CSS",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "SASS/SCSS",
    ],
  },
  {
    category: "Backend",
    icon: Code,
    skills: ["Node.js", "Python", "Java", "C#", "PHP", "Ruby", "Go", "Rust"],
  },
  {
    category: "Database",
    icon: Database,
    skills: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Firebase",
      "Supabase",
      "SQLite",
    ],
  },
  {
    category: "Mobile",
    icon: Smartphone,
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic", "Xamarin"],
  },
  {
    category: "DevOps",
    icon: Globe,
    skills: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Azure",
      "GCP",
      "CI/CD",
      "Linux",
      "Nginx",
    ],
  },
  {
    category: "Other",
    icon: Brain,
    skills: [
      "Machine Learning",
      "AI",
      "Blockchain",
      "Game Development",
      "UI/UX Design",
      "Data Science",
    ],
  },
];

const getDurationOptions = (sessionType: string) => {
  const selectedType = sessionTypes.find((type) => type.value === sessionType);
  if (!selectedType) return [];

  const durationMap: { [key: string]: string } = {
    "0.5": "30 minutes",
    "1": "1 hour",
    "1.5": "1.5 hours",
    "2": "2 hours",
    "3": "3 hours",
    "4": "4 hours",
    "6": "6 hours",
    "8": "8 hours",
    "12": "12 hours",
    "24": "1 day",
  };

  return selectedType.suggestedDuration.map((duration) => ({
    value: duration,
    label: durationMap[duration],
  }));
};

declare const Turbo: any;

const CreateSessionPage = (props: CreateSessionPageProps) => {
  const { navigate } = useAppNavigation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    session_type: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const csrfToken = document.querySelector<HTMLMetaElement>(
    "meta[name='csrf-token']"
  )?.content;
  const locale =
    (window as any).sharedProps?.locale_data?.current_locale || "en";

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterestIds, setSelectedInterestIds] = useState<number[]>([]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleInterestToggle = (interestId: number) => {
    setSelectedInterestIds((prevIds) =>
      prevIds.includes(interestId)
        ? prevIds.filter((id) => id !== interestId)
        : [...prevIds, interestId]
    );
  };

  const handleTypeChange = (type: string) => {
    setFormData((prev) => ({ ...prev, type, duration: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    try {
      const response = await axios.post(
        `/${locale}/sessions.json`,
        { session: formData },
        { headers: { "X-CSRF-Token": csrfToken } }
      );

      if (response.data.redirect_url) {
        Turbo.visit(response.data.redirect_url);
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["An unexpected error occurred."]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="shadow-lg border-0 bg-card/50 backdrop-blur-sm rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold ...">Crear Nueva Sesión</h1>
                <p className="text-muted-foreground text-lg">
                  Comparte tu conocimiento o aprende algo nuevo.
                </p>
              </div>
              <Button
                onClick={() => navigate("dashboard")}
                variant="outline"
                className="shadow-lg ..."
              >
                Volver al Dashboard
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {errors.length > 0 && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
              <h4 className="font-bold">
                Por favor corrige los siguientes errores:
              </h4>
              <ul className="list-disc pl-5 mt-2">
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Basic information */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Información Básica</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="title">Título de la Sesión *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      placeholder="E.g., 'Introduction to React Basics'"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Descripción *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      placeholder="Describe what participants will learn and what to expect."
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tipo de Sesión */}
              <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Tipo de Sesión
                  </CardTitle>
                  <CardDescription>
                    Elige el formato que mejor se ajuste a tu actividad
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sessionTypes.map((type) => (
                      <div
                        key={type.value}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          formData.session_type === type.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 bg-muted/30"
                        }`}
                        onClick={() => handleTypeChange(type.value)}
                      >
                        <div className="flex items-start gap-3">
                          <type.icon
                            className={`h-6 w-6 mt-1 flex-shrink-0 ${
                              formData.session_type === type.value
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                          <div>
                            <h3 className="font-medium text-foreground">
                              {type.label}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Habilidades y Temas */}
              <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Brain className="h-5 w-5 text-primary" />
                    Habilidades y Temas
                  </CardTitle>
                  <CardDescription>
                    Selecciona las tecnologías y temas que se cubrirán
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {skillCategories.map((category) => (
                    <div key={category.category}>
                      <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                        <category.icon className="h-4 w-4 text-muted-foreground" />
                        {category.category}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {props.available_interests
                          .filter((interest) =>
                            category.skills.includes(interest.name)
                          )
                          .map((interest) => (
                            <div
                              key={interest.id}
                              className={`p-2 rounded-lg text-sm cursor-pointer transition-all duration-200 ${
                                selectedInterestIds.includes(interest.id)
                                  ? "bg-primary/10 text-primary border border-primary/30"
                                  : "bg-muted/30 text-foreground border border-border hover:bg-primary/5"
                              }`}
                              onClick={() => handleInterestToggle(interest.id)}
                            >
                              <div className="flex items-center justify-between">
                                <span>{interest.name}</span>
                                {selectedInterestIds.includes(interest.id) && (
                                  <X className="h-3 w-3" />
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                  {selectedInterestIds.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium text-foreground mb-2">
                        Habilidades Seleccionadas:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {props.available_interests
                          .filter((interest) =>
                            selectedInterestIds.includes(interest.id)
                          )
                          .map((interest) => (
                            <Badge
                              key={interest.id}
                              variant="default"
                              className="bg-primary/10 text-primary"
                            >
                              {interest.name}
                              <button
                                type="button"
                                onClick={() =>
                                  handleInterestToggle(interest.id)
                                }
                                className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full ..."
                >
                  {isSubmitting ? "Creando..." : "Crear Sesión"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateSessionPage;
