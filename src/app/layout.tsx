import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { UserProvider } from "@/contexts/UserContext";
import { ToastProvider } from "@/components/Toast";
import ErrorBoundary from "@/components/ErrorBoundary";
import ClientOnly from "@/components/ClientOnly";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Heterotopia - Connect NGOs with Funders",
  description: "Streamline partnerships between organizations and funders through intelligent matching and discovery",
  keywords: "NGO, funders, grants, nonprofit, funding, partnerships, social impact",
  authors: [{ name: "Heterotopia Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ErrorBoundary>
          <ClientOnly fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }>
            <ToastProvider>
              <LanguageProvider>
                <UserProvider>
                  {children}
                </UserProvider>
              </LanguageProvider>
            </ToastProvider>
          </ClientOnly>
        </ErrorBoundary>
      </body>
    </html>
  );
}