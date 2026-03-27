interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  trend?: number;
  icon: React.ReactNode;
  color?: string;
}

export const StatCard = ({ label, value, unit = "", trend, icon, color = "text-primary" }: StatCardProps) => {
  return (
    <div className="glass-card rounded-lg p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02]">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} bg-current/10`}>
        <div className="text-current">{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground truncate">{label}</p>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className={`stat-value text-xl ${color}`}>{value}</span>
          {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
        </div>
        {trend !== undefined && (
          <span className={`text-xs ${trend >= 0 ? "text-energy-green" : "text-energy-red"}`}>
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
};
