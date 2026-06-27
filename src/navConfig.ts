import { Home, Settings, Package, BarChart3, Users, Bell, FileText, ArrowLeftRight } from "lucide-react";

/**
 * Navigation items configuration
 * Customize paths, labels, and icons for your app
 */
export const navItems = [
  { path: "/app", label: "Dashboard", icon: Home, shortLabel: "Home" },
  { path: "/app/page-1", label: "Page 1", icon: BarChart3, shortLabel: "P1" },
  { path: "/app/page-2", label: "Page 2", icon: Package, shortLabel: "P2" },
  { path: "/app/page-3", label: "Page 3", icon: Users, shortLabel: "P3" },
  { path: "/app/page-4", label: "Page 4", icon: Bell, shortLabel: "P4" },
  { path: "/app/page-5", label: "Page 5", icon: Settings, shortLabel: "P5" },
  { path: "/app/page-6", label: "Page 6", icon: FileText, shortLabel: "P6" },
];

/**
 * Switch item — typically for switching between properties, accounts, or contexts
 */
export const switchItem = {
  path: "/",
  label: "Switch Context",
  icon: ArrowLeftRight,
  shortLabel: "Switch"
};
