import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { useAppNavigation } from "../../hooks/useAppNavigation";

import { Button } from "../ui/button";

import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  const i18n = useI18n();
  const { navigate } = useAppNavigation();

  const features = [
    i18n.cta.features.feature1,
    i18n.cta.features.feature2,
    i18n.cta.features.feature3,
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            {i18n.cta.title}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
            {i18n.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              size="lg"
              className="text-lg px-12 py-6 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 gap-2"
              onClick={() => navigate("/users/sign_up")}
            >
              {i18n.cta.cta_button1}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-12 py-6 bg-card/50 backdrop-blur-md border-border/20 hover:bg-card/70 transition-all duration-300"
              onClick={() => navigate("/browse")}
            >
              {i18n.cta.cta_button2}
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
