"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/types";

interface WelcomeBannerProps {
  user: User;
  onClose: () => void;
  translate: (key: string) => string;
}

export function WelcomeBanner({ user, onClose, translate }: WelcomeBannerProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {translate('Welcome')}, {user.name}! 🌍
            </h2>
            <p className="text-gray-600 mb-4">
              {translate('Find Funders Description')}
            </p>
            <Button asChild>
              <Link href="/dashboard/search">{translate('Start Searching')}</Link>
            </Button>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm p-1"
            aria-label="Close welcome message"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}