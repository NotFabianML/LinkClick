import React from 'react';
import { useI18n } from '../../contexts/I18nContext';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface BioCardProps {
  bio: string | null;
}

const BioCard = ({ bio }: BioCardProps) => {
  const i18n = useI18n();

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>{i18n.bio_card.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {bio || i18n.bio_card.empty}
        </p>
      </CardContent>
    </Card>
  );
};

export default BioCard;
