"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export function FeatureCards() {
  const { locale } = useLanguage();
  const translate = t(locale);

  const features = [
    {
      icon: "🔍",
      title: "Semantic Search",
      description: "Describe your mission in natural language and find funders who truly understand your work."
    },
    {
      icon: "🤖",
      title: "AI-Powered Matching",
      description: "Our AI analyzes funder priorities and your organization's mission for perfect matches."
    },
    {
      icon: "🌍",
      title: "Global Database",
      description: "Access thousands of funders worldwide, from foundations to government programs."
    },
    {
      icon: "📊",
      title: "Smart Analytics",
      description: "Track your applications and get insights on funding success patterns."
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
      {features.map((feature, index) => (
        <div key={index} className="text-center p-6 rounded-lg bg-white shadow-sm border hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}