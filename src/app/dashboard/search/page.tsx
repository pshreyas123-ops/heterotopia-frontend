"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ClientOnly from "@/components/ClientOnly";

interface Funder {
  id: string;
  name: string;
  description: string;
  focusAreas: string[];
  grantRange: string;
  location: string;
  totalGranted: string;
  activeGrants: number;
  logo: string;
  website: string;
  applicationProcess: string;
  requirements: string[];
  recentGrants: string[];
}

interface FunderWithMatch extends Funder {
  matchScore: number;
  matchReasons: string[];
}

// Enhanced mock funder data with match explanations
const mockFunders: Funder[] = [
  {
    id: "1",
    name: "Impact Foundation",
    description: "Supporting innovative solutions for global health and education challenges through technology and community partnerships.",
    focusAreas: ["Health", "Education", "Innovation", "Technology"],
    grantRange: "$50K - $250K",
    location: "United States",
    totalGranted: "$2.5M",
    activeGrants: 12,
    logo: "🏥",
    website: "www.impactfoundation.org",
    applicationProcess: "Rolling applications",
    requirements: ["501(c)(3) status", "Detailed impact metrics", "Technology component"],
    recentGrants: ["Mobile health clinics in Kenya", "Educational apps for rural schools", "Telemedicine platforms"]
  },
  {
    id: "2",
    name: "Green Future Fund",
    description: "Accelerating climate solutions and environmental sustainability projects worldwide, with focus on renewable energy and conservation.",
    focusAreas: ["Environment", "Climate", "Sustainability", "Renewable Energy"],
    grantRange: "$25K - $100K",
    location: "Europe",
    totalGranted: "$1.8M",
    activeGrants: 8,
    logo: "🌱",
    website: "www.greenfuturefund.org",
    applicationProcess: "Quarterly deadlines",
    requirements: ["Environmental impact focus", "Measurable outcomes", "Local partnerships"],
    recentGrants: ["Solar power for rural communities", "Forest restoration projects", "Clean water initiatives"]
  },
  {
    id: "3",
    name: "Education Alliance",
    description: "Empowering communities through education and youth development programs, especially in underserved areas.",
    focusAreas: ["Education", "Youth Development", "Community", "Literacy"],
    grantRange: "$10K - $75K",
    location: "Global",
    totalGranted: "$950K",
    activeGrants: 15,
    logo: "📚",
    website: "www.educationalliance.org",
    applicationProcess: "Open applications",
    requirements: ["Education focus", "Community engagement", "Progress reporting"],
    recentGrants: ["Adult literacy programs", "STEM education for girls", "Teacher training initiatives"]
  },
  {
    id: "4",
    name: "Community Health Partners",
    description: "Supporting grassroots health initiatives in underserved communities across Sub-Saharan Africa.",
    focusAreas: ["Health", "Community", "Access", "Maternal Health"],
    grantRange: "$15K - $60K",
    location: "Sub-Saharan Africa",
    totalGranted: "$1.2M",
    activeGrants: 20,
    logo: "🏥",
    website: "www.communityhealthpartners.org",
    applicationProcess: "Rolling applications",
    requirements: ["Community-based", "Health focus", "Local leadership"],
    recentGrants: ["Maternal health clinics", "Vaccination campaigns", "Health worker training"]
  },
  {
    id: "5",
    name: "Tech for Good Initiative",
    description: "Funding technology solutions that address social and humanitarian challenges in developing countries.",
    focusAreas: ["Technology", "Innovation", "Social Impact", "Digital Health"],
    grantRange: "$75K - $500K",
    location: "North America",
    totalGranted: "$4.2M",
    activeGrants: 6,
    logo: "💻",
    website: "www.techforgood.org",
    applicationProcess: "Bi-annual cycles",
    requirements: ["Technology component", "Scalability plan", "User research"],
    recentGrants: ["Digital health platforms", "Educational technology", "Financial inclusion apps"]
  }
];

