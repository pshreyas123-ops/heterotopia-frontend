"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "ngo";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  profileComplete: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated to prevent SSR/client mismatch
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Only load user data after hydration
    if (!isHydrated) return;

    const loadUser = async () => {
      try {
        // Check localStorage for user data
        const savedUser = localStorage.getItem("heterotopia_user");
        let parsedUser = null;

        if (savedUser) {
          try {
            parsedUser = JSON.parse(savedUser);
            // Clear old data if it has invalid role (funder/consultant)
            if (parsedUser.role !== "ngo") {
              localStorage.removeItem("heterotopia_user");
              parsedUser = null;
            }
          } catch (e) {
            // Clear corrupted data
            localStorage.removeItem("heterotopia_user");
            parsedUser = null;
          }
        }

        if (parsedUser) {
          setUser(parsedUser);
        } else {
          // Check if user is coming from Google OAuth or needs onboarding
          const isNewUser = !localStorage.getItem("onboarding_completed") && !localStorage.getItem("onboarding_skipped");

          if (isNewUser) {
            // New user - redirect to onboarding
            window.location.href = "/onboarding";
            return;
          }

          // Mock NGO user data for development
          const mockUser: User = {
            id: "1",
            name: "John Doe",
            email: "john@globalhealthinitiative.org",
            role: "ngo",
            organization: "Global Health Initiative",
            profileComplete: 75,
          };
          setUser(mockUser);
          localStorage.setItem("heterotopia_user", JSON.stringify(mockUser));
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [isHydrated]);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
    // Only access localStorage after hydration
    if (isHydrated) {
      if (newUser) {
        localStorage.setItem("heterotopia_user", JSON.stringify(newUser));
      } else {
        localStorage.removeItem("heterotopia_user");
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}