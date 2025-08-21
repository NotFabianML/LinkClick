interface Stat {
  users: string;
  sessions: string;
  rate: string;
}

interface FeatureCard {
  title: string;
  description: string;
}

interface HowItWorksStep {
  title: string;
  description: string;
}

interface TestimonialCard {
  quote: string;
  name: string;
  role: string;
}

interface CtaFeatures {
  feature1: string;
  feature2: string;
  feature3: string;
}

export interface HomePageI18n {
  hero: {
    badge: string;
    title_line1: string;
    title_line2: string;
    subtitle: string;
    cta_button1: string;
    cta_button2: string;
    stats: Stat;
  };
  features: {
    title: string;
    subtitle: string;
    cards: { [key: string]: FeatureCard };
  };
  how_it_works: {
    title: string;
    subtitle: string;
    steps: { [key: string]: HowItWorksStep };
  };
  testimonials: {
    title: string;
    subtitle: string;
    cards: { [key: string]: TestimonialCard };
  };
  cta: {
    title: string;
    subtitle: string;
    cta_button1: string;
    cta_button2: string;
    features: CtaFeatures;
  };
}

export interface HomePageProps {
  i18n: HomePageI18n;
}
