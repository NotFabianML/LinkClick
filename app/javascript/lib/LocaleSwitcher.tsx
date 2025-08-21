import React from "react";
import { Button } from "../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { LocaleData } from "../types";

export function LocaleSwitcher({ localeData }: { localeData: LocaleData }) {
  const { current_locale, en_url, es_url } = localeData;
  if (!localeData.en_url || !localeData.es_url) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild disabled={current_locale === 'en'}>
          <a href={en_url} data-turbo="false">English</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild disabled={current_locale === 'es'}>
          <a href={es_url} data-turbo="false">Español</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}