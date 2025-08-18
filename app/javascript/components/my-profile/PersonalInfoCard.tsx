import React from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { UserProfileData } from '../../types';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

import { User } from 'lucide-react';

interface PersonalInfoCardProps {
  user: UserProfileData;
  isEditing: boolean;
  onUserChange: (updatedUser: UserProfileData) => void;
}

const PersonalInfoCard = ({ user, isEditing, onUserChange }: PersonalInfoCardProps) => {
  const i18n = useI18n();

  const handleInputChange = (field: keyof UserProfileData, value: string) => {
    onUserChange({ ...user, [field]: value });
  };

  const personalInfoFields = [
    { id: 'first_name', label: i18n.profile_tab.personal_info.first_name },
    { id: 'last_name', label: i18n.profile_tab.personal_info.last_name },
    { id: 'email', label: i18n.profile_tab.personal_info.email, disabled: true },
    { id: 'phone', label: i18n.profile_tab.personal_info.phone },
    { id: 'country', label: i18n.profile_tab.personal_info.country },
    { id: 'university', label: i18n.profile_tab.personal_info.university },
  ];

  return (
    <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          {i18n.profile_tab.personal_info.title}
        </CardTitle>
        <CardDescription>{i18n.profile_tab.personal_info.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personalInfoFields.map(field => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                value={user[field.id as keyof UserProfileData] as string || ''}
                onChange={(e) => handleInputChange(field.id as keyof UserProfileData, e.target.value)}
                disabled={!isEditing || field.disabled}
              />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">{i18n.profile_tab.personal_info.bio}</Label>
          <Textarea
            id="bio"
            value={user.bio || ''}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            disabled={!isEditing}
            rows={4}
            placeholder={i18n.profile_tab.personal_info.bio_placeholder}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
