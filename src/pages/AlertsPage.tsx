import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { AlertTriangle, Bell, CheckCircle, XCircle, Clock, Shield, TrendingDown, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area, ComposedChart } from "recharts";

const alerts = [
  { id: 1, time: "14:32:18", level: "紧急", device: "储能柜E-BMS", message: "电芯温度过高 (38.5°C > 35°C)", status: "未处理", category: "温度", impact: "储能系统降功率运行" },
  { id: 2, time: "14:28:05", level: "重要", device: "逆变器INV-003", message: "通信中断超过5分钟", status: "处理中", category: "通信", impact: "无法远程监控" },
  { id: 3, time: "13:45:22", level: "一般", device: "光伏组件PV-A12", message: "组件功率低于额定值30%", status: "未处理", category: "性能", impact: "发电量下降" },
  { id: 4, time: "12:15:38", level: "紧急", device: "变压器T2", message: "油温异常升高 (78°C)", status: "处理中", category: "温度", impact: "变压器降容运行" },
  { id: 5, time: "11:50:12", level: "重要", device: "风机WT-03", message: "振动值超标 (4.2mm/s)", status: "未处理", category: "振动", impact: "可能损坏轴承" },
  { id: 6, time: "10:32:45", level: "一般", device: "配电柜CB-08", message: "断路器跳闸计数异常", status: "已处理", category: "电气", impact: "需检查触点" },
  { id: 7, time: "09:15:30", level: "一般", device: "光伏汇流箱JB-05", message: "支路电流不均衡 (>15%)", status: "已处理", category: "电气", impact: "部分组件异常" },
  { id: 8, time: "08:42:18", level: "重要", device: "储能PCS-2", message: "直流侧绝缘电阻低", status: "已处理", category: "安全", impact: "安全隐患" },
  { id: 9, time: "07:20:05", level: "一般", device: "传感器TS-22", message: "温度传感器读数跳变", status: "已处理", category: "传感器", impact: "数据不准确" },
  { id: 10, time: "06:15:48", level: "一般", device: "光伏组件PV-B08", message: "热斑检测异常", status: "已处理", category: "安全", impact: "组件寿命下降" },
];

const alertStats = [
  { name: "紧急", value: 2, color: "#ef4444" },
  { name: "重要", value: 3, color: "#f59e0b" },
  { name: "一般", value: 8, color: "#06b6d4" },
];

const categoryStats = [
  { name: "温度", value: 3, color: "#ef4444" },
  { name: "电气", value: 3, color: "#f59e0b" },
  { name: "通信", value: 2, color: "#06b6d4" },
  { name: "安全", value: 2, color: "#8b5cf6" },
  { name: "性能", value: 2, color: "#22c55e" },
  { name: "其他", value: 1, color: "#64748b" },
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
  resolved: Math.floor(6 + Math.random() * 12 - i * 0.15),
}));

const hourlyAlerts = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  count: Math.floor(Math.random() * 5 + (i > 8 && i < 18 ? 3 : 0)),
}));

const responseMetrics = [
  { metric: "平均响应时间", value: "12分钟", target: "15分钟", status: "达标" },
  { metric: "平均处理时间", value: "45分钟", target: "60分钟", status: "达标" },
  { metric: "一次解决率", value: "82%", target: "80%", status: "达标" },
  { metric: "重复告警率", value: "8%", target: "5%", status: "未达标" },
  { metric: "误报率", value: "3.2%", target: "5%", status: "达标" },
  { metric: "升级处理率", value: "12%", target: "15%", status: "达标" },
];

