"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock NGO data for detailed view
const mockNGOData = {
  "1": {
    name: "Global Health Initiative",
    type: "International NGO",
    location: "Kenya, Uganda, Tanzania",
    website: "globalhealthinitiative.org",
    established: "2016",
    description: "Improving healthcare access in rural communities through mobile clinics and community health worker training programs.",
    mission: "To ensure that every person in rural Africa has access to quality healthcare services, regardless of their location or economic status.",
    
    sectors: ["Health", "Community Development"],
    sdgGoals: ["Good Health and Well-being", "Reduced Inequalities", "Partnerships for the Goals"],
    geographicFocus: ["Kenya", "Uganda", "Tanzania"],
    
    impactMetrics: {
      totalBeneficiaries: 12500,
      livesImproved: 12500,
      healthWorkersTrained: 200,
      clinicsEstablished: 15,
      vaccinesAdministered: 8500,
      maternalHealthServices: 2500
    },
    
    impactScore: 9.2,
    yearsActive: 8,
    teamSize: 45,
    
    currentCampaigns: [
      {
        id: "1",
        name: "Mobile Health Clinics Expansion",
        description: "Expanding our mobile health clinic program to reach 5 additional remote villages",
        target: 150000,
        raised: 95000,
        progress: 63,
        beneficiaries: 3500,
        duration: "18 months",
        status: "active"
      },
      {
        id: "2",
        name: "Community Health Worker Training",
        description: "Training 50 additional community health workers in maternal and child health",
        target: 75000,
        raised: 45000,
        progress: 60,
        beneficiaries: 2000,
        duration: "12 months",
        status: "active"
      }
    ],
    
    completedProjects: [
      {
        id: "1",
        name: "Rural Vaccination Program",
        description: "Comprehensive vaccination program covering 10 villages",
        amount: 120000,
        beneficiaries: 5000,
        outcome: "Achieved 95% vaccination coverage, reduced child mortality by 40%",
        year: "2023",
        funder: "Gates Foundation"
      },
      {
        id: "2",
        name: "Maternal Health Initiative",
        description: "Improving maternal health outcomes through skilled birth attendance",
        amount: 85000,
        beneficiaries: 1500,
        outcome: "Reduced maternal mortality by 60%, trained 25 midwives",
        year: "2022",
        funder: "WHO"
      }
    ],
    
    fundingHistory: [
      { funder: "Gates Foundation", amount: 180000, year: 2023, purpose: "Malaria Prevention" },
      { funder: "WHO", amount: 95000, year: 2022, purpose: "Maternal Health" },
      { funder: "USAID", amount: 65000, year: 2021, purpose: "Health Worker Training" }
    ],
    
    fundingNeeds: {
      currentNeeds: "$50,000 - $250,000",
      preferredRange: "$100,000 - $200,000",
      useOfFunds: [
        "Mobile clinic equipment and maintenance",
        "Community health worker salaries and training",
        "Medical supplies and vaccines",
        "Program monitoring and evaluation"
      ]
    },
    
    team: [
      {
        name: "Dr. Sarah Kimani",
        role: "Executive Director",
        experience: "15 years in public health",
        education: "MD, MPH from University of Nairobi"
      },
      {
        name: "James Mwangi",
        role: "Program Manager",
        experience: "8 years in community health",
        education: "BSc Public Health, Kenyatta University"
      }
    ],
    
    partnerships: [
      "Kenya Ministry of Health",
      "Uganda Health Ministry", 
      "Local Community Leaders",
      "Regional Hospitals Network"
    ],
    
    financials: {
      annualBudget: 450000,
      programExpenses: 85,
      adminExpenses: 12,
      fundraisingExpenses: 3,
      transparency: "Audited financials available",
      certifications: ["GuideStar Gold Seal", "Charity Navigator 4-Star"]
    },
    
    contactInfo: {
      email: "partnerships@globalhealthinitiative.org",
      phone: "+254-700-123456",
      address: "Nairobi, Kenya",
      preferredContact: "email",
      responseTime: "2-3 business days"
    },
    
    applicationProcess: {
      method: "Online application",
      requirements: [
        "Detailed project proposal",
        "Budget breakdown",
        "Impact measurement plan",
        "Team qualifications",
        "Community endorsement letters"
      ],
      timeline: "4-6 weeks review process"
    }
  }
};

export default function NGODetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isInterested, setIsInterested] = useState(false);
  const ngo = mockNGOData[params.id as keyof typeof mockNGOData];

  if (!ngo) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">NGO Not Found</h1>
        <p className="text-gray-600 mb-6">The organization you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/dashboard/search">Back to Search</Link>
        </Button>
      </div>
    );
  }

  const tabs = [
    { id: "overview", name: "Overview", icon: "📋" },
    { id: "impact", name: "Impact & Projects", icon: "📊" },
    { id: "funding", name: "Funding & Financials", icon: "💰" },
    { id: "team", name: "Team & Partnerships", icon: "👥" },
    { id: "application", name: "How to Fund", icon: "📝" },
  ];

  return (
    <div className="space-y-6">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="outline" size="sm" asChild className="touch-manipulation min-h-[44px]">
              <Link href="/dashboard/search">← Back to Search</Link>
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{ngo.name}</h1>
            <span className={`text-sm px-3 py-1 rounded-full ${
              ngo.impactScore >= 9 ? 'bg-green-100 text-green-800' :
              ngo.impactScore >= 8 ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              Impact Score: {ngo.impactScore}/10
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-gray-600 mb-4">
            <span>{ngo.type}</span>
            <span>•</span>
            <span>{ngo.location}</span>
            <span>•</span>
            <span>Est. {ngo.established}</span>
            <span>•</span>
            <a href={`https://${ngo.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {ngo.website}
            </a>
          </div>
          
          <p className="text-gray-700 text-lg mb-4">{ngo.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {ngo.sectors.map((sector) => (
              <span key={sector} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {sector}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col space-y-3 lg:ml-8 w-full lg:w-auto">
          <Button 
            onClick={() => setIsInterested(!isInterested)}
            className={`touch-manipulation min-h-[44px] ${isInterested ? "bg-green-600 hover:bg-green-700" : ""}`}
          >
            {isInterested ? "✓ Interested" : "Express Interest"}
          </Button>
          <Button variant="outline" className="touch-manipulation min-h-[44px]">
            Request Proposal
          </Button>
          <Button variant="outline" className="touch-manipulation min-h-[44px]">
            Schedule Call
          </Button>
          <Button variant="ghost" size="sm" className="touch-manipulation min-h-[44px]">
            Save for Later
          </Button>
        </div>
      </div>

      {/* Quick stats - Mobile Optimized */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-blue-600">{ngo.impactMetrics.totalBeneficiaries.toLocaleString()}</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Beneficiaries</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-green-600">{ngo.completedProjects.length + ngo.currentCampaigns.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-purple-600">{ngo.yearsActive}</div>
            <div className="text-xs sm:text-sm text-gray-600">Years Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-orange-600">{ngo.teamSize}</div>
            <div className="text-xs sm:text-sm text-gray-600">Team Members</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-red-600">${(ngo.financials.annualBudget / 1000).toFixed(0)}K</div>
            <div className="text-xs sm:text-sm text-gray-600">Annual Budget</div>
          </CardContent>
        </Card>
      </div>

      {/* Tab navigation - Mobile Optimized */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-2 sm:space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 whitespace-nowrap touch-manipulation min-h-[44px] ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="text-sm sm:text-base">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mission & Approach</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Mission Statement</h4>
                  <p className="text-gray-700">{ngo.mission}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Geographic Focus</h4>
                  <div className="flex flex-wrap gap-2">
                    {ngo.geographicFocus.map((location) => (
                      <span key={location} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">SDG Alignment</h4>
                  <div className="flex flex-wrap gap-2">
                    {ngo.sdgGoals.map((goal) => (
                      <span key={goal} className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Impact Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Lives Improved</span>
                    <span className="font-semibold text-blue-600">{ngo.impactMetrics.livesImproved.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Health Workers Trained</span>
                    <span className="font-semibold text-green-600">{ngo.impactMetrics.healthWorkersTrained}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Clinics Established</span>
                    <span className="font-semibold text-purple-600">{ngo.impactMetrics.clinicsEstablished}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Vaccines Administered</span>
                    <span className="font-semibold text-orange-600">{ngo.impactMetrics.vaccinesAdministered.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Maternal Health Services</span>
                    <span className="font-semibold text-red-600">{ngo.impactMetrics.maternalHealthServices.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "impact" && (
          <div className="space-y-6">
            {/* Current Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle>Current Campaigns</CardTitle>
                <CardDescription>Active fundraising campaigns seeking support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ngo.currentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                          <span>{campaign.beneficiaries.toLocaleString()} beneficiaries</span>
                          <span>•</span>
                          <span>{campaign.duration}</span>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {campaign.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{campaign.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${campaign.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${campaign.raised.toLocaleString()} raised</span>
                        <span>${campaign.target.toLocaleString()} goal</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm">Fund This Campaign</Button>
                      <Button size="sm" variant="outline">Learn More</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Completed Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Completed Projects</CardTitle>
                <CardDescription>Track record of successful implementations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ngo.completedProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                          <span>{project.beneficiaries.toLocaleString()} beneficiaries</span>
                          <span>•</span>
                          <span>Funded by {project.funder}</span>
                          <span>•</span>
                          <span>{project.year}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">
                          ${project.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h5 className="font-medium text-green-800 mb-1">Impact Achieved:</h5>
                      <p className="text-sm text-green-700">{project.outcome}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "funding" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funding Needs */}
            <Card>
              <CardHeader>
                <CardTitle>Current Funding Needs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Funding Range</h4>
                  <p className="text-lg font-semibold text-blue-600">{ngo.fundingNeeds.currentNeeds}</p>
                  <p className="text-sm text-gray-600">Preferred: {ngo.fundingNeeds.preferredRange}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Use of Funds</h4>
                  <ul className="space-y-2">
                    {ngo.fundingNeeds.useOfFunds.map((use, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-sm text-gray-700">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Financial Transparency */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Annual Budget</h4>
                  <p className="text-lg font-semibold text-green-600">
                    ${ngo.financials.annualBudget.toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Expense Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Program Expenses</span>
                      <span className="text-sm font-medium">{ngo.financials.programExpenses}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Administrative</span>
                      <span className="text-sm font-medium">{ngo.financials.adminExpenses}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Fundraising</span>
                      <span className="text-sm font-medium">{ngo.financials.fundraisingExpenses}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Certifications</h4>
                  <div className="space-y-1">
                    {ngo.financials.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Funding History */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Funding History</CardTitle>
                <CardDescription>Previous funding relationships and track record</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ngo.fundingHistory.map((funding, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{funding.funder}</h4>
                        <p className="text-sm text-gray-600">{funding.purpose}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          ${funding.amount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">{funding.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "team" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Leadership Team */}
            <Card>
              <CardHeader>
                <CardTitle>Leadership Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ngo.team.map((member, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <p className="text-sm text-blue-600 mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600 mb-1">{member.experience}</p>
                    <p className="text-sm text-gray-500">{member.education}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Partnerships */}
            <Card>
              <CardHeader>
                <CardTitle>Key Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ngo.partnerships.map((partner, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-blue-500">🤝</span>
                      <span className="text-sm text-gray-700">{partner}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "application" && (
          <Card>
            <CardHeader>
              <CardTitle>How to Fund This Organization</CardTitle>
              <CardDescription>Application process and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Application Method</h4>
                <p className="text-gray-700">{ngo.applicationProcess.method}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Required Documents</h4>
                <ul className="space-y-2">
                  {ngo.applicationProcess.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-sm text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Review Timeline</h4>
                <p className="text-gray-700">{ngo.applicationProcess.timeline}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                <div className="space-y-2">
                  <p className="text-sm"><span className="font-medium">Email:</span> {ngo.contactInfo.email}</p>
                  <p className="text-sm"><span className="font-medium">Phone:</span> {ngo.contactInfo.phone}</p>
                  <p className="text-sm"><span className="font-medium">Response Time:</span> {ngo.contactInfo.responseTime}</p>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4 border-t">
                <Button className="flex-1">
                  Start Application Process
                </Button>
                <Button variant="outline">
                  Contact Organization
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}