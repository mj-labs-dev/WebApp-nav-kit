/**
 * Layout A — "Smart Rail"
 * No top bar. Sidebar contains everything: brand, nav, notifications,
 * settings, view-switch, pin toggle, and user. Page content fills full height.
 * Collapses to icon-only (64px) rail, expands to 240px on hover or pin.
 * macOS-Dock-style tooltips when collapsed.
 */
import { Link, useLocation } from "react-router";
import { useState, useRef, useEffect } from "react";
import {
  Settings,
  ChevronRight,
  Pin,
  PinOff,
  PanelTop,
  X,
  Menu,
  Sun,
  Moon,
  Monitor,
  Zap,
  Home,
} from "lucide-react";
import { navItems, switchItem } from "./navConfig";

interface Props {
  children: React.ReactNode;
  theme: 'auto' | 'light' | 'dark';
  onThemeChange: (theme: 'auto' | 'light' | 'dark') => void;
  onLayoutSwitch: () => void;
}

export function LayoutA({ children, theme, onThemeChange, onLayoutSwitch }: Props) {
  const location = useLocation();
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [tooltipY, setTooltipY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsButtonRef = useRef<HTMLDivElement>(null);
  const settingsDropdownRef = useRef<HTMLDivElement>(null);

  const isExpanded = pinned || hovered;

  // Click outside to close settings
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        settingsButtonRef.current && 
        !settingsButtonRef.current.contains(e.target as Node) &&
        settingsDropdownRef.current &&
        !settingsDropdownRef.current.contains(e.target as Node)
      ) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function showTip(label: string, e: React.MouseEvent) {
    if (!isExpanded) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setTooltip(label);
      setTooltipY(rect.top + rect.height / 2);
    }
  }

  /* ── shared sidebar item style ── */
  const utilBtn = (active = false) =>
    `flex items-center gap-3 w-full px-2.5 py-2.5 rounded-xl transition-all duration-150 ${
      active
        ? "text-blue-700 bg-blue-50"
        : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
    }`;

  const SidebarInner = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* ── Brand ── */}
      <div
        className={`flex items-center px-3.5 flex-shrink-0 ${
          mobile ? "h-14 border-b border-gray-100 justify-between" : "h-16 border-b border-gray-100"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
            <Home className="w-6 h-6" />
          </div>
          {mobile ? (
            <div>
              <p className="text-gray-900" style={{ fontWeight: 700, fontSize: 15 }}>App Name</p>
              <p className="text-gray-400 text-xs">Description</p>
            </div>
          ) : (
            <div
              className="overflow-hidden transition-all duration-200"
              style={{ width: isExpanded ? 150 : 0, opacity: isExpanded ? 1 : 0 }}
            >
              <p className="text-gray-900 whitespace-nowrap" style={{ fontWeight: 700, fontSize: 15 }}>App Name</p>
              <p className="text-gray-400 text-xs whitespace-nowrap">Description</p>
            </div>
          )}
        </div>
        {mobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 py-3 flex flex-col gap-0.5 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === "/app"
            ? location.pathname === "/app"
            : location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => mobile && setMobileOpen(false)}
              onMouseEnter={(e) => !mobile && showTip(item.label, e)}
              onMouseLeave={() => setTooltip(null)}
              className={`flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-150 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {(mobile || isExpanded) && (
                <span
                  className={`text-sm whitespace-nowrap ${!mobile ? "transition-all duration-200" : ""}`}
                  style={{ fontWeight: isActive ? 600 : 400, ...(mobile ? {} : { width: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0, overflow: "hidden" }) }}
                >
                  {item.label}
                </span>
              )}
              {isActive && (mobile || isExpanded) && (
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-white/70 flex-shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Utilities ── */}
      <div className="px-2 pb-1 flex flex-col gap-0.5 flex-shrink-0 overflow-visible">
        <div className="h-px bg-gray-100 mx-1 mb-1" />

        {/* Switch Context */}
        <Link
          to={switchItem.path}
          className={utilBtn()}
          onMouseEnter={(e) => !mobile && showTip(switchItem.label, e)}
          onMouseLeave={() => setTooltip(null)}
        >
          <switchItem.icon className="w-4.5 h-4.5 flex-shrink-0" />
          {(mobile || isExpanded) && (
            <span
              className="text-sm whitespace-nowrap overflow-hidden transition-all duration-200"
              style={mobile ? {} : { width: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            >
              {switchItem.label}
            </span>
          )}
        </Link>

        {/* Settings */}
        <div className="relative" ref={settingsButtonRef}>
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={utilBtn()}
            onMouseEnter={(e) => !mobile && showTip("Settings", e)}
            onMouseLeave={() => setTooltip(null)}
          >
            <Settings className="w-4.5 h-4.5 flex-shrink-0" />
            {(mobile || isExpanded) && (
              <span
                className="text-sm whitespace-nowrap overflow-hidden transition-all duration-200"
                style={mobile ? {} : { width: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
              >
                Settings
              </span>
            )}
          </button>
        </div>

        {/* Settings dropdown - rendered outside sidebar to avoid clipping */}
        {!mobile && settingsOpen && (
          <div 
            ref={settingsDropdownRef}
            className="fixed w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-[9999]"
            style={{ 
              left: isExpanded ? '256px' : '80px',
              bottom: '100px'
            }}
          >
            <p className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Theme</p>
            <button 
              onClick={(e) => { 
                e.stopPropagation();
                onThemeChange('auto'); 
                setSettingsOpen(false); 
              }} 
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${theme === 'auto' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
            >
              <Monitor className="w-4 h-4" />
              Auto
              {theme === 'auto' && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
            </button>
            <button 
              onClick={(e) => { 
                e.stopPropagation();
                onThemeChange('light'); 
                setSettingsOpen(false); 
              }} 
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${theme === 'light' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
            >
              <Sun className="w-4 h-4" />
              Light
              {theme === 'light' && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
            </button>
            <button 
              onClick={(e) => { 
                e.stopPropagation();
                onThemeChange('dark'); 
                setSettingsOpen(false); 
              }} 
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${theme === 'dark' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
            >
              <Moon className="w-4 h-4" />
              Dark
              {theme === 'dark' && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
            </button>
            <div className="h-px bg-gray-100 my-1" />
            <p className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Layout</p>
            <button 
              onClick={(e) => { 
                e.stopPropagation();
                onLayoutSwitch(); 
                setSettingsOpen(false); 
              }} 
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors text-gray-700"
            >
              <PanelTop className="w-4 h-4" />
              Top Navigation
            </button>
          </div>
        )}

        <div className="h-px bg-gray-100 mx-1 my-1" />

        {/* Pin toggle */}
        <button
          onClick={() => setPinned(!pinned)}
          className={utilBtn()}
          onMouseEnter={(e) => !mobile && showTip(pinned ? "Unpin sidebar" : "Pin sidebar", e)}
          onMouseLeave={() => setTooltip(null)}
        >
          {pinned
            ? <PinOff className="w-4 h-4 flex-shrink-0" />
            : <Pin className="w-4 h-4 flex-shrink-0" />
          }
          {(mobile || isExpanded) && (
            <span
              className="text-xs whitespace-nowrap overflow-hidden transition-all duration-200"
              style={mobile ? {} : { width: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            >
              {pinned ? "Unpin sidebar" : "Pin sidebar"}
            </span>
          )}
        </button>
      </div>

      {/* ── Upgrade ── */}
      <div className="px-2 pb-2 flex-shrink-0">
        <button className={`${utilBtn()} bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100`}>
          <Zap className="w-4 h-4 flex-shrink-0" />
          {(mobile || isExpanded) && (
            <span
              className="text-sm whitespace-nowrap overflow-hidden transition-all duration-200"
              style={mobile ? {} : { width: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            >
              Upgrade
            </span>
          )}
        </button>
      </div>

      {/* ── User ── */}
      <div className="border-t border-gray-100 p-2 flex-shrink-0">
        <div className="flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs" style={{ fontWeight: 700 }}>U</span>
          </div>
          {mobile ? (
            <div className="min-w-0">
              <p className="text-gray-900 text-sm truncate" style={{ fontWeight: 600 }}>User Name</p>
              <p className="text-gray-400 text-xs truncate">user@example.com</p>
            </div>
          ) : (
            <div
              className="overflow-hidden transition-all duration-200 min-w-0"
              style={{ width: isExpanded ? 150 : 0, opacity: isExpanded ? 1 : 0 }}
            >
              <p className="text-gray-900 text-sm whitespace-nowrap truncate" style={{ fontWeight: 600 }}>User Name</p>
              <p className="text-gray-400 text-xs whitespace-nowrap truncate">user@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setTooltip(null); }}
        style={{ width: isExpanded ? 240 : 64 }}
        className="hidden lg:flex flex-col h-full bg-white border-r border-gray-100 transition-[width] duration-200 ease-in-out shadow-[2px_0_12px_rgba(0,0,0,0.04)] z-30 flex-shrink-0"
      >
        <SidebarInner />
      </aside>

      {/* Mobile sidebar (slide-in) */}
      <aside
        className={`fixed lg:hidden inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out shadow-xl flex flex-col ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarInner mobile />
      </aside>

      {/* Floating tooltip */}
      {tooltip && !isExpanded && (
        <div className="fixed z-50 pointer-events-none" style={{ top: tooltipY - 16, left: 72 }}>
          <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
            {tooltip}
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile-only thin header */}
        <div className="lg:hidden h-12 bg-white border-b border-gray-100 flex items-center px-4 gap-3 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-blue-600">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-gray-900 text-sm" style={{ fontWeight: 700 }}>App Name</span>
          </div>
        </div>

        {/* Page content — full height on desktop */}
        <main className="flex-1 overflow-auto p-5 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  );
}
