import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { Gauge, TrendingUp, Leaf, Target, Flame, Droplets } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, ComposedChart,
} from "recharts";

const monthlyEfficiency = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  overall: 85 + Math.random() * 10,
  solar: 88 + Math.random() * 8,
  storage: 90 + Math.random() * 7,
  grid: 82 + Math.random() * 12,
}));

const energyBalance = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  generation: Math.max(0, Math.sin((i - 6) * Math.PI / 12) * 600 + 100 + Math.random() * 50),
  consumption: 300 + Math.sin(i * Math.PI / 12) * 200 + Math.random() * 40,
  loss: 15 + Math.random() * 10,
}));

const benchmarkData = [
  { metric: "综合能效", current: 91, industry: 85, best: 96 },
  { metric: "光伏利用率", current: 88, industry: 82, best: 94 },
  { metric: "储能效率", current: 94, industry: 90, best: 97 },
  { metric: "自用率", current: 86, industry: 75, best: 92 },
  { metric: "功率因数", current: 0.96, industry: 0.92, best: 0.99 },
];

const radarData = [
  { subject: "能耗强度", A: 88, fullMark: 100 },
  { subject: "可再生占比", A: 72, fullMark: 100 },
  { subject: "碳排放", A: 85, fullMark: 100 },
  { subject: "损耗率", A: 92, fullMark: 100 },
  { subject: "需量控制", A: 78, fullMark: 100 },
  { subject: "经济效益", A: 82, fullMark: 100 },
];

const carbonData = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  emission: 120 - i * 3 + Math.random() * 20,
  reduction: 40 + i * 5 + Math.random() * 15,
}));

export default function EfficiencyPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="综合能效" value="91.2" unit="%" trend={2.3} icon={<Gauge className="w-5 h-5" />} color="text-energy-green" />
        <StatCard label="能耗强度" value="0.42" unit="kWh/m²" trend={-5.1} icon={<Flame className="w-5 h-5" />} color="text-energy-orange" />
        <StatCard label="碳减排" value="856" unit="吨" trend={18.5} icon={<Leaf className="w-5 h-5" />} color="text-energy-teal" />
        <StatCard label="节能率" value="23.8" unit="%" trend={3.2} icon={<Target className="w-5 h-5" />} color="text-primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2" glow="green">
          <h3 className="text-sm font-semibold text-foreground mb-4">月度能效趋势</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyEfficiency}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="month" stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
              <YAxis domain={[75, 100]} stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Line type="monotone" dataKey="overall" stroke="#22c55e" strokeWidth={2.5} name="综合能效" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="solar" stroke="#f59e0b" strokeWidth={1.5} name="光伏效率" dot={false} />
              <Line type="monotone" dataKey="storage" stroke="#8b5cf6" strokeWidth={1.5} name="储能效率" dot={false} />
              <Line type="monotone" dataKey="grid" stroke="#06b6d4" strokeWidth={1.5} name="电网效率" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">能效雷达图</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(215 20% 22%)" />
              <PolarAngleAxis dataKey="subject" stroke="hsl(215 15% 55%)" fontSize={10} />
              <PolarRadiusAxis stroke="hsl(215 20% 22%)" fontSize={9} />
              <Radar name="当前" dataKey="A" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard glow="cyan">
          <h3 className="text-sm font-semibold text-foreground mb-4">能源平衡 — 发电/用电/损耗</h3>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={energyBalance}>
              <defs>
                <linearGradient id="gradGen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="hour" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Area type="monotone" dataKey="generation" stroke="#22c55e" fill="url(#gradGen)" strokeWidth={2} name="发电" />
              <Line type="monotone" dataKey="consumption" stroke="#06b6d4" strokeWidth={2} name="用电" dot={false} />
              <Bar dataKey="loss" fill="#ef4444" opacity={0.6} radius={[2, 2, 0, 0]} name="损耗" />
            </ComposedChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="orange">
          <h3 className="text-sm font-semibold text-foreground mb-4">碳排放与减排趋势</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={carbonData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="month" stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Bar dataKey="emission" fill="#ef4444" radius={[3, 3, 0, 0]} name="排放(吨)" />
              <Bar dataKey="reduction" fill="#22c55e" radius={[3, 3, 0, 0]} name="减排(吨)" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Benchmark table */}
      <GlassCard glow="blue">
        <h3 className="text-sm font-semibold text-foreground mb-4">行业对标分析</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="text-left py-2.5 px-4">指标</th>
                <th className="text-right py-2.5 px-4">当前值</th>
                <th className="text-right py-2.5 px-4">行业均值</th>
                <th className="text-right py-2.5 px-4">行业最佳</th>
                <th className="text-left py-2.5 px-4">对比</th>
              </tr>
            </thead>
            <tbody>
              {benchmarkData.map((row) => {
                const diff = typeof row.current === "number" && row.current > 1 
                  ? row.current - row.industry 
                  : (row.current - row.industry) * 100;
                return (
                  <tr key={row.metric} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="py-2.5 px-4 text-foreground font-medium">{row.metric}</td>
                    <td className="text-right py-2.5 px-4"><span className="stat-value text-primary">{row.current}{typeof row.current === "number" && row.current > 1 ? "%" : ""}</span></td>
                    <td className="text-right py-2.5 px-4 text-muted-foreground">{row.industry}{typeof row.industry === "number" && row.industry > 1 ? "%" : ""}</td>
                    <td className="text-right py-2.5 px-4 text-energy-green">{row.best}{typeof row.best === "number" && row.best > 1 ? "%" : ""}</td>
                    <td className="py-2.5 px-4">
                      <span className={diff >= 0 ? "text-energy-green" : "text-energy-red"}>
                        {diff >= 0 ? "↑" : "↓"} {Math.abs(diff).toFixed(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
