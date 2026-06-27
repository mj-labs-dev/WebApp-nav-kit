/**
 * Layout B — "Horizon"
 * Single top navigation bar only — no secondary sub-header.
 * Logo left · nav pills center · Go Premium + bell + settings + switch-icon + user right.
 * No page title in the bar (lives only inside page content).
 * Mobile: hamburger → slide-down drawer.
 */
import { Link, useLocation } from "react-router";
import { useState, useRef, useEffect } from "react";
import { Settings, Menu, X, Zap, PanelLeft, Sun, Moon, Monitor, Home } from "lucide-react";
import { navItems, switchItem } from "./navConfig";

interface Props {
  children: React.ReactNode;
  theme: 'auto' | 'light' | 'dark';
  onThemeChange: (theme: 'auto' | 'light' | 'dark') => void;
  onLayoutSwitch: () => void;
}

export function LayoutB({ children, theme, onThemeChange, onLayoutSwitch }: Props) {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Click outside to close settings
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* ── Single top nav bar ── */}
      <header className="h-14 bg-white border-b border-gray-100 flex items-center px-5 gap-3 flex-shrink-0 z-30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">

        {/* Branding */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-600">
            <Home className="w-6 h-6" />
          </div>
          <span className="text-gray-900 hidden sm:block" style={{ fontWeight: 700, fontSize: 15 }}>App Name</span>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200 hidden lg:block flex-shrink-0" />

        {/* Nav items — desktop */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === "/app"
              ? location.pathname === "/app"
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span style={{ fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 ml-auto">

          {/* Switch Context */}
          <Link
            to={switchItem.path}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <switchItem.icon className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">Switch</span>
          </Link>

          {/* Go Premium — compact (<10 chars) */}
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs hover:bg-amber-100 transition-colors" style={{ fontWeight: 600 }}>
            <Zap className="w-3.5 h-3.5 flex-shrink-0" />
            Upgrade
          </button>

          {/* Settings */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              title="Display settings"
            >
              <Settings className="w-4.5 h-4.5" />
            </button>
            
            {settingsOpen && (
              <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
                <p className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Theme</p>
                <button 
                  onClick={() => { onThemeChange('auto'); setSettingsOpen(false); }} 
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${theme === 'auto' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                >
                  <Monitor className="w-4 h-4" />
                  Auto
                  {theme === 'auto' && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
                </button>
                <button 
                  onClick={() => { onThemeChange('light'); setSettingsOpen(false); }} 
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${theme === 'light' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                >
                  <Sun className="w-4 h-4" />
                  Light
                  {theme === 'light' && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
                </button>
                <button 
                  onClick={() => { onThemeChange('dark'); setSettingsOpen(false); }} 
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${theme === 'dark' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                >
                  <Moon className="w-4 h-4" />
                  Dark
                  {theme === 'dark' && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
                </button>
                <div className="h-px bg-gray-100 my-1" />
                <p className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Layout</p>
                <button 
                  onClick={() => { onLayoutSwitch(); setSettingsOpen(false); }} 
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <PanelLeft className="w-4 h-4" />
                  Sidebar Navigation
                </button>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-gray-200 mx-0.5" />

          {/* User */}
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs" style={{ fontWeight: 700 }}>U</span>
            </div>
            <span className="hidden md:block text-sm text-gray-700" style={{ fontWeight: 500 }}>User</span>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile nav drawer (slide-down) */}
      <div
        className={`lg:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-300 ease-in-out z-20 flex-shrink-0 shadow-md ${
          drawerOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="p-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === "/app"
              ? location.pathname === "/app"
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span style={{ fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
              </Link>
            );
          })}
          {/* Mobile: Switch + Go Premium */}
          <div className="mt-1 pt-1 border-t border-gray-100">
            <Link
              to={switchItem.path}
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-100 w-full transition-colors"
            >
              <switchItem.icon className="w-4 h-4" />
              Switch Context
            </Link>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-amber-700 hover:bg-amber-50 w-full transition-colors" style={{ fontWeight: 500 }}>
              <Zap className="w-4 h-4" />
              Upgrade to Premium
            </button>
          </div>
        </nav>
      </div>

      {/* Page content */}
      <main className="flex-1 overflow-auto p-5 lg:p-7">
        {children}
      </main>
    </div>
  );
}
