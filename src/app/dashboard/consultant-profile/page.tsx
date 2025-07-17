"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Mock data for Consultant profile
const mockConsultantProfile = {
  name: "Michael Chen",
  email: "michael@impactadvisors.com",
  userType: "consultant" as const,
  organization: "Impact Advisors",
  title: "Senior Impact Consultant",
  website: "www.impactadvisors.com",
  phone: "+1 (415) 555-7890",
  location: "San Francisco, CA",
  yearsExperience: "12",
  
  bio: "Experienced impact consultant with over 12 years helping NGOs secure funding, scale operations, and maximize social impact. Specialized in strategic planning, grant writing, and impact measurement.",
  
  expertise: [
    "Grant Writing & Fundraising",
    "Strategic Planning",
    "Impact Measurement",
    "Program Design",
    "Financial Modeling",
    "Donor Relations"
  ],
  
  sectorExpertise: [
    "Health", 
    "Education", 
    "Environment", 
    "Economic Development"
  ],
  
  geographicExpertise: [
    "North America",
    "Sub-Saharan Africa",
    "Southeast Asia"
  ],
  
  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Mandarin", proficiency: "Native" },
    { language: "French", proficiency: "Professional" },
    { language: "Spanish", proficiency: "Conversational" }
  ],
  
  clients: [
    {
      id: "1",
      name: "Health for All NGO",
      sector: "Health",
      duration: "3 years",
      services: ["Grant Writing", "Strategic Planning", "Impact Measurement"],
      results: "Secured $1.2M in funding, expanded to 3 new countries"
    },
    {
      id: "2",
      name: "Green Earth Foundation",
      sector: "Environment",
      duration: "2 years",
      services: ["Program Design", "Fundraising Strategy", "Donor Relations"],
      results: "Increased annual funding by 45%, launched 2 major initiatives"
    },
    {
      id: "3",
      name: "Education Alliance",
      sector: "Education",
      duration: "1.5 years",
      services: ["Financial Modeling", "Grant Writing", "Strategic Planning"],
      results: "Secured $750K grant, improved operational efficiency by 30%"
    }
  ],
  
  successMetrics: {
    totalFundingSecured: "15000000",
    proposalSuccessRate: "78",
    clientRetentionRate: "92",
    avgClientGrowth: "45"
  },
  
  services: [
    {
      name: "Grant Writing & Fundraising",
      description: "Development of compelling grant proposals, fundraising strategies, and donor cultivation plans.",
      deliverables: ["Customized grant proposals", "Fundraising strategy", "Donor database setup", "Pitch materials"],
      pricing: "Starting at $3,000 per proposal"
    },
    {
      name: "Strategic Planning",
      description: "Comprehensive strategic planning to clarify mission, vision, goals, and implementation roadmap.",
      deliverables: ["Situation analysis", "3-5 year strategic plan", "Implementation timeline", "KPI framework"],
      pricing: "$10,000 - $25,000 depending on scope"
    },
    {
      name: "Impact Measurement",
      description: "Design and implementation of impact measurement frameworks and reporting systems.",
      deliverables: ["Impact metrics framework", "Data collection tools", "Analysis methodology", "Impact reports"],
      pricing: "$5,000 - $15,000 depending on complexity"
    },
    {
      name: "Operational Optimization",
      description: "Analysis and improvement of organizational processes, systems, and resource allocation.",
      deliverables: ["Process mapping", "Efficiency recommendations", "Implementation support", "Training"],
      pricing: "$8,000 - $20,000 depending on organization size"
    }
  ],
  
  testimonials: [
    {
      quote: "Michael's strategic guidance and grant writing expertise helped us secure our largest grant to date. His deep understanding of the funding landscape was invaluable.",
      author: "Sarah Johnson",
      title: "Executive Director",
      organization: "Health for All NGO"
    },
    {
      quote: "Working with Impact Advisors transformed our approach to impact measurement. We now have clear metrics that resonate with funders and drive our strategic decisions.",
      author: "David Osei",
      title: "Program Director",
      organization: "Green Earth Foundation"
    }
  ],
  
  education: [
    {
      degree: "MBA, Social Enterprise",
      institution: "Stanford Graduate School of Business",
      year: "2011"
    },
    {
      degree: "B.A., International Development",
      institution: "University of California, Berkeley",
      year: "2006"
    }
  ],
  
  certifications: [
    "Certified Fundraising Executive (CFRE)",
    "Project Management Professional (PMP)",
    "Social Impact Measurement Specialist (SIMS)"
  ],
  
  availability: {
    currentAvailability: "limited",
    nextAvailableDate: "2024-03-15",
    preferredProjectLength: "3-12 months",
    remoteWork: true,
    travelWillingness: "up to 25%"
  },
  
  contactPreferences: {
    preferredMethod: "email",
    responseTime: "Within 2 business days",
    initialConsultation: "Free 30-minute consultation",
    bestTimeToContact: "Weekdays 9am-5pm PST"
  }
};

