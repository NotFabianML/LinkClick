import React from "react";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { useI18n } from "../../contexts/I18nContext";

import { Button } from "../ui/button";

import { Zap, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const i18n = useI18n();
  const { navigate } = useAppNavigation();

  const stats = [
    { value: "2.5K+", label: i18n.hero.stats.users },
    { value: "500+", label: i18n.hero.stats.sessions },
    { value: "95%", label: i18n.hero.stats.rate },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5" />
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-md border border-border/20 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span>{i18n.hero.badge}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent leading-tight">
            {i18n.hero.title_line1} <br />
            <span className="text-primary">{i18n.hero.title_line2}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {i18n.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
              onClick={() => navigate("/users/sign_up")}
            >
              {i18n.hero.cta_button1}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-card/50 backdrop-blur-md border-border/20 hover:bg-card/70 transition-all duration-300"
              onClick={() => navigate("/browse")}
            >
              {i18n.hero.cta_button2}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
