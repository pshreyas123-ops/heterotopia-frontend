"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Mock data - in real app this would come from API
const mockProfile = {
  organizationName: "Global Health Initiative",
  email: "john@globalhealthinitiative.org",
  userType: "ngo" as const,
  mission: "To improve global health outcomes through innovative programs and partnerships in underserved communities.",
  description: "We are a non-profit organization focused on delivering healthcare solutions to remote and underserved areas. Our work spans across preventive care, health education, and capacity building for local healthcare systems.",
  sectors: ["Health", "Education"],
  sdgGoals: ["Good Health and Well-being", "Quality Education"],
  geographicFocus: ["Sub-Saharan Africa", "Southeast Asia"],
  campaigns: [
    {
      id: "1",
      name: "Clean Water Initiative",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      target: 50000,
      raised: 37500,
      beneficiaries: 2500,
      location: "Kenya",
      description: "Providing clean water access to rural communities through well construction and water purification systems."
    },
    {
      id: "2",
      name: "Education for All",
      status: "completed",
      startDate: "2023-06-01",
      endDate: "2024-05-31",
      target: 25000,
      raised: 25000,
      beneficiaries: 500,
      location: "Uganda",
      description: "Building schools and training teachers in underserved communities."
    },
    {
      id: "3",
      name: "Healthcare Access Program",
      status: "planning",
      startDate: "2024-03-01",
      endDate: "2025-02-28",
      target: 75000,
      raised: 0,
      beneficiaries: 5000,
      location: "Tanzania",
      description: "Establishing mobile health clinics and training community health workers."
    }
  ],
  impactMetrics: {
    totalBeneficiaries: "50000",
    partnersWorkedWith: "25",
    description: "We have reached over 50,000 individuals through our health programs, established 15 community health centers, and trained 200+ local healthcare workers.",
    keyAchievements: [
      "Reduced child mortality by 35% in target communities",
      "Improved access to clean water for 25,000 people", 
      "Trained over 500 community health workers",
      "Built 30+ sustainable health and education facilities"
    ]
  },
  fundingNeeds: {
    annualBudget: "500000-1000000",
    projectBudget: "50000-250000",
    description: "Seeking funding for community health center expansion and mobile health unit programs."
  }
};

const sectors = [
  "Health", "Education", "Environment", "Human Rights", "Economic Development",
  "Agriculture", "Water & Sanitation", "Gender Equality", "Disaster Relief", "Technology"
];

const sdgGoals = [
  "No Poverty", "Zero Hunger", "Good Health and Well-being", "Quality Education",
  "Gender Equality", "Clean Water and Sanitation", "Affordable and Clean Energy",
  "Decent Work and Economic Growth", "Industry, Innovation and Infrastructure",
  "Reduced Inequalities", "Sustainable Cities and Communities", "Responsible Consumption and Production",
  "Climate Action", "Life Below Water", "Life on Land", "Peace, Justice and Strong Institutions",
  "Partnerships for the Goals"
];

const regions = [
  "North America", "South America", "Europe", "Sub-Saharan Africa", "Middle East & North Africa",
  "South Asia", "Southeast Asia", "East Asia", "Oceania", "Global"
];