// Function to calculate match score and explanation based on search query
const calculateMatch = (funder: Funder, query: string, filters: { focusArea: string; location: string }) => {
  let score = 0;
  let reasons = [];

  // Semantic matching simulation (in real app, this would use AI)
  const queryLower = query.toLowerCase();
  const funderText = (funder.description + " " + funder.focusAreas.join(" ")).toLowerCase();

  // Direct keyword matches
  const keywords = queryLower.split(" ").filter(word => word.length > 2);
  const keywordMatches = keywords.filter(keyword => funderText.includes(keyword));
  if (keywordMatches.length > 0) {
    score += keywordMatches.length * 15;
    reasons.push(`Keywords: ${keywordMatches.join(", ")}`);
  }

  // Focus area alignment
  const focusMatches = funder.focusAreas.filter(area => 
    queryLower.includes(area.toLowerCase()) || 
    area.toLowerCase().includes(queryLower.split(" ")[0])
  );
  if (focusMatches.length > 0) {
    score += focusMatches.length * 20;
    reasons.push(`Focus areas: ${focusMatches.join(", ")}`);
  }

  // Semantic similarity simulation
  const semanticKeywords = {
    "health": ["medical", "healthcare", "wellness", "clinic", "hospital", "treatment", "maternal", "vaccination"],
    "education": ["learning", "school", "teaching", "literacy", "training", "academic", "stem"],
    "environment": ["climate", "green", "sustainability", "conservation", "renewable", "forest", "solar"],
    "technology": ["digital", "innovation", "tech", "mobile", "app", "platform", "telemedicine"],
    "community": ["grassroots", "local", "rural", "underserved", "village", "developing"]
  };

  for (const [concept, synonyms] of Object.entries(semanticKeywords)) {
    if (synonyms.some(syn => queryLower.includes(syn)) && 
        funder.focusAreas.some(area => area.toLowerCase().includes(concept))) {
      score += 25;
      reasons.push(`Semantic match: ${concept}`);
    }
  }

  // Location preference
  if (filters.location && funder.location === filters.location) {
    score += 15;
    reasons.push(`Location: ${filters.location}`);
  }

  // Focus area filter
  if (filters.focusArea && funder.focusAreas.includes(filters.focusArea)) {
    score += 20;
    reasons.push(`Focus area: ${filters.focusArea}`);
  }

  return {
    score: Math.min(score, 100),
    reasons: reasons.slice(0, 3) // Limit to top 3 reasons
  };
};

const focusAreas = [
  "Health", "Education", "Environment", "Technology", "Community", 
  "Climate", "Innovation", "Youth Development", "Sustainability"
].filter(area => area && area.trim() && area !== "");

const locations = [
  "Global", "United States", "Europe", "Sub-Saharan Africa", 
  "Asia", "Latin America", "North America"
].filter(location => location && location.trim() && location !== "");

