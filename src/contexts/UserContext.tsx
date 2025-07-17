"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "ngo" | "funder" | "consultant";

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

  useEffect(() => {
    // Simulate loading user data from API/localStorage
    // In a real app, this would fetch from your authentication system
    const loadUser = async () => {
      try {
        // Only access localStorage on the client side to avoid hydration mismatch
        if (typeof window !== "undefined") {
          // Check localStorage for user data
          const savedUser = localStorage.getItem("heterotopia_user");
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          } else {
            // Mock user data for development - you can change the role here
            const mockUser: User = {
              id: "1",
              name: "Sarah Johnson",
              email: "sarah@example.com",
              role: "funder", // Change this to "ngo" or "consultant" to test different roles
              organization: "Impact Foundation",
              profileComplete: 85,
            };
            setUser(mockUser);
            localStorage.setItem("heterotopia_user", JSON.stringify(mockUser));
          }
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
    // Only access localStorage on the client side
    if (typeof window !== "undefined") {
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