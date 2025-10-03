import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PricingSectionProps {
  pricing: {
    description: string;
    details: string;
  };
}

export function PricingSection({ pricing }: PricingSectionProps): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Priser</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-lg font-medium text-foreground">{pricing.description}</p>
        <p className="text-muted-foreground">{pricing.details}</p>
      </CardContent>
    </Card>
  );
}
