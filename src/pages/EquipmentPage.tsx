import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { Settings2, CheckCircle, XCircle, Wrench, Clock, Activity, Thermometer, Shield } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ComposedChart } from "recharts";

const statusData = [
  { name: "正常运行", value: 256, color: "#22c55e" },
  { name: "预警", value: 18, color: "#f59e0b" },
  { name: "故障", value: 5, color: "#ef4444" },
  { name: "维护中", value: 12, color: "#8b5cf6" },
];

const categoryData = [
  { category: "光伏组件", total: 120, online: 118, fault: 2, age: 3.2, nextMaint: "4月15日" },
  { category: "逆变器", total: 24, online: 23, fault: 1, age: 2.8, nextMaint: "4月20日" },
  { category: "风力机组", total: 8, online: 8, fault: 0, age: 4.1, nextMaint: "5月01日" },
  { category: "储能电池", total: 48, online: 46, fault: 2, age: 1.5, nextMaint: "4月10日" },
  { category: "变压器", total: 6, online: 6, fault: 0, age: 5.3, nextMaint: "6月01日" },
  { category: "配电柜", total: 32, online: 32, fault: 0, age: 4.8, nextMaint: "5月15日" },
  { category: "传感器", total: 45, online: 42, fault: 3, age: 2.1, nextMaint: "4月05日" },
  { category: "控制器", total: 8, online: 8, fault: 0, age: 2.0, nextMaint: "4月25日" },
];

const maintenanceLog = [
  { id: "WO-2024-089", device: "逆变器INV-003", type: "计划维护", status: "进行中", priority: "中", assignee: "张工", date: "2024-03-25", est: "4h" },
  { id: "WO-2024-088", device: "储能柜BMS-E", type: "故障维修", status: "待处理", priority: "高", assignee: "李工", date: "2024-03-25", est: "6h" },
  { id: "WO-2024-087", device: "光伏组件PV-12", type: "定期巡检", status: "已完成", priority: "低", assignee: "王工", date: "2024-03-24", est: "2h" },
  { id: "WO-2024-086", device: "风机WT-02轴承", type: "预防维护", status: "已完成", priority: "中", assignee: "赵工", date: "2024-03-24", est: "8h" },
  { id: "WO-2024-085", device: "变压器T1", type: "定期巡检", status: "已完成", priority: "低", assignee: "张工", date: "2024-03-23", est: "3h" },
  { id: "WO-2024-084", device: "传感器TS-15", type: "故障更换", status: "已完成", priority: "高", assignee: "李工", date: "2024-03-23", est: "1h" },
  { id: "WO-2024-083", device: "配电柜CB-05", type: "定期巡检", status: "已完成", priority: "低", assignee: "王工", date: "2024-03-22", est: "2h" },
];

const mtbfData = categoryData.map(c => ({ category: c.category, mtbf: Math.floor(500 + Math.random() * 1500) }));

const faultTrend = Array.from({ length: 12 }, (_, i) => ({
  month: `${i + 1}月`,
  faults: Math.floor(3 + Math.random() * 8),
  downtime: Math.floor(10 + Math.random() * 30),
}));

const spareparts = [
  { name: "逆变器IGBT模块", stock: 12, min: 5, unit: "个", cost: 3500 },
  { name: "光伏接线端子", stock: 150, min: 100, unit: "个", cost: 15 },
  { name: "风机齿轮油", stock: 8, min: 10, unit: "桶", cost: 450 },
  { name: "储能BMS板卡", stock: 6, min: 3, unit: "块", cost: 2800 },
  { name: "温度传感器", stock: 25, min: 20, unit: "个", cost: 120 },
  { name: "断路器", stock: 4, min: 5, unit: "台", cost: 1850 },
];

const deviceAge = [
  { range: "0-2年", count: 120, color: "#22c55e" },
  { range: "2-4年", count: 98, color: "#06b6d4" },
  { range: "4-6年", count: 58, color: "#f59e0b" },
  { range: "6年以上", count: 15, color: "#ef4444" },
];

const tooltipStyle = { background: "hsl(215 30% 10%)", border: "1px solid hsl(215 20% 22%)", borderRadius: 8, color: "#e2e8f0" };

export default function EquipmentPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="设备总数" value="291" unit="台" icon={<Settings2 className="w-5 h-5" />} color="text-primary" />
        <StatCard label="在线运行" value="283" unit="台" icon={<CheckCircle className="w-5 h-5" />} color="text-energy-green" />
        <StatCard label="故障设备" value="5" unit="台" icon={<XCircle className="w-5 h-5" />} color="text-energy-red" />
        <StatCard label="维护工单" value="8" unit="项" icon={<Wrench className="w-5 h-5" />} color="text-energy-orange" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="设备可用率" value="97.2" unit="%" trend={0.8} icon={<Activity className="w-5 h-5" />} color="text-energy-cyan" />
        <StatCard label="平均运行时长" value="4,280" unit="h" icon={<Clock className="w-5 h-5" />} color="text-energy-blue" />
        <StatCard label="本月故障" value="3" unit="次" trend={-2} icon={<Shield className="w-5 h-5" />} color="text-energy-purple" />
        <StatCard label="平均设备龄" value="3.1" unit="年" icon={<Thermometer className="w-5 h-5" />} color="text-energy-yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard glow="green">
          <h3 className="text-sm font-semibold text-foreground mb-4">设备状态分布</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
                {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="cyan">
          <h3 className="text-sm font-semibold text-foreground mb-4">设备年龄分布</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={deviceAge} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="count" stroke="none">
                {deviceAge.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} formatter={(v, e) => `${(e.payload as any).range}`} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">故障与停机趋势</h3>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={faultTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis dataKey="month" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis yAxisId="faults" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis yAxisId="downtime" orientation="right" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Bar yAxisId="faults" dataKey="faults" fill="#ef4444" opacity={0.7} radius={[3, 3, 0, 0]} name="故障次数" />
              <Line yAxisId="downtime" type="monotone" dataKey="downtime" stroke="#f59e0b" strokeWidth={2} name="停机(h)" dot={{ r: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Equipment table */}
      <GlassCard glow="cyan">
        <h3 className="text-sm font-semibold text-foreground mb-4">📋 设备分类统计</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="text-left py-2 px-3">设备类型</th>
                <th className="text-right py-2 px-3">总数</th>
                <th className="text-right py-2 px-3">在线</th>
                <th className="text-right py-2 px-3">故障</th>
                <th className="text-right py-2 px-3">可用率</th>
                <th className="text-right py-2 px-3">平均年龄</th>
                <th className="text-left py-2 px-3">下次维护</th>
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
                  <td className="text-right py-2 px-3 text-muted-foreground">{c.age}年</td>
                  <td className="py-2 px-3 text-muted-foreground">{c.nextMaint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard glow="purple">
          <h3 className="text-sm font-semibold text-foreground mb-4">📊 平均故障间隔(MTBF)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={mtbfData} layout="vertical" barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 20% 18%)" />
              <XAxis type="number" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} />
              <YAxis type="category" dataKey="category" stroke="hsl(215 15% 45%)" fontSize={10} tickLine={false} width={70} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="mtbf" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="MTBF(h)" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard glow="blue">
          <h3 className="text-sm font-semibold text-foreground mb-4">🔧 备品备件库存</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground">
                  <th className="text-left py-2 px-3">备件名称</th>
                  <th className="text-right py-2 px-3">库存</th>
                  <th className="text-right py-2 px-3">安全库存</th>
                  <th className="text-right py-2 px-3">单价(元)</th>
                  <th className="text-center py-2 px-3">状态</th>
                </tr>
              </thead>
              <tbody>
                {spareparts.map((sp) => (
                  <tr key={sp.name} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="py-2 px-3 text-foreground">{sp.name}</td>
                    <td className="text-right py-2 px-3 stat-value text-primary">{sp.stock}{sp.unit}</td>
                    <td className="text-right py-2 px-3 text-muted-foreground">{sp.min}{sp.unit}</td>
                    <td className="text-right py-2 px-3 text-muted-foreground">¥{sp.cost.toLocaleString()}</td>
                    <td className="text-center py-2 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${sp.stock >= sp.min ? "bg-energy-green/15 text-energy-green" : "bg-energy-red/15 text-energy-red"}`}>
                        {sp.stock >= sp.min ? "充足" : "不足"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {/* Maintenance work orders */}
      <GlassCard glow="orange">
        <h3 className="text-sm font-semibold text-foreground mb-4">🔧 维护工单管理</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="text-left py-2 px-3">工单号</th>
                <th className="text-left py-2 px-3">设备</th>
                <th className="text-left py-2 px-3">类型</th>
                <th className="text-center py-2 px-3">状态</th>
                <th className="text-center py-2 px-3">优先级</th>
                <th className="text-left py-2 px-3">负责人</th>
                <th className="text-left py-2 px-3">日期</th>
                <th className="text-right py-2 px-3">预计工时</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceLog.map((wo) => (
                <tr key={wo.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-2 px-3 font-mono text-muted-foreground">{wo.id}</td>
                  <td className="py-2 px-3 text-foreground font-medium">{wo.device}</td>
                  <td className="py-2 px-3 text-muted-foreground">{wo.type}</td>
                  <td className="text-center py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      wo.status === "进行中" ? "bg-energy-cyan/15 text-energy-cyan" :
                      wo.status === "待处理" ? "bg-energy-orange/15 text-energy-orange" :
                      "bg-energy-green/15 text-energy-green"
                    }`}>{wo.status}</span>
                  </td>
                  <td className="text-center py-2 px-3">
                    <span className={`text-[10px] ${wo.priority === "高" ? "text-energy-red" : wo.priority === "中" ? "text-energy-yellow" : "text-muted-foreground"}`}>● {wo.priority}</span>
                  </td>
                  <td className="py-2 px-3 text-muted-foreground">{wo.assignee}</td>
                  <td className="py-2 px-3 text-muted-foreground">{wo.date}</td>
                  <td className="text-right py-2 px-3 text-muted-foreground">{wo.est}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
