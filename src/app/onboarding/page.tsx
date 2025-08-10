"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const sectors = [
  "Health", "Education", "Environment", "Human Rights", "Economic Development",
  "Agriculture", "Water & Sanitation", "Gender Equality", "Technology", "Climate"
];

const regions = [
  "North America", "South America", "Europe", "Sub-Saharan Africa", "Middle East & North Africa",
  "South Asia", "Southeast Asia", "East Asia", "Oceania", "Global"
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [canSkip, setCanSkip] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    mission: "",
    sectors: [] as string[],
    geographicFocus: [] as string[],
    fundingNeeds: "",
    organizationType: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Save onboarding data
      localStorage.setItem('ngo_profile', JSON.stringify(formData));
      localStorage.setItem('onboarding_completed', 'true');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_skipped', 'true');
    router.push("/dashboard");
  };

  const getStepProgress = () => {
    return (currentStep / 3) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Heterotopia! 🌍</h1>
          <p className="text-gray-600">Let's set up your organization profile to find the perfect funders</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of 3</span>
            <span>{Math.round(getStepProgress())}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getStepProgress()}%` }}
            />
          </div>
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your organization</h2>
                  <p className="text-gray-600">Basic information to get started</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={(e) => handleInputChange("organizationName", e.target.value)}
                      placeholder="Enter your organization name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="contact@yourorganization.org"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizationType">Organization Type</Label>
                    <Select 
                      value={formData.organizationType} 
                      onValueChange={(value) => handleInputChange("organizationType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Local NGO">Local NGO</SelectItem>
                        <SelectItem value="International NGO">International NGO</SelectItem>
                        <SelectItem value="Community Organization">Community Organization</SelectItem>
                        <SelectItem value="Social Enterprise">Social Enterprise</SelectItem>
                        <SelectItem value="Foundation">Foundation</SelectItem>
                        <SelectItem value="Charity">Charity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Mission & Focus */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your mission?</h2>
                  <p className="text-gray-600">Help our AI understand your work and impact</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mission">Mission Statement *</Label>
                    <Textarea
                      id="mission"
                      rows={4}
                      value={formData.mission}
                      onChange={(e) => handleInputChange("mission", e.target.value)}
                      placeholder="Describe your organization's mission and primary activities..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Sectors (select up to 3)</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {sectors.map((sector) => (
                        <label key={sector} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.sectors.includes(sector)}
                            onChange={(e) => {
                              if (e.target.checked && formData.sectors.length < 3) {
                                handleArrayChange("sectors", [...formData.sectors, sector]);
                              } else if (!e.target.checked) {
                                handleArrayChange("sectors", formData.sectors.filter(s => s !== sector));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">{sector}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Selected: {formData.sectors.length}/3</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Geographic Focus (select up to 3)</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {regions.map((region) => (
                        <label key={region} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.geographicFocus.includes(region)}
                            onChange={(e) => {
                              if (e.target.checked && formData.geographicFocus.length < 3) {
                                handleArrayChange("geographicFocus", [...formData.geographicFocus, region]);
                              } else if (!e.target.checked) {
                                handleArrayChange("geographicFocus", formData.geographicFocus.filter(r => r !== region));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">{region}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Selected: {formData.geographicFocus.length}/3</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Funding Needs */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">What funding do you need?</h2>
                  <p className="text-gray-600">Help us match you with the right funders</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fundingNeeds">Current Funding Needs</Label>
                    <Textarea
                      id="fundingNeeds"
                      rows={4}
                      value={formData.fundingNeeds}
                      onChange={(e) => handleInputChange("fundingNeeds", e.target.value)}
                      placeholder="Describe your current funding needs, project types, and funding amounts you're seeking..."
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tip:</h4>
                    <p className="text-sm text-blue-800">
                      Be specific about your funding needs. Mention project types, target amounts, 
                      and intended use of funds to get better matches from our AI.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <div className="flex items-center space-x-4">
                {currentStep > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Back
                  </Button>
                )}
                {canSkip && (
                  <Button 
                    variant="ghost" 
                    onClick={handleSkip}
                    className="text-gray-600"
                  >
                    Skip for now
                  </Button>
                )}
              </div>

              <Button 
                onClick={handleNext}
                disabled={isLoading || (currentStep === 1 && (!formData.organizationName || !formData.email))}
                className="min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Setting up...
                  </>
                ) : currentStep === 3 ? (
                  "Complete Setup"
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>You can always complete or update your profile later in your dashboard</p>
        </div>
      </div>
    </div>
  );
}