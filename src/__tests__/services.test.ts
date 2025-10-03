import { fetchServiceContent, getServiceBySlug, getAllServiceSlugs, convertToServiceData } from '@/lib/services';

// Mock fs module
jest.mock('fs');
jest.mock('gray-matter');

const mockFs = require('fs');
const mockMatter = require('gray-matter');

describe('Services Library', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchServiceContent', () => {
    it('should fetch all service content from MDX files', () => {
      // Mock file system
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['verksted.mdx', 'dekk-og-felg.mdx', 'dekkhotell.mdx', 'bilglass.mdx']);
      mockFs.readFileSync.mockReturnValue('mock file content');

      // Mock gray-matter for each file
      mockMatter
        .mockReturnValueOnce({
          data: {
            slug: 'verksted',
            name: 'Verksted',
            description: 'Generelt verkstedarbeid og reparasjoner',
            overview: 'Vi tilbyr omfattende verkstedtjenester',
            benefits: ['Erfarne mekanikere', 'Moderne utstyr'],
            process: ['Diagnose', 'Reparasjon'],
            pricing: {
              description: 'Fra 950 kr per time',
              details: 'Kontakt oss for prisoverslag'
            },
            faqs: [
              {
                question: 'Hvor lang tid tar service?',
                answer: '2-3 timer vanligvis'
              }
            ],
            updated: '2025-10-03'
          }
        })
        .mockReturnValueOnce({
          data: {
            slug: 'dekk-og-felg',
            name: 'Dekk og felg',
            description: 'Dekkskift og balansering',
            overview: 'Vi tilbyr dekktjenester',
            benefits: ['Profesjonell montering'],
            process: ['Vurdering', 'Montering'],
            pricing: {
              description: 'Fra 200 kr per dekk',
              details: 'Inkluderer montering'
            },
            faqs: [],
            updated: '2025-10-03'
          }
        })
        .mockReturnValueOnce({
          data: {
            slug: 'dekkhotell',
            name: 'Dekkhotell',
            description: 'Oppbevaring av dekk',
            overview: 'Vi tilbyr dekkoppbevaring',
            benefits: ['Trygg oppbevaring'],
            process: ['Bestilling', 'Innlevering'],
            pricing: {
              description: 'Fra 600 kr per sesong',
              details: 'Inkluderer henting'
            },
            faqs: [],
            updated: '2025-10-03'
          }
        })
        .mockReturnValueOnce({
          data: {
            slug: 'bilglass',
            name: 'Bilglass',
            description: 'Reparasjon av bilglass',
            overview: 'Vi tilbyr bilglasstjenester',
            benefits: ['Sertifiserte teknikere'],
            process: ['Vurdering', 'Reparasjon'],
            pricing: {
              description: 'Fra 350 kr',
              details: 'For steinsprutreparasjon'
            },
            faqs: [],
            updated: '2025-10-03'
          }
        });

      const services = fetchServiceContent();

      expect(mockFs.readdirSync).toHaveBeenCalledWith(expect.stringContaining('content/services'));
      expect(services).toHaveLength(4);
      expect(services[0]).toHaveProperty('name', 'Bilglass'); // Sorted alphabetically
      expect(services[0]).toHaveProperty('slug', 'bilglass');
    });

    it('should sort services by name in Norwegian locale', () => {
      // Mock file system for this test
      mockFs.existsSync.mockReturnValue(true);

      // From the first test, we know the services are sorted alphabetically
      const services = fetchServiceContent();

      // Check that services are sorted alphabetically
      expect(services[0].name).toBe('Bilglass');
      expect(services[1].name).toBe('Dekk og felg');
      expect(services[2].name).toBe('Dekkhotell');
      expect(services[3].name).toBe('Verksted');
    });
  });

  describe('getServiceBySlug', () => {
    beforeEach(() => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['verksted.mdx']);
      mockFs.readFileSync.mockReturnValue('mock content');
      mockMatter.mockReturnValue({
        data: {
          slug: 'verksted',
          name: 'Verksted',
          description: 'Test service',
          overview: 'Test overview',
          benefits: [],
          process: [],
          pricing: { description: '', details: '' },
          faqs: [],
          updated: '2025-10-03'
        }
      });
    });

    it('should return service by slug', () => {
      const service = getServiceBySlug('verksted');

      expect(service).not.toBeNull();
      expect(service?.slug).toBe('verksted');
      expect(service?.name).toBe('Verksted');
    });

    it('should return null for non-existent slug', () => {
      const service = getServiceBySlug('non-existent');

      expect(service).toBeNull();
    });
  });

  describe('getAllServiceSlugs', () => {
    it('should return all service slugs', () => {
      // This test will use the cached data from the first test
      const slugs = getAllServiceSlugs();

      expect(slugs).toContain('verksted');
      expect(slugs).toContain('dekk-og-felg');
      expect(slugs).toContain('dekkhotell');
      expect(slugs).toContain('bilglass');
      expect(slugs).toHaveLength(4);
    });
  });

  describe('convertToServiceData', () => {
    it('should convert ServiceContent to ServiceData', () => {
      const serviceContent = {
        slug: 'verksted',
        name: 'Verksted',
        description: 'Test description',
        overview: 'Test overview',
        benefits: ['Benefit 1', 'Benefit 2'],
        process: ['Step 1', 'Step 2'],
        pricing: {
          description: 'Fra 950 kr',
          details: 'Kontakt oss'
        },
        faqs: [
          {
            question: 'Test question?',
            answer: 'Test answer'
          }
        ],
        updated: '2025-10-03',
        fullPath: '/path/to/file'
      };

      const serviceData = convertToServiceData(serviceContent);

      expect(serviceData).toEqual({
        name: 'Verksted',
        description: 'Test description',
        overview: 'Test overview',
        benefits: ['Benefit 1', 'Benefit 2'],
        process: ['Step 1', 'Step 2'],
        pricing: {
          description: 'Fra 950 kr',
          details: 'Kontakt oss'
        },
        faqs: [
          {
            question: 'Test question?',
            answer: 'Test answer'
          }
        ]
      });
    });
  });
});
