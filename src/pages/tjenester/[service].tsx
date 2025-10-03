import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import BasicMeta from '@/components/meta/BasicMeta';
import { ServicePage } from '@/components/ServicePage';
import { ServiceData } from '@/types/service';

interface ServicePageProps {
  serviceData: ServiceData;
}

export default function ServicePageRoute({ serviceData }: ServicePageProps) {
  return (
    <Layout>
      <BasicMeta 
        url={`/tjenester/${serviceData.name.toLowerCase().replace(/\s+/g, '-')}`} 
        title={serviceData.name}
        description={serviceData.description}
      />
      <ServicePage serviceData={serviceData} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // For now, we'll define the available service paths statically
  // In a real implementation, this would read from the content/services directory
  const servicePaths = [
    'verksted',
    'dekk-og-felg',
    'dekkhotell',
    'bilglass'
  ];

  const paths = servicePaths.map((service) => ({
    params: { service }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const serviceSlug = params?.service as string;
  
  // Mock service data - in a real implementation, this would read from MDX files
  const serviceDataMap: Record<string, ServiceData> = {
    'verksted': {
      name: 'Verksted',
      description: 'Generelt verkstedarbeid og reparasjoner for alle bilmerker',
      overview: 'Vi tilbyr omfattende verkstedtjenester for alle bilmerker. Våre erfarne mekanikere bruker moderne utstyr og originale reservedeler for å sikre at bilen din får den beste behandlingen.',
      benefits: [
        'Erfarne og sertifiserte mekanikere',
        'Moderne diagnostikkutstyr',
        'Originale og kvalitetsreservedeler',
        'Konkurransedyktige priser',
        'Rask og pålitelig service'
      ],
      process: [
        'Innledende diagnose og feilsøking',
        'Detaljert kostnadsoverslag',
        'Godkjenning fra kunde før arbeid starter',
        'Utførelse av reparasjoner og service',
        'Kvalitetskontroll og testing',
        'Levering av ferdig bil'
      ],
      pricing: {
        description: 'Fra 950 kr per time',
        details: 'Kontakt oss for et detaljert prisoverslag basert på din bils behov. Vi tilbyr alltid transparent prising uten skjulte kostnader.'
      },
      faqs: [
        {
          question: 'Hvor lang tid tar en standard service?',
          answer: 'En standard service tar vanligvis 2-3 timer, avhengig av bilens tilstand og hvilke arbeider som må utføres.'
        },
        {
          question: 'Tilbyr dere garanti på arbeidet?',
          answer: 'Ja, vi gir 12 måneders garanti på alt verkstedarbeid og 24 måneders garanti på reservedeler.'
        }
      ]
    },
    'dekk-og-felg': {
      name: 'Dekk og felg',
      description: 'Dekkskift, balansering og felgreparasjoner',
      overview: 'Vi tilbyr komplette dekk- og felgtjenester, inkludert sesongskift, balansering, reparasjoner og salg av nye dekk og felger.',
      benefits: [
        'Profesjonell dekkmontering og balansering',
        'Stort utvalg av dekk fra kjente merker',
        'Felgreparasjoner og oppussing',
        'Sesongoppbevaring av dekk'
      ],
      process: [
        'Vurdering av eksisterende dekk og felger',
        'Anbefaling av nye dekk ved behov',
        'Demontering av gamle dekk',
        'Montering og balansering av nye dekk'
      ],
      pricing: {
        description: 'Fra 200 kr per dekk',
        details: 'Prisen inkluderer montering, balansering og ventiler.'
      },
      faqs: [
        {
          question: 'Når bør jeg skifte dekk?',
          answer: 'Sommerdekk bør skiftes når temperaturen konsekvent er under 7°C.'
        }
      ]
    }
  };

  const serviceData = serviceDataMap[serviceSlug];

  if (!serviceData) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      serviceData
    }
  };
};
