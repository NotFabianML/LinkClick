import React from "react";
import { SharedProps } from "../../types";
import { ThemeToggle } from "../../lib/ThemeToggle";
import { LocaleSwitcher } from "../../lib/LocaleSwitcher";
import { Button } from "../ui/button";
import axios from "axios";
import { LogOut, MessageSquare, Trophy, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

declare const Turbo: any;

const Navbar = (props: SharedProps) => {
  if (!props.i18n || !props.user || !props.locale_data) {
    return null;
  }

  const { i18n, user, locale_data } = props;
  const csrfToken = document.querySelector<HTMLMetaElement>(
    "meta[name='csrf-token']"
  )?.content;

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    axios
      .delete("/users/sign_out", {
        headers: { "X-CSRF-Token": csrfToken },
      })
      .then(() => {
        Turbo.visit(`/${locale_data.current_locale}`);
      })
      .catch((error) => console.error("Logout failed:", error));
  };

  const basePath = `/${locale_data.current_locale}`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-6">
          <a
            href="/"
            className="font-heading font-bold text-xl text-brand hover:text-brand/80 transition-colors"
          >
            TicoLink
          </a>
          {user.logged_in && (
            <>
              <a
                href="/sessions"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sessions
              </a>
              <a
                href="/chat"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <MessageSquare className="h-4 w-4" />
                Chat
              </a>
              <a
                href="/leaderboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Trophy className="h-4 w-4" />
                Leaderboard
              </a>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Placeholder for LocaleSwitcher */}
          <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
            <LocaleSwitcher localeData={locale_data} />
          </div>

          {user.logged_in ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    {/* <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} /> */}
                    {/* <AvatarFallback>{user.initials}</AvatarFallback> */}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <a href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {i18n.navbar.log_out}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <a href={`${basePath}/users/sign_in`}>{i18n.navbar.log_in}</a>
              </Button>
              <Button asChild>
                <a href={`${basePath}/users/sign_up`}>{i18n.navbar.sign_up}</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
