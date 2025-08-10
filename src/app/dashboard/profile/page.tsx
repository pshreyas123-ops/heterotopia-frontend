"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import ClientOnly from "@/components/ClientOnly";

// Comprehensive profile for MVP with storytelling elements
const mockProfile = {
  // Basic Information
  organizationName: "Global Health Initiative",
  email: "john@globalhealthinitiative.org",
  phone: "+254-700-123456",
  website: "www.globalhealthinitiative.org",
  establishedYear: "2016",
  organizationType: "International NGO",
  registrationNumber: "NGO/REG/2016/001",
  
  // Mission & Focus
  mission: "To improve global health outcomes through innovative programs and partnerships in underserved communities.",
  description: "We work directly with local communities to provide healthcare access, train health workers, and implement sustainable health solutions.",
  impactStory: "In 2016, we started with a simple mission: ensure no one dies from preventable diseases. Today, we've transformed healthcare access for over 50,000 people across rural Africa and Southeast Asia through mobile clinics, community health worker training, and innovative health solutions.",
  sectors: ["Health", "Education"],
  geographicFocus: ["Sub-Saharan Africa", "Southeast Asia"],
  sdgGoals: ["Good Health and Well-being", "Quality Education", "Reduced Inequalities"],
  
  // Team & Leadership
  teamSize: "25-50",
  keyPersonnel: [
    {
      name: "Dr. Sarah Kimani",
      role: "Executive Director",
      experience: "15 years in public health",
      bio: "Dr. Kimani has dedicated her career to improving healthcare access in rural communities across Africa."
    }
  ],
  
  // Impact & Metrics
  beneficiariesServed: "50,000+",
  yearsActive: 8,
  completedProjects: 15,
  impactMetrics: {
    livesTransformed: "50,000+",
    healthWorkersTrained: 200,
    clinicsEstablished: 15,
    vaccinesAdministered: 8500,
    maternalHealthServices: 2500
  },
  
  // Success Stories
  successStories: [
    {
      title: "Saving Lives in Rural Kenya",
      description: "Our mobile health clinic program has reduced child mortality by 40% in remote villages.",
      impact: "5,000 children vaccinated",
      image: "🏥"
    },
    {
      title: "Training Community Heroes",
      description: "We've trained 200 community health workers who now serve as the first line of healthcare.",
      impact: "200 health workers trained",
      image: "👩‍⚕️"
    },
    {
      title: "Maternal Health Revolution",
      description: "Our maternal health program has reduced maternal mortality by 60% in target communities.",
      impact: "2,500 safe deliveries",
      image: "👶"
    }
  ],
  
  // Funding Information
  fundingNeeds: "We seek funding for mobile health clinics, health worker training, and community health education programs.",
  annualBudget: "$450,000",
  fundingRange: "$50,000 - $250,000",
  

  
  // Social Media & Online Presence
  socialMedia: {
    linkedin: "",
    twitter: "",
    facebook: ""
  }
};

const sectors = [
  "Health", "Education", "Environment", "Human Rights", "Economic Development",
  "Agriculture", "Water & Sanitation", "Gender Equality", "Technology", "Climate"
];

const regions = [
  "North America", "South America", "Europe", "Sub-Saharan Africa", "Middle East & North Africa",
  "South Asia", "Southeast Asia", "East Asia", "Oceania", "Global"
];

