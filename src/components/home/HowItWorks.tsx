"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export function HowItWorks() {
  const { locale } = useLanguage();
  const translate = t(locale);

  const steps = [
    {
      step: "1",
      title: "Create Your Profile",
      description: "Tell us about your organization, mission, and funding needs in your own words.",
      icon: "📝"
    },
    {
      step: "2", 
      title: "Search with Natural Language",
      description: "Describe what you're looking for: 'climate change solutions in Africa' or 'education technology for rural communities'.",
      icon: "🔍"
    },
    {
      step: "3",
      title: "Get Smart Matches",
      description: "Our AI analyzes thousands of funders and presents the best matches with explanations.",
      icon: "🎯"
    },
    {
      step: "4",
      title: "Apply with Confidence",
      description: "Access detailed funder profiles, requirements, and application guidance.",
      icon: "✅"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50 rounded-2xl my-16">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-xl text-gray-600 mb-12">
          Find your perfect funders in four simple steps
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step number */}
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                {step.step}
              </div>
              
              {/* Icon */}
              <div className="text-3xl mb-4">{step.icon}</div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>

              {/* Connector line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-blue-200 transform -translate-y-1/2" 
                     style={{ width: 'calc(100% - 3rem)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}