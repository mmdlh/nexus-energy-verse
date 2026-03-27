import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { Battery, BatteryCharging, BatteryFull, Thermometer, Clock, Percent } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const socHistory = Array.from({ length: 48 }, (_, i) => ({
  time: `${Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`,
  soc: 40 + Math.sin(i * Math.PI / 24) * 35 + Math.random() * 5,
  power: Math.sin(i * Math.PI / 12) * 500 + Math.random() * 100,
}));

const batteryUnits = [
  { name: "储能柜A", soc: 85, status: "充电", power: 250, temp: 28, cycles: 1245 },
  { name: "储能柜B", soc: 62, status: "放电", power: -180, temp: 31, cycles: 986 },
  { name: "储能柜C", soc: 45, status: "待机", power: 0, temp: 25, cycles: 1560 },
  { name: "储能柜D", soc: 91, status: "充电", power: 320, temp: 29, cycles: 780 },
  { name: "储能柜E", soc: 33, status: "放电", power: -420, temp: 33, cycles: 1890 },
  { name: "储能柜F", soc: 78, status: "充电", power: 190, temp: 27, cycles: 650 },
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

export default function StoragePage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="总装机容量" value="10.5" unit="MWh" icon={<BatteryFull className="w-5 h-5" />} color="text-energy-purple" />
        <StatCard label="当前SOC" value="68.2" unit="%" trend={3.5} icon={<Battery className="w-5 h-5" />} color="text-energy-cyan" />
        <StatCard label="充放电功率" value="+1,260" unit="kW" icon={<BatteryCharging className="w-5 h-5" />} color="text-energy-green" />
        <StatCard label="循环次数" value="1,185" unit="次" icon={<Clock className="w-5 h-5" />} color="text-energy-orange" />
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
              <p>循环 {unit.cycles} 次</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2" glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">SOC与充放电功率曲线</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={socHistory}>
              <defs>
                <linearGradient id="gradSOC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="time" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} interval={5} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Area type="monotone" dataKey="soc" stroke="#8b5cf6" fill="url(#gradSOC)" strokeWidth={2} name="SOC(%)" />
            </AreaChart>
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
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <GlassCard glow="green">
        <h3 className="text-sm font-semibold text-foreground mb-4">储能收益与节省</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthRevenue} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
            <XAxis dataKey="month" stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
            <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
            <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
            <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
            <Bar dataKey="revenue" fill="#22c55e" radius={[3, 3, 0, 0]} name="收益(元)" />
            <Bar dataKey="saving" fill="#06b6d4" radius={[3, 3, 0, 0]} name="节省(元)" />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </div>
  );
}
