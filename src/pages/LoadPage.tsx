import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { BarChart3, TrendingDown, TrendingUp, Target, Zap, Clock, AlertTriangle, DollarSign } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Line, PieChart, Pie, Cell,
} from "recharts";

const loadCurve = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  actual: 500 + Math.sin((i - 3) * Math.PI / 12) * 300 + Math.random() * 50,
  predicted: 510 + Math.sin((i - 3) * Math.PI / 12) * 290,
  baseline: 480,
  lastWeek: 490 + Math.sin((i - 3) * Math.PI / 12) * 280 + Math.random() * 30,
}));

const loadBreakdown = [
  { type: "空调暖通", value: 35, prev: 32, power: 2045 },
  { type: "照明系统", value: 18, prev: 20, power: 1053 },
  { type: "动力设备", value: 25, prev: 24, power: 1463 },
  { type: "IT数据", value: 12, prev: 11, power: 702 },
  { type: "电梯扶梯", value: 5, prev: 5, power: 293 },
  { type: "其他", value: 5, prev: 8, power: 286 },
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

const monthlyDemand = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  demand: 8000 + Math.sin(i * Math.PI / 6) * 3000 + Math.random() * 500,
  limit: 9500,
  cost: 35000 + Math.sin(i * Math.PI / 6) * 15000 + Math.random() * 3000,
}));

const loadForecast = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  tomorrow: 520 + Math.sin((i - 3) * Math.PI / 12) * 310 + Math.random() * 40,
  dayAfter: 500 + Math.sin((i - 3) * Math.PI / 12) * 280 + Math.random() * 50,
}));

const demandResponse = [
  { time: "09:15", event: "尖峰预警触发", reduction: 450, duration: "30分钟", source: "空调降温2°C", status: "已执行" },
  { time: "14:30", event: "需量超限预警", reduction: 600, duration: "45分钟", source: "储能削峰放电", status: "已执行" },
  { time: "17:45", event: "电网调度指令", reduction: 800, duration: "1小时", source: "非关键负荷切除", status: "待响应" },
];

const electricityPrice = [
  { period: "尖峰 (10:00-11:30, 14:00-17:00)", price: "1.25", color: "text-energy-red" },
  { period: "峰时 (8:00-10:00, 18:00-21:00)", price: "1.05", color: "text-energy-orange" },
  { period: "平时 (7:00-8:00, 11:30-14:00, 21:00-23:00)", price: "0.65", color: "text-energy-cyan" },
  { period: "谷时 (23:00-7:00)", price: "0.28", color: "text-energy-green" },
];

