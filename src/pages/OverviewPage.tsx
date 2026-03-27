import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { Zap, Battery, Sun, Wind, TrendingUp, Users, Thermometer, Droplets, MapPin, Clock, Activity, Wifi } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend, LineChart, Line, ComposedChart,
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

const monthlyRevenue = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  revenue: 25000 + Math.sin(i * Math.PI / 6) * 10000 + Math.random() * 5000,
  cost: 15000 + Math.random() * 5000,
  profit: 10000 + Math.sin(i * Math.PI / 6) * 8000 + Math.random() * 3000,
}));

const siteList = [
  { name: "A区光伏电站", capacity: "2.5MW", output: "1,842kW", status: "运行", efficiency: 93.2, location: "厂区南侧" },
  { name: "B区风力发电", capacity: "1.2MW", output: "856kW", status: "运行", efficiency: 88.5, location: "厂区北侧" },
  { name: "C区储能系统", capacity: "5MWh", output: "+320kW", status: "充电", efficiency: 95.1, location: "变电站旁" },
  { name: "D区光伏车棚", capacity: "800kW", output: "612kW", status: "运行", efficiency: 91.8, location: "停车场" },
  { name: "E区微型风机", capacity: "200kW", output: "145kW", status: "运行", efficiency: 86.3, location: "办公楼顶" },
];

const recentEvents = [
  { time: "14:32", event: "储能柜E温度预警", type: "warning" },
  { time: "13:15", event: "光伏A区功率恢复正常", type: "success" },
  { time: "12:45", event: "逆变器INV-003通信恢复", type: "success" },
  { time: "11:30", event: "负荷削峰策略自动触发", type: "info" },
  { time: "10:20", event: "风机WT-03振动值偏高", type: "warning" },
  { time: "09:00", event: "系统日常巡检完成", type: "success" },
  { time: "08:30", event: "谷时充电策略启动", type: "info" },
  { time: "06:15", event: "光伏并网发电启动", type: "info" },
];

const envData = [
  { label: "环境温度", value: "26.5°C", icon: <Thermometer className="w-4 h-4" />, color: "text-energy-orange" },
  { label: "风速", value: "4.8m/s", icon: <Wind className="w-4 h-4" />, color: "text-energy-cyan" },
  { label: "辐照度", value: "856W/m²", icon: <Sun className="w-4 h-4" />, color: "text-energy-yellow" },
  { label: "湿度", value: "62%", icon: <Droplets className="w-4 h-4" />, color: "text-energy-blue" },
];

const tooltipStyle = { background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" };

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

      {/* Env strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {envData.map((e) => (
          <GlassCard key={e.label} className="!p-3 flex items-center gap-3" hover={false}>
            <span className={e.color}>{e.icon}</span>
            <div>
              <p className="text-[10px] text-muted-foreground">{e.label}</p>
              <p className={`stat-value text-sm ${e.color}`}>{e.value}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Area type="monotone" dataKey="solar" stroke="#f59e0b" fill="url(#gradSolar)" strokeWidth={2} name="光伏" />
              <Area type="monotone" dataKey="wind" stroke="#06b6d4" fill="url(#gradWind)" strokeWidth={2} name="风电" />
              <Area type="monotone" dataKey="load" stroke="#8b5cf6" fill="url(#gradLoad)" strokeWidth={2} name="负荷" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="green">
          <h3 className="text-sm font-semibold text-foreground mb-4">能源结构占比</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={energyMix} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={4} dataKey="value" stroke="none">
                {energyMix.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Site list + events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2" glow="cyan">
          <h3 className="text-sm font-semibold text-foreground mb-4">📍 分布式站点运行概况</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground">
                  <th className="text-left py-2 px-3">站点名称</th>
                  <th className="text-left py-2 px-3">位置</th>
                  <th className="text-right py-2 px-3">装机容量</th>
                  <th className="text-right py-2 px-3">实时出力</th>
                  <th className="text-right py-2 px-3">效率</th>
                  <th className="text-center py-2 px-3">状态</th>
                </tr>
              </thead>
              <tbody>
                {siteList.map((s) => (
                  <tr key={s.name} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="py-2.5 px-3 text-foreground font-medium">{s.name}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{s.location}</td>
                    <td className="text-right py-2.5 px-3 text-muted-foreground">{s.capacity}</td>
                    <td className="text-right py-2.5 px-3 stat-value text-primary">{s.output}</td>
                    <td className="text-right py-2.5 px-3">
                      <span className="stat-value text-energy-green">{s.efficiency}%</span>
                    </td>
                    <td className="text-center py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                        s.status === "运行" ? "bg-energy-green/15 text-energy-green" : "bg-energy-cyan/15 text-energy-cyan"
                      }`}>{s.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">📋 实时事件动态</h3>
          <div className="space-y-2.5">
            {recentEvents.map((ev, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs">
                <span className="stat-value text-muted-foreground w-10 shrink-0 pt-0.5">{ev.time}</span>
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                  ev.type === "warning" ? "bg-energy-orange" : ev.type === "success" ? "bg-energy-green" : "bg-energy-cyan"
                }`} />
                <span className="text-foreground/80">{ev.event}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Bottom charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard glow="blue">
          <h3 className="text-sm font-semibold text-foreground mb-4">本周发电与用电对比</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="day" stroke="hsl(215 15% 45%)" fontSize={12} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
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
              <Tooltip contentStyle={tooltipStyle} />
            </RadialBarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Revenue chart */}
      <GlassCard glow="green">
        <h3 className="text-sm font-semibold text-foreground mb-4">💰 年度经济运行分析 (元)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={monthlyRevenue}>
            <defs>
              <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
            <XAxis dataKey="month" stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
            <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
            <Bar dataKey="revenue" fill="#06b6d4" radius={[3, 3, 0, 0]} name="收入" />
            <Bar dataKey="cost" fill="#8b5cf6" radius={[3, 3, 0, 0]} name="成本" />
            <Area type="monotone" dataKey="profit" stroke="#22c55e" fill="url(#gradProfit)" strokeWidth={2} name="利润" />
          </ComposedChart>
        </ResponsiveContainer>
      </GlassCard>

      {/* System health indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: "通信网络", value: "正常", color: "text-energy-green", icon: <Wifi className="w-4 h-4" /> },
          { label: "SCADA系统", value: "在线", color: "text-energy-green", icon: <Activity className="w-4 h-4" /> },
          { label: "数据采集", value: "实时", color: "text-energy-cyan", icon: <Clock className="w-4 h-4" /> },
          { label: "安全防护", value: "正常", color: "text-energy-green", icon: <Zap className="w-4 h-4" /> },
          { label: "系统运行", value: "128天", color: "text-energy-yellow", icon: <TrendingUp className="w-4 h-4" /> },
          { label: "上次维护", value: "3天前", color: "text-muted-foreground", icon: <MapPin className="w-4 h-4" /> },
        ].map((item) => (
          <GlassCard key={item.label} className="!p-3 text-center" hover={false}>
            <div className={`mx-auto mb-1.5 ${item.color}`}>{item.icon}</div>
            <p className="text-[10px] text-muted-foreground">{item.label}</p>
            <p className={`stat-value text-xs mt-0.5 ${item.color}`}>{item.value}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
