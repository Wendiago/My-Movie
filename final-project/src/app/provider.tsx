"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "@/components/errors/main";
import { getQueryClient } from "@/lib/react-query";
import { ToastProvider } from "@/components/ui/toast";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const queryClient = getQueryClient();
  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <ReactQueryDevtools />
          {children}
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
