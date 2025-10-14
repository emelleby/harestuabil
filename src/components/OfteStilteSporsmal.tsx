import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface OfteStilteSporsmalProps {
  faqItems?: FAQItem[];
}

// Default FAQ items (will be made CMS editable later)
const defaultFAQItems: FAQItem[] = [
  {
    id: '1',
    question: 'Hvor lang tid tar en vanlig service?',
    answer: 'En vanlig service tar vanligvis 2-4 timer, avhengig av bilens tilstand og hvilke arbeider som må utføres. Vi gir deg alltid et tidsestimat når du bestiller time.',
  },
  {
    id: '2',
    question: 'Tilbyr dere henteservice?',
    answer: 'Ja, vi tilbyr henteservice innenfor Oslo-området. Kontakt oss for å avtale henting og levering av bilen din.',
  },
  {
    id: '3',
    question: 'Hvor mye koster en service?',
    answer: 'Prisen varierer avhengig av bilmodell og hvilke arbeider som må utføres. Vi gir alltid et prisoverslag før vi starter arbeidet. Kontakt oss for en uforpliktende pris.',
  },
  {
    id: '4',
    question: 'Kan jeg vente mens bilen blir reparert?',
    answer: 'Vi har et komfortabelt venterom med kaffe og WiFi. For lengre reparasjoner anbefaler vi at du benytter vår henteservice eller låner en av våre lånebiler.',
  },
  {
    id: '5',
    question: 'Hvor lang garanti gir dere på arbeidet?',
    answer: 'Vi gir 12 måneders garanti på alt arbeid og reservedeler. Garantien gjelder ved normal bruk av kjøretøyet.',
  },
  {
    id: '6',
    question: 'Må jeg bestille time på forhånd?',
    answer: 'Vi anbefaler at du bestiller time på forhånd for å sikre at vi har ledig kapasitet. Du kan ringe oss eller bruke kontaktskjemaet på denne siden.',
  },
];

export function OfteStilteSporsmal({ faqItems = defaultFAQItems }: OfteStilteSporsmalProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Ofte Stilte Spørsmål
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
