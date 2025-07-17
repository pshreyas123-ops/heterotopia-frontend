"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type UserType = "ngo" | "funder" | "consultant";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
    userType: "" as UserType | "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pre-select user type from URL parameter
  useEffect(() => {
    const type = searchParams.get("type") as UserType;
    if (type && ["ngo", "funder", "consultant"].includes(type)) {
      setFormData(prev => ({ ...prev, userType: type }));
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.organizationName || !formData.userType) {
      return "Please fill in all required fields.";
    }
    
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual registration logic
      console.log("Registration attempt:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, redirect to email verification page
      router.push("/auth/verify-email?email=" + encodeURIComponent(formData.email));
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getUserTypeLabel = (type: UserType) => {
    switch (type) {
      case "ngo": return "NGO / Non-Profit Organization";
      case "funder": return "Funder / Foundation / Donor";
      case "consultant": return "Consultant / Service Provider";
      default: return "";
    }
  };

  const getUserTypeDescription = (type: UserType) => {
    switch (type) {
      case "ngo": return "Seeking funding and partnerships for your mission";
      case "funder": return "Looking to fund impactful organizations";
      case "consultant": return "Managing multiple NGO profiles and relationships";
      default: return "";
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Join Heterotopia to connect with the right partners
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="userType">I am a *</Label>
              <Select 
                value={formData.userType} 
                onValueChange={(value) => handleInputChange("userType", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ngo">
                    <div>
                      <div className="font-medium">NGO / Non-Profit</div>
                      <div className="text-sm text-gray-500">Seeking funding and partnerships</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="funder">
                    <div>
                      <div className="font-medium">Funder / Foundation</div>
                      <div className="text-sm text-gray-500">Looking to fund impactful organizations</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="consultant">
                    <div>
                      <div className="font-medium">Consultant</div>
                      <div className="text-sm text-gray-500">Managing multiple NGO relationships</div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {formData.userType && (
                <p className="text-sm text-gray-600">
                  {getUserTypeDescription(formData.userType as UserType)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization Name *</Label>
              <Input
                id="organizationName"
                type="text"
                placeholder="Enter your organization name"
                value={formData.organizationName}
                onChange={(e) => handleInputChange("organizationName", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password (min. 8 characters)"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link 
                href="/auth/login" 
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-4 text-xs text-gray-500 text-center">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}