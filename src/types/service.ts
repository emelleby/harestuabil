export interface ServiceData {
  name: string;
  description: string;
  overview: string;
  benefits: string[];
  process: string[];
  pricing: {
    description: string;
    details: string;
  };
  faqs: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export type ServiceType = 'verksted' | 'dekk-og-felg' | 'dekkhotell' | 'bilglass';
