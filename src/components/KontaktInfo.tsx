import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

interface BusinessInfo {
  address: string;
  phone: string;
  email: string;
  openingHours: {
    [key: string]: string;
  };
}

interface KontaktInfoProps {
  businessInfo?: BusinessInfo;
}

// Default business information (will be made CMS editable later)
const defaultBusinessInfo: BusinessInfo = {
  address: 'Eksempelveien 123\n1234 Oslo',
  phone: '+47 123 45 678',
  email: 'post@bilverksted.no',
  openingHours: {
    'Mandag': '08:00 - 17:00',
    'Tirsdag': '08:00 - 17:00',
    'Onsdag': '08:00 - 17:00',
    'Torsdag': '08:00 - 17:00',
    'Fredag': '08:00 - 16:00',
    'Lørdag': 'Stengt',
    'Søndag': 'Stengt',
  },
};

export function KontaktInfo({ businessInfo = defaultBusinessInfo }: KontaktInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Business Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Besøksadresse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <address className="not-italic text-foreground/80 whitespace-pre-line">
            {businessInfo.address}
          </address>
        </CardContent>
      </Card>

      {/* Contact Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Kontakt oss</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a 
              href={`tel:${businessInfo.phone}`}
              className="text-foreground hover:text-primary transition-colors"
            >
              {businessInfo.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a 
              href={`mailto:${businessInfo.email}`}
              className="text-foreground hover:text-primary transition-colors"
            >
              {businessInfo.email}
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Opening Hours */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Åpningstider
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(businessInfo.openingHours).map(([day, hours]) => (
              <div key={day} className="flex justify-between py-1">
                <span className="font-medium">{day}:</span>
                <span className="text-muted-foreground">{hours}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
