"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Mock data for Funder profile
const mockFunderProfile = {
  organizationName: "Impact Foundation",
  email: "contact@impactfoundation.org",
  userType: "funder" as const,
  foundationType: "private",
  establishedYear: "2015",
  website: "www.impactfoundation.org",
  mission: "To accelerate positive social and environmental impact through strategic philanthropy and impact investing.",
  description: "We are a private foundation focused on supporting innovative solutions to global challenges. Our approach combines traditional grantmaking with impact investing to maximize social returns.",
  focusAreas: ["Health", "Education", "Climate Change"],
  geographicFocus: ["Global", "Sub-Saharan Africa", "Southeast Asia"],
  sdgGoals: ["Good Health and Well-being", "Quality Education", "Climate Action"],
  
  investmentCriteria: {
    minInvestment: "25000",
    maxInvestment: "500000",
    preferredStage: "growth",
    sectors: ["Health", "Education", "Climate Change", "Water & Sanitation"],
    geographicPreference: ["Sub-Saharan Africa", "Southeast Asia", "Latin America"],
    impactMetrics: ["Lives improved", "CO2 reduced", "Jobs created"],
    riskTolerance: "medium",
    investmentHorizon: "3-5 years",
    coInvestmentWelcome: true,
  },
  
  portfolioHighlights: {
    totalDeployed: "3200000",
    activeInvestments: "15",
    avgTicketSize: "213000",
    portfolioROI: "4.2",
    livesImpacted: "75000",
    co2Reduced: "12500",
    jobsCreated: "450",
  },
  
  investmentHistory: [
    {
      id: "1",
      organization: "Global Health Initiative",
      amount: 250000,
      sector: "Health",
      year: "2023",
      status: "active",
      impactAchieved: "8,500 lives improved",
      roi: 4.8,
    },
    {
      id: "2",
      organization: "Clean Water Foundation",
      amount: 320000,
      sector: "Water & Sanitation",
      year: "2022",
      status: "completed",
      impactAchieved: "12,000 people with clean water access",
      roi: 5.2,
    },
    {
      id: "3",
      organization: "Education Alliance",
      amount: 180000,
      sector: "Education",
      year: "2023",
      status: "active",
      impactAchieved: "3,200 students educated",
      roi: 3.9,
    },
  ],
  
  applicationProcess: {
    applicationMethod: "online",
    reviewProcess: "quarterly",
    avgReviewTime: "45-60 days",
    requiredDocuments: [
      "Detailed project proposal",
      "Financial statements (2 years)",
      "Impact measurement plan",
      "Team bios and references",
      "Risk assessment report"
    ],
    decisionCriteria: [
      "Alignment with our mission and focus areas",
      "Scalability and sustainability of the solution",
      "Strength of the management team",
      "Clear impact measurement framework",
      "Financial viability and transparency"
    ],
  },
  
  contactPreferences: {
    preferredContact: "email",
    responseTime: "5-7 business days",
    meetingPreference: "virtual",
    bestTimeToContact: "weekdays 9am-5pm EST",
  }
};

const foundationTypes = [
  { value: "private", label: "Private Foundation" },
  { value: "corporate", label: "Corporate Foundation" },
  { value: "community", label: "Community Foundation" },
  { value: "operating", label: "Operating Foundation" },
  { value: "government", label: "Government Agency" },
  { value: "family", label: "Family Foundation" },
];

const sectors = [
  "Health", "Education", "Environment", "Climate Change", "Human Rights", 
  "Economic Development", "Agriculture", "Water & Sanitation", "Gender Equality", 
  "Disaster Relief", "Technology", "Arts & Culture"
];

const regions = [
  "Global", "North America", "South America", "Europe", "Sub-Saharan Africa", 
  "Middle East & North Africa", "South Asia", "Southeast Asia", "East Asia", "Oceania"
];

const sdgGoals = [
  "No Poverty", "Zero Hunger", "Good Health and Well-being", "Quality Education",
  "Gender Equality", "Clean Water and Sanitation", "Affordable and Clean Energy",
  "Decent Work and Economic Growth", "Industry, Innovation and Infrastructure",
  "Reduced Inequalities", "Sustainable Cities and Communities", 
  "Responsible Consumption and Production", "Climate Action", "Life Below Water", 
  "Life on Land", "Peace, Justice and Strong Institutions", "Partnerships for the Goals"
];

