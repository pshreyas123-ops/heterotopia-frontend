"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileCompletionCardProps {
  completion: number;
}

export function ProfileCompletionCard({ completion }: ProfileCompletionCardProps) {
  if (completion >= 100) return null;

  return (
    <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Complete Your Profile
            </h3>
            <p className="text-gray-600 mb-4">
              A complete profile helps our AI find better funding matches for your organization.
            </p>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completion}%` }}
                  role="progressbar"
                  aria-valuenow={completion}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Profile completion: ${completion}%`}
                />
              </div>
              <span className="text-sm font-medium text-gray-900" aria-live="polite">
                {completion}%
              </span>
            </div>
            <Button asChild variant="outline">
              <Link href="/dashboard/profile">Complete Profile</Link>
            </Button>
          </div>
          <div className="ml-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl" role="img" aria-label="Profile completion">📝</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}