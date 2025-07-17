"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendMessage("");

    try {
      // TODO: Implement actual resend verification email logic
      console.log("Resending verification email to:", email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResendMessage("Verification email sent! Please check your inbox.");
    } catch (err) {
      setResendMessage("Failed to resend email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-8 h-8 text-blue-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription>
            We've sent a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {email && (
            <p className="text-sm text-gray-600">
              Verification email sent to:{" "}
              <span className="font-medium text-gray-900">{email}</span>
            </p>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800">
            <p className="font-medium mb-2">Next steps:</p>
            <ol className="text-left space-y-1 list-decimal list-inside">
              <li>Check your email inbox (and spam folder)</li>
              <li>Click the verification link in the email</li>
              <li>Complete your profile setup</li>
            </ol>
          </div>

          {resendMessage && (
            <div className={`border rounded-md p-3 text-sm ${
              resendMessage.includes("sent") 
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}>
              {resendMessage}
            </div>
          )}

          <div className="space-y-3">
            <Button 
              onClick={handleResendEmail}
              disabled={isResending}
              variant="outline"
              className="w-full"
            >
              {isResending ? "Sending..." : "Resend verification email"}
            </Button>

            <div className="text-sm text-gray-600">
              Wrong email address?{" "}
              <Link 
                href="/auth/register" 
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign up again
              </Link>
            </div>

            <div className="text-sm text-gray-600">
              Already verified?{" "}
              <Link 
                href="/auth/login" 
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}