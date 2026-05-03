import React from "react";
import { UserPlus, CheckCircle, Clock, XCircle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
import type { Stats, Complaint, UserProfile } from "../../types";

interface AdminOverviewProps {
  stats: Stats;
  users: UserProfile[];
  complaints: Complaint[];
  handleViewChange: (view: "dashboard" | "complaints" | "users" | "profile") => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  stats,
  users,
  complaints,
  handleViewChange,
}) => {
  return (
    <div className="space-y-8">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "TOTAL STUDENTS", value: users.length, icon: UserPlus, color: "text-indigo-600", bg: "bg-white" },
          { label: "RESOLVED TOTAL", value: stats.resolved, icon: CheckCircle, color: "text-white", bg: "bg-emerald-500", highlight: true },
          { label: "PENDING REPORTS", value: stats.pending, icon: Clock, color: "text-rose-500", bg: "bg-white" },
          { label: "REJECTED TOTAL", value: stats.rejected, icon: XCircle, color: "text-blue-500", bg: "bg-white" },
        ].map((item, idx) => (
          <div key={idx} className={`${item.bg} p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.highlight ? "bg-white/20" : "bg-gray-50"}`}>
                <item.icon className={`${item.highlight ? "text-white" : item.color} w-6 h-6`} />
              </div>
              <div>
                <p className={`text-2xl font-black ${item.highlight ? "text-white" : "text-gray-900"}`}>{item.value.toString().padStart(2, '0')}</p>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${item.highlight ? "text-white/80" : "text-gray-400"}`}>{item.label}</p>
              </div>
            </div>
            <button className={`${item.highlight ? "text-white/40" : "text-gray-300"} hover:text-gray-900`}>•••</button>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Line Chart - Dynamic Time Series */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Total Complaints Report</h3>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last 30 Days</span>
              <button className="text-gray-300">•••</button>
            </div>
          </div>
          <div className="h-[300px] w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <AreaChart data={stats.timeSeriesStats || []}>
                <defs>
                  <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#9ca3af", fontSize: 10 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#9ca3af", fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="complaints" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorComplaints)" 
                  dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart - Dynamic Categories */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Complaints by Category</h3>
            <button className="text-gray-300">•••</button>
          </div>
          <div className="h-[300px] w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={stats.categoryStats || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 10 }} />
                <Tooltip cursor={{ fill: "#f9fafb" }} />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart - Dynamic Status */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Status Distribution</h3>
            <button className="text-gray-300">•••</button>
          </div>
          <div className="h-[250px] w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Resolved", value: stats.resolved },
                    { name: "Pending", value: stats.pending + stats.in_progress },
                    { name: "Rejected", value: stats.rejected },
                  ]}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={0}
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#1a1a2e" />
                  <Cell fill="#f43f5e" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Resolved {Math.round((stats.resolved / (stats.total || 1)) * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1a1a2e]" />
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Pending {Math.round(((stats.pending + stats.in_progress) / (stats.total || 1)) * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Rejected {Math.round((stats.rejected / (stats.total || 1)) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Critical Reports Section */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Critical Reports</h2>
            <button
              onClick={() => handleViewChange("complaints")}
              className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline"
            >
              View All
            </button>
          </div>
          {complaints.length === 0 ? (
            <p className="text-center py-10 text-gray-300 italic font-light">No pending reports.</p>
          ) : (
            <div className="space-y-4">
              {complaints.slice(0, 3).map((c) => (
                <div key={c.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-transparent hover:border-indigo-50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-600 font-bold italic">
                      {c.title.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{c.title}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{c.subject}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[9px] font-bold text-gray-500 uppercase">
                    {c.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Radar Chart - Dynamic Weekly Distribution */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Weekly Complaints</h3>
            <button className="text-gray-300">•••</button>
          </div>
          <div className="h-[250px] w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats.weeklyStats || []}>
                <PolarGrid stroke="#f3f4f6" />
                <PolarAngleAxis dataKey="day" tick={{ fill: "#9ca3af", fontSize: 10 }} />
                <Radar
                  name="Complaints"
                  dataKey="value"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
