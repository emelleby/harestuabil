import React from 'react';

interface ServicePageHeaderProps {
  name: string;
  description: string;
}

export function ServicePageHeader({ name, description }: ServicePageHeaderProps): React.ReactElement {
  return (
    <div lang="nb" className="text-center space-y-4 py-8">
      <h1 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
        {name}
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto md:text-2xl">
        {description}
      </p>
    </div>
  );
}
