import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { PageLoader } from "../components/feedback/Loader";
import { routes } from "./routes";

const AppRoutes = () => {
  const element = useRoutes(routes);

  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster />
    </BrowserRouter>
  );
};
