import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { Sun, Wind, Zap, TrendingUp } from "lucide-react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const solarData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  power: Math.max(0, Math.sin((i - 6) * Math.PI / 12) * 850 + Math.random() * 50),
  irradiance: Math.max(0, Math.sin((i - 5) * Math.PI / 13) * 1000 + Math.random() * 30),
}));

const windData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  power: 200 + Math.sin(i * 0.5) * 150 + Math.random() * 80,
  speed: 4 + Math.sin(i * 0.5) * 3 + Math.random() * 2,
}));

const monthlyGen = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  solar: 3000 + Math.sin(i * Math.PI / 6) * 2000 + Math.random() * 500,
  wind: 2000 + Math.cos(i * Math.PI / 8) * 800 + Math.random() * 300,
}));

const inverters = [
  { id: "INV-001", power: 245.6, status: "运行", temp: 42.3, efficiency: 97.2 },
  { id: "INV-002", power: 238.1, status: "运行", temp: 41.8, efficiency: 96.8 },
  { id: "INV-003", power: 0, status: "停机", temp: 28.1, efficiency: 0 },
  { id: "INV-004", power: 251.3, status: "运行", temp: 43.1, efficiency: 97.5 },
  { id: "INV-005", power: 242.8, status: "运行", temp: 42.0, efficiency: 96.9 },
];

export default function GenerationPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="光伏实时功率" value="3,842" unit="kW" trend={8.5} icon={<Sun className="w-5 h-5" />} color="text-energy-yellow" />
        <StatCard label="风电实时功率" value="1,256" unit="kW" trend={-3.2} icon={<Wind className="w-5 h-5" />} color="text-energy-cyan" />
        <StatCard label="今日总发电" value="28,450" unit="kWh" trend={12.1} icon={<Zap className="w-5 h-5" />} color="text-primary" />
        <StatCard label="发电效率" value="94.6" unit="%" trend={2.1} icon={<TrendingUp className="w-5 h-5" />} color="text-energy-green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard glow="orange">
          <h3 className="text-sm font-semibold text-foreground mb-4">☀️ 光伏发电实时曲线</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={solarData}>
              <defs>
                <linearGradient id="gradSolarGen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="time" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Area type="monotone" dataKey="power" stroke="#f59e0b" fill="url(#gradSolarGen)" strokeWidth={2} name="功率(kW)" />
              <Line type="monotone" dataKey="irradiance" stroke="#fbbf24" strokeDasharray="5 5" strokeWidth={1} name="辐照度(W/m²)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="cyan">
          <h3 className="text-sm font-semibold text-foreground mb-4">💨 风力发电实时曲线</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={windData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="time" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis yAxisId="left" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Line yAxisId="left" type="monotone" dataKey="power" stroke="#06b6d4" strokeWidth={2} name="功率(kW)" dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="speed" stroke="#22d3ee" strokeWidth={1.5} strokeDasharray="4 4" name="风速(m/s)" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2" glow="blue">
          <h3 className="text-sm font-semibold text-foreground mb-4">年度发电量趋势</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyGen} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="month" stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
              <Bar dataKey="solar" fill="#f59e0b" radius={[3, 3, 0, 0]} name="光伏(kWh)" />
              <Bar dataKey="wind" fill="#06b6d4" radius={[3, 3, 0, 0]} name="风电(kWh)" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="green">
          <h3 className="text-sm font-semibold text-foreground mb-4">逆变器状态</h3>
          <div className="space-y-3">
            {inverters.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between p-2.5 rounded-md bg-muted/30 text-xs">
                <span className="font-mono font-medium text-foreground">{inv.id}</span>
                <span className={inv.status === "运行" ? "text-energy-green" : "text-energy-red"}>{inv.status}</span>
                <span className="text-muted-foreground">{inv.power}kW</span>
                <span className="text-muted-foreground">{inv.temp}°C</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
