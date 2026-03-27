import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { Network, ArrowUpDown, Activity, ShieldCheck, Zap, CircleDot } from "lucide-react";
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
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
  { name: "主变压器T1", voltage: "10kV", current: "245A", power: "4,240kW", status: "正常", pf: 0.95 },
  { name: "主变压器T2", voltage: "10kV", current: "198A", power: "3,430kW", status: "正常", pf: 0.93 },
  { name: "光伏汇流箱", voltage: "0.8kV", current: "312A", power: "2,496kW", status: "正常", pf: 0.99 },
  { name: "储能PCS-1", voltage: "0.4kV", current: "156A", power: "624kW", status: "正常", pf: 0.98 },
  { name: "储能PCS-2", voltage: "0.4kV", current: "0A", power: "0kW", status: "检修", pf: 0 },
  { name: "风电变压器", voltage: "0.69kV", current: "189A", power: "1,304kW", status: "正常", pf: 0.97 },
];

const scheduleEvents = [
  { time: "06:00", action: "光伏并网", type: "auto", detail: "自动跟踪MPPT启动" },
  { time: "08:30", action: "储能充电", type: "schedule", detail: "谷价充电策略执行" },
  { time: "11:00", action: "削峰放电", type: "auto", detail: "负荷超过阈值7500kW" },
  { time: "14:00", action: "反送电网", type: "auto", detail: "光伏过剩320kW上网" },
  { time: "17:30", action: "储能放电", type: "schedule", detail: "峰价放电策略执行" },
  { time: "22:00", action: "谷时充电", type: "schedule", detail: "低谷充电至SOC90%" },
];

export default function GridPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="电网频率" value="50.02" unit="Hz" icon={<Activity className="w-5 h-5" />} color="text-energy-cyan" />
        <StatCard label="功率交换" value="+1,840" unit="kW" trend={-8.2} icon={<ArrowUpDown className="w-5 h-5" />} color="text-primary" />
        <StatCard label="自用率" value="86.5" unit="%" trend={4.1} icon={<CircleDot className="w-5 h-5" />} color="text-energy-green" />
        <StatCard label="保护动作" value="0" unit="次" icon={<ShieldCheck className="w-5 h-5" />} color="text-energy-yellow" />
      </div>

      {/* Grid topology visualization */}
      <GlassCard glow="cyan">
        <h3 className="text-sm font-semibold text-foreground mb-4">⚡ 电网节点运行状态</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard glow="blue">
          <h3 className="text-sm font-semibold text-foreground mb-4">频率与电压实时监测</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={frequencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="t" stroke="hsl(215 15% 45%)" fontSize={9} tickLine={false} interval={9} />
              <YAxis yAxisId="freq" domain={[49.9, 50.1]} stroke="hsl(215 15% 45%)" fontSize={9} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Line yAxisId="freq" type="monotone" dataKey="freq" stroke="#06b6d4" strokeWidth={1.5} name="频率(Hz)" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="green">
          <h3 className="text-sm font-semibold text-foreground mb-4">功率交换曲线</h3>
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
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Area type="monotone" dataKey="gridImport" stroke="#ef4444" fill="url(#gradImport)" strokeWidth={2} name="购电(kW)" />
              <Area type="monotone" dataKey="gridExport" stroke="#22c55e" fill="url(#gradExport)" strokeWidth={2} name="售电(kW)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <GlassCard glow="purple">
        <h3 className="text-sm font-semibold text-foreground mb-4">今日调度事件</h3>
        <div className="relative">
          <div className="absolute left-[72px] top-0 bottom-0 w-px bg-border/50" />
          <div className="space-y-3">
            {scheduleEvents.map((ev, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <span className="stat-value text-xs text-muted-foreground w-14 text-right pt-0.5">{ev.time}</span>
                <div className="w-3 h-3 rounded-full bg-primary/50 border-2 border-primary mt-0.5 group-hover:scale-125 transition-transform z-10" />
                <div>
                  <p className="text-sm font-medium text-foreground">{ev.action}</p>
                  <p className="text-[10px] text-muted-foreground">{ev.detail}</p>
                </div>
                <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full ${ev.type === "auto" ? "bg-energy-cyan/15 text-energy-cyan" : "bg-energy-purple/15 text-energy-purple"}`}>
                  {ev.type === "auto" ? "自动" : "计划"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
