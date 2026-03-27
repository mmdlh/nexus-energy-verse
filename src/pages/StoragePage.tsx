import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { Battery, BatteryCharging, BatteryFull, Clock, DollarSign, Zap, Thermometer, Activity } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, ComposedChart,
} from "recharts";

const socHistory = Array.from({ length: 48 }, (_, i) => ({
  time: `${Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`,
  soc: 40 + Math.sin(i * Math.PI / 24) * 35 + Math.random() * 5,
  power: Math.sin(i * Math.PI / 12) * 500 + Math.random() * 100,
}));

const batteryUnits = [
  { name: "储能柜A", soc: 85, status: "充电", power: 250, temp: 28, cycles: 1245, health: 96.2, voltage: 768 },
  { name: "储能柜B", soc: 62, status: "放电", power: -180, temp: 31, cycles: 986, health: 97.8, voltage: 752 },
  { name: "储能柜C", soc: 45, status: "待机", power: 0, temp: 25, cycles: 1560, health: 93.5, voltage: 738 },
  { name: "储能柜D", soc: 91, status: "充电", power: 320, temp: 29, cycles: 780, health: 98.1, voltage: 774 },
  { name: "储能柜E", soc: 33, status: "放电", power: -420, temp: 33, cycles: 1890, health: 91.2, voltage: 724 },
  { name: "储能柜F", soc: 78, status: "充电", power: 190, temp: 27, cycles: 650, health: 98.8, voltage: 762 },
];

const chargeDistribution = [
  { name: "谷时充电", value: 45, color: "#06b6d4" },
  { name: "平时充电", value: 25, color: "#8b5cf6" },
  { name: "峰时放电", value: 30, color: "#f59e0b" },
];

const monthRevenue = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  revenue: 15000 + Math.random() * 10000 + Math.sin(i * Math.PI / 6) * 5000,
  saving: 8000 + Math.random() * 6000,
}));

const cellTempData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  max: 30 + Math.sin(i * Math.PI / 12) * 8 + Math.random() * 2,
  avg: 26 + Math.sin(i * Math.PI / 12) * 5 + Math.random() * 1,
  min: 22 + Math.sin(i * Math.PI / 12) * 3,
}));

const chargeSchedule = [
  { time: "00:00-06:00", mode: "谷时充电", power: "+500kW", price: "0.28元/kWh", benefit: "低价充电" },
  { time: "06:00-08:00", mode: "待机", power: "0kW", price: "-", benefit: "等待峰值" },
  { time: "08:00-11:30", mode: "峰时放电", power: "-800kW", price: "1.05元/kWh", benefit: "峰谷套利" },
  { time: "11:30-14:00", mode: "光伏充电", power: "+600kW", price: "0元", benefit: "免费充电" },
  { time: "14:00-17:00", mode: "削峰放电", power: "-650kW", price: "0.85元/kWh", benefit: "降低需量" },
  { time: "17:00-21:00", mode: "峰时放电", power: "-900kW", price: "1.05元/kWh", benefit: "峰谷套利" },
  { time: "21:00-24:00", mode: "谷时充电", power: "+500kW", price: "0.28元/kWh", benefit: "低价充电" },
];

const healthHistory = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  soh: 100 - i * 0.3 - Math.random() * 0.2,
  capacity: 10.5 - i * 0.02 - Math.random() * 0.01,
}));

