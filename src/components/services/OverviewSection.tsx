import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OverviewSectionProps {
  content: string;
}

export function OverviewSection({ content }: OverviewSectionProps): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Oversikt</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
}
