import { useLocation } from "react-router-dom";

export function useActivePath() {
  const { pathname } = useLocation();

  const isActive = (path: string, exact: boolean = false): boolean => {
    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };
  return { pathname, isActive };
}