const tooltipStyle = { background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" };

export default function StoragePage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="总装机容量" value="10.5" unit="MWh" icon={<BatteryFull className="w-5 h-5" />} color="text-energy-purple" />
        <StatCard label="当前SOC" value="68.2" unit="%" trend={3.5} icon={<Battery className="w-5 h-5" />} color="text-energy-cyan" />
        <StatCard label="充放电功率" value="+1,260" unit="kW" icon={<BatteryCharging className="w-5 h-5" />} color="text-energy-green" />
        <StatCard label="循环次数" value="1,185" unit="次" icon={<Clock className="w-5 h-5" />} color="text-energy-orange" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="今日收益" value="12,450" unit="元" trend={8.2} icon={<DollarSign className="w-5 h-5" />} color="text-energy-yellow" />
        <StatCard label="电池健康" value="95.8" unit="%" icon={<Activity className="w-5 h-5" />} color="text-energy-green" />
        <StatCard label="最高温度" value="33.5" unit="°C" icon={<Thermometer className="w-5 h-5" />} color="text-energy-red" />
        <StatCard label="今日充放电" value="4,280" unit="kWh" icon={<Zap className="w-5 h-5" />} color="text-primary" />
      </div>

      {/* Battery visual */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {batteryUnits.map((unit) => (
          <GlassCard key={unit.name} className="text-center" glow={unit.status === "充电" ? "green" : unit.status === "放电" ? "orange" : "cyan"}>
            <p className="text-xs font-medium text-foreground mb-2">{unit.name}</p>
            <div className="w-16 h-28 mx-auto rounded-lg border-2 border-muted relative overflow-hidden mb-2">
              <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                style={{
                  height: `${unit.soc}%`,
                  background: unit.soc > 60 ? "linear-gradient(to top, #22c55e, #06b6d4)" : unit.soc > 30 ? "linear-gradient(to top, #f59e0b, #eab308)" : "linear-gradient(to top, #ef4444, #f59e0b)",
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center stat-value text-xs text-foreground drop-shadow-lg">
                {unit.soc}%
              </span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              unit.status === "充电" ? "bg-energy-green/20 text-energy-green" : unit.status === "放电" ? "bg-energy-orange/20 text-energy-orange" : "bg-muted text-muted-foreground"
            }`}>{unit.status}</span>
            <div className="mt-1.5 space-y-0.5 text-[10px] text-muted-foreground">
              <p>{Math.abs(unit.power)}kW · {unit.temp}°C</p>
              <p>SOH {unit.health}% · {unit.voltage}V</p>
              <p>循环 {unit.cycles} 次</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2" glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">SOC与充放电功率曲线</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={socHistory}>
              <defs>
                <linearGradient id="gradSOC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="time" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} interval={5} />
              <YAxis yAxisId="soc" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis yAxisId="power" orientation="right" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Area yAxisId="soc" type="monotone" dataKey="soc" stroke="#8b5cf6" fill="url(#gradSOC)" strokeWidth={2} name="SOC(%)" />
              <Line yAxisId="power" type="monotone" dataKey="power" stroke="#06b6d4" strokeWidth={1.5} dot={false} name="功率(kW)" />
            </ComposedChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="cyan">
          <h3 className="text-sm font-semibold text-foreground mb-4">充放电策略分布</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={chargeDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={5} dataKey="value" stroke="none">
                {chargeDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Charge schedule */}
      <GlassCard glow="blue">
        <h3 className="text-sm font-semibold text-foreground mb-4">📅 今日充放电调度计划</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="text-left py-2 px-3">时间段</th>
                <th className="text-left py-2 px-3">运行模式</th>
                <th className="text-right py-2 px-3">功率</th>
                <th className="text-right py-2 px-3">电价</th>
                <th className="text-left py-2 px-3">策略收益</th>
              </tr>
            </thead>
            <tbody>
              {chargeSchedule.map((s) => (
                <tr key={s.time} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-2 px-3 stat-value text-muted-foreground">{s.time}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      s.mode.includes("充电") ? "bg-energy-green/15 text-energy-green" :
                      s.mode.includes("放电") ? "bg-energy-orange/15 text-energy-orange" :
                      "bg-muted text-muted-foreground"
                    }`}>{s.mode}</span>
                  </td>
                  <td className={`text-right py-2 px-3 font-medium ${s.power.startsWith("+") ? "text-energy-green" : s.power.startsWith("-") ? "text-energy-orange" : "text-muted-foreground"}`}>{s.power}</td>
                  <td className="text-right py-2 px-3 text-muted-foreground">{s.price}</td>
                  <td className="py-2 px-3 text-energy-cyan text-[10px]">{s.benefit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature monitoring */}
        <GlassCard glow="orange">
          <h3 className="text-sm font-semibold text-foreground mb-4">🌡️ 电芯温度监测</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={cellTempData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="time" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis domain={[18, 42]} stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Line type="monotone" dataKey="max" stroke="#ef4444" strokeWidth={1.5} name="最高" dot={false} />
              <Line type="monotone" dataKey="avg" stroke="#f59e0b" strokeWidth={2} name="平均" dot={false} />
              <Line type="monotone" dataKey="min" stroke="#22c55e" strokeWidth={1.5} name="最低" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Health trend */}
        <GlassCard glow="green">
          <h3 className="text-sm font-semibold text-foreground mb-4">🔋 电池健康度趋势 (SOH)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={healthHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="month" stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
              <YAxis yAxisId="soh" domain={[95, 100]} stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis yAxisId="cap" orientation="right" domain={[10, 10.6]} stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Line yAxisId="soh" type="monotone" dataKey="soh" stroke="#22c55e" strokeWidth={2} name="SOH(%)" dot={{ r: 2 }} />
              <Bar yAxisId="cap" dataKey="capacity" fill="#8b5cf6" opacity={0.5} radius={[3, 3, 0, 0]} name="容量(MWh)" />
            </ComposedChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <GlassCard glow="green">
        <h3 className="text-sm font-semibold text-foreground mb-4">💰 储能收益与节省</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthRevenue} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
            <XAxis dataKey="month" stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
            <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
            <Bar dataKey="revenue" fill="#22c55e" radius={[3, 3, 0, 0]} name="收益(元)" />
            <Bar dataKey="saving" fill="#06b6d4" radius={[3, 3, 0, 0]} name="节省(元)" />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}
