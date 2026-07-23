import type { Metadata } from 'next';
import { Geist_Mono, Source_Sans_3, Space_Grotesk } from 'next/font/google';
import { cn } from '@/src/lib/utils';
import { TooltipProvider } from '@/src/components/ui/tooltip';
import { ThemeProvider } from '@/src/components/providers/theme-provider';
import { QueryProvider } from '@/src/components/providers/query-provider';
import { ToastProvider } from '@/src/components/providers/toast-provider';
import './globals.css';

// ─── Fonts ───────────────────────────────────────────────

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// ─── Metadata ────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'DexDian — School Management',
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
        geistMono.variable,
        spaceGrotesk.variable,
        'font-sans',
        sourceSans.variable,
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
