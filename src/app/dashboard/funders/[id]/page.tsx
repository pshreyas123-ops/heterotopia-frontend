"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data - in real app this would come from API based on the ID
const mockFunderData = {
  "1": {
    name: "Gates Foundation",
    type: "Private Foundation",
    location: "Seattle, USA",
    website: "gatesfoundation.org",
    description: "The Bill & Melinda Gates Foundation works to help all people lead healthy, productive lives. In developing countries, it focuses on improving people's health and giving them the chance to lift themselves out of hunger and extreme poverty.",
    mission: "Our mission is to create a world where every person has the opportunity to live a healthy, productive life.",
    sectors: ["Health", "Education", "Development"],
    grantRange: "$100,000 - $5,000,000",
    averageGrant: "$750,000",
    totalGrantsLastYear: 156,
    geographicFocus: ["Global", "Sub-Saharan Africa", "South Asia"],
    applicationProcess: "Online application through foundation portal",
    applicationDeadlines: "Rolling basis with quarterly reviews",
    requirements: [
      "Must be a registered 501(c)(3) organization",
      "Minimum 3 years of operational history",
      "Detailed impact measurement plan required",
      "Financial audits for past 2 years"
    ],
    recentGrants: [
      {
        recipient: "PATH",
        amount: "$2,500,000",
        purpose: "Malaria prevention program in Kenya",
        year: "2024"
      },
      {
        recipient: "Partners in Health",
        amount: "$1,800,000", 
        purpose: "Healthcare system strengthening in Rwanda",
        year: "2024"
      },
      {
        recipient: "Teach for All",
        amount: "$950,000",
        purpose: "Teacher training program expansion",
        year: "2023"
      }
    ],
    contactInfo: {
      email: "grants@gatesfoundation.org",
      phone: "+1 (206) 709-3100",
      address: "440 5th Avenue N, Seattle, WA 98109"
    }
  }
};

export default function FunderDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview");
  const funder = mockFunderData[params.id as keyof typeof mockFunderData];

  if (!funder) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Funder Not Found</h1>
        <p className="text-gray-600 mb-6">The funder you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/dashboard/search">Back to Search</Link>
        </Button>
      </div>
    );
  }

  const tabs = [
    { id: "overview", name: "Overview", icon: "📋" },
    { id: "grants", name: "Recent Grants", icon: "💰" },
    { id: "requirements", name: "Requirements", icon: "📝" },
    { id: "contact", name: "Contact", icon: "📞" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/search">← Back to Search</Link>
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{funder.name}</h1>
            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
              92% Match
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-gray-600 mb-4">
            <span>{funder.type}</span>
            <span>•</span>
            <span>{funder.location}</span>
            <span>•</span>
            <a href={`https://${funder.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {funder.website}
            </a>
          </div>
          
          <p className="text-gray-700 text-lg">{funder.description}</p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline">
            Save for Reference
          </Button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{funder.totalGrantsLastYear}</div>
            <div className="text-sm text-gray-600">Grants in 2024</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{funder.averageGrant}</div>
            <div className="text-sm text-gray-600">Average Grant</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{funder.grantRange}</div>
            <div className="text-sm text-gray-600">Grant Range</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{funder.sectors.length}</div>
            <div className="text-sm text-gray-600">Focus Areas</div>
          </CardContent>
        </Card>
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
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mission & Focus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Mission Statement</h4>
                  <p className="text-gray-700">{funder.mission}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Focus Sectors</h4>
                  <div className="flex flex-wrap gap-2">
                    {funder.sectors.map((sector) => (
                      <span key={sector} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Geographic Focus</h4>
                  <div className="flex flex-wrap gap-2">
                    {funder.geographicFocus.map((region) => (
                      <span key={region} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Application Process</h4>
                  <p className="text-gray-700">{funder.applicationProcess}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Deadlines</h4>
                  <p className="text-gray-700">{funder.applicationDeadlines}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Grant Range</h4>
                  <p className="text-gray-700">{funder.grantRange}</p>
                  <p className="text-sm text-gray-600">Average: {funder.averageGrant}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "grants" && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Grants</CardTitle>
              <CardDescription>
                Recent funding awarded by {funder.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funder.recentGrants.map((grant, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{grant.recipient}</h4>
                        <p className="text-gray-700 mt-1">{grant.purpose}</p>
                        <p className="text-sm text-gray-500 mt-2">Awarded in {grant.year}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">{grant.amount}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "requirements" && (
          <Card>
            <CardHeader>
              <CardTitle>Application Requirements</CardTitle>
              <CardDescription>
                Eligibility criteria and required documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {funder.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "contact" && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                How to get in touch with {funder.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Email</h4>
                <a href={`mailto:${funder.contactInfo.email}`} className="text-blue-600 hover:underline">
                  {funder.contactInfo.email}
                </a>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Phone</h4>
                <a href={`tel:${funder.contactInfo.phone}`} className="text-blue-600 hover:underline">
                  {funder.contactInfo.phone}
                </a>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Address</h4>
                <p className="text-gray-700">{funder.contactInfo.address}</p>
              </div>
              
              <div className="pt-4 border-t">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Contact information provided for reference only
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}