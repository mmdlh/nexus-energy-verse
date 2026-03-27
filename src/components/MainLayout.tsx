import { NavLink as RouterNavLink, Outlet, useLocation } from "react-router-dom";
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
    <div className="min-h-screen bg-background grid-bg">
      {/* Flow line at very top */}
      <div className="h-[2px] flow-line" />

      {/* Header */}
      <header className="glass border-b border-border/50 px-6 py-3 flex items-center gap-6 sticky top-0 z-50">
        <div className="flex items-center gap-3 shrink-0 mr-4">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="font-display text-lg font-bold tracking-wider gradient-text whitespace-nowrap">
            分布式能源管理平台
          </h1>
        </div>

        <nav className="flex items-center gap-1.5 overflow-x-auto flex-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <RouterNavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  active
                    ? "bg-primary/15 text-primary glow-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
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
