import React from "react";
import { Card, CardContent } from "../ui/card";
import { type LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  gradient: string;
}

const QuickActionsCard = ({ icon: Icon, title, description, href, gradient }: QuickActionCardProps) => {
   const cardClasses = `
    bg-gradient-to-br ${gradient} 
    border-0 
    hover:opacity-90 
    transition-opacity duration-300 
    cursor-pointer group shadow-lg
  `;
  
  return (
    <a href={href}>
      <Card className={cardClasses}>
        <CardContent className="p-6 text-center">
          <Icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </a>
  );
};

export default QuickActionsCard;
