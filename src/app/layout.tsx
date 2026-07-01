import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { cn } from '@/src/lib/utils';
import { TooltipProvider } from '@/src/components/ui/tooltip';
import { ThemeProvider } from '@/src/components/providers/theme-provider';
import { QueryProvider } from '@/src/components/providers/query-provider';
import { ToastProvider } from '@/src/components/providers/toast-provider';
import './globals.css';

// ─── Fonts ───────────────────────────────────────────────

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// ─── Metadata ────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'DexDain — School Management',
  description:
    'A modern school and college management platform for students, parents, and educators.',
};

// ─── Root Layout ─────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable,
      )}
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <QueryProvider>
            <TooltipProvider delayDuration={300}>
              <ToastProvider />
              {children}
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
