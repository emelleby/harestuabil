import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface MapLocation {
  latitude: number;
  longitude: number;
  address: string;
}

interface KartVisningProps {
  location?: MapLocation;
}

// Default location (will be made CMS editable later)
const defaultLocation: MapLocation = {
  latitude: 59.9139,
  longitude: 10.7522,
  address: 'Eksempelveien 123, 1234 Oslo',
};

export function KartVisning({ location = defaultLocation }: KartVisningProps) {
  // Google Maps embed URL with GDPR-compliant parameters
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'demo'}&q=${encodeURIComponent(location.address)}&zoom=15&maptype=roadmap`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Finn oss
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted">
          {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Verksted lokasjon"
              className="w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">Kart vil vises når Google Maps API er konfigurert</p>
                <p className="text-xs mt-1">{location.address}</p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>{location.address}</p>
        </div>
      </CardContent>
    </Card>
  );
}
