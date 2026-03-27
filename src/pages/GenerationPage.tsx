import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { Sun, Wind, Zap, TrendingUp, Thermometer, Cloud, ArrowDown, ArrowUp } from "lucide-react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, ComposedChart,
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
  total: 5000 + Math.sin(i * Math.PI / 6) * 2800 + Math.random() * 800,
}));

const inverters = [
  { id: "INV-001", power: 245.6, status: "运行", temp: 42.3, efficiency: 97.2, voltage: 380, current: 645.3 },
  { id: "INV-002", power: 238.1, status: "运行", temp: 41.8, efficiency: 96.8, voltage: 381, current: 624.9 },
  { id: "INV-003", power: 0, status: "停机", temp: 28.1, efficiency: 0, voltage: 0, current: 0 },
  { id: "INV-004", power: 251.3, status: "运行", temp: 43.1, efficiency: 97.5, voltage: 379, current: 663.1 },
  { id: "INV-005", power: 242.8, status: "运行", temp: 42.0, efficiency: 96.9, voltage: 380, current: 638.9 },
  { id: "INV-006", power: 248.5, status: "运行", temp: 41.5, efficiency: 97.1, voltage: 381, current: 652.1 },
];

const solarPanels = [
  { zone: "A区", panels: 240, power: 1842, capacity: 2000, tilt: 25, cleaning: "3天前" },
  { zone: "B区", panels: 180, power: 1356, capacity: 1500, tilt: 30, cleaning: "5天前" },
  { zone: "C区", panels: 96, power: 612, capacity: 800, tilt: 20, cleaning: "1天前" },
  { zone: "D区", panels: 60, power: 432, capacity: 500, tilt: 25, cleaning: "7天前" },
];

const windTurbines = [
  { id: "WT-01", power: 320, rated: 400, speed: 6.2, direction: "NE", rpm: 18.5, status: "运行", vibration: 2.1 },
  { id: "WT-02", power: 285, rated: 400, speed: 5.8, direction: "N", rpm: 16.8, status: "运行", vibration: 1.8 },
  { id: "WT-03", power: 310, rated: 400, speed: 6.0, direction: "NE", rpm: 17.9, status: "运行", vibration: 4.2 },
  { id: "WT-04", power: 341, rated: 400, speed: 6.5, direction: "NW", rpm: 19.2, status: "运行", vibration: 1.5 },
];

const peakHourData = [
  { period: "谷时 (23:00-7:00)", solar: 0, wind: 35, color: "#22c55e" },
  { period: "平时 (7:00-10:00)", solar: 25, wind: 30, color: "#06b6d4" },
  { period: "峰时 (10:00-15:00)", solar: 85, wind: 28, color: "#f59e0b" },
  { period: "平时 (15:00-18:00)", solar: 40, wind: 32, color: "#06b6d4" },
  { period: "峰时 (18:00-21:00)", solar: 5, wind: 38, color: "#ef4444" },
  { period: "谷时 (21:00-23:00)", solar: 0, wind: 30, color: "#22c55e" },
];

const lossData = [
  { name: "线路损耗", value: 35, color: "#ef4444" },
  { name: "逆变损耗", value: 25, color: "#f59e0b" },
  { name: "变压损耗", value: 20, color: "#8b5cf6" },
  { name: "其他损耗", value: 20, color: "#64748b" },
];

const tooltipStyle = { background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" };

export default function GenerationPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="光伏实时功率" value="3,842" unit="kW" trend={8.5} icon={<Sun className="w-5 h-5" />} color="text-energy-yellow" />
        <StatCard label="风电实时功率" value="1,256" unit="kW" trend={-3.2} icon={<Wind className="w-5 h-5" />} color="text-energy-cyan" />
        <StatCard label="今日总发电" value="28,450" unit="kWh" trend={12.1} icon={<Zap className="w-5 h-5" />} color="text-primary" />
        <StatCard label="发电效率" value="94.6" unit="%" trend={2.1} icon={<TrendingUp className="w-5 h-5" />} color="text-energy-green" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="累计发电" value="2,845" unit="MWh" icon={<Zap className="w-5 h-5" />} color="text-energy-blue" />
        <StatCard label="组件温度" value="48.2" unit="°C" icon={<Thermometer className="w-5 h-5" />} color="text-energy-orange" />
        <StatCard label="日照时数" value="8.5" unit="h" icon={<Sun className="w-5 h-5" />} color="text-energy-yellow" />
        <StatCard label="弃风弃光" value="1.2" unit="%" trend={-0.5} icon={<Cloud className="w-5 h-5" />} color="text-energy-teal" />
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
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
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
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Line yAxisId="left" type="monotone" dataKey="power" stroke="#06b6d4" strokeWidth={2} name="功率(kW)" dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="speed" stroke="#22d3ee" strokeWidth={1.5} strokeDasharray="4 4" name="风速(m/s)" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Solar panels detail */}
      <GlassCard glow="orange">
        <h3 className="text-sm font-semibold text-foreground mb-4">☀️ 光伏阵列分区详情</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {solarPanels.map((p) => (
            <div key={p.zone} className="p-3 rounded-lg bg-muted/20 border border-border/40">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">{p.zone}</span>
                <span className="text-[10px] bg-energy-green/15 text-energy-green px-2 py-0.5 rounded-full">运行</span>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span>出力 {p.power}kW / {p.capacity}kW</span>
                  <span className="stat-value text-energy-yellow">{((p.power / p.capacity) * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-energy-yellow to-energy-orange transition-all" style={{ width: `${(p.power / p.capacity) * 100}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[10px] text-muted-foreground">
                <span>组件: {p.panels}块</span>
                <span>倾角: {p.tilt}°</span>
                <span>清洗: {p.cleaning}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Wind turbines */}
      <GlassCard glow="cyan">
        <h3 className="text-sm font-semibold text-foreground mb-4">💨 风力机组运行详情</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="text-left py-2 px-3">机组</th>
                <th className="text-right py-2 px-3">实时功率</th>
                <th className="text-right py-2 px-3">额定</th>
                <th className="text-right py-2 px-3">风速</th>
                <th className="text-center py-2 px-3">风向</th>
                <th className="text-right py-2 px-3">转速</th>
                <th className="text-right py-2 px-3">振动</th>
                <th className="text-center py-2 px-3">状态</th>
              </tr>
            </thead>
            <tbody>
              {windTurbines.map((wt) => (
                <tr key={wt.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-2 px-3 font-mono font-medium text-foreground">{wt.id}</td>
                  <td className="text-right py-2 px-3 stat-value text-energy-cyan">{wt.power}kW</td>
                  <td className="text-right py-2 px-3 text-muted-foreground">{wt.rated}kW</td>
                  <td className="text-right py-2 px-3 text-foreground">{wt.speed}m/s</td>
                  <td className="text-center py-2 px-3 text-muted-foreground">{wt.direction}</td>
                  <td className="text-right py-2 px-3 text-muted-foreground">{wt.rpm}rpm</td>
                  <td className="text-right py-2 px-3">
                    <span className={wt.vibration > 3 ? "text-energy-red" : "text-energy-green"}>{wt.vibration}mm/s</span>
                  </td>
                  <td className="text-center py-2 px-3">
                    <span className="bg-energy-green/15 text-energy-green px-2 py-0.5 rounded-full text-[10px]">{wt.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2" glow="blue">
          <h3 className="text-sm font-semibold text-foreground mb-4">年度发电量趋势</h3>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={monthlyGen} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="month" stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
              <Bar dataKey="solar" fill="#f59e0b" radius={[3, 3, 0, 0]} name="光伏(kWh)" />
              <Bar dataKey="wind" fill="#06b6d4" radius={[3, 3, 0, 0]} name="风电(kWh)" />
              <Line type="monotone" dataKey="total" stroke="#22c55e" strokeWidth={2} dot={{ r: 2 }} name="总计" />
            </ComposedChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">系统损耗构成</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={lossData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={4} dataKey="value" stroke="none">
                {lossData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Inverter detail table */}
      <GlassCard glow="green">
        <h3 className="text-sm font-semibold text-foreground mb-4">🔌 逆变器运行状态详情</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="text-left py-2 px-3">编号</th>
                <th className="text-center py-2 px-3">状态</th>
                <th className="text-right py-2 px-3">输出功率</th>
                <th className="text-right py-2 px-3">电压</th>
                <th className="text-right py-2 px-3">电流</th>
                <th className="text-right py-2 px-3">温度</th>
                <th className="text-right py-2 px-3">转换效率</th>
              </tr>
            </thead>
            <tbody>
              {inverters.map((inv) => (
                <tr key={inv.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-2 px-3 font-mono font-medium text-foreground">{inv.id}</td>
                  <td className="text-center py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${inv.status === "运行" ? "bg-energy-green/15 text-energy-green" : "bg-energy-red/15 text-energy-red"}`}>{inv.status}</span>
                  </td>
                  <td className="text-right py-2 px-3 stat-value text-primary">{inv.power}kW</td>
                  <td className="text-right py-2 px-3 text-muted-foreground">{inv.voltage}V</td>
                  <td className="text-right py-2 px-3 text-muted-foreground">{inv.current}A</td>
                  <td className="text-right py-2 px-3">
                    <span className={inv.temp > 45 ? "text-energy-red" : "text-energy-green"}>{inv.temp}°C</span>
                  </td>
                  <td className="text-right py-2 px-3 stat-value text-energy-green">{inv.efficiency}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Peak/valley analysis */}
      <GlassCard glow="orange">
        <h3 className="text-sm font-semibold text-foreground mb-4">⏰ 分时段发电分析</h3>
        <div className="space-y-2.5">
          {peakHourData.map((p) => (
            <div key={p.period} className="flex items-center gap-4 text-xs">
              <span className="text-foreground w-36 shrink-0">{p.period}</span>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-energy-yellow w-8 text-right">{p.solar}%</span>
                <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden flex">
                  <div className="h-full bg-energy-yellow" style={{ width: `${p.solar}%` }} />
                  <div className="h-full bg-energy-cyan" style={{ width: `${p.wind}%` }} />
                </div>
                <span className="text-energy-cyan w-8">{p.wind}%</span>
              </div>
            </div>
          ))}
          <div className="flex gap-4 mt-2 text-[10px] text-muted-foreground justify-end">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-energy-yellow" /> 光伏</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-energy-cyan" /> 风电</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
