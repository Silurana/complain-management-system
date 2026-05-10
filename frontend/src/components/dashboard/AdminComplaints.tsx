import React, { useState } from "react";
import { Edit, Trash2, Image as ImageIcon, Search, X, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { StatusPill } from "../shared/StatusPill";
import type { Complaint } from "../../types";

interface AdminComplaintsProps {
  complaints: Complaint[];
  complaintStatusFilter: string;
  setComplaintStatusFilter: (status: string) => void;
  onEdit: (complaint: Complaint) => void;
  onDelete: (id: string) => void;
}

export const AdminComplaints: React.FC<AdminComplaintsProps> = ({
  complaints,
  complaintStatusFilter,
  setComplaintStatusFilter,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredComplaints = complaints
    .filter(
      (c) =>
        complaintStatusFilter === "All" || c.status === complaintStatusFilter
    )
    .filter(
      (c) =>
        !searchQuery ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.user?.fullName || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
      {/* Header */}
      <div className="p-8 sm:p-12 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-gray-50/30">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <FileText className="text-indigo-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Incident Log
            </h2>
          </div>
          <p className="text-gray-400 font-normal text-sm">
            Comprehensive registry of all reported discrepancies.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-indigo-50 rounded-xl text-indigo-600 font-bold text-xs uppercase tracking-widest">
            {filteredComplaints.length} Records
          </div>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="px-8 sm:px-12 py-5 border-b border-gray-50 bg-white flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center bg-gray-50 p-1.5 rounded-xl border border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {["All", "Pending", "In Progress", "Resolved", "Rejected"].map((opt) => (
            <button
              key={opt}
              onClick={() => setComplaintStatusFilter(opt)}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                complaintStatusFilter === opt
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-md ml-auto">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
          />
          <input
            id="incident-log-search"
            type="text"
            placeholder="Search incidents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:border-indigo-200 transition-colors placeholder:text-gray-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-gray-500 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white">
              <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 w-16">
                Sl No.
              </th>
              <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                Complaint
              </th>
              <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                Department
              </th>
              <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                Filed By
              </th>
              <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                Date
              </th>
              <th className="px-6 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                Status
              </th>
              <th className="px-6 py-5 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredComplaints.map((complaint, index) => (
              <React.Fragment key={complaint.id}>
                <tr
                  className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                  onClick={() =>
                    setExpandedRow(
                      expandedRow === complaint.id ? null : complaint.id
                    )
                  }
                >
                  {/* Sl No */}
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="text-xs font-bold text-gray-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </td>

                  {/* Title */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-xs shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-indigo-100">
                        {complaint.title.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate max-w-[220px]">
                          {complaint.title}
                        </p>
                        <p className="text-[10px] text-gray-400 truncate max-w-[220px]">
                          {complaint.description.length > 60
                            ? complaint.description.slice(0, 60) + "..."
                            : complaint.description}
                        </p>
                      </div>
                      {expandedRow === complaint.id ? (
                        <ChevronUp size={14} className="text-gray-300 shrink-0" />
                      ) : (
                        <ChevronDown size={14} className="text-gray-300 shrink-0" />
                      )}
                    </div>
                  </td>

                  {/* Department */}
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                      {complaint.subject}
                    </span>
                  </td>

                  {/* Filed By */}
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-bold text-[10px]">
                        {(complaint.user?.fullName || "A").charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">
                          {complaint.user?.fullName || "Anonymous"}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {complaint.user?.email || "—"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 whitespace-nowrap text-xs text-gray-400 font-medium">
                    {complaint.createdAt
                      ? new Date(complaint.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "—"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5 whitespace-nowrap">
                    <StatusPill status={complaint.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <div
                      className="flex items-center justify-end gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onEdit(complaint)}
                        className="p-2 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        title="Edit / Respond"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(complaint.id)}
                        className="p-2 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        title="Delete Complaint"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Expanded Detail Row */}
                {expandedRow === complaint.id && (
                  <tr className="bg-gray-50/30">
                    <td colSpan={7} className="px-6 py-6">
                      <div className="pl-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Description */}
                        <div className="space-y-3">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Full Description
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed bg-white p-4 rounded-xl border border-gray-100">
                            {complaint.description}
                          </p>

                          {complaint.response && (
                            <div>
                              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">
                                Admin Response
                              </p>
                              <p className="text-sm text-indigo-700 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                                {complaint.response}
                              </p>
                            </div>
                          )}

                          {complaint.imageUrl && (
                            <a
                              href={complaint.imageUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-100 transition-all"
                            >
                              <ImageIcon size={14} /> View Evidence
                            </a>
                          )}
                        </div>

                        {/* Audit Trail */}
                        {complaint.history && complaint.history.length > 0 && (
                          <div className="space-y-3">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                              Audit Trail
                            </p>
                            <div className="space-y-2 max-h-[200px] overflow-y-auto scrollbar-hide">
                              {complaint.history.map((log, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100"
                                >
                                  <div className="w-2 h-2 mt-1.5 bg-indigo-300 rounded-full shrink-0"></div>
                                  <div className="min-w-0">
                                    <p className="text-xs text-gray-600">
                                      {log.message}
                                    </p>
                                    <time className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                                      {new Date(
                                        log.timestamp
                                      ).toLocaleString()}
                                    </time>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filteredComplaints.length === 0 && (
              <tr>
                <td colSpan={7} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
                      <FileText size={24} className="text-gray-200" />
                    </div>
                    <p className="text-gray-300 italic text-sm">
                      {searchQuery
                        ? "No incidents match your search."
                        : "No incidents in this segment."}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
