import React from "react";
import { useI18n } from "../../contexts/I18nContext";

import { Card, CardContent } from "../ui/card";

import {
  Users,
  BookOpen,
  MessageSquare,
  Award,
  Shield,
  Globe,
} from "lucide-react";

const FeaturesSection = () => {
  const i18n = useI18n();

  const features = [
    { icon: Users, i18nKey: "matching" },
    { icon: BookOpen, i18nKey: "interactive" },
    { icon: MessageSquare, i18nKey: "chat" },
    { icon: Award, i18nKey: "achievements" },
    { icon: Shield, i18nKey: "safety" },
    { icon: Globe, i18nKey: "community" },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {i18n.features.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {i18n.features.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            const cardI18n = i18n.features.cards[feature.i18nKey];
            return (
              <Card
                key={feature.i18nKey}
                className="bg-card/50 backdrop-blur-md border-border/20 hover:bg-card/70 transition-all duration-300 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">
                    {cardI18n.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {cardI18n.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
