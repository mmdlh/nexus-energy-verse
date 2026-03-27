import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { Zap, Battery, Sun, Wind, TrendingUp, Users, Thermometer, Droplets } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend,
} from "recharts";

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  solar: Math.max(0, Math.sin((i - 6) * Math.PI / 12) * 120 + Math.random() * 20),
  wind: 30 + Math.random() * 40,
  load: 60 + Math.sin(i * Math.PI / 12) * 40 + Math.random() * 15,
}));

const energyMix = [
  { name: "光伏", value: 42, color: "#f59e0b" },
  { name: "风电", value: 28, color: "#06b6d4" },
  { name: "储能", value: 15, color: "#8b5cf6" },
  { name: "电网", value: 15, color: "#22c55e" },
];

const efficiencyData = [
  { name: "光伏效率", value: 92, fill: "#f59e0b" },
  { name: "风电效率", value: 88, fill: "#06b6d4" },
  { name: "储能效率", value: 95, fill: "#8b5cf6" },
  { name: "综合效率", value: 91, fill: "#22c55e" },
];

const weeklyData = Array.from({ length: 7 }, (_, i) => ({
  day: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"][i],
  generation: 800 + Math.random() * 400,
  consumption: 600 + Math.random() * 300,
}));

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="总发电量" value="12,847" unit="kWh" trend={5.2} icon={<Zap className="w-5 h-5" />} color="text-primary" />
        <StatCard label="光伏发电" value="5,402" unit="kWh" trend={12.1} icon={<Sun className="w-5 h-5" />} color="text-energy-yellow" />
        <StatCard label="风力发电" value="3,598" unit="kWh" trend={-2.3} icon={<Wind className="w-5 h-5" />} color="text-energy-cyan" />
        <StatCard label="储能电量" value="3,847" unit="kWh" trend={8.7} icon={<Battery className="w-5 h-5" />} color="text-energy-purple" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="综合能效" value="91.2" unit="%" trend={1.8} icon={<TrendingUp className="w-5 h-5" />} color="text-energy-green" />
        <StatCard label="在线设备" value="284" unit="台" icon={<Users className="w-5 h-5" />} color="text-energy-blue" />
        <StatCard label="环境温度" value="26.5" unit="°C" icon={<Thermometer className="w-5 h-5" />} color="text-energy-orange" />
        <StatCard label="碳减排" value="8.6" unit="吨" trend={15.3} icon={<Droplets className="w-5 h-5" />} color="text-energy-teal" />
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area chart - 24h trend */}
        <GlassCard className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">24小时发电与负荷趋势</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="gradSolar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradWind" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradLoad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="hour" stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Area type="monotone" dataKey="solar" stroke="#f59e0b" fill="url(#gradSolar)" strokeWidth={2} name="光伏" />
              <Area type="monotone" dataKey="wind" stroke="#06b6d4" fill="url(#gradWind)" strokeWidth={2} name="风电" />
              <Area type="monotone" dataKey="load" stroke="#8b5cf6" fill="url(#gradLoad)" strokeWidth={2} name="负荷" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Energy mix pie */}
        <GlassCard glow="green">
          <h3 className="text-sm font-semibold text-foreground mb-4">能源结构占比</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={energyMix} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={4} dataKey="value" stroke="none">
                {energyMix.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard glow="blue">
          <h3 className="text-sm font-semibold text-foreground mb-4">本周发电与用电对比</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="day" stroke="hsl(215 15% 45%)" fontSize={12} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Bar dataKey="generation" fill="#06b6d4" radius={[4, 4, 0, 0]} name="发电量" />
              <Bar dataKey="consumption" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="用电量" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">各系统运行效率</h3>
          <ResponsiveContainer width="100%" height={240}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={efficiencyData} startAngle={180} endAngle={0}>
              <RadialBar background dataKey="value" cornerRadius={6} />
              <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
            </RadialBarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
