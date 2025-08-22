import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { CreateSessionFormData, CreateSessionPageProps } from "../../types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

import {
  Brain,
  Palette,
  Code,
  Database,
  Globe,
  Smartphone,
  X,
} from "lucide-react";

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

interface SkillsCardProps {
  control: Control<CreateSessionFormData>;
  errors: FieldErrors<CreateSessionFormData>;
  availableInterests: CreateSessionPageProps["available_interests"];
}

const SkillsCard = ({
  control,
  errors,
  availableInterests,
}: SkillsCardProps) => {
  const i18n = useI18n();

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-primary" />
          {i18n.skills.title}
        </CardTitle>
        <CardDescription>{i18n.skills.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Controller
          name="interest_ids"
          control={control}
          render={({ field }) => {
            const selectedIds = field.value || [];

            const handleInterestToggle = (interestId: number) => {
              const newSelectedIds = selectedIds.includes(interestId)
                ? selectedIds.filter((id) => id !== interestId)
                : [...selectedIds, interestId];
              field.onChange(newSelectedIds);
            };

            const selectedInterests = availableInterests.filter((i) =>
              selectedIds.includes(i.id)
            );

            return (
              <>
                {skillCategories.map((category) => (
                  <div key={category.category}>
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <category.icon className="h-4 w-4 text-muted-foreground" />
                      {category.category}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {availableInterests
                        .filter((interest) =>
                          category.skills.includes(interest.name)
                        )
                        .map((interest) => {
                          const isSelected = selectedIds.includes(interest.id);
                          return (
                            <div
                              key={interest.id}
                              className={`p-2 rounded-lg text-sm cursor-pointer transition-all duration-200 flex items-center justify-between ${
                                isSelected
                                  ? "bg-primary/10 text-primary border border-primary/30"
                                  : "bg-muted/30 text-foreground border border-border hover:bg-primary/5"
                              }`}
                              onClick={() => handleInterestToggle(interest.id)}
                            >
                              <span>{interest.name}</span>
                              {isSelected && <X className="h-3 w-3" />}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}

                {selectedIds.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium text-foreground mb-2">
                      {i18n.skills.selected_skills}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedInterests.map((interest) => (
                        <Badge
                          key={interest.id}
                          variant="default"
                          className="bg-primary/10 text-primary"
                        >
                          {interest.name}
                          <button
                            type="button"
                            onClick={() => handleInterestToggle(interest.id)}
                            className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            );
          }}
        />
        {errors.interest_ids && (
          <p className="text-sm text-destructive mt-2">
            {i18n.validation[errors.interest_ids.message as string]}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsCard;
