"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock NGO data for Funders to search
const mockNGOResults = [
  {
    id: "1",
    name: "Global Health Initiative",
    type: "International NGO",
    location: "Kenya, Uganda, Tanzania",
    description: "Improving healthcare access in rural communities through mobile clinics and community health worker training programs.",
    sectors: ["Health", "Community Development"],
    fundingNeeds: "$50,000 - $250,000",
    impactScore: 9.2,
    beneficiaries: 12500,
    yearsActive: 8,
    website: "globalhealthinitiative.org",
    currentCampaigns: 3,
    completedProjects: 15,
    impactMetrics: {
      livesImproved: 12500,
      healthWorkersTrained: 200,
      clinicsEstablished: 15
    },
    fundingHistory: [
      { funder: "Gates Foundation", amount: 180000, year: 2023 },
      { funder: "WHO", amount: 95000, year: 2022 }
    ],
    sdgGoals: ["Good Health and Well-being", "Reduced Inequalities"],
    organizationSize: "medium",
    stage: "growth",
    lastActive: "2 days ago"
  },
  {
    id: "2",
    name: "Education for All Alliance",
    type: "Local NGO",
    location: "Bangladesh, Nepal",
    description: "Providing quality education and digital literacy programs to underserved children in South Asia.",
    sectors: ["Education", "Technology"],
    fundingNeeds: "$25,000 - $100,000",
    impactScore: 8.7,
    beneficiaries: 3200,
    yearsActive: 5,
    website: "educationforall.org",
    currentCampaigns: 2,
    completedProjects: 8,
    impactMetrics: {
      studentsEducated: 3200,
      teachersTrained: 45,
      schoolsBuilt: 8
    },
    fundingHistory: [
      { funder: "UNICEF", amount: 75000, year: 2023 },
      { funder: "Local Foundation", amount: 25000, year: 2022 }
    ],
    sdgGoals: ["Quality Education", "Gender Equality"],
    organizationSize: "small",
    stage: "expansion",
    lastActive: "1 day ago"
  },
  {
    id: "3",
    name: "Clean Water Foundation",
    type: "International NGO",
    location: "Sub-Saharan Africa",
    description: "Building sustainable water infrastructure and sanitation systems in rural African communities.",
    sectors: ["Water & Sanitation", "Infrastructure"],
    fundingNeeds: "$100,000 - $500,000",
    impactScore: 9.5,
    beneficiaries: 25000,
    yearsActive: 12,
    website: "cleanwaterfoundation.org",
    currentCampaigns: 4,
    completedProjects: 32,
    impactMetrics: {
      peopleWithCleanWater: 25000,
      wellsBuilt: 45,
      sanitationFacilities: 120
    },
    fundingHistory: [
      { funder: "World Bank", amount: 320000, year: 2023 },
      { funder: "Water.org", amount: 150000, year: 2022 }
    ],
    sdgGoals: ["Clean Water and Sanitation", "Good Health and Well-being"],
    organizationSize: "large",
    stage: "mature",
    lastActive: "3 hours ago"
  },
  {
    id: "4",
    name: "Youth Empowerment Network",
    type: "Community Organization",
    location: "Brazil, Colombia",
    description: "Empowering young people through skills training, entrepreneurship programs, and leadership development.",
    sectors: ["Youth Development", "Economic Development"],
    fundingNeeds: "$15,000 - $75,000",
    impactScore: 8.1,
    beneficiaries: 850,
    yearsActive: 3,
    website: "youthempowerment.org",
    currentCampaigns: 1,
    completedProjects: 4,
    impactMetrics: {
      youthTrained: 850,
      jobsCreated: 120,
      businessesStarted: 35
    },
    fundingHistory: [
      { funder: "Inter-American Foundation", amount: 45000, year: 2023 }
    ],
    sdgGoals: ["Decent Work and Economic Growth", "Reduced Inequalities"],
    organizationSize: "small",
    stage: "startup",
    lastActive: "5 hours ago"
  },
  {
    id: "5",
    name: "Climate Action Collective",
    type: "Environmental NGO",
    location: "Global",
    description: "Implementing climate adaptation and mitigation projects while building community resilience to climate change.",
    sectors: ["Climate Change", "Environment"],
    fundingNeeds: "$75,000 - $300,000",
    impactScore: 9.0,
    beneficiaries: 8500,
    yearsActive: 6,
    website: "climateactioncollective.org",
    currentCampaigns: 3,
    completedProjects: 12,
    impactMetrics: {
      co2Reduced: 5500,
      treesPlanted: 15000,
      communitiesReached: 25
    },
    fundingHistory: [
      { funder: "Green Climate Fund", amount: 200000, year: 2023 },
      { funder: "Climate Foundation", amount: 85000, year: 2022 }
    ],
    sdgGoals: ["Climate Action", "Life on Land"],
    organizationSize: "medium",
    stage: "growth",
    lastActive: "1 day ago"
  }
];

