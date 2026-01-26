"use client";

import { ContentViewProvider } from "@/contexts/ContentViewContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <ContentViewProvider>{children}</ContentViewProvider>;
}