const sectors = [
  "Health", "Education", "Environment", "Human Rights", "Economic Development",
  "Agriculture", "Water & Sanitation", "Gender Equality", "Disaster Relief", "Technology"
];

const regions = [
  "North America", "South America", "Europe", "Sub-Saharan Africa", "Middle East & North Africa",
  "South Asia", "Southeast Asia", "East Asia", "Oceania", "Global"
];

const languages = [
  "English", "Spanish", "French", "Arabic", "Mandarin", "Hindi", "Portuguese", "Russian",
  "Swahili", "Japanese", "German", "Italian"
];

const proficiencyLevels = [
  "Native", "Fluent", "Professional", "Conversational", "Basic"
];

export default function ConsultantProfilePage() {
  const [profile, setProfile] = useState(mockConsultantProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string[]) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: string | boolean) => {
    setProfile(prev => ({
      ...prev,
      [parent]: { ...prev[parent as keyof typeof prev] as any, [field]: value }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      console.log("Saving consultant profile:", profile);
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
    
    if (profile.name) completed++;
    if (profile.bio) completed++;
    if (profile.expertise.length > 0) completed++;
    if (profile.sectorExpertise.length > 0) completed++;
    if (profile.geographicExpertise.length > 0) completed++;
    if (profile.clients.length > 0) completed++;
    if (profile.services.length > 0) completed++;
    if (profile.education.length > 0) completed++;
    if (profile.certifications.length > 0) completed++;
    if (profile.availability.currentAvailability) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const tabs = [
    { id: "basic", name: "Basic Info", icon: "📋" },
    { id: "expertise", name: "Expertise & Skills", icon: "🧠" },
    { id: "clients", name: "Clients & Results", icon: "👥" },
    { id: "services", name: "Services & Pricing", icon: "💼" },
    { id: "credentials", name: "Credentials", icon: "🎓" },
    { id: "availability", name: "Availability", icon: "📅" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consultant Profile</h1>
          <p className="text-gray-600">Manage your professional profile and service offerings</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Profile Completeness</p>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
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
                  ? "border-purple-500 text-purple-600"
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
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your basic contact and professional information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title *</Label>
                    <Input
                      id="title"
                      value={profile.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., Senior Impact Consultant"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization/Company</Label>
                    <Input
                      id="organization"
                      value={profile.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      disabled={!isEditing}
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      disabled={!isEditing}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearsExperience">Years of Experience</Label>
                    <Input
                      id="yearsExperience"
                      value={profile.yearsExperience}
                      onChange={(e) => handleInputChange("yearsExperience", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Bio</CardTitle>
                <CardDescription>
                  Describe your background, approach, and value proposition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Textarea
                    rows={5}
                    value={profile.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Share your professional background, consulting approach, and unique value proposition..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "expertise" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Areas of Expertise</CardTitle>
                <CardDescription>
                  Select your primary consulting specialties and skills
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Consulting Services *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Grant Writing & Fundraising",
                      "Strategic Planning",
                      "Impact Measurement",
                      "Program Design",
                      "Financial Modeling",
                      "Donor Relations",
                      "Board Development",
                      "Marketing & Communications",
                      "Operational Optimization",
                      "Technology Implementation",
                      "Monitoring & Evaluation",
                      "Partnership Development"
                    ].map((service) => (
                      <label key={service} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={profile.expertise.includes(service)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleArrayChange("expertise", [...profile.expertise, service]);
                            } else {
                              handleArrayChange("expertise", profile.expertise.filter(s => s !== service));
                            }
                          }}
                          disabled={!isEditing}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector & Geographic Expertise</CardTitle>
                <CardDescription>
                  Select the sectors and regions where you have experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Sector Expertise *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {sectors.map((sector) => (
                      <label key={sector} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={profile.sectorExpertise.includes(sector)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleArrayChange("sectorExpertise", [...profile.sectorExpertise, sector]);
                            } else {
                              handleArrayChange("sectorExpertise", profile.sectorExpertise.filter(s => s !== sector));
                            }
                          }}
                          disabled={!isEditing}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm">{sector}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Geographic Expertise *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {regions.map((region) => (
                      <label key={region} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={profile.geographicExpertise.includes(region)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleArrayChange("geographicExpertise", [...profile.geographicExpertise, region]);
                            } else {
                              handleArrayChange("geographicExpertise", profile.geographicExpertise.filter(r => r !== region));
                            }
                          }}
                          disabled={!isEditing}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Skills</CardTitle>
                <CardDescription>
                  Languages you speak and proficiency levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.languages.map((lang, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Select 
                          value={lang.language} 
                          onValueChange={(value) => {
                            const updatedLanguages = [...profile.languages];
                            updatedLanguages[index] = { ...lang, language: value };
                            handleArrayChange("languages", updatedLanguages);
                          }}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {languages.map((language) => (
                              <SelectItem key={language} value={language}>
                                {language}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1">
                        <Select 
                          value={lang.proficiency} 
                          onValueChange={(value) => {
                            const updatedLanguages = [...profile.languages];
                            updatedLanguages[index] = { ...lang, proficiency: value };
                            handleArrayChange("languages", updatedLanguages);
                          }}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select proficiency" />
                          </SelectTrigger>
                          <SelectContent>
                            {proficiencyLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {isEditing && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            const updatedLanguages = profile.languages.filter((_, i) => i !== index);
                            handleArrayChange("languages", updatedLanguages);
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        handleArrayChange("languages", [...profile.languages, { language: "", proficiency: "" }]);
                      }}
                    >
                      Add Language
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}        {
activeTab === "clients" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Client Portfolio</CardTitle>
                    <CardDescription>Showcase your client work and results</CardDescription>
                  </div>
                  {isEditing && (
                    <Button size="sm">
                      Add Client
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.clients.map((client, index) => (
                  <div key={client.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{client.name}</h4>
                        <p className="text-sm text-gray-600">{client.sector} • {client.duration}</p>
                      </div>
                      {isEditing && (
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700">Services Provided:</h5>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {client.services.map((service, idx) => (
                            <span key={idx} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-700">Results:</h5>
                        <p className="text-sm text-gray-600">{client.results}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {profile.clients.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No clients added yet.</p>
                    {isEditing && (
                      <Button className="mt-2">
                        Add Your First Client
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Metrics</CardTitle>
                <CardDescription>Highlight your consulting achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalFundingSecured">Total Funding Secured ($)</Label>
                    <Input
                      id="totalFundingSecured"
                      value={profile.successMetrics.totalFundingSecured}
                      onChange={(e) => handleNestedChange("successMetrics", "totalFundingSecured", e.target.value)}
                      disabled={!isEditing}
                    />
                    <p className="text-xs text-gray-500">For all clients</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="proposalSuccessRate">Proposal Success Rate (%)</Label>
                    <Input
                      id="proposalSuccessRate"
                      value={profile.successMetrics.proposalSuccessRate}
                      onChange={(e) => handleNestedChange("successMetrics", "proposalSuccessRate", e.target.value)}
                      disabled={!isEditing}
                    />
                    <p className="text-xs text-gray-500">Grant/funding proposals</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="clientRetentionRate">Client Retention Rate (%)</Label>
                    <Input
                      id="clientRetentionRate"
                      value={profile.successMetrics.clientRetentionRate}
                      onChange={(e) => handleNestedChange("successMetrics", "clientRetentionRate", e.target.value)}
                      disabled={!isEditing}
                    />
                    <p className="text-xs text-gray-500">Returning clients</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="avgClientGrowth">Avg. Client Growth (%)</Label>
                    <Input
                      id="avgClientGrowth"
                      value={profile.successMetrics.avgClientGrowth}
                      onChange={(e) => handleNestedChange("successMetrics", "avgClientGrowth", e.target.value)}
                      disabled={!isEditing}
                    />
                    <p className="text-xs text-gray-500">Post-engagement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Client Testimonials</CardTitle>
                    <CardDescription>What your clients say about your work</CardDescription>
                  </div>
                  {isEditing && (
                    <Button size="sm" variant="outline">
                      Add Testimonial
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.testimonials.map((testimonial, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="text-3xl text-gray-300 mr-3">❝</div>
                      <div>
                        <p className="text-gray-700 italic">{testimonial.quote}</p>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                          <p className="text-xs text-gray-600">{testimonial.title}, {testimonial.organization}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Service Offerings</CardTitle>
                    <CardDescription>Define your consulting services and pricing</CardDescription>
                  </div>
                  {isEditing && (
                    <Button size="sm">
                      Add Service
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.services.map((service, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                      {isEditing && (
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Deliverables:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {service.deliverables.map((deliverable, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Pricing:</h5>
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {service.pricing}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {profile.services.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No services defined yet.</p>
                    {isEditing && (
                      <Button className="mt-2">
                        Add Your First Service
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "credentials" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>Your academic background</CardDescription>
                  </div>
                  {isEditing && (
                    <Button size="sm">
                      Add Education
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{edu.year}</p>
                      {isEditing && (
                        <Button variant="ghost" size="sm" className="mt-1">
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {profile.education.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No education added yet.</p>
                    {isEditing && (
                      <Button className="mt-2">
                        Add Education
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Certifications</CardTitle>
                    <CardDescription>Professional certifications and credentials</CardDescription>
                  </div>
                  {isEditing && (
                    <Button size="sm">
                      Add Certification
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                        <span className="text-sm text-gray-900">{cert}</span>
                      </div>
                      {isEditing && (
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}

                  {profile.certifications.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No certifications added yet.</p>
                      {isEditing && (
                        <Button className="mt-2">
                          Add Certification
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "availability" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Availability</CardTitle>
                <CardDescription>
                  Let potential clients know your availability status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentAvailability">Current Status</Label>
                    <Select 
                      value={profile.availability.currentAvailability} 
                      onValueChange={(value) => handleNestedChange("availability", "currentAvailability", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available Now</SelectItem>
                        <SelectItem value="limited">Limited Availability</SelectItem>
                        <SelectItem value="booked">Fully Booked</SelectItem>
                        <SelectItem value="not-taking">Not Taking New Clients</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nextAvailableDate">Next Available Date</Label>
                    <Input
                      id="nextAvailableDate"
                      type="date"
                      value={profile.availability.nextAvailableDate}
                      onChange={(e) => handleNestedChange("availability", "nextAvailableDate", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferredProjectLength">Preferred Project Length</Label>
                    <Select 
                      value={profile.availability.preferredProjectLength} 
                      onValueChange={(value) => handleNestedChange("availability", "preferredProjectLength", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3 months">1-3 months</SelectItem>
                        <SelectItem value="3-6 months">3-6 months</SelectItem>
                        <SelectItem value="6-12 months">6-12 months</SelectItem>
                        <SelectItem value="12+ months">12+ months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="travelWillingness">Travel Willingness</Label>
                    <Select 
                      value={profile.availability.travelWillingness} 
                      onValueChange={(value) => handleNestedChange("availability", "travelWillingness", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select travel preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no travel">No Travel</SelectItem>
                        <SelectItem value="up to 10%">Up to 10%</SelectItem>
                        <SelectItem value="up to 25%">Up to 25%</SelectItem>
                        <SelectItem value="up to 50%">Up to 50%</SelectItem>
                        <SelectItem value="extensive">Extensive Travel OK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Work Preferences</Label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={profile.availability.remoteWork}
                        onChange={(e) => handleNestedChange("availability", "remoteWork", e.target.checked)}
                        disabled={!isEditing}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm">Remote work available</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Preferences</CardTitle>
                <CardDescription>
                  How you prefer to be contacted by potential clients
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferredMethod">Preferred Contact Method</Label>
                    <Select 
                      value={profile.contactPreferences.preferredMethod} 
                      onValueChange={(value) => handleNestedChange("contactPreferences", "preferredMethod", value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select contact method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="video call">Video Call</SelectItem>
                        <SelectItem value="in person">In Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="responseTime">Response Time</Label>
                    <Input
                      id="responseTime"
                      value={profile.contactPreferences.responseTime}
                      onChange={(e) => handleNestedChange("contactPreferences", "responseTime", e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., Within 24 hours"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="initialConsultation">Initial Consultation</Label>
                    <Input
                      id="initialConsultation"
                      value={profile.contactPreferences.initialConsultation}
                      onChange={(e) => handleNestedChange("contactPreferences", "initialConsultation", e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., Free 30-minute consultation"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bestTimeToContact">Best Time to Contact</Label>
                    <Input
                      id="bestTimeToContact"
                      value={profile.contactPreferences.bestTimeToContact}
                      onChange={(e) => handleNestedChange("contactPreferences", "bestTimeToContact", e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., Weekdays 9am-5pm PST"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}