export default function FunderProfilePage() {
  const [profile, setProfile] = useState(mockFunderProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string[]) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: string | string[] | boolean) => {
    setProfile(prev => ({
      ...prev,
      [parent]: { ...prev[parent as keyof typeof prev] as any, [field]: value }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      console.log("Saving funder profile:", profile);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateCompleteness = () => {
    let completed = 0;
    let total = 10;
    
    if (profile.organizationName) completed++;
    if (profile.mission) completed++;
    if (profile.description) completed++;
    if (profile.focusAreas.length > 0) completed++;
    if (profile.geographicFocus.length > 0) completed++;
    if (profile.investmentCriteria.minInvestment) completed++;
    if (profile.investmentCriteria.maxInvestment) completed++;
    if (profile.investmentCriteria.sectors.length > 0) completed++;
    if (profile.applicationProcess.requiredDocuments.length > 0) completed++;
    if (profile.contactPreferences.preferredContact) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const tabs = [
    { id: "basic", name: "Basic Info", icon: "📋" },
    { id: "mission", name: "Mission & Focus", icon: "🎯" },
    { id: "criteria", name: "Investment Criteria", icon: "💰" },
    { id: "portfolio", name: "Portfolio", icon: "📊" },
    { id: "process", name: "Application Process", icon: "📝" },
    { id: "contact", name: "Contact & Preferences", icon: "📞" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Funder Profile</h1>
          <p className="text-gray-600">Manage your foundation's investment criteria and preferences</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Profile Completeness</p>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateCompleteness()}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900">{calculateCompleteness()}%</span>
            </div>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="space-y-6">
        {activeTab === "basic" && (
          <Card>
            <CardHeader>
              <CardTitle>Foundation Information</CardTitle>
              <CardDescription>
                Basic details about your foundation or funding organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Foundation Name *</Label>
                  <Input
                    id="organizationName"
                    value={profile.organizationName}
                    onChange={(e) => handleInputChange("organizationName", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foundationType">Foundation Type</Label>
                  <Select 
                    value={profile.foundationType} 
                    onValueChange={(value) => handleInputChange("foundationType", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {foundationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="establishedYear">Established Year</Label>
                  <Input
                    id="establishedYear"
                    value={profile.establishedYear}
                    onChange={(e) => handleInputChange("establishedYear", e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., 2015"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    disabled={!isEditing}
                    placeholder="www.example.org"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "mission" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mission & Focus Areas</CardTitle>
                <CardDescription>
                  Define your foundation's mission and areas of interest
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mission">Mission Statement *</Label>
                  <Textarea
                    id="mission"
                    rows={3}
                    value={profile.mission}
                    onChange={(e) => handleInputChange("mission", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Describe your foundation's mission and purpose..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Foundation Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={profile.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Provide details about your approach, history, and values..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Focus Areas & Geographic Scope</CardTitle>
                <CardDescription>
                  Select your areas of interest and geographic focus
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Focus Areas *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {sectors.map((sector) => (
                      <label key={sector} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={profile.focusAreas.includes(sector)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleArrayChange("focusAreas", [...profile.focusAreas, sector]);
                            } else {
                              handleArrayChange("focusAreas", profile.focusAreas.filter(s => s !== sector));
                            }
                          }}
                          disabled={!isEditing}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm">{sector}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Geographic Focus *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {regions.map((region) => (
                      <label key={region} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={profile.geographicFocus.includes(region)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleArrayChange("geographicFocus", [...profile.geographicFocus, region]);
                            } else {
                              handleArrayChange("geographicFocus", profile.geographicFocus.filter(r => r !== region));
                            }
                          }}
                          disabled={!isEditing}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>SDG Goals</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {sdgGoals.map((goal) => (
                      <label key={goal} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={profile.sdgGoals.includes(goal)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleArrayChange("sdgGoals", [...profile.sdgGoals, goal]);
                            } else {
                              handleArrayChange("sdgGoals", profile.sdgGoals.filter(g => g !== goal));
                            }
                          }}
                          disabled={!isEditing}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "criteria" && (
          <Card>
            <CardHeader>
              <CardTitle>Investment Criteria</CardTitle>
              <CardDescription>
                Define your investment preferences and requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minInvestment">Minimum Investment ($)</Label>
                  <Input
                    id="minInvestment"
                    type="number"
                    value={profile.investmentCriteria.minInvestment}
                    onChange={(e) => handleNestedChange("investmentCriteria", "minInvestment", e.target.value)}
                    disabled={!isEditing}
                    placeholder="25000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxInvestment">Maximum Investment ($)</Label>
                  <Input
                    id="maxInvestment"
                    type="number"
                    value={profile.investmentCriteria.maxInvestment}
                    onChange={(e) => handleNestedChange("investmentCriteria", "maxInvestment", e.target.value)}
                    disabled={!isEditing}
                    placeholder="500000"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredStage">Preferred Stage</Label>
                  <Select 
                    value={profile.investmentCriteria.preferredStage}
                    onValueChange={(value) => handleNestedChange("investmentCriteria", "preferredStage", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup</SelectItem>
                      <SelectItem value="growth">Growth</SelectItem>
                      <SelectItem value="expansion">Expansion</SelectItem>
                      <SelectItem value="mature">Mature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="investmentHorizon">Investment Horizon</Label>
                  <Select 
                    value={profile.investmentCriteria.investmentHorizon}
                    onValueChange={(value) => handleNestedChange("investmentCriteria", "investmentHorizon", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2 years">1-2 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="5+ years">5+ years</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Preferred Sectors</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {sectors.map((sector) => (
                    <label key={sector} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={profile.investmentCriteria.sectors.includes(sector)}
                        onChange={(e) => {
                          const currentSectors = profile.investmentCriteria.sectors;
                          if (e.target.checked) {
                            handleNestedChange("investmentCriteria", "sectors", [...currentSectors, sector]);
                          } else {
                            handleNestedChange("investmentCriteria", "sectors", currentSectors.filter(s => s !== sector));
                          }
                        }}
                        disabled={!isEditing}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm">{sector}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="coInvestment"
                  checked={profile.investmentCriteria.coInvestmentWelcome}
                  onChange={(e) => handleNestedChange("investmentCriteria", "coInvestmentWelcome", e.target.checked)}
                  disabled={!isEditing}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <Label htmlFor="coInvestment">Open to co-investment opportunities</Label>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "portfolio" && (
          <div className="space-y-6">
            {/* Portfolio Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${(parseInt(profile.portfolioHighlights.totalDeployed) / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-gray-600">Total Deployed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {profile.portfolioHighlights.activeInvestments}
                  </div>
                  <div className="text-sm text-gray-600">Active Investments</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {profile.portfolioHighlights.portfolioROI}x
                  </div>
                  <div className="text-sm text-gray-600">Portfolio ROI</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {(parseInt(profile.portfolioHighlights.livesImpacted) / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-600">Lives Impacted</div>
                </CardContent>
              </Card>
            </div>

            {/* Investment History */}
            <Card>
              <CardHeader>
                <CardTitle>Investment History</CardTitle>
                <CardDescription>
                  Showcase your successful investments and their impact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.investmentHistory.map((investment) => (
                  <div key={investment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{investment.organization}</h4>
                        <p className="text-sm text-gray-600">{investment.sector} • {investment.year}</p>
                        <p className="text-sm text-gray-700 mt-1">{investment.impactAchieved}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">
                          ${investment.amount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {investment.roi}x ROI
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          investment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {investment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "process" && (
          <Card>
            <CardHeader>
              <CardTitle>Application Process</CardTitle>
              <CardDescription>
                Define how organizations can apply for funding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="applicationMethod">Application Method</Label>
                  <Select 
                    value={profile.applicationProcess.applicationMethod}
                    onValueChange={(value) => handleNestedChange("applicationProcess", "applicationMethod", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online Portal</SelectItem>
                      <SelectItem value="email">Email Submission</SelectItem>
                      <SelectItem value="invitation">Invitation Only</SelectItem>
                      <SelectItem value="referral">Referral Based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reviewProcess">Review Process</Label>
                  <Select 
                    value={profile.applicationProcess.reviewProcess}
                    onValueChange={(value) => handleNestedChange("applicationProcess", "reviewProcess", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rolling">Rolling Basis</SelectItem>
                      <SelectItem value="quarterly">Quarterly Reviews</SelectItem>
                      <SelectItem value="biannual">Bi-annual Reviews</SelectItem>
                      <SelectItem value="annual">Annual Reviews</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="avgReviewTime">Average Review Time</Label>
                <Input
                  id="avgReviewTime"
                  value={profile.applicationProcess.avgReviewTime}
                  onChange={(e) => handleNestedChange("applicationProcess", "avgReviewTime", e.target.value)}
                  disabled={!isEditing}
                  placeholder="e.g., 45-60 days"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Required Documents</Label>
                <div className="space-y-2">
                  {profile.applicationProcess.requiredDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Decision Criteria</Label>
                <div className="space-y-2">
                  {profile.applicationProcess.decisionCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-blue-500">•</span>
                      <span className="text-sm text-gray-700">{criteria}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "contact" && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Preferences</CardTitle>
              <CardDescription>
                Set your communication preferences for potential partners
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                  <Select 
                    value={profile.contactPreferences.preferredContact}
                    onValueChange={(value) => handleNestedChange("contactPreferences", "preferredContact", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="platform">Platform Messaging</SelectItem>
                      <SelectItem value="meeting">Direct Meeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="responseTime">Expected Response Time</Label>
                  <Input
                    id="responseTime"
                    value={profile.contactPreferences.responseTime}
                    onChange={(e) => handleNestedChange("contactPreferences", "responseTime", e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., 5-7 business days"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meetingPreference">Meeting Preference</Label>
                  <Select 
                    value={profile.contactPreferences.meetingPreference}
                    onValueChange={(value) => handleNestedChange("contactPreferences", "meetingPreference", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="virtual">Virtual Meetings</SelectItem>
                      <SelectItem value="in-person">In-Person Meetings</SelectItem>
                      <SelectItem value="both">Both Virtual & In-Person</SelectItem>
                      <SelectItem value="phone">Phone Calls Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bestTimeToContact">Best Time to Contact</Label>
                  <Input
                    id="bestTimeToContact"
                    value={profile.contactPreferences.bestTimeToContact}
                    onChange={(e) => handleNestedChange("contactPreferences", "bestTimeToContact", e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., weekdays 9am-5pm EST"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}