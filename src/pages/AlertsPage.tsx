import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { AlertTriangle, Bell, CheckCircle, XCircle, Clock, Shield } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";

const alerts = [
  { id: 1, time: "14:32:18", level: "紧急", device: "储能柜E-BMS", message: "电芯温度过高 (38.5°C > 35°C)", status: "未处理", category: "温度" },
  { id: 2, time: "14:28:05", level: "重要", device: "逆变器INV-003", message: "通信中断超过5分钟", status: "处理中", category: "通信" },
  { id: 3, time: "13:45:22", level: "一般", device: "光伏组件PV-A12", message: "组件功率低于额定值30%", status: "未处理", category: "性能" },
  { id: 4, time: "12:15:38", level: "紧急", device: "变压器T2", message: "油温异常升高 (78°C)", status: "处理中", category: "温度" },
  { id: 5, time: "11:50:12", level: "重要", device: "风机WT-03", message: "振动值超标 (4.2mm/s)", status: "未处理", category: "振动" },
  { id: 6, time: "10:32:45", level: "一般", device: "配电柜CB-08", message: "断路器跳闸计数异常", status: "已处理", category: "电气" },
  { id: 7, time: "09:15:30", level: "一般", device: "光伏汇流箱JB-05", message: "支路电流不均衡 (>15%)", status: "已处理", category: "电气" },
  { id: 8, time: "08:42:18", level: "重要", device: "储能PCS-2", message: "直流侧绝缘电阻低", status: "已处理", category: "安全" },
];

const alertStats = [
  { name: "紧急", value: 2, color: "#ef4444" },
  { name: "重要", value: 3, color: "#f59e0b" },
  { name: "一般", value: 8, color: "#06b6d4" },
];

const weeklyAlerts = Array.from({ length: 7 }, (_, i) => ({
  day: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"][i],
  urgent: Math.floor(Math.random() * 3),
  important: Math.floor(Math.random() * 5 + 1),
  normal: Math.floor(Math.random() * 10 + 3),
}));

const trendData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}`,
  count: Math.floor(8 + Math.random() * 15 - i * 0.2),
}));

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="今日告警" value="13" unit="条" icon={<Bell className="w-5 h-5" />} color="text-energy-orange" />
        <StatCard label="紧急告警" value="2" unit="条" icon={<XCircle className="w-5 h-5" />} color="text-energy-red" />
        <StatCard label="已处理" value="3" unit="条" icon={<CheckCircle className="w-5 h-5" />} color="text-energy-green" />
        <StatCard label="平均响应" value="12" unit="分钟" trend={-15.3} icon={<Clock className="w-5 h-5" />} color="text-primary" />
      </div>

      {/* Alert list */}
      <GlassCard glow="orange">
        <h3 className="text-sm font-semibold text-foreground mb-4">🔔 实时告警列表</h3>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center gap-3 p-3 rounded-lg text-xs transition-all hover:scale-[1.005] ${
                alert.level === "紧急" ? "bg-energy-red/10 border border-energy-red/20" :
                alert.level === "重要" ? "bg-energy-orange/10 border border-energy-orange/20" :
                "bg-muted/20 border border-border/30"
              }`}
            >
              <div className={`w-2 h-2 rounded-full shrink-0 ${
                alert.level === "紧急" ? "bg-energy-red animate-pulse" : alert.level === "重要" ? "bg-energy-orange" : "bg-energy-cyan"
              }`} />
              <span className="stat-value text-muted-foreground w-16">{alert.time}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                alert.level === "紧急" ? "bg-energy-red/20 text-energy-red" : alert.level === "重要" ? "bg-energy-orange/20 text-energy-orange" : "bg-energy-cyan/20 text-energy-cyan"
              }`}>{alert.level}</span>
              <span className="text-foreground font-medium w-28 truncate">{alert.device}</span>
              <span className="text-muted-foreground flex-1 truncate">{alert.message}</span>
              <span className="text-[10px] text-muted-foreground">{alert.category}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                alert.status === "未处理" ? "bg-energy-red/15 text-energy-red" :
                alert.status === "处理中" ? "bg-energy-cyan/15 text-energy-cyan" :
                "bg-energy-green/15 text-energy-green"
              }`}>{alert.status}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard glow="cyan">
          <h3 className="text-sm font-semibold text-foreground mb-4">告警级别分布</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={alertStats} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
                {alertStats.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">本周告警趋势</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyAlerts} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="day" stroke="hsl(215 15% 45%)" fontSize={11} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Bar dataKey="urgent" stackId="a" fill="#ef4444" name="紧急" />
              <Bar dataKey="important" stackId="a" fill="#f59e0b" name="重要" />
              <Bar dataKey="normal" stackId="a" fill="#06b6d4" radius={[3, 3, 0, 0]} name="一般" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="green">
          <h3 className="text-sm font-semibold text-foreground mb-4">30天告警趋势</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="date" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Line type="monotone" dataKey="count" stroke="#22c55e" strokeWidth={2} name="告警数" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