export default function ProfilePage() {
  const [profile, setProfile] = useState(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { locale } = useLanguage();
  const translate = t(locale);

  // Load profile from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('ngo_profile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
      } catch (error) {
        console.error('Failed to load saved profile:', error);
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string[]) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      console.log("Saving profile:", profile);
      
      // Simulate API call - in real app, this would save to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage for persistence in MVP
      localStorage.setItem('ngo_profile', JSON.stringify(profile));
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50';
      successMessage.textContent = 'Profile saved successfully!';
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);
      
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
      
      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50';
      errorMessage.textContent = 'Failed to save profile. Please try again.';
      document.body.appendChild(errorMessage);
      
      setTimeout(() => {
        document.body.removeChild(errorMessage);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateCompleteness = () => {
    let completed = 0;
    let total = 11;
    
    // Basic Information (3 fields)
    if (profile.organizationName) completed++;
    if (profile.email) completed++;
    if (profile.phone) completed++;
    if (profile.website) completed++;
    
    // Mission & Story (3 fields)
    if (profile.mission) completed++;
    if (profile.impactStory) completed++;
    if (profile.sectors.length > 0) completed++;
    if (profile.geographicFocus.length > 0) completed++;
    
    // Funding & Team (3 fields)
    if (profile.fundingNeeds) completed++;
    if (profile.annualBudget) completed++;
    if (profile.teamSize) completed++;
    
    return Math.round((completed / total) * 100);
  };

  return (
    <ClientOnly fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    }>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative px-8 py-12 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold">{profile.organizationName}</h1>
                    <p className="text-blue-100">{profile.organizationType} • Est. {profile.establishedYear}</p>
                  </div>
                </div>
                <p className="text-lg text-blue-50 mb-6 max-w-2xl leading-relaxed">
                  {profile.impactStory}
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.sectors.map((sector, idx) => (
                    <span key={idx} className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold mb-1">{calculateCompleteness()}%</div>
                  <div className="text-sm text-blue-100 mb-3">Profile Complete</div>
                  <div className="w-24 bg-white/20 rounded-full h-2 mx-auto mb-4">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${calculateCompleteness()}%` }}
                    />
                  </div>
                  {!isEditing ? (
                    <Button 
                      onClick={() => setIsEditing(true)}
                      variant="secondary"
                      className="bg-white text-blue-600 hover:bg-blue-50"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Button 
                        onClick={handleSave} 
                        disabled={isLoading}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(profile.impactMetrics).map(([key, value], idx) => (
            <Card key={key} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">{value}</div>
                <div className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">🌟</span>
              <span>Our Impact Stories</span>
            </CardTitle>
            <CardDescription>
              Real stories of transformation and hope from our work
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x">
              {profile.successStories.map((story, idx) => (
                <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="text-4xl mb-4">{story.image}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{story.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{story.description}</p>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                    {story.impact}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mission & Story */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">🎯</span>
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mission">Mission Statement *</Label>
                <Textarea
                  id="mission"
                  rows={4}
                  value={profile.mission}
                  onChange={(e) => handleInputChange("mission", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Describe your organization's mission and primary activities..."
                  className="resize-none"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="impactStory">Impact Story</Label>
                <Textarea
                  id="impactStory"
                  rows={4}
                  value={profile.impactStory}
                  onChange={(e) => handleInputChange("impactStory", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Tell your organization's story and impact..."
                  className="resize-none"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-2xl">📞</span>
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={profile.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    disabled={!isEditing}
                    placeholder="www.yourorganization.org"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Focus Areas & Geography */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">🌐</span>
              <span>Our Focus & Reach</span>
            </CardTitle>
            <CardDescription>
              Define your areas of expertise and geographic impact
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Primary Sectors *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {sectors.map((sector) => (
                  <label key={sector} className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    profile.sectors.includes(sector) 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!isEditing ? 'cursor-not-allowed opacity-60' : ''}`}>
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
                    <span className="text-sm font-medium">{sector}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Geographic Focus *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {regions.map((region) => (
                  <label key={region} className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    profile.geographicFocus.includes(region) 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!isEditing ? 'cursor-not-allowed opacity-60' : ''}`}>
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
                    <span className="text-sm font-medium">📍 {region}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Funding & Financial Information */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-2xl">💰</span>
              <span>Funding & Financial Information</span>
            </CardTitle>
            <CardDescription>
              Help funders understand your financial needs and organizational capacity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fundingNeeds" className="text-base font-semibold">Current Funding Needs *</Label>
              <Textarea
                id="fundingNeeds"
                rows={4}
                value={profile.fundingNeeds}
                onChange={(e) => handleInputChange("fundingNeeds", e.target.value)}
                disabled={!isEditing}
                placeholder="Describe your current funding needs, project types, and funding amounts you're seeking..."
                className="resize-none bg-white"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="annualBudget">Annual Budget</Label>
                <Input
                  id="annualBudget"
                  value={profile.annualBudget}
                  onChange={(e) => handleInputChange("annualBudget", e.target.value)}
                  disabled={!isEditing}
                  placeholder="$500,000"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fundingRange">Typical Funding Range</Label>
                <Input
                  id="fundingRange"
                  value={profile.fundingRange}
                  onChange={(e) => handleInputChange("fundingRange", e.target.value)}
                  disabled={!isEditing}
                  placeholder="$10,000 - $100,000"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Select 
                  value={profile.teamSize} 
                  onValueChange={(value) => handleInputChange("teamSize", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 people</SelectItem>
                    <SelectItem value="6-15">6-15 people</SelectItem>
                    <SelectItem value="16-25">16-25 people</SelectItem>
                    <SelectItem value="25-50">25-50 people</SelectItem>
                    <SelectItem value="50+">50+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>



        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Funders?</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Your compelling profile story is now ready to attract the right funders. 
                Use our AI-powered semantic search to discover funding opportunities that align with your mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  <a href="/dashboard/search">🔍 Start Searching for Funders</a>
                </Button>
                <Button 
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <a href="/dashboard">← Back to Dashboard</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientOnly>
  );
}