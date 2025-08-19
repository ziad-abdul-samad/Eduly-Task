"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ThemeModeProvider, useThemeMode } from "@/context/ThemeModeContext";

const queryClient = new QueryClient();

// Wrapper that listens to ThemeModeContext and applies correct theme
function ThemeWrapper({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode(); // "light" | "dark"

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeModeProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeWrapper>{children}</ThemeWrapper>
          </QueryClientProvider>
        </ThemeModeProvider>
      </body>
    </html>
  );
}
