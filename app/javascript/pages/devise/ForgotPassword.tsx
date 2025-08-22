import React from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ForgotPasswordI18n } from "../../types";

interface ForgotPasswordProps {
  i18n: ForgotPasswordI18n;
  csrfToken: string;
}

const ForgotPassword = ({ i18n, csrfToken }: ForgotPasswordProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{i18n.title}</CardTitle>
          <CardDescription>{i18n.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/users/password" method="post" id="new_user">
            <input
              type="hidden"
              name="authenticity_token"
              value={csrfToken}
              autoComplete="off"
            />
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="user_email">{i18n.email_label}</Label>
                <Input
                  id="user_email"
                  name="user[email]"
                  type="email"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {i18n.submit_button}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
