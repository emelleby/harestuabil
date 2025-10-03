import { render, screen } from '@testing-library/react';
import { OverviewSection } from '@/components/services/OverviewSection';
import { BenefitsSection } from '@/components/services/BenefitsSection';
import { ProcessSection } from '@/components/services/ProcessSection';
import { PricingSection } from '@/components/services/PricingSection';
import { FAQSection } from '@/components/services/FAQSection';

describe('Service Section Components', () => {
  describe('OverviewSection', () => {
    it('should render overview content with Norwegian heading', () => {
      const content = 'Vi tilbyr omfattende verkstedtjenester for alle bilmerker.';
      render(<OverviewSection content={content} />);
      
      expect(screen.getByText('Oversikt')).toBeInTheDocument();
      expect(screen.getByText(content)).toBeInTheDocument();
    });
  });

  describe('BenefitsSection', () => {
    const mockBenefits = [
      'Erfarne mekanikere',
      'Moderne utstyr',
      'Konkurransedyktige priser'
    ];

    it('should render benefits list with Norwegian heading', () => {
      render(<BenefitsSection benefits={mockBenefits} />);
      
      expect(screen.getByText('Fordeler')).toBeInTheDocument();
      mockBenefits.forEach(benefit => {
        expect(screen.getByText(benefit)).toBeInTheDocument();
      });
    });

    it('should render bullet points for each benefit', () => {
      render(<BenefitsSection benefits={mockBenefits} />);
      
      const bulletPoints = screen.getAllByText('•');
      expect(bulletPoints).toHaveLength(mockBenefits.length);
    });
  });

  describe('ProcessSection', () => {
    const mockSteps = [
      'Innledende diagnose',
      'Kostnadsoverslag',
      'Utførelse av arbeid',
      'Kvalitetskontroll'
    ];

    it('should render process steps with Norwegian heading', () => {
      render(<ProcessSection steps={mockSteps} />);
      
      expect(screen.getByText('Prosess')).toBeInTheDocument();
      mockSteps.forEach(step => {
        expect(screen.getByText(step)).toBeInTheDocument();
      });
    });

    it('should render numbered steps', () => {
      render(<ProcessSection steps={mockSteps} />);
      
      mockSteps.forEach((_, index) => {
        expect(screen.getByText((index + 1).toString())).toBeInTheDocument();
      });
    });
  });

  describe('PricingSection', () => {
    const mockPricing = {
      description: 'Priser fra 800 kr per time',
      details: 'Kontakt oss for detaljert prisoverslag'
    };

    it('should render pricing information with Norwegian heading', () => {
      render(<PricingSection pricing={mockPricing} />);
      
      expect(screen.getByText('Priser')).toBeInTheDocument();
      expect(screen.getByText(mockPricing.description)).toBeInTheDocument();
      expect(screen.getByText(mockPricing.details)).toBeInTheDocument();
    });
  });

  describe('FAQSection', () => {
    const mockFAQs = [
      {
        question: 'Hvor lang tid tar en service?',
        answer: 'En standard service tar vanligvis 2-3 timer.'
      },
      {
        question: 'Tilbyr dere garanti?',
        answer: 'Ja, vi gir 12 måneders garanti på alt arbeid.'
      }
    ];

    it('should render FAQ items with Norwegian heading', () => {
      render(<FAQSection faqs={mockFAQs} />);
      
      expect(screen.getByText('Ofte stilte spørsmål')).toBeInTheDocument();
      mockFAQs.forEach(faq => {
        expect(screen.getByText(faq.question)).toBeInTheDocument();
        expect(screen.getByText(faq.answer)).toBeInTheDocument();
      });
    });
  });
});
