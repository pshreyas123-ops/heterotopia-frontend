"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FeatureCards } from "@/components/home/FeatureCards";
import { HowItWorks } from "@/components/home/HowItWorks";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function HomePage() {
  const { locale } = useLanguage();
  const translate = t(locale);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header showAuth={true} />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {translate('home.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            {translate('home.subtitle')}
          </p>

          <FeatureCards />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard/search">{translate('common.trySemanticSearch')}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">{translate('common.seeHowItWorks')}</Link>
            </Button>
          </div>
        </div>

        <HowItWorks />

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Why NGOs Choose Heterotopia</h2>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🧠</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Intelligent Matching</h3>
                  <p className="text-gray-600">Our AI understands your mission beyond keywords, finding funders who truly align with your work.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Save Time</h3>
                  <p className="text-gray-600">Stop manually searching through databases. Get personalized recommendations delivered to your dashboard.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📈</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Track Progress</h3>
                  <p className="text-gray-600">Manage your entire funding pipeline from research to application in one organized dashboard.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🌍</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Global Reach</h3>
                  <p className="text-gray-600">Access funders from around the world, with support for multiple languages and regions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}