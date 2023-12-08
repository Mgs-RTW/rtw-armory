"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "react-query";
import { AuthProvider } from "@/domain/auth/AuthProvider";
import { queryClient } from "@/util/react-query";

export const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>{children}</AuthProvider>
  </QueryClientProvider>
);