const tooltipStyle = { background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" };

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="今日告警" value="13" unit="条" icon={<Bell className="w-5 h-5" />} color="text-energy-orange" />
        <StatCard label="紧急告警" value="2" unit="条" icon={<XCircle className="w-5 h-5" />} color="text-energy-red" />
        <StatCard label="已处理" value="6" unit="条" icon={<CheckCircle className="w-5 h-5" />} color="text-energy-green" />
        <StatCard label="平均响应" value="12" unit="分钟" trend={-15.3} icon={<Clock className="w-5 h-5" />} color="text-primary" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="本月告警" value="186" unit="条" trend={-8.5} icon={<AlertTriangle className="w-5 h-5" />} color="text-energy-yellow" />
        <StatCard label="处理率" value="94.2" unit="%" trend={2.1} icon={<Shield className="w-5 h-5" />} color="text-energy-cyan" />
        <StatCard label="重复告警" value="15" unit="条" trend={-3.5} icon={<TrendingDown className="w-5 h-5" />} color="text-energy-purple" />
        <StatCard label="值班人员" value="3" unit="人" icon={<Users className="w-5 h-5" />} color="text-energy-blue" />
      </div>

      {/* Alert list */}
      <GlassCard glow="orange">
        <h3 className="text-sm font-semibold text-foreground mb-4">🔔 实时告警列表</h3>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg text-xs transition-all hover:scale-[1.003] ${
                alert.level === "紧急" ? "bg-energy-red/10 border border-energy-red/20" :
                alert.level === "重要" ? "bg-energy-orange/10 border border-energy-orange/20" :
                "bg-muted/20 border border-border/30"
              }`}
            >
              <div className="flex items-center gap-3">
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
              <div className="ml-5 mt-1 text-[10px] text-muted-foreground">
                影响: {alert.impact}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <GlassCard glow="cyan">
          <h3 className="text-sm font-semibold text-foreground mb-4">告警级别分布</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={alertStats} cx="50%" cy="50%" innerRadius={40} outerRadius={75} paddingAngle={4} dataKey="value" stroke="none">
                {alertStats.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">告警类型分布</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryStats} cx="50%" cy="50%" innerRadius={40} outerRadius={75} paddingAngle={3} dataKey="value" stroke="none">
                {categoryStats.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 10, color: "#94a3b8" }} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="blue">
          <h3 className="text-sm font-semibold text-foreground mb-4">本周告警趋势</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyAlerts} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="day" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={9} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="urgent" stackId="a" fill="#ef4444" name="紧急" />
              <Bar dataKey="important" stackId="a" fill="#f59e0b" name="重要" />
              <Bar dataKey="normal" stackId="a" fill="#06b6d4" radius={[3, 3, 0, 0]} name="一般" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="orange">
          <h3 className="text-sm font-semibold text-foreground mb-4">今日时段分布</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hourlyAlerts}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="hour" stroke="hsl(215 15% 45%)" fontSize={8} tickLine={false} interval={3} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={9} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="#f59e0b" radius={[2, 2, 0, 0]} name="告警数" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard glow="green">
          <h3 className="text-sm font-semibold text-foreground mb-4">📈 30天告警与处理趋势</h3>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={trendData}>
              <defs>
                <linearGradient id="gradAlertCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="date" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Area type="monotone" dataKey="count" stroke="#f59e0b" fill="url(#gradAlertCount)" strokeWidth={2} name="告警数" />
              <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={2} name="已处理" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="blue">
          <h3 className="text-sm font-semibold text-foreground mb-4">📋 告警响应指标</h3>
          <div className="space-y-2.5">
            {responseMetrics.map((rm) => (
              <div key={rm.metric} className="flex items-center justify-between p-2.5 rounded-md bg-muted/20 text-xs">
                <span className="text-foreground font-medium flex-1">{rm.metric}</span>
                <span className="stat-value text-primary w-20 text-right">{rm.value}</span>
                <span className="text-muted-foreground w-20 text-right">目标: {rm.target}</span>
                <span className={`ml-3 px-2 py-0.5 rounded-full text-[10px] ${rm.status === "达标" ? "bg-energy-green/15 text-energy-green" : "bg-energy-red/15 text-energy-red"}`}>{rm.status}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
