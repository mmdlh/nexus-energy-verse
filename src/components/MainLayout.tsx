import { NavLink as RouterNavLink, Outlet, useLocation } from "react-router-dom";
import bgMain from "@/assets/bg-main.jpg";
import {
  LayoutDashboard,
  Zap,
  Battery,
  BarChart3,
  Network,
  Settings2,
  Gauge,
  AlertTriangle,
} from "lucide-react";

const navItems = [
  { label: "系统总览", path: "/", icon: LayoutDashboard },
  { label: "发电监控", path: "/generation", icon: Zap },
  { label: "储能管理", path: "/storage", icon: Battery },
  { label: "负荷分析", path: "/load", icon: BarChart3 },
  { label: "电网调度", path: "/grid", icon: Network },
  { label: "设备管理", path: "/equipment", icon: Settings2 },
  { label: "能效分析", path: "/efficiency", icon: Gauge },
  { label: "告警中心", path: "/alerts", icon: AlertTriangle },
];

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background bg-cover bg-center bg-fixed bg-no-repeat" style={{ backgroundImage: `url(${bgMain})` }}>
      {/* Flow line at very top */}
      <div className="h-[2px] flow-line" />

      {/* Header */}
      <header className="relative border-b border-primary/15 px-8 py-0 flex items-center gap-8 sticky top-0 z-50 bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: `url(${bgMain})`, backgroundPositionY: '0%' }}>
        {/* Header overlay for glass effect */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-xl" />
        {/* Subtle glow line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {/* Logo & Title */}
        <div className="relative z-10 flex items-center gap-4 shrink-0 mr-6 py-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center animate-pulse-glow shadow-lg shadow-primary/20">
              <Zap className="w-6 h-6 text-primary-foreground drop-shadow-lg" />
            </div>
            {/* Orbiting dot */}
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-energy-green animate-pulse shadow-md shadow-energy-green/50" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-display text-xl font-extrabold tracking-widest gradient-text whitespace-nowrap leading-tight">
              分布式能源管理平台
            </h1>
            <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">Distributed Energy Management System</span>
          </div>
        </div>

        {/* Vertical separator */}
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent shrink-0" />

        {/* Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto flex-1 py-2 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <RouterNavLink
                key={item.path}
                to={item.path}
                className={`group relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary shadow-[0_0_20px_hsl(190_90%_50%/0.12),inset_0_1px_0_hsl(190_90%_50%/0.15)] border border-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
                }`}
              >
                <item.icon className={`w-4 h-4 transition-all duration-300 ${active ? "drop-shadow-[0_0_6px_hsl(190_90%_50%/0.6)]" : "group-hover:scale-110"}`} />
                <span className="relative">
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
                  )}
                </span>
              </RouterNavLink>
            );
          })}
        </nav>
      </header>

      {/* Page content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