const searchExamples = [
  "Mobile health clinics for maternal care in rural Kenya",
  "STEM education programs for girls in underserved communities",
  "Solar power solutions for off-grid villages in Africa",
  "Digital literacy training for elderly populations",
  "Clean water access projects in Southeast Asia"
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFocusArea, setSelectedFocusArea] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [results, setResults] = useState<FunderWithMatch[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});

  // Safe setters to prevent empty values
  const safeSetFocusArea = (value: string) => {
    setSelectedFocusArea(value || "all");
  };

  const safeSetLocation = (value: string) => {
    setSelectedLocation(value || "all");
  };
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const filters = {
      focusArea: selectedFocusArea === "all" ? "" : selectedFocusArea,
      location: selectedLocation === "all" ? "" : selectedLocation
    };

    // Calculate matches with explanations
    const matchedResults = mockFunders.map(funder => {
      const match = calculateMatch(funder, searchQuery, filters);
      return {
        ...funder,
        matchScore: match.score,
        matchReasons: match.reasons
      };
    })
    .filter(funder => funder.matchScore > 20) // Only show decent matches
    .sort((a, b) => b.matchScore - a.matchScore);

    setResults(matchedResults);
    setHasSearched(true);
    setIsSearching(false);
  };

  const handleFeedback = (funderId: string, isGood: boolean) => {
    setFeedback(prev => ({
      ...prev,
      [funderId]: isGood
    }));
    
    // In real app, this would send feedback to backend for learning
    console.log(`Feedback for ${funderId}: ${isGood ? 'Good' : 'Bad'} match`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    safeSetFocusArea("all");
    safeSetLocation("all");
    setResults([]);
    setHasSearched(false);
    setFeedback({});
  };

  const useExample = (example: string) => {
    setSearchQuery(example);
  };

  return (
    <ClientOnly fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading search...</p>
          </div>
        </div>
      </div>
    }>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-100">
            <span className="text-2xl">🧠</span>
            <span className="text-sm font-medium text-blue-700">AI-Powered Semantic Search</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Find Your Perfect Funders</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe your project in natural language and discover aligned funders instantly
          </p>
        </div>

        {/* Search Interface */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Main Search Input */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-lg font-semibold text-gray-800">
                  Describe your project or funding needs
                </label>
                <div className="relative">
                  <textarea
                    placeholder="e.g., 'We need funding for mobile health clinics in rural Kenya to provide maternal healthcare services and train local health workers...'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-32 p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                    onKeyDown={(e) => e.key === 'Enter' && e.ctrlKey && handleSearch()}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    Ctrl + Enter to search
                  </div>
                </div>
              </div>

              {/* Quick Examples - Mobile Optimized */}
              {!hasSearched && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-600">💡 Try these examples:</p>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                    {searchExamples.map((example, idx) => (
                      <button
                        key={idx}
                        onClick={() => useExample(example)}
                        className="text-sm bg-blue-50 hover:bg-blue-100 active:bg-blue-200 text-blue-700 px-4 py-3 rounded-lg border border-blue-200 transition-colors text-left touch-manipulation min-h-[44px] flex items-center"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Filters - Mobile Optimized */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Focus Area (Optional)</label>
                  <Select value={selectedFocusArea || "all"} onValueChange={safeSetFocusArea}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 touch-manipulation">
                      <SelectValue placeholder="Any focus area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any focus area</SelectItem>
                      {focusAreas.filter(area => area && area.trim()).map((area) => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location (Optional)</label>
                  <Select value={selectedLocation || "all"} onValueChange={safeSetLocation}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 touch-manipulation">
                      <SelectValue placeholder="Any location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any location</SelectItem>
                      {locations.filter(location => location && location.trim()).map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Search Button - Mobile Optimized */}
              <div className="flex justify-center">
                <Button 
                  onClick={handleSearch} 
                  disabled={!searchQuery.trim() || isSearching}
                  size="lg"
                  className="w-full sm:w-auto px-8 sm:px-12 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:from-blue-800 active:to-purple-800 shadow-lg touch-manipulation min-h-[48px]"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      AI is analyzing...
                    </>
                  ) : (
                    <>
                      🔍 Search with AI
                    </>
                  )}
                </Button>
              </div>

              {/* Results Summary */}
              {hasSearched && (
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-medium text-gray-800">
                      Found {results.length} matching funders
                    </p>
                    {results.length > 0 && (
                      <div className="flex items-center space-x-1 text-sm text-green-600">
                        <span>✨</span>
                        <span>AI-powered matches</span>
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" onClick={clearSearch} className="text-gray-600">
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {hasSearched && (
          <div className="space-y-6">
            {results.length === 0 ? (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🔍</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">No matches found</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Try adjusting your search terms or removing some filters. Our AI works best with specific, descriptive language.
                  </p>
                  <Button variant="outline" onClick={clearSearch} size="lg">
                    Try Different Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              results.map((funder) => (
                <Card key={funder.id} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start space-x-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-3xl shadow-md">
                          {funder.logo}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-2xl font-bold text-gray-900">{funder.name}</h3>
                            <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                              <span className="text-sm font-semibold">{funder.matchScore}%</span>
                              <span className="text-xs">match</span>
                            </div>
                          </div>
                          <p className="text-gray-700 text-lg mb-4 leading-relaxed">{funder.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <span>📍</span>
                              <span>{funder.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>💰</span>
                              <span>{funder.grantRange}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>📊</span>
                              <span>{funder.totalGranted} total granted</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Match Explanation */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-100">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm">🎯</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-blue-900 mb-3">Why this is a great match:</h4>
                          <ul className="space-y-2">
                            {funder.matchReasons.map((reason, idx) => (
                              <li key={idx} className="flex items-center text-blue-800">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                <span className="font-medium">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Focus Areas */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Focus Areas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {funder.focusAreas.map((area, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Recent Grants */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Recent Grants:</h4>
                        <ul className="space-y-2">
                          {funder.recentGrants.slice(0, 3).map((grant, idx) => (
                            <li key={idx} className="flex items-center text-gray-700">
                              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                              <span className="text-sm">{grant}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Feedback Section - Mobile Optimized */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-gray-200 space-y-4 sm:space-y-0">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <span className="text-gray-700 font-medium text-sm sm:text-base">Was this a good match?</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleFeedback(funder.id, true)}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all touch-manipulation min-h-[44px] ${
                              feedback[funder.id] === true 
                                ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                                : 'bg-gray-100 hover:bg-green-50 active:bg-green-100 text-gray-600 hover:text-green-600 border-2 border-transparent'
                            }`}
                          >
                            <span>👍</span>
                            <span className="text-sm font-medium">Yes</span>
                          </button>
                          <button
                            onClick={() => handleFeedback(funder.id, false)}
                            className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all touch-manipulation min-h-[44px] ${
                              feedback[funder.id] === false 
                                ? 'bg-red-100 text-red-700 border-2 border-red-300' 
                                : 'bg-gray-100 hover:bg-red-50 active:bg-red-100 text-gray-600 hover:text-red-600 border-2 border-transparent'
                            }`}
                          >
                            <span>👎</span>
                            <span className="text-sm font-medium">No</span>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <span>🌐</span>
                        <span className="text-sm break-all sm:break-normal">{funder.website}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Search Tips */}
        {!hasSearched && (
          <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Search Tips for Better Results</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Be Specific & Descriptive:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>"Mobile health clinics for maternal care in rural Kenya"</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>"STEM education programs for girls in underserved communities"</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>"Solar power solutions for off-grid villages"</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Include Context:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Target population (rural, urban, youth, women)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Geographic focus (country, region, continent)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Project type (pilot, scale-up, research, training)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </ClientOnly>
  );
}