const sectors = [
  "Health", "Education", "Environment", "Climate Change", "Human Rights", 
  "Economic Development", "Agriculture", "Water & Sanitation", "Gender Equality", 
  "Youth Development", "Community Development", "Technology", "Infrastructure"
];

const regions = [
  "Global", "Sub-Saharan Africa", "South Asia", "Southeast Asia", "East Asia",
  "Latin America", "Middle East & North Africa", "Europe", "North America", "Oceania"
];

const fundingRanges = [
  "Under $25,000", "$25,000 - $50,000", "$50,000 - $100,000", "$100,000 - $250,000",
  "$250,000 - $500,000", "$500,000 - $1,000,000", "Over $1,000,000"
];

const organizationSizes = [
  { value: "startup", label: "Startup (0-2 years)" },
  { value: "small", label: "Small (3-5 years)" },
  { value: "medium", label: "Medium (6-10 years)" },
  { value: "large", label: "Large (10+ years)" }
];

const impactStages = [
  { value: "startup", label: "Early Stage" },
  { value: "growth", label: "Growth Stage" },
  { value: "expansion", label: "Expansion Stage" },
  { value: "mature", label: "Mature/Established" }
];

const sdgGoals = [
  "No Poverty", "Zero Hunger", "Good Health and Well-being", "Quality Education",
  "Gender Equality", "Clean Water and Sanitation", "Affordable and Clean Energy",
  "Decent Work and Economic Growth", "Climate Action", "Reduced Inequalities"
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    sectors: [] as string[],
    regions: [] as string[],
    organizationSize: "",
    fundingNeeds: "",
    impactStage: "",
    sdgGoals: [] as string[],
  });
  const [results, setResults] = useState(mockNGOResults);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("impact");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [savedNGOs, setSavedNGOs] = useState<string[]>([]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      console.log("Searching NGOs with:", { searchQuery, filters });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredResults = mockNGOResults;
      
      if (searchQuery) {
        filteredResults = filteredResults.filter(ngo =>
          ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ngo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ngo.sectors.some(sector => sector.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      if (filters.sectors.length > 0) {
        filteredResults = filteredResults.filter(ngo =>
          ngo.sectors.some(sector => filters.sectors.includes(sector))
        );
      }
      
      if (filters.regions.length > 0) {
        filteredResults = filteredResults.filter(ngo =>
          filters.regions.some(region => ngo.location.includes(region))
        );
      }
      
      if (filters.organizationSize) {
        filteredResults = filteredResults.filter(ngo => ngo.organizationSize === filters.organizationSize);
      }
      
      if (filters.impactStage) {
        filteredResults = filteredResults.filter(ngo => ngo.stage === filters.impactStage);
      }
      
      setResults(filteredResults);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filterType: string, value: string | string[]) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({
      sectors: [],
      regions: [],
      organizationSize: "",
      fundingNeeds: "",
      impactStage: "",
      sdgGoals: [],
    });
    setSearchQuery("");
    setResults(mockNGOResults);
  };

  const sortResults = (results: typeof mockNGOResults, sortBy: string) => {
    switch (sortBy) {
      case "impact":
        return [...results].sort((a, b) => b.impactScore - a.impactScore);
      case "beneficiaries":
        return [...results].sort((a, b) => b.beneficiaries - a.beneficiaries);
      case "name":
        return [...results].sort((a, b) => a.name.localeCompare(b.name));
      case "recent":
        return [...results].sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());
      default:
        return results;
    }
  };

  const toggleSaveNGO = (ngoId: string) => {
    setSavedNGOs(prev => 
      prev.includes(ngoId) 
        ? prev.filter(id => id !== ngoId)
        : [...prev, ngoId]
    );
  };

  const sortedResults = sortResults(results, sortBy);
  const activeFiltersCount = filters.sectors.length + filters.regions.length + 
    (filters.organizationSize ? 1 : 0) + (filters.fundingNeeds ? 1 : 0) + 
    (filters.impactStage ? 1 : 0) + filters.sdgGoals.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover NGOs</h1>
          <p className="text-gray-600">Find high-impact organizations aligned with your investment criteria</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            List
          </Button>
        </div>
      </div>

      {/* Search bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search NGOs by name, mission, or impact area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Investment Filters</CardTitle>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sectors */}
              <div className="space-y-2">
                <Label>Focus Sectors</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {sectors.map((sector) => (
                    <label key={sector} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.sectors.includes(sector)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange("sectors", [...filters.sectors, sector]);
                          } else {
                            handleFilterChange("sectors", filters.sectors.filter(s => s !== sector));
                          }
                        }}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm">{sector}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Geographic Focus */}
              <div className="space-y-2">
                <Label>Geographic Focus</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {regions.map((region) => (
                    <label key={region} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.regions.includes(region)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange("regions", [...filters.regions, region]);
                          } else {
                            handleFilterChange("regions", filters.regions.filter(r => r !== region));
                          }
                        }}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Organization Maturity & Funding */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Organization Size</Label>
                  <Select value={filters.organizationSize} onValueChange={(value) => handleFilterChange("organizationSize", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any size</SelectItem>
                      {organizationSizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Funding Needs</Label>
                  <Select value={filters.fundingNeeds} onValueChange={(value) => handleFilterChange("fundingNeeds", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any amount</SelectItem>
                      {fundingRanges.map((range) => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Impact Stage</Label>
                  <Select value={filters.impactStage} onValueChange={(value) => handleFilterChange("impactStage", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any stage</SelectItem>
                      {impactStages.map((stage) => (
                        <SelectItem key={stage.value} value={stage.value}>{stage.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* SDG Goals */}
            <div className="space-y-2">
              <Label>SDG Goals</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {sdgGoals.map((goal) => (
                  <label key={goal} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.sdgGoals.includes(goal)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFilterChange("sdgGoals", [...filters.sdgGoals, goal]);
                        } else {
                          handleFilterChange("sdgGoals", filters.sdgGoals.filter(g => g !== goal));
                        }
                      }}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-xs">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">
            {results.length} NGO{results.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="sort">Sort by:</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="impact">Impact Score</SelectItem>
              <SelectItem value="beneficiaries">Beneficiaries</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="recent">Recently Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "space-y-4"}>
        {sortedResults.map((ngo) => (
          <Card key={ngo.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{ngo.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ngo.impactScore >= 9 ? 'bg-green-100 text-green-800' :
                      ngo.impactScore >= 8 ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      Impact: {ngo.impactScore}/10
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>{ngo.type}</span>
                    <span>•</span>
                    <span>{ngo.location}</span>
                    <span>•</span>
                    <span>{ngo.yearsActive} years active</span>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleSaveNGO(ngo.id)}
                  className={`p-2 rounded-full ${
                    savedNGOs.includes(ngo.id) 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-700 mb-4">{ngo.description}</p>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{ngo.beneficiaries.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Beneficiaries</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{ngo.completedProjects}</div>
                  <div className="text-xs text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{ngo.currentCampaigns}</div>
                  <div className="text-xs text-gray-600">Active</div>
                </div>
              </div>
              
              {/* Sectors and SDGs */}
              <div className="space-y-2 mb-4">
                <div className="flex flex-wrap gap-2">
                  {ngo.sectors.map((sector) => (
                    <span key={sector} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {sector}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {ngo.sdgGoals.slice(0, 2).map((goal) => (
                    <span key={goal} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                      {goal}
                    </span>
                  ))}
                  {ngo.sdgGoals.length > 2 && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      +{ngo.sdgGoals.length - 2} more
                    </span>
                  )}
                </div>
              </div>
              
              {/* Funding Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Funding Needs:</span> {ngo.fundingNeeds}
                </div>
                <div className="text-xs text-gray-500">
                  Active {ngo.lastActive}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1" asChild>
                  <Link href={`/dashboard/ngos/${ngo.id}`}>
                    View Profile
                  </Link>
                </Button>
                <Button size="sm" variant="outline">
                  Contact
                </Button>
                <Button size="sm" variant="outline">
                  Request Proposal
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {results.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No NGOs found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters to discover more organizations.
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </CardContent>
        </Card>
      )}

      {/* Saved NGOs Summary */}
      {savedNGOs.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">
                  {savedNGOs.length} NGO{savedNGOs.length !== 1 ? "s" : ""} saved for review
                </p>
              </div>
              <Button size="sm" variant="outline">
                Review Saved NGOs
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}