import React from "react";
import axios from "axios";
import { SharedProps } from "../../types";
import { ThemeToggle } from "../../lib/ThemeToggle";
import { LocaleSwitcher } from "../../lib/LocaleSwitcher";
import { useAppNavigation } from "../../hooks/useAppNavigation";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { LogOut, MessageSquare, Trophy, User, Plus, BookOpen, Compass, LayoutDashboard } from "lucide-react";

declare const Turbo: any;

const NavLink = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => {
  const { navigate } = useAppNavigation();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
  };
  return <a href={href} onClick={handleClick} className={className}>{children}</a>;
};

const Navbar = (props: SharedProps) => {
  if (!props.i18n || !props.user || !props.locale_data) return null;

  const { i18n, user, locale_data } = props;
  const csrfToken = document.querySelector<HTMLMetaElement>("meta[name='csrf-token']")?.content;

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    axios.delete("/users/sign_out", { headers: { "X-CSRF-Token": csrfToken } })
      .then(() => { Turbo.visit(`/${locale_data.current_locale}`); })
      .catch((error) => console.error("Logout failed:", error));
  };

  const logoHref = user.logged_in ? "/dashboard" : "/";

  return (
    <nav className="">
    {/* <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border/40"> */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-6">
          <NavLink href={logoHref} className="font-heading font-bold text-xl text-brand hover:text-brand/80 transition-colors">
            LinkClick
          </NavLink>
          {user.logged_in && (
            <>
              {/* Admin-specific link */}
              {user.abilities.can_access_admin_dashboard && (
                <NavLink href="/admin/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <LayoutDashboard className="h-4 w-4" /> Admin
                </NavLink>
              )}

              {/* Student & Teacher links */}
              {user.abilities.can_view_browse && (
                <NavLink href="/browse" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <Compass className="h-4 w-4" /> Browse
                </NavLink>
              )}
              {user.abilities.can_view_sessions && (
                <NavLink href="/sessions" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <BookOpen className="h-4 w-4" /> {i18n.navbar.sessions_link}
                </NavLink>
              )}
              {user.abilities.can_view_chat && (
                 <NavLink href="/chat" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" /> {i18n.navbar.chat_link}
                </NavLink>
              )}
              {user.abilities.can_view_leaderboard && (
                <NavLink href="/leaderboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <Trophy className="h-4 w-4" /> {i18n.navbar.leaderboard_link}
                </NavLink>
              )}
            </>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* {user.abilities.can_create_session && (
            <NavLink href="/sessions/new">
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Crear Sesión
              </Button>
            </NavLink>
          )} */}
          
          <ThemeToggle />
          <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
            <LocaleSwitcher localeData={locale_data} />
          </div>

          {user.logged_in ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${user.email}`} alt={user.email ?? ""} />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <NavLink href="/profile" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" /> {i18n.navbar.profile_link}
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> {i18n.navbar.log_out}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost"><a href={`/${locale_data.current_locale}/users/sign_in`}>{i18n.navbar.log_in}</a></Button>
              <Button asChild><a href={`/${locale_data.current_locale}/users/sign_up`}>{i18n.navbar.sign_up}</a></Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
