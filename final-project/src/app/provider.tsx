"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "@/components/errors/main";
import { getQueryClient } from "@/lib/react-query";
import { ToastProvider } from "@/components/ui/toast";
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";

export const AppProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session;
}) => {
  const queryClient = getQueryClient();
  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <ToastProvider>
            <ReactQueryDevtools />
            {children}
          </ToastProvider>
        </SessionProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
