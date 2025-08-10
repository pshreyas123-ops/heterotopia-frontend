"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ClientOnly from "@/components/ClientOnly";

interface PendingUser {
  id: string;
  name: string;
  email: string;
  organization: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  documents: {
    registrationCertificate: boolean;
    auditedFinancials: boolean;
    impactReport: boolean;
  };
}

// Mock pending users data
const mockPendingUsers: PendingUser[] = [
  {
    id: "1",
    name: "Dr. Sarah Kimani",
    email: "sarah@globalhealthinitiative.org",
    organization: "Global Health Initiative",
    submittedAt: "2024-01-15",
    status: "pending",
    documents: {
      registrationCertificate: true,
      auditedFinancials: true,
      impactReport: false,
    }
  },
  {
    id: "2", 
    name: "Michael Chen",
    email: "michael@educationforall.org",
    organization: "Education for All",
    submittedAt: "2024-01-14",
    status: "pending",
    documents: {
      registrationCertificate: true,
      auditedFinancials: false,
      impactReport: true,
    }
  },
  {
    id: "3",
    name: "Dr. Amara Okafor",
    email: "amara@cleanwaterproject.org", 
    organization: "Clean Water Project",
    submittedAt: "2024-01-13",
    status: "pending",
    documents: {
      registrationCertificate: true,
      auditedFinancials: true,
      impactReport: true,
    }
  }
];

export default function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>(mockPendingUsers);
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const handleUserAction = async (userId: string, action: "approve" | "reject", reason?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPendingUsers(prev => 
        prev.map(user => 
          user.id === userId 
            ? { ...user, status: action === "approve" ? "approved" : "rejected" }
            : user
        )
      );
      
      // Show success message
      const message = document.createElement('div');
      message.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50';
      message.textContent = `User ${action}d successfully!`;
      document.body.appendChild(message);
      
      setTimeout(() => {
        document.body.removeChild(message);
      }, 3000);
      
      setSelectedUser(null);
    } catch (error) {
      console.error(`Failed to ${action} user:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = pendingUsers.filter(user => {
    if (filter === "all") return true;
    return user.status === filter;
  });

  const stats = {
    total: pendingUsers.length,
    pending: pendingUsers.filter(u => u.status === "pending").length,
    approved: pendingUsers.filter(u => u.status === "approved").length,
    rejected: pendingUsers.filter(u => u.status === "rejected").length,
  };

  return (
    <ClientOnly fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    }>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage NGO verifications and platform operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Label htmlFor="filter">Filter by status:</Label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Applications</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* User Applications */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Applications List */}
          <Card>
            <CardHeader>
              <CardTitle>NGO Applications</CardTitle>
              <CardDescription>
                Click on an application to review details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedUser?.id === user.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{user.organization}</h4>
                      <p className="text-sm text-gray-600">{user.name} • {user.email}</p>
                      <p className="text-xs text-gray-500">Submitted: {user.submittedAt}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                        user.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No applications found for the selected filter.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Application Details */}
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
              <CardDescription>
                {selectedUser ? `Review ${selectedUser.organization}` : 'Select an application to review'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedUser ? (
                <div className="space-y-6">
                  {/* Organization Info */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Organization Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Name:</strong> {selectedUser.organization}</div>
                      <div><strong>Contact:</strong> {selectedUser.name}</div>
                      <div><strong>Email:</strong> {selectedUser.email}</div>
                      <div><strong>Submitted:</strong> {selectedUser.submittedAt}</div>
                    </div>
                  </div>

                  {/* Documents Status */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Document Verification</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedUser.documents).map(([key, uploaded]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <span className={`text-sm ${uploaded ? 'text-green-600' : 'text-red-600'}`}>
                            {uploaded ? '✓ Uploaded' : '✗ Missing'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  {selectedUser.status === 'pending' && (
                    <div className="flex space-x-3 pt-4 border-t">
                      <Button
                        onClick={() => handleUserAction(selectedUser.id, 'approve')}
                        disabled={isLoading}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        {isLoading ? 'Processing...' : 'Approve'}
                      </Button>
                      <Button
                        onClick={() => handleUserAction(selectedUser.id, 'reject')}
                        disabled={isLoading}
                        variant="destructive"
                        className="flex-1"
                      >
                        {isLoading ? 'Processing...' : 'Reject'}
                      </Button>
                    </div>
                  )}

                  {selectedUser.status !== 'pending' && (
                    <div className="pt-4 border-t">
                      <div className={`text-center p-3 rounded-lg ${
                        selectedUser.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        This application has been {selectedUser.status}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <p>Select an application from the list to review details and take action.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientOnly>
  );
}