import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { Network, ArrowUpDown, Activity, ShieldCheck, CircleDot, Zap, DollarSign, TrendingUp } from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, PieChart, Pie, Cell,
} from "recharts";

const frequencyData = Array.from({ length: 60 }, (_, i) => ({
  t: `${i}s`,
  freq: 50 + (Math.random() - 0.5) * 0.08,
  voltage: 220 + (Math.random() - 0.5) * 4,
}));

const powerFlow = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  gridImport: Math.max(0, 300 - Math.sin((i - 6) * Math.PI / 12) * 400 + Math.random() * 50),
  gridExport: Math.max(0, Math.sin((i - 6) * Math.PI / 12) * 350 - 100 + Math.random() * 50),
  selfUse: 200 + Math.sin(i * Math.PI / 12) * 150 + Math.random() * 30,
}));

const nodes = [
  { name: "主变压器T1", voltage: "10kV", current: "245A", power: "4,240kW", status: "正常", pf: 0.95, load: 84 },
  { name: "主变压器T2", voltage: "10kV", current: "198A", power: "3,430kW", status: "正常", pf: 0.93, load: 68 },
  { name: "光伏汇流箱", voltage: "0.8kV", current: "312A", power: "2,496kW", status: "正常", pf: 0.99, load: 78 },
  { name: "储能PCS-1", voltage: "0.4kV", current: "156A", power: "624kW", status: "正常", pf: 0.98, load: 52 },
  { name: "储能PCS-2", voltage: "0.4kV", current: "0A", power: "0kW", status: "检修", pf: 0, load: 0 },
  { name: "风电变压器", voltage: "0.69kV", current: "189A", power: "1,304kW", status: "正常", pf: 0.97, load: 65 },
  { name: "配电室01", voltage: "0.4kV", current: "425A", power: "1,700kW", status: "正常", pf: 0.94, load: 72 },
  { name: "配电室02", voltage: "0.4kV", current: "380A", power: "1,520kW", status: "正常", pf: 0.95, load: 64 },
];

const scheduleEvents = [
  { time: "06:00", action: "光伏并网", type: "auto", detail: "自动跟踪MPPT启动", power: "+2,400kW" },
  { time: "08:30", action: "储能充电", type: "schedule", detail: "谷价充电策略执行", power: "+500kW" },
  { time: "09:15", action: "需量控制", type: "auto", detail: "负荷接近需量限值95%", power: "-450kW" },
  { time: "11:00", action: "削峰放电", type: "auto", detail: "负荷超过阈值7500kW", power: "-800kW" },
  { time: "14:00", action: "反送电网", type: "auto", detail: "光伏过剩320kW上网", power: "-320kW" },
  { time: "17:30", action: "储能放电", type: "schedule", detail: "峰价放电策略执行", power: "-900kW" },
  { time: "19:00", action: "负荷转供", type: "manual", detail: "配电室02检修转供", power: "1,520kW" },
  { time: "22:00", action: "谷时充电", type: "schedule", detail: "低谷充电至SOC90%", power: "+500kW" },
];

const voltageData = Array.from({ length: 60 }, (_, i) => ({
  t: `${i}s`,
  va: 220 + (Math.random() - 0.5) * 6,
  vb: 220 + (Math.random() - 0.5) * 5,
  vc: 220 + (Math.random() - 0.5) * 7,
}));

const monthlyExchange = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  import: 40000 + Math.random() * 20000,
  export: 15000 + Math.sin(i * Math.PI / 6) * 10000 + Math.random() * 5000,
  fee: 28000 + Math.random() * 12000,
}));

const protectionLog = [
  { time: "03-22 14:32", device: "10kV进线开关", action: "过流I段", value: "2450A", result: "跳闸", reset: "自动重合" },
  { time: "03-18 09:15", device: "光伏汇流开关", action: "逆功率", value: "45kW", result: "告警", reset: "手动确认" },
  { time: "03-12 16:40", device: "储能PCS-2", action: "直流过压", value: "820V", result: "停机", reset: "人工复位" },
];

const tooltipStyle = { background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" };

export default function GridPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="电网频率" value="50.02" unit="Hz" icon={<Activity className="w-5 h-5" />} color="text-energy-cyan" />
        <StatCard label="功率交换" value="+1,840" unit="kW" trend={-8.2} icon={<ArrowUpDown className="w-5 h-5" />} color="text-primary" />
        <StatCard label="自用率" value="86.5" unit="%" trend={4.1} icon={<CircleDot className="w-5 h-5" />} color="text-energy-green" />
        <StatCard label="保护动作" value="0" unit="次" icon={<ShieldCheck className="w-5 h-5" />} color="text-energy-yellow" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="今日购电" value="8,450" unit="kWh" icon={<Zap className="w-5 h-5" />} color="text-energy-red" />
        <StatCard label="今日售电" value="2,180" unit="kWh" icon={<Zap className="w-5 h-5" />} color="text-energy-green" />
        <StatCard label="净购电费" value="5,620" unit="元" icon={<DollarSign className="w-5 h-5" />} color="text-energy-orange" />
        <StatCard label="电压合格率" value="99.8" unit="%" icon={<TrendingUp className="w-5 h-5" />} color="text-energy-purple" />
      </div>

      {/* Grid nodes */}
      <GlassCard glow="cyan">
        <h3 className="text-sm font-semibold text-foreground mb-4">⚡ 电网节点运行状态</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {nodes.map((node) => (
            <div key={node.name} className="p-3 rounded-lg bg-muted/20 border border-border/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${node.status === "正常" ? "bg-energy-green animate-pulse" : "bg-energy-red"}`} />
                <span className="text-xs font-medium text-foreground">{node.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
                <span>电压: {node.voltage}</span>
                <span>电流: {node.current}</span>
                <span>功率: {node.power}</span>
                <span>功因: {node.pf}</span>
              </div>
              {node.load > 0 && (
                <div className="mt-2">
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-muted-foreground">负载率</span>
                    <span className={`stat-value ${node.load > 80 ? "text-energy-red" : "text-energy-green"}`}>{node.load}%</span>
                  </div>
                  <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${node.load > 80 ? "bg-energy-red" : "bg-energy-green"}`} style={{ width: `${node.load}%` }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard glow="blue">
          <h3 className="text-sm font-semibold text-foreground mb-4">频率实时监测 (60s)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={frequencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="t" stroke="hsl(215 15% 45%)" fontSize={9} tickLine={false} interval={9} />
              <YAxis domain={[49.9, 50.1]} stroke="hsl(215 15% 45%)" fontSize={9} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="freq" stroke="#06b6d4" strokeWidth={1.5} name="频率(Hz)" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">三相电压监测 (60s)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={voltageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="t" stroke="hsl(215 15% 45%)" fontSize={9} tickLine={false} interval={9} />
              <YAxis domain={[210, 230]} stroke="hsl(215 15% 45%)" fontSize={9} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Line type="monotone" dataKey="va" stroke="#ef4444" strokeWidth={1.5} name="A相" dot={false} />
              <Line type="monotone" dataKey="vb" stroke="#22c55e" strokeWidth={1.5} name="B相" dot={false} />
              <Line type="monotone" dataKey="vc" stroke="#f59e0b" strokeWidth={1.5} name="C相" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard glow="green">
          <h3 className="text-sm font-semibold text-foreground mb-4">📊 功率交换曲线 (购/售电)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={powerFlow}>
              <defs>
                <linearGradient id="gradImport" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradExport" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="time" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Area type="monotone" dataKey="gridImport" stroke="#ef4444" fill="url(#gradImport)" strokeWidth={2} name="购电(kW)" />
              <Area type="monotone" dataKey="gridExport" stroke="#22c55e" fill="url(#gradExport)" strokeWidth={2} name="售电(kW)" />
              <Line type="monotone" dataKey="selfUse" stroke="#8b5cf6" strokeWidth={1.5} strokeDasharray="5 5" name="自用(kW)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="orange">
          <h3 className="text-sm font-semibold text-foreground mb-4">📈 月度购售电趋势</h3>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={monthlyExchange}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="month" stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Bar dataKey="import" fill="#ef4444" opacity={0.7} radius={[3, 3, 0, 0]} name="购电(kWh)" />
              <Bar dataKey="export" fill="#22c55e" opacity={0.7} radius={[3, 3, 0, 0]} name="售电(kWh)" />
              <Line type="monotone" dataKey="fee" stroke="#f59e0b" strokeWidth={2} name="电费(元)" dot={{ r: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Protection log */}
      <GlassCard glow="orange">
        <h3 className="text-sm font-semibold text-foreground mb-4">🛡️ 近期保护动作记录</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="text-left py-2 px-3">时间</th>
                <th className="text-left py-2 px-3">设备</th>
                <th className="text-left py-2 px-3">保护类型</th>
                <th className="text-right py-2 px-3">动作值</th>
                <th className="text-center py-2 px-3">结果</th>
                <th className="text-left py-2 px-3">复位方式</th>
              </tr>
            </thead>
            <tbody>
              {protectionLog.map((log, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-2 px-3 stat-value text-muted-foreground">{log.time}</td>
                  <td className="py-2 px-3 text-foreground font-medium">{log.device}</td>
                  <td className="py-2 px-3 text-energy-orange">{log.action}</td>
                  <td className="text-right py-2 px-3 stat-value text-energy-red">{log.value}</td>
                  <td className="text-center py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${log.result === "跳闸" ? "bg-energy-red/15 text-energy-red" : log.result === "告警" ? "bg-energy-orange/15 text-energy-orange" : "bg-energy-cyan/15 text-energy-cyan"}`}>{log.result}</span>
                  </td>
                  <td className="py-2 px-3 text-muted-foreground">{log.reset}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Schedule timeline */}
      <GlassCard glow="purple">
        <h3 className="text-sm font-semibold text-foreground mb-4">📋 今日调度事件</h3>
        <div className="relative">
          <div className="absolute left-[72px] top-0 bottom-0 w-px bg-border/50" />
          <div className="space-y-3">
            {scheduleEvents.map((ev, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <span className="stat-value text-xs text-muted-foreground w-14 text-right pt-0.5">{ev.time}</span>
                <div className="w-3 h-3 rounded-full bg-primary/50 border-2 border-primary mt-0.5 group-hover:scale-125 transition-transform z-10" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{ev.action}</p>
                  <p className="text-[10px] text-muted-foreground">{ev.detail}</p>
                </div>
                <span className="stat-value text-xs text-primary">{ev.power}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  ev.type === "auto" ? "bg-energy-cyan/15 text-energy-cyan" :
                  ev.type === "schedule" ? "bg-energy-purple/15 text-energy-purple" :
                  "bg-energy-orange/15 text-energy-orange"
                }`}>
                  {ev.type === "auto" ? "自动" : ev.type === "schedule" ? "计划" : "手动"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
