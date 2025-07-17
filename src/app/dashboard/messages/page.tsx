"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data - in real app this would come from API
const mockNotifications = [
  {
    id: "1",
    type: "profile_view",
    title: "Profile Viewed",
    message: "Gates Foundation viewed your profile",
    details: "Your organization profile was viewed by Gates Foundation. This could indicate interest in your work.",
    timestamp: "2 hours ago",
    isRead: false,
    actionUrl: "/dashboard/matches",
    actionText: "View Match",
  },
  {
    id: "2",
    type: "new_match",
    title: "New Match Found",
    message: "New high-quality match: European Development Fund (87% compatibility)",
    details: "We found a new funder that closely aligns with your mission and geographic focus. The match score is based on sector alignment, geographic overlap, and funding criteria.",
    timestamp: "1 day ago",
    isRead: false,
    actionUrl: "/dashboard/matches",
    actionText: "View Match",
  },
  {
    id: "3",
    type: "search_alert",
    title: "Saved Search Update",
    message: "Your saved search 'Health Funders EU' has 3 new results",
    details: "New funders matching your search criteria have been added to the platform. Review them to find potential funding opportunities.",
    timestamp: "2 days ago",
    isRead: true,
    actionUrl: "/dashboard/search",
    actionText: "View Results",
  },
  {
    id: "4",
    type: "profile_incomplete",
    title: "Complete Your Profile",
    message: "Your profile is 75% complete. Add impact metrics to improve matches.",
    details: "Completing your profile helps us provide better matches and makes your organization more attractive to funders.",
    timestamp: "3 days ago",
    isRead: true,
    actionUrl: "/dashboard/profile",
    actionText: "Complete Profile",
  },
  {
    id: "5",
    type: "system",
    title: "Welcome to Heterotopia",
    message: "Your account has been verified and is now active",
    details: "Welcome to Heterotopia! Your organization has been verified and you can now access all platform features including search, matching, and communication tools.",
    timestamp: "1 week ago",
    isRead: true,
    actionUrl: "/dashboard",
    actionText: "Get Started",
  },
];

const notificationTypes = [
  { value: "all", label: "All Notifications" },
  { value: "profile_view", label: "Profile Views" },
  { value: "new_match", label: "New Matches" },
  { value: "search_alert", label: "Search Alerts" },
  { value: "profile_incomplete", label: "Profile Updates" },
  { value: "system", label: "System Messages" },
];

export default function MessagesPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filterType, setFilterType] = useState("all");
  const [filterRead, setFilterRead] = useState("all");

  const markAsRead = async (notificationId: string) => {
    try {
      // TODO: Implement actual mark as read logic
      console.log("Marking notification as read:", notificationId);
      
      setNotifications(prev => prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      ));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // TODO: Implement actual mark all as read logic
      console.log("Marking all notifications as read");
      
      setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      // TODO: Implement actual delete logic
      console.log("Deleting notification:", notificationId);
      
      setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filterType !== "all" && notification.type !== filterType) return false;
    if (filterRead === "unread" && notification.isRead) return false;
    if (filterRead === "read" && !notification.isRead) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "profile_view": return "👁️";
      case "new_match": return "🎯";
      case "search_alert": return "🔍";
      case "profile_incomplete": return "📝";
      case "system": return "ℹ️";
      default: return "📬";
    }
  };

  const getNotificationColor = (type: string, isRead: boolean) => {
    const baseColor = isRead ? "bg-white" : "bg-blue-50";
    const borderColor = isRead ? "border-gray-200" : "border-blue-200";
    return `${baseColor} ${borderColor}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-sm px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-gray-600">Stay updated with your latest activity and opportunities</p>
        </div>
        
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Type:</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {notificationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <Select value={filterRead} onValueChange={setFilterRead}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? "s" : ""}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications list */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`transition-all hover:shadow-md ${getNotificationColor(notification.type, notification.isRead)}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="text-2xl flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-medium ${notification.isRead ? "text-gray-900" : "text-gray-900 font-semibold"}`}>
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    
                    <p className={`text-sm mb-2 ${notification.isRead ? "text-gray-600" : "text-gray-900"}`}>
                      {notification.message}
                    </p>
                    
                    <p className="text-sm text-gray-500 mb-3">
                      {notification.details}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{notification.timestamp}</span>
                      
                      <div className="flex items-center space-x-2">
                        {notification.actionUrl && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={notification.actionUrl}>
                              {notification.actionText}
                            </a>
                          </Button>
                        )}
                        
                        {!notification.isRead && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as Read
                          </Button>
                        )}
                        
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-600 p-1"
                          title="Delete notification"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📬</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">
              {filterType === "all" && filterRead === "all" 
                ? "You're all caught up! New notifications will appear here."
                : "No notifications match your current filters."
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Notification preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Manage how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">New matches (weekly digest)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Profile views</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Search alerts</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">In-App Notifications</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Real-time notifications</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Browser notifications</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm">Sound notifications</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}