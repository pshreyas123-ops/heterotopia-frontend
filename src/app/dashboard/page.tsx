"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";

// NGO Dashboard Data
const ngoStats = {
  profileViews: 24,
  activeCampaigns: 3,
  totalBeneficiaries: 12500,
  fundingReceived: 450000,
};

// Funder Dashboard Data
const funderStats = {
  totalDeployed: 3200000,
  activeInvestments: 15,
  portfolioROI: 4.2,
  livesTransformed: 75000,
  pendingApplications: 8,
  avgReviewTime: 12,
};

const funderInvestments = [
  {
    id: "1",
    recipient: "Global Health Initiative",
    amount: 250000,
    purpose: "Malaria Prevention Program",
    status: "active",
    progress: 75,
    impactScore: 9.2,
    beneficiaries: 8500,
    duration: "18 months",
    nextReview: "Feb 15",
  },
  {
    id: "2",
    recipient: "Education Alliance",
    amount: 180000,
    purpose: "Teacher Training Initiative",
    status: "milestone",
    progress: 45,
    impactScore: 8.7,
    beneficiaries: 3200,
    duration: "24 months",
    nextReview: "Mar 10",
  },
  {
    id: "3",
    recipient: "Clean Water Foundation",
    amount: 320000,
    purpose: "Rural Water Infrastructure",
    status: "completed",
    progress: 100,
    impactScore: 9.5,
    beneficiaries: 12000,
    duration: "12 months",
    nextReview: "Completed",
  },
];

const pendingApplications = [
  {
    id: "1",
    organization: "Green Earth Initiative",
    amount: 195000,
    purpose: "Climate-Smart Farming Initiative",
    priority: "high",
    impactScore: 9.1,
    beneficiaries: 4500,
    submittedDays: 3,
    strategicFit: 94,
    carbonOffset: 2500,
  },
  {
    id: "2",
    organization: "Youth Empowerment Network",
    amount: 85000,
    purpose: "Digital Skills Training Program",
    priority: "medium",
    impactScore: 8.3,
    beneficiaries: 1200,
    submittedDays: 7,
    strategicFit: 87,
    carbonOffset: 0,
  },
  {
    id: "3",
    organization: "Healthcare Access Foundation",
    amount: 420000,
    purpose: "Mobile Health Clinic Expansion",
    priority: "high",
    impactScore: 9.4,
    beneficiaries: 15000,
    submittedDays: 12,
    strategicFit: 98,
    carbonOffset: 0,
  },
];

// Consultant Dashboard Data
const consultantStats = {
  clientsManaged: 15,
  activeProjects: 8,
  successfulMatches: 23,
  totalFundingSecured: 1200000,
  proposalWinRate: 78,
  avgClientGrowth: 42,
};

const consultantClients = [
  {
    id: "1",
    name: "Health for All NGO",
    sector: "Health",
    status: "active",
    fundingGoal: 100000,
    progress: 80,
    nextDeliverable: "Impact Report",
    dueDate: "Feb 15"
  },
  {
    id: "2",
    name: "Green Earth Foundation",
    sector: "Environment",
    status: "seeking",
    fundingGoal: 250000,
    progress: 30,
    nextDeliverable: "Funder Pitch Deck",
    dueDate: "Jan 28"
  },
  {
    id: "3",
    name: "Education Alliance",
    sector: "Education",
    status: "active",
    fundingGoal: 75000,
    progress: 65,
    nextDeliverable: "Grant Application",
    dueDate: "Feb 3"
  }
];

const consultantOpportunities = [
  {
    id: "1",
    name: "Water Access Project",
    organization: "Clean Water Initiative",
    type: "Grant Application",
    value: 45000,
    deadline: "Feb 20",
    matchScore: 92,
    status: "new"
  },
  {
    id: "2",
    name: "Youth Empowerment Program",
    organization: "Future Leaders Foundation",
    type: "Strategic Planning",
    value: 30000,
    deadline: "Mar 5",
    matchScore: 87,
    status: "new"
  }
];

export default function DashboardPage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const { user, setUser, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
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

  const handleUserTypeChange = (newRole: "ngo" | "funder" | "consultant") => {
    const updatedUser = {
      ...user,
      role: newRole,
      name: newRole === "ngo" ? "John Doe" : newRole === "funder" ? "Sarah Johnson" : "Michael Chen",
      organization: newRole === "ngo" ? "Global Health Initiative" : newRole === "funder" ? "Impact Foundation" : "Impact Advisors",
      email: newRole === "ngo" ? "john@globalhealthinitiative.org" : newRole === "funder" ? "sarah@impactfoundation.org" : "michael@impactadvisors.com",
      profileComplete: newRole === "ngo" ? 75 : newRole === "funder" ? 85 : 90
    };
    console.log("Switching to user type:", newRole, updatedUser); // Debug log
    setUser(updatedUser);
  };

  return (
    <div className="space-y-8">
      {/* User Type Switcher for Testing */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Dashboard View</h3>
                <p className="text-xs text-gray-600">Switch between user types to test different dashboards</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={user.role === "ngo" ? "default" : "outline"}
                  onClick={() => handleUserTypeChange("ngo")}
                >
                  NGO Dashboard
                </Button>
                <Button
                  size="sm"
                  variant={user.role === "funder" ? "default" : "outline"}
                  onClick={() => handleUserTypeChange("funder")}
                >
                  Funder Dashboard
                </Button>
                <Button
                  size="sm"
                  variant={user.role === "consultant" ? "default" : "outline"}
                  onClick={() => handleUserTypeChange("consultant")}
                >
                  Consultant Dashboard
                </Button>
              </div>
            </div>
            
            {/* Current User Debug Info */}
            <div className="flex items-center justify-between text-xs bg-white p-2 rounded border">
              <div>
                <span className="font-medium">Current User:</span> {user.name} ({user.role}) - {user.organization}
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => {
                  localStorage.removeItem("heterotopia_user");
                  window.location.reload();
                }}
              >
                Clear Cache & Reload
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Render appropriate dashboard based on user role */}
      {user.role === "ngo" && <NGODashboard showWelcome={showWelcome} setShowWelcome={setShowWelcome} user={user} />}
      {user.role === "funder" && <FunderDashboard showWelcome={showWelcome} setShowWelcome={setShowWelcome} user={user} />}
      {user.role === "consultant" && <ConsultantDashboard showWelcome={showWelcome} setShowWelcome={setShowWelcome} user={user} />}
    </div>
  );
}

// NGO Dashboard Component
function NGODashboard({ showWelcome, setShowWelcome, user }: { 
  showWelcome: boolean; 
  setShowWelcome: (show: boolean) => void; 
  user: any;
}) {
  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      {showWelcome && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Welcome back, {user.name}! 🌍
                </h2>
                <p className="text-gray-600 mb-4">
                  Your profile is {user.profileComplete}% complete. Complete your profile to attract more funders.
                </p>
                <div className="flex space-x-3">
                  <Button asChild>
                    <Link href="/dashboard/profile">Complete Profile</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/search">Find Funders</Link>
                  </Button>
                </div>
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

      {/* NGO Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Profile Views</p>
                <p className="text-2xl font-bold text-gray-900">{ngoStats.profileViews}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👁️</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{ngoStats.activeCampaigns}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">2 ending soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Beneficiaries</p>
                <p className="text-2xl font-bold text-gray-900">{ngoStats.totalBeneficiaries.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Across all campaigns</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Funding Received</p>
                <p className="text-2xl font-bold text-gray-900">${ngoStats.fundingReceived.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">This year</p>
          </CardContent>
        </Card>
      </div>

      {/* NGO Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
              <Link href="/dashboard/profile">
                <span className="text-2xl">📝</span>
                <span className="font-medium">Update Profile</span>
                <span className="text-xs text-gray-500">Keep information current</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">🚀</span>
              <span className="font-medium">New Campaign</span>
              <span className="text-xs text-gray-500">Start fundraising</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
              <Link href="/dashboard/search">
                <span className="text-2xl">🔍</span>
                <span className="font-medium">Find Funders</span>
                <span className="text-xs text-gray-500">Discover opportunities</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">📊</span>
              <span className="font-medium">Impact Report</span>
              <span className="text-xs text-gray-500">Generate reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Funder Dashboard Component
function FunderDashboard({ showWelcome, setShowWelcome, user }: { 
  showWelcome: boolean; 
  setShowWelcome: (show: boolean) => void; 
  user: any;
}) {
  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      {showWelcome && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Welcome back, {user.name}! 💰
                </h2>
                <p className="text-gray-600 mb-4">
                  You have {funderStats.pendingApplications} applications pending review with an average review time of {funderStats.avgReviewTime} days.
                </p>
                <div className="flex space-x-3">
                  <Button asChild>
                    <Link href="/dashboard/search">Review Applications</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/search">Discover NGOs</Link>
                  </Button>
                </div>
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

      {/* Funder Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Capital Deployed</p>
                <p className="text-2xl font-bold text-gray-900">${(funderStats.totalDeployed / 1000000).toFixed(1)}M</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Across {funderStats.activeInvestments} investments</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Portfolio ROI</p>
                <p className="text-2xl font-bold text-gray-900">{funderStats.portfolioROI}x</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Social impact multiplier</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lives Transformed</p>
                <p className="text-2xl font-bold text-gray-900">{(funderStats.livesTransformed / 1000).toFixed(0)}K</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🌍</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Direct beneficiaries</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{funderStats.pendingApplications}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Avg {funderStats.avgReviewTime} days review time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Investments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Investments</CardTitle>
                <CardDescription>Your current portfolio performance</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View Portfolio
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {funderInvestments.map((investment) => (
              <div key={investment.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{investment.recipient}</h4>
                    <p className="text-sm text-gray-600">{investment.purpose}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>${investment.amount.toLocaleString()}</span>
                      <span>{investment.duration}</span>
                      <span>{investment.beneficiaries.toLocaleString()} beneficiaries</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      investment.status === 'active' ? 'bg-green-100 text-green-800' :
                      investment.status === 'milestone' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {investment.status}
                    </span>
                    <div className="text-sm font-medium text-gray-900 mt-1">
                      Impact: {investment.impactScore}/10
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{investment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${investment.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Next Review: {investment.nextReview}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Priority Applications</CardTitle>
                <CardDescription>High-impact opportunities awaiting review</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Review Queue
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingApplications.slice(0, 3).map((app) => (
              <div key={app.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{app.organization}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        app.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.priority} priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{app.purpose}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                      <span>${app.amount.toLocaleString()}</span>
                      <span>{app.beneficiaries.toLocaleString()} beneficiaries</span>
                      <span>{app.submittedDays} days ago</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-lg font-bold text-blue-600">{app.impactScore}</div>
                    <div className="text-xs text-gray-600">Impact Score</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="text-lg font-bold text-green-600">{app.strategicFit}%</div>
                    <div className="text-xs text-gray-600">Strategic Fit</div>
                  </div>
                </div>
                
                {app.carbonOffset > 0 && (
                  <div className="text-xs text-green-600 mb-2">
                    🌱 {app.carbonOffset} tons CO2 offset potential
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    Review Application
                  </Button>
                  <Button size="sm" variant="outline">
                    Schedule Call
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Tools</CardTitle>
          <CardDescription>Streamline your impact investing workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
              <Link href="/dashboard/search">
                <span className="text-2xl">🔍</span>
                <span className="font-medium">Discover NGOs</span>
                <span className="text-xs text-gray-500">Find new opportunities</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">📊</span>
              <span className="font-medium">Portfolio Analytics</span>
              <span className="text-xs text-gray-500">Track performance</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">🎯</span>
              <span className="font-medium">Impact Reports</span>
              <span className="text-xs text-gray-500">Measure outcomes</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">⚙️</span>
              <span className="font-medium">Investment Settings</span>
              <span className="text-xs text-gray-500">Configure preferences</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Consultant Dashboard Component
function ConsultantDashboard({ showWelcome, setShowWelcome, user }: { 
  showWelcome: boolean; 
  setShowWelcome: (show: boolean) => void; 
  user: any;
}) {
  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      {showWelcome && (
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Welcome back, {user.name}! 👥
                </h2>
                <p className="text-gray-600 mb-4">
                  You're managing {consultantStats.clientsManaged} clients with {consultantStats.activeProjects} active projects.
                </p>
                <div className="flex space-x-3">
                  <Button asChild>
                    <Link href="/dashboard/search">Find Opportunities</Link>
                  </Button>
                  <Button variant="outline">
                    Add New Client
                  </Button>
                </div>
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

      {/* Consultant Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clients Managed</p>
                <p className="text-2xl font-bold text-gray-900">{consultantStats.clientsManaged}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Across all sectors</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{consultantStats.activeProjects}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Proposal Win Rate</p>
                <p className="text-2xl font-bold text-gray-900">{consultantStats.proposalWinRate}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Last 12 months</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Funding Secured</p>
                <p className="text-2xl font-bold text-gray-900">${(consultantStats.totalFundingSecured / 1000000).toFixed(1)}M</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">For clients</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Client Portfolio */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Client Portfolio</CardTitle>
                <CardDescription>Your managed NGO clients</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {consultantClients.map((client) => (
              <div key={client.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{client.name}</h4>
                    <p className="text-sm text-gray-600">{client.sector}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {client.status}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Funding Goal: ${client.fundingGoal.toLocaleString()}</span>
                    <span>{client.progress}% progress</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${client.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t text-sm">
                  <div>
                    <span className="font-medium">Next:</span> {client.nextDeliverable}
                  </div>
                  <div className="text-orange-600 font-medium">
                    Due: {client.dueDate}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Funding Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle>Funding Opportunities</CardTitle>
            <CardDescription>Potential matches for your clients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {consultantOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">💼</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">{opportunity.name}</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {opportunity.matchScore}% match
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{opportunity.organization} • {opportunity.type}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">Value: ${opportunity.value.toLocaleString()}</p>
                    <p className="text-xs text-orange-600 font-medium">Deadline: {opportunity.deadline}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Match</Button>
              </div>
            ))}

            <div className="text-center pt-2">
              <Button variant="ghost" size="sm">
                View All Opportunities →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your consulting business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">➕</span>
              <span className="font-medium">Add Client</span>
              <span className="text-xs text-gray-500">Onboard new NGO</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" asChild>
              <Link href="/dashboard/search">
                <span className="text-2xl">🔍</span>
                <span className="font-medium">Find Funders</span>
                <span className="text-xs text-gray-500">For your clients</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">📊</span>
              <span className="font-medium">Generate Reports</span>
              <span className="text-xs text-gray-500">Client progress</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">💼</span>
              <span className="font-medium">Manage Portfolio</span>
              <span className="text-xs text-gray-500">Client overview</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}