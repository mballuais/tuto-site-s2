"use client";

import { SessionProvider } from "next-auth/react";
import { MantineProvider, createTheme } from "@mantine/core";
import "@fontsource/inter";
import { ReactNode } from "react";

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  primaryColor: "indigo",
  defaultRadius: "md",
  headings: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <MantineProvider theme={theme}>
        {children}
      </MantineProvider>
    </SessionProvider>
  );
}
