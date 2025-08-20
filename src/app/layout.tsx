"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ThemeModeProvider, useThemeMode } from "@/context/ThemeModeContext";
import { I18nProvider } from "@/context/I18nContext"; 

const queryClient = new QueryClient();

function ThemeWrapper({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode(); 

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
            <I18nProvider>
              <ThemeWrapper>{children}</ThemeWrapper>
            </I18nProvider>
          </QueryClientProvider>
        </ThemeModeProvider>
      </body>
    </html>
  );
}
