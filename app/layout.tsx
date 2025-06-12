import "./globals.css";
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle";
import { LogoLink } from "@/components/logo-link";
import { Settings2, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StateProvider } from "@/components/state-provider";

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`px-4 pt-6 sm:px-6 lg:px-8 ${montserrat.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="max-w-7xl mx-auto min-h-screen flex flex-col">
            <div className="flex items-center justify-between p-2">
              <LogoLink />
              <div className="flex items-center gap-2">
                <ModeToggle />
                <Button asChild>
                  <Link href="/settings">
                    <Settings2 className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <StateProvider>
              <main className="flex-1">{children}</main>
            </StateProvider>
            <footer className="mt-2 text-center bg-card text-sm text-muted-foreground py-3 border-t border-x rounded-t-xl">
              Made with <Heart className="inline w-3 h-3 mx-1 text-red-700" fill="currentColor" /> in Brussels
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
