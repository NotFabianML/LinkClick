import React from "react";
import { useI18n } from "../../contexts/I18nContext";

const HowItWorksSection = () => {
  const i18n = useI18n();

  const steps = [
    { number: 1, i18nKey: "step1" },
    { number: 2, i18nKey: "step2" },
    { number: 3, i18nKey: "step3" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {i18n.how_it_works.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {i18n.how_it_works.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step) => {
            const stepI18n = i18n.how_it_works.steps[step.i18nKey];
            return (
              <div key={step.number} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  {stepI18n.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {stepI18n.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
