"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import ClientOnly from "@/components/ClientOnly";

export default function DashboardPage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const { user, isLoading } = useUser();
  const { locale } = useLanguage();
  const translate = t(locale);

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    if (!user) return 0;

    let completed = 0;
    let total = 8;

    // Basic user info
    if (user.name) completed++;
    if (user.email) completed++;
    if (user.organization) completed++;

    // Check localStorage for additional profile data
    try {
      const savedProfile = localStorage.getItem('ngo_profile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.mission) completed++;
        if (profile.impactStory) completed++;
        if (profile.sectors && profile.sectors.length > 0) completed++;
        if (profile.geographicFocus && profile.geographicFocus.length > 0) completed++;
        if (profile.fundingNeeds) completed++;
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }

    return Math.round((completed / total) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please log in to access your dashboard.</p>
      </div>
    );
  }

  return (
    <ClientOnly fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <div className="space-y-8">
        {/* Welcome banner */}
        {showWelcome && (
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {translate('Welcome')}, {user?.name}! 🌍
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {translate('Find Funders Description')}
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/search">{translate('Start Searching')}</Link>
                  </Button>
                </div>
                <button
                  onClick={() => setShowWelcome(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Completion Card */}
        {profileCompletion < 100 && (
          <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Complete Your Profile
                  </h3>
                  <p className="text-gray-600 mb-4">
                    A complete profile helps our AI find better funding matches for your organization.
                  </p>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${profileCompletion}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{profileCompletion}%</span>
                  </div>
                  <Button asChild variant="outline">
                    <Link href="/dashboard/profile">Complete Profile</Link>
                  </Button>
                </div>
                <div className="ml-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main CTA */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{translate('dashboard.findPerfectFunders')}</CardTitle>
            <CardDescription>
              {translate('dashboard.naturalLanguageDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="max-w-md mx-auto">
              <p className="text-gray-600 text-sm mb-4">
                Try searching for: "climate change solutions in Africa" or "education technology for underserved communities"
              </p>
              <Button size="lg" asChild className="w-full">
                <Link href="/dashboard/search">
                  🔍 Start Semantic Search
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* How it works */}
        <Card>
          <CardHeader>
            <CardTitle>How Semantic Search Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🧠</span>
                </div>
                <h3 className="font-medium mb-2">Describe Your Mission</h3>
                <p className="text-sm text-gray-600">Use natural language to describe what you do and what funding you need</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🎯</span>
                </div>
                <h3 className="font-medium mb-2">AI Finds Matches</h3>
                <p className="text-sm text-gray-600">Our AI understands context and meaning, not just keywords</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="font-medium mb-2">See Why It Matches</h3>
                <p className="text-sm text-gray-600">Get explanations for each match and provide feedback to improve results</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientOnly>
  );
}