import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { Settings2, CheckCircle, AlertTriangle, XCircle, Wrench, Clock, Cpu } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const statusData = [
  { name: "正常运行", value: 256, color: "#22c55e" },
  { name: "预警", value: 18, color: "#f59e0b" },
  { name: "故障", value: 5, color: "#ef4444" },
  { name: "维护中", value: 12, color: "#8b5cf6" },
];

const categoryData = [
  { category: "光伏组件", total: 120, online: 118, fault: 2 },
  { category: "逆变器", total: 24, online: 23, fault: 1 },
  { category: "风力机组", total: 8, online: 8, fault: 0 },
  { category: "储能电池", total: 48, online: 46, fault: 2 },
  { category: "变压器", total: 6, online: 6, fault: 0 },
  { category: "配电柜", total: 32, online: 32, fault: 0 },
  { category: "传感器", total: 45, online: 42, fault: 3 },
  { category: "控制器", total: 8, online: 8, fault: 0 },
];

const maintenanceLog = [
  { id: "WO-2024-089", device: "逆变器INV-003", type: "计划维护", status: "进行中", priority: "中", assignee: "张工", date: "2024-03-25" },
  { id: "WO-2024-088", device: "储能柜BMS-E", type: "故障维修", status: "待处理", priority: "高", assignee: "李工", date: "2024-03-25" },
  { id: "WO-2024-087", device: "光伏组件PV-12", type: "定期巡检", status: "已完成", priority: "低", assignee: "王工", date: "2024-03-24" },
  { id: "WO-2024-086", device: "风机WT-02轴承", type: "预防维护", status: "已完成", priority: "中", assignee: "赵工", date: "2024-03-24" },
  { id: "WO-2024-085", device: "变压器T1", type: "定期巡检", status: "已完成", priority: "低", assignee: "张工", date: "2024-03-23" },
];

const mtbfData = categoryData.map(c => ({ category: c.category, mtbf: Math.floor(500 + Math.random() * 1500) }));

export default function EquipmentPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="设备总数" value="291" unit="台" icon={<Settings2 className="w-5 h-5" />} color="text-primary" />
        <StatCard label="在线运行" value="283" unit="台" icon={<CheckCircle className="w-5 h-5" />} color="text-energy-green" />
        <StatCard label="故障设备" value="5" unit="台" icon={<XCircle className="w-5 h-5" />} color="text-energy-red" />
        <StatCard label="维护工单" value="8" unit="项" icon={<Wrench className="w-5 h-5" />} color="text-energy-orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard glow="green">
          <h3 className="text-sm font-semibold text-foreground mb-4">设备状态分布</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
                {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="lg:col-span-2" glow="cyan">
          <h3 className="text-sm font-semibold text-foreground mb-4">设备分类统计</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground">
                  <th className="text-left py-2 px-3">设备类型</th>
                  <th className="text-right py-2 px-3">总数</th>
                  <th className="text-right py-2 px-3">在线</th>
                  <th className="text-right py-2 px-3">故障</th>
                  <th className="text-right py-2 px-3">可用率</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((c) => (
                  <tr key={c.category} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="py-2 px-3 text-foreground font-medium">{c.category}</td>
                    <td className="text-right py-2 px-3 text-muted-foreground">{c.total}</td>
                    <td className="text-right py-2 px-3 text-energy-green">{c.online}</td>
                    <td className="text-right py-2 px-3 text-energy-red">{c.fault}</td>
                    <td className="text-right py-2 px-3">
                      <span className="stat-value text-energy-cyan">{((c.online / c.total) * 100).toFixed(1)}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">平均故障间隔(MTBF)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={mtbfData} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis type="number" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis type="category" dataKey="category" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} width={70} />
              <Tooltip contentStyle={{ background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" }} />
              <Bar dataKey="mtbf" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="MTBF(h)" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="orange">
          <h3 className="text-sm font-semibold text-foreground mb-4">维护工单</h3>
          <div className="space-y-2">
            {maintenanceLog.map((wo) => (
              <div key={wo.id} className="flex items-center gap-3 p-2.5 rounded-md bg-muted/20 text-xs hover:bg-muted/30 transition-colors">
                <span className="font-mono text-muted-foreground w-24">{wo.id}</span>
                <span className="text-foreground flex-1 truncate">{wo.device}</span>
                <span className={`px-2 py-0.5 rounded-full ${
                  wo.status === "进行中" ? "bg-energy-cyan/15 text-energy-cyan" :
                  wo.status === "待处理" ? "bg-energy-orange/15 text-energy-orange" :
                  "bg-energy-green/15 text-energy-green"
                }`}>{wo.status}</span>
                <span className={`text-[10px] ${wo.priority === "高" ? "text-energy-red" : wo.priority === "中" ? "text-energy-yellow" : "text-muted-foreground"}`}>{wo.priority}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
