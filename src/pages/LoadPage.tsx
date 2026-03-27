import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { BarChart3, TrendingDown, TrendingUp, Layers, Clock, Target } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart,
} from "recharts";

const loadCurve = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  actual: 500 + Math.sin((i - 3) * Math.PI / 12) * 300 + Math.random() * 50,
  predicted: 510 + Math.sin((i - 3) * Math.PI / 12) * 290,
  baseline: 480,
}));

const loadBreakdown = [
  { type: "空调暖通", value: 35, prev: 32 },
  { type: "照明系统", value: 18, prev: 20 },
  { type: "动力设备", value: 25, prev: 24 },
  { type: "IT数据", value: 12, prev: 11 },
  { type: "电梯扶梯", value: 5, prev: 5 },
  { type: "其他", value: 5, prev: 8 },
];

const radarData = [
  { subject: "峰值控制", A: 85, fullMark: 100 },
  { subject: "负荷率", A: 72, fullMark: 100 },
  { subject: "功率因数", A: 91, fullMark: 100 },
  { subject: "需量管理", A: 78, fullMark: 100 },
  { subject: "弹性响应", A: 65, fullMark: 100 },
  { subject: "预测准确", A: 88, fullMark: 100 },
];

const weekTrend = Array.from({ length: 7 }, (_, i) => ({
  day: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"][i],
  peak: 800 + Math.random() * 200,
  valley: 300 + Math.random() * 100,
  avg: 550 + Math.random() * 100,
}));

export default function LoadPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="实时负荷" value="5,842" unit="kW" icon={<BarChart3 className="w-5 h-5" />} color="text-primary" />
        <StatCard label="今日峰值" value="8,120" unit="kW" trend={-5.2} icon={<TrendingUp className="w-5 h-5" />} color="text-energy-red" />
        <StatCard label="负荷率" value="72.4" unit="%" icon={<Target className="w-5 h-5" />} color="text-energy-green" />
        <StatCard label="预测偏差" value="2.8" unit="%" trend={-1.2} icon={<TrendingDown className="w-5 h-5" />} color="text-energy-cyan" />
      </div>

      {/* Main load curve */}
      <GlassCard glow="blue">
        <h3 className="text-sm font-semibold text-foreground mb-4">负荷曲线 — 实际 vs 预测 vs 基线</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={loadCurve}>
            <defs>
              <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
            <XAxis dataKey="hour" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
            <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
            <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Area type="monotone" dataKey="actual" stroke="#06b6d4" fill="url(#gradActual)" strokeWidth={2} name="实际负荷" />
            <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="6 3" name="预测负荷" dot={false} />
            <Line type="monotone" dataKey="baseline" stroke="#64748b" strokeWidth={1} strokeDasharray="3 3" name="基线" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard glow="orange">
          <h3 className="text-sm font-semibold text-foreground mb-4">负荷构成分析</h3>
          <div className="space-y-3">
            {loadBreakdown.map((item) => (
              <div key={item.type}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground">{item.type}</span>
                  <span className="text-muted-foreground">{item.value}%</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${item.value}%`,
                      background: `linear-gradient(90deg, hsl(var(--energy-cyan)), hsl(var(--energy-purple)))`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">负荷管理评分</h3>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(215 20% 22%)" />
              <PolarAngleAxis dataKey="subject" stroke="hsl(215 15% 55%)" fontSize={10} />
              <PolarRadiusAxis stroke="hsl(215 20% 22%)" fontSize={9} />
              <Radar name="评分" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="green">
          <h3 className="text-sm font-semibold text-foreground mb-4">本周峰谷平趋势</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weekTrend} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="day" stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Bar dataKey="peak" fill="#ef4444" radius={[3, 3, 0, 0]} name="峰值" />
              <Bar dataKey="avg" fill="#8b5cf6" radius={[3, 3, 0, 0]} name="平均" />
              <Bar dataKey="valley" fill="#22c55e" radius={[3, 3, 0, 0]} name="谷值" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
