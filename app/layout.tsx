import "./globals.css";
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle";
import { LogoLink } from "@/components/logo-link";
import Script from 'next/script'

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`px-4 py-6 sm:px-6 lg:px-8 ${montserrat.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between p-2">
              <LogoLink />
              <ModeToggle />
            </div>
            {children}
          </div>
        </ThemeProvider>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="ec5a3a13-755d-4626-a52d-24cf69bae2e8"
          strategy="afterInteractive"
        />
      </body>
    </html >
  );
}