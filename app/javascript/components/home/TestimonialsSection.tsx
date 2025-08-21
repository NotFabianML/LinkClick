import React from "react";
import { useI18n } from "../../contexts/I18nContext";

import { Card, CardContent } from "../ui/card";

import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const i18n = useI18n();

  const testimonials = [
    { initials: "SM", i18nKey: "card1" },
    { initials: "DJ", i18nKey: "card2" },
    { initials: "AL", i18nKey: "card3" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {i18n.testimonials.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {i18n.testimonials.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => {
            const cardI18n = i18n.testimonials.cards[testimonial.i18nKey];
            return (
              <Card
                key={testimonial.i18nKey}
                className="bg-card/50 backdrop-blur-md border-border/20 hover:bg-card/70 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {cardI18n.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-semibold">{cardI18n.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {cardI18n.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