const tooltipStyle = { background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" };

export default function LoadPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="实时负荷" value="5,842" unit="kW" icon={<BarChart3 className="w-5 h-5" />} color="text-primary" />
        <StatCard label="今日峰值" value="8,120" unit="kW" trend={-5.2} icon={<TrendingUp className="w-5 h-5" />} color="text-energy-red" />
        <StatCard label="负荷率" value="72.4" unit="%" icon={<Target className="w-5 h-5" />} color="text-energy-green" />
        <StatCard label="预测偏差" value="2.8" unit="%" trend={-1.2} icon={<TrendingDown className="w-5 h-5" />} color="text-energy-cyan" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="需量限值" value="9,500" unit="kW" icon={<AlertTriangle className="w-5 h-5" />} color="text-energy-orange" />
        <StatCard label="功率因数" value="0.96" unit="" icon={<Zap className="w-5 h-5" />} color="text-energy-purple" />
        <StatCard label="今日用电" value="45,620" unit="kWh" icon={<Clock className="w-5 h-5" />} color="text-energy-blue" />
        <StatCard label="今日电费" value="38,520" unit="元" icon={<DollarSign className="w-5 h-5" />} color="text-energy-yellow" />
      </div>

      {/* Main load curve */}
      <GlassCard glow="blue">
        <h3 className="text-sm font-semibold text-foreground mb-4">📊 负荷曲线 — 实际 vs 预测 vs 基线 vs 上周</h3>
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
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            <Area type="monotone" dataKey="actual" stroke="#06b6d4" fill="url(#gradActual)" strokeWidth={2} name="实际负荷" />
            <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="6 3" name="预测负荷" dot={false} />
            <Line type="monotone" dataKey="lastWeek" stroke="#8b5cf6" strokeWidth={1} strokeDasharray="4 4" name="上周同期" dot={false} />
            <Line type="monotone" dataKey="baseline" stroke="#64748b" strokeWidth={1} strokeDasharray="3 3" name="基线" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard glow="orange">
          <h3 className="text-sm font-semibold text-foreground mb-4">🏢 负荷构成分析</h3>
          <div className="space-y-3">
            {loadBreakdown.map((item) => (
              <div key={item.type}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground">{item.type}</span>
                  <div className="flex gap-3">
                    <span className="text-muted-foreground">{item.power}kW</span>
                    <span className="stat-value text-primary w-8 text-right">{item.value}%</span>
                  </div>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${item.value * 2.8}%`,
                      background: `linear-gradient(90deg, hsl(var(--energy-cyan)), hsl(var(--energy-purple)))`,
                    }}
                  />
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  上期: {item.prev}% {item.value > item.prev ? "↑" : item.value < item.prev ? "↓" : "→"}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">🎯 负荷管理评分</h3>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(215 20% 22%)" />
              <PolarAngleAxis dataKey="subject" stroke="hsl(215 15% 55%)" fontSize={10} />
              <PolarRadiusAxis stroke="hsl(215 20% 22%)" fontSize={9} />
              <Radar name="评分" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="text-center mt-2">
            <span className="stat-value text-2xl text-energy-purple">79.8</span>
            <span className="text-xs text-muted-foreground ml-1">综合评分</span>
          </div>
        </GlassCard>

        <GlassCard glow="green">
          <h3 className="text-sm font-semibold text-foreground mb-4">📈 本周峰谷平趋势</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weekTrend} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="day" stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Bar dataKey="peak" fill="#ef4444" radius={[3, 3, 0, 0]} name="峰值" />
              <Bar dataKey="avg" fill="#8b5cf6" radius={[3, 3, 0, 0]} name="平均" />
              <Bar dataKey="valley" fill="#22c55e" radius={[3, 3, 0, 0]} name="谷值" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Electricity price + demand response */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard glow="cyan">
          <h3 className="text-sm font-semibold text-foreground mb-4">💡 分时电价信息</h3>
          <div className="space-y-3">
            {electricityPrice.map((ep) => (
              <div key={ep.period} className="flex items-center justify-between p-2.5 rounded-md bg-muted/20 text-xs">
                <span className="text-foreground flex-1">{ep.period}</span>
                <span className={`stat-value text-base ${ep.color}`}>{ep.price} <span className="text-[10px] text-muted-foreground font-normal">元/kWh</span></span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard glow="orange">
          <h3 className="text-sm font-semibold text-foreground mb-4">⚡ 需求响应事件</h3>
          <div className="space-y-2">
            {demandResponse.map((dr, i) => (
              <div key={i} className="p-2.5 rounded-md bg-muted/20 text-xs border border-border/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="stat-value text-muted-foreground">{dr.time}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${dr.status === "已执行" ? "bg-energy-green/15 text-energy-green" : "bg-energy-orange/15 text-energy-orange"}`}>{dr.status}</span>
                </div>
                <p className="text-foreground font-medium">{dr.event}</p>
                <div className="flex gap-4 mt-1 text-muted-foreground">
                  <span>削减: {dr.reduction}kW</span>
                  <span>时长: {dr.duration}</span>
                  <span>方式: {dr.source}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Demand and forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">📅 月度需量与电费趋势</h3>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={monthlyDemand}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="month" stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
              <YAxis yAxisId="demand" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis yAxisId="cost" orientation="right" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Bar yAxisId="demand" dataKey="demand" fill="#8b5cf6" radius={[3, 3, 0, 0]} name="需量(kW)" />
              <Line yAxisId="demand" type="monotone" dataKey="limit" stroke="#ef4444" strokeDasharray="6 3" strokeWidth={1.5} name="需量限值" dot={false} />
              <Line yAxisId="cost" type="monotone" dataKey="cost" stroke="#f59e0b" strokeWidth={2} name="电费(元)" dot={{ r: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="blue">
          <h3 className="text-sm font-semibold text-foreground mb-4">🔮 负荷预测 (未来48小时)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={loadForecast}>
              <defs>
                <linearGradient id="gradTomorrow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="hour" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Area type="monotone" dataKey="tomorrow" stroke="#22c55e" fill="url(#gradTomorrow)" strokeWidth={2} name="明日预测" />
              <Line type="monotone" dataKey="dayAfter" stroke="#8b5cf6" strokeWidth={1.5} strokeDasharray="5 5" name="后日预测" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