export default function ProfilePage() {
  const [profile, setProfile] = useState(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string[]) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: string | string[]) => {
    setProfile(prev => ({
      ...prev,
      [parent]: { ...prev[parent as keyof typeof prev] as any, [field]: value }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual save logic
      console.log("Saving profile:", profile);
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
    let total = 8;
    
    if (profile.organizationName) completed++;
    if (profile.mission) completed++;
    if (profile.description) completed++;
    if (profile.sectors.length > 0) completed++;
    if (profile.sdgGoals.length > 0) completed++;
    if (profile.geographicFocus.length > 0) completed++;
    if (profile.impactMetrics.totalBeneficiaries) completed++;
    if (profile.fundingNeeds.description) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const tabs = [
    { id: "basic", name: "Basic Info", icon: "📋" },
    { id: "mission", name: "Mission & Focus", icon: "🎯" },
    { id: "campaigns", name: "Campaigns", icon: "🚀" },
    { id: "impact", name: "Impact & Metrics", icon: "📊" },
    { id: "funding", name: "Funding Needs", icon: "💰" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organization Profile</h1>
          <p className="text-gray-600">Manage your organization's information and visibility</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Profile Completeness</p>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                  ? "border-blue-500 text-blue-600"
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
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Essential details about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name *</Label>
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
              
              <div className="space-y-2">
                <Label htmlFor="userType">Organization Type</Label>
                <Select value={profile.userType} disabled>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ngo">NGO / Non-Profit Organization</SelectItem>
                    <SelectItem value="funder">Funder / Foundation</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">Contact support to change organization type</p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "mission" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mission & Description</CardTitle>
                <CardDescription>
                  Tell funders about your organization's purpose and work
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
                    placeholder="Describe your organization's mission and core purpose..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={profile.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Provide more details about your work, programs, and approach..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Focus Areas</CardTitle>
                <CardDescription>
                  Select the sectors and SDG goals that align with your work
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Sectors *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {sectors.map((sector) => (
                      <label key={sector} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={profile.sectors.includes(sector)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleArrayChange("sectors", [...profile.sectors, sector]);
                            } else {
                              handleArrayChange("sectors", profile.sectors.filter(s => s !== sector));
                            }
                          }}
                          disabled={!isEditing}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{sector}</span>
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
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{goal}</span>
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
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "campaigns" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Past & Current Campaigns</CardTitle>
                    <CardDescription>
                      Showcase your fundraising campaigns and their impact
                    </CardDescription>
                  </div>
                  {isEditing && (
                    <Button size="sm">
                      Add Campaign
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.campaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                        <p className="text-sm text-gray-600">{campaign.location}</p>
                        <p className="text-sm text-gray-700 mt-2">{campaign.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="text-sm">
                        <span className="font-medium">Duration:</span> {campaign.startDate} to {campaign.endDate}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Beneficiaries:</span> {campaign.beneficiaries.toLocaleString()}
                      </div>
                    </div>
                    
                    {campaign.status !== 'planning' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Funding Progress</span>
                          <span>{Math.round((campaign.raised / campaign.target) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.min((campaign.raised / campaign.target) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>${campaign.raised.toLocaleString()} raised</span>
                          <span>${campaign.target.toLocaleString()} goal</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "impact" && (
          <Card>
            <CardHeader>
              <CardTitle>Impact Metrics</CardTitle>
              <CardDescription>
                Share your organization's impact and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalBeneficiaries">Total Beneficiaries Served</Label>
                  <Input
                    id="totalBeneficiaries"
                    type="number"
                    value={profile.impactMetrics.totalBeneficiaries}
                    onChange={(e) => handleNestedChange("impactMetrics", "totalBeneficiaries", e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., 50000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="partnersWorkedWith">Partners Worked With</Label>
                  <Input
                    id="partnersWorkedWith"
                    type="number"
                    value={profile.impactMetrics.partnersWorkedWith}
                    onChange={(e) => handleNestedChange("impactMetrics", "partnersWorkedWith", e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., 25"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="impactDescription">Impact Description</Label>
                <Textarea
                  id="impactDescription"
                  rows={4}
                  value={profile.impactMetrics.description}
                  onChange={(e) => handleNestedChange("impactMetrics", "description", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Describe your key achievements, impact metrics, and success stories..."
                />
              </div>
              
              <div className="space-y-2">
                <Label>Key Achievements</Label>
                <div className="space-y-2">
                  {profile.impactMetrics.keyAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <Button size="sm" variant="outline">
                    Add Achievement
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "funding" && (
          <Card>
            <CardHeader>
              <CardTitle>Funding Needs</CardTitle>
              <CardDescription>
                Help funders understand your funding requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="annualBudget">Annual Budget Range</Label>
                  <Select 
                    value={profile.fundingNeeds.annualBudget}
                    onValueChange={(value) => handleNestedChange("fundingNeeds", "annualBudget", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-50000">Under $50,000</SelectItem>
                      <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100000-250000">$100,000 - $250,000</SelectItem>
                      <SelectItem value="250000-500000">$250,000 - $500,000</SelectItem>
                      <SelectItem value="500000-1000000">$500,000 - $1,000,000</SelectItem>
                      <SelectItem value="1000000-5000000">$1,000,000 - $5,000,000</SelectItem>
                      <SelectItem value="over-5000000">Over $5,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectBudget">Typical Project Budget</Label>
                  <Select 
                    value={profile.fundingNeeds.projectBudget}
                    onValueChange={(value) => handleNestedChange("fundingNeeds", "projectBudget", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-10000">Under $10,000</SelectItem>
                      <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100000-250000">$100,000 - $250,000</SelectItem>
                      <SelectItem value="250000-500000">$250,000 - $500,000</SelectItem>
                      <SelectItem value="over-500000">Over $500,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fundingDescription">Funding Needs Description</Label>
                <Textarea
                  id="fundingDescription"
                  rows={4}
                  value={profile.fundingNeeds.description}
                  onChange={(e) => handleNestedChange("fundingNeeds", "description", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Describe what you're seeking funding for, specific projects, or ongoing needs..."
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}