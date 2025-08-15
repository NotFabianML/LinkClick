import { useCallback } from "react";

declare const Turbo: {
  visit: (url: string, options?: { action: string }) => void;
};

export const useAppNavigation = () => {
  const currentLocale =
    (window as any).sharedProps?.locale_data?.current_locale || "en";

  const navigate = useCallback(
    (path: string) => {
      const cleanPath = path.startsWith("/") ? path.substring(1) : path;
      const localizedPath = `/${currentLocale}/${cleanPath}`;
      Turbo.visit(localizedPath);
    },
    [currentLocale]
  );

  return { navigate };
};
