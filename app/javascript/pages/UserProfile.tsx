import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Github, Linkedin, Star, Award, MessageSquare } from "lucide-react";
import { SharedProps } from "../types";
import { UserProfileData, UserProfileI18n } from "../types/profiles.types";

type UserProfilePageProps = {
  i18n: UserProfileI18n;
  user_data: UserProfileData;
  is_current_user: boolean;
  shared_props: SharedProps;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
const UserProfilePage = (props: UserProfilePageProps) => {
  const { i18n, user_data, is_current_user, shared_props } = props;

  if (!i18n || !user_data) {
    return <div>Cargando...</div>;
  }
  const userInitials = `${user_data.first_name?.[0] || ""}${
    user_data.last_name?.[0] || ""
  }`.toUpperCase();
  const profileEditPath = `/${shared_props?.locale_data.current_locale}/profile/edit`;

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda - Información del Usuario */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${user_data.email}`}
                      alt={user_data.first_name || undefined}
                    />
                    <AvatarFallback className="text-2xl">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">
                      {user_data.first_name} {user_data.last_name}
                    </h1>
                    <Badge
                      variant={
                        user_data.role === "Teacher" ? "default" : "secondary"
                      }
                      className="mt-2"
                    >
                      {user_data.role}
                    </Badge>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-2">
                    {user_data.linkedin_url && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={user_data.linkedin_url} target="_blank">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {user_data.github_url && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={user_data.github_url} target="_blank">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* {is_current_user && <Button asChild className="w-full"><a href={profileEditPath}>{i18n.edit_button}</a></Button>} */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha - Detalles del Perfil */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {user_data.bio || "No bio available"}
                </p>
              </CardContent>
            </Card>

            {/* Interests & Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Interests & Skills</CardTitle>
              </CardHeader>
              <CardContent>
                {user_data.interests.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user_data.interests.map((interest) => (
                      <Badge key={interest.id} variant="outline">
                        {interest.name}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No interests found
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Badges Earned */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Badges Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user_data.badges.length > 0 ? (
                  <div className="space-y-4">
                    {user_data.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        {/* <div className="text-2xl">{badge.icon}</div> */}
                        <div>
                          <h3 className="font-medium">{badge.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No badges earned
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Feedback Received */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Feedback Received
                </CardTitle>
                <CardDescription>
                  Reviews from recent sessions and collaborations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user_data.feedbacks.length > 0 ? (
                  <div className="space-y-4">
                    {user_data.feedbacks.map((review) => (
                      <div
                        key={review.id}
                        className="border-l-2 border-primary/20 pl-4 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {review.giver_name}
                          </span>
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No feedback found
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
