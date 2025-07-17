"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data - in real app this would come from API
const mockMatches = [
  {
    id: "1",
    funder: {
      name: "Gates Foundation",
      type: "Private Foundation",
      location: "Seattle, USA",
      description: "The Bill & Melinda Gates Foundation works to help all people lead healthy, productive lives.",
      website: "gatesfoundation.org",
    },
    matchScore: 92,
    matchReasons: [
      "Strong alignment in Health sector (95% match)",
      "Geographic focus overlap in Sub-Saharan Africa",
      "Similar beneficiary target: underserved communities",
      "Grant size range matches your funding needs"
    ],
    sectors: ["Health", "Education", "Development"],
    grantRange: "$100,000 - $5,000,000",
    lastActive: "2 days ago",
    status: "new",
    feedback: null,
  },
  {
    id: "2",
    funder: {
      name: "European Development Fund",
      type: "Government Agency",
      location: "Brussels, Belgium",
      description: "Supporting sustainable development and poverty reduction in developing countries.",
      website: "ec.europa.eu/europeaid",
    },
    matchScore: 87,
    matchReasons: [
      "Health and Development sector alignment",
      "Focus on capacity building matches your approach",
      "Geographic overlap in target regions",
      "Similar impact metrics focus"
    ],
    sectors: ["Development", "Environment", "Health"],
    grantRange: "$50,000 - $2,000,000",
    lastActive: "1 week ago",
    status: "viewed",
    feedback: "positive",
  },
  {
    id: "3",
    funder: {
      name: "Wellcome Trust",
      type: "Medical Research Charity",
      location: "London, UK",
      description: "A global charitable foundation focused on health research and medical innovation.",
      website: "wellcome.org",
    },
    matchScore: 84,
    matchReasons: [
      "Perfect Health sector alignment",
      "Innovation focus matches your approach",
      "Research component alignment",
      "Global reach compatibility"
    ],
    sectors: ["Health", "Research", "Innovation"],
    grantRange: "$25,000 - $1,000,000",
    lastActive: "3 days ago",
    status: "contacted",
    feedback: null,
  },
  {
    id: "4",
    funder: {
      name: "Ford Foundation",
      type: "Private Foundation",
      location: "New York, USA",
      description: "Working to strengthen democratic values, reduce poverty and injustice.",
      website: "fordfoundation.org",
    },
    matchScore: 78,
    matchReasons: [
      "Human Rights and Development alignment",
      "Community empowerment focus",
      "Capacity building approach",
      "Social justice mission alignment"
    ],
    sectors: ["Human Rights", "Economic Development", "Education"],
    grantRange: "$50,000 - $500,000",
    lastActive: "5 days ago",
    status: "saved",
    feedback: "neutral",
  },
];

export default function MatchesPage() {
  const [matches, setMatches] = useState(mockMatches);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("score");

  const handleFeedback = async (matchId: string, feedback: "positive" | "negative" | "neutral") => {
    try {
      // TODO: Implement actual feedback logic
      console.log("Feedback for match", matchId, ":", feedback);
      
      setMatches(prev => prev.map(match => 
        match.id === matchId 
          ? { ...match, feedback }
          : match
      ));
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
  };

  const handleStatusChange = async (matchId: string, status: string) => {
    try {
      // TODO: Implement actual status change logic
      console.log("Status change for match", matchId, ":", status);
      
      setMatches(prev => prev.map(match => 
        match.id === matchId 
          ? { ...match, status }
          : match
      ));
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const filteredMatches = matches.filter(match => {
    if (filterStatus === "all") return true;
    return match.status === filterStatus;
  });

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    switch (sortBy) {
      case "score":
        return b.matchScore - a.matchScore;
      case "name":
        return a.funder.name.localeCompare(b.funder.name);
      case "recent":
        // Simple mock sorting by last active
        return a.lastActive.localeCompare(b.lastActive);
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "viewed": return "bg-gray-100 text-gray-800";
      case "contacted": return "bg-green-100 text-green-800";
      case "saved": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    if (score >= 70) return "text-yellow-600 bg-yellow-50";
    return "text-gray-600 bg-gray-50";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Matches</h1>
        <p className="text-gray-600">Funders that align with your organization's mission and needs</p>
      </div>

      {/* Filters and sorting */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="viewed">Viewed</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="saved">Saved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Match Score</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="recent">Recently Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {filteredMatches.length} match{filteredMatches.length !== 1 ? "es" : ""} found
        </div>
      </div>

      {/* Matches list */}
      <div className="space-y-6">
        {sortedMatches.map((match) => (
          <Card key={match.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{match.funder.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(match.status)}`}>
                      {match.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>{match.funder.type}</span>
                    <span>•</span>
                    <span>{match.funder.location}</span>
                    <span>•</span>
                    <span>Active {match.lastActive}</span>
                  </div>
                </div>
                
                <div className={`text-right px-4 py-2 rounded-lg ${getMatchScoreColor(match.matchScore)}`}>
                  <div className="text-2xl font-bold">{match.matchScore}%</div>
                  <div className="text-xs">Match Score</div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{match.funder.description}</p>

              {/* Match reasons */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Why this is a good match:</h4>
                <ul className="space-y-1">
                  {match.matchReasons.map((reason, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sectors and grant range */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {match.sectors.map((sector) => (
                      <span key={sector} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {sector}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Grant Range:</span> {match.grantRange}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex space-x-2">
                  <Button size="sm" asChild>
                    <Link href={`/dashboard/funders/${match.id}`}>
                      View Profile
                    </Link>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleStatusChange(match.id, "contacted")}
                  >
                    Contact
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleStatusChange(match.id, match.status === "saved" ? "viewed" : "saved")}
                  >
                    {match.status === "saved" ? "Unsave" : "Save"}
                  </Button>
                </div>

                {/* Feedback buttons */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">This match is:</span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleFeedback(match.id, "positive")}
                      className={`p-1 rounded ${
                        match.feedback === "positive" 
                          ? "bg-green-100 text-green-600" 
                          : "text-gray-400 hover:text-green-600"
                      }`}
                      title="Good match"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => handleFeedback(match.id, "neutral")}
                      className={`p-1 rounded ${
                        match.feedback === "neutral" 
                          ? "bg-yellow-100 text-yellow-600" 
                          : "text-gray-400 hover:text-yellow-600"
                      }`}
                      title="Okay match"
                    >
                      👌
                    </button>
                    <button
                      onClick={() => handleFeedback(match.id, "negative")}
                      className={`p-1 rounded ${
                        match.feedback === "negative" 
                          ? "bg-red-100 text-red-600" 
                          : "text-gray-400 hover:text-red-600"
                      }`}
                      title="Poor match"
                    >
                      👎
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredMatches.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-600 mb-4">
              {filterStatus === "all" 
                ? "Complete your profile to get better matches with funders."
                : `No matches with status "${filterStatus}".`
              }
            </p>
            <div className="flex justify-center space-x-3">
              <Button asChild>
                <Link href="/dashboard/profile">Complete Profile</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/search">Search Funders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}