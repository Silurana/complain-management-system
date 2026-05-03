import React from "react";
import { ComplaintItem } from "./ComplaintItem";
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
  const filteredComplaints = complaints.filter(
    (c) =>
      complaintStatusFilter === "All" || c.status === complaintStatusFilter
  );

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
      <div className="p-8 sm:p-12 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-gray-50/30">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Incident Log
          </h2>
          <p className="text-gray-400 font-normal mt-2 text-sm">
            Comprehensive registry of all reported discrepancies.
          </p>
        </div>
        <div className="flex items-center bg-white p-2 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {["All", "Pending", "In Progress", "Resolved", "Rejected"].map((opt) => (
            <button
              key={opt}
              onClick={() => setComplaintStatusFilter(opt)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                complaintStatusFilter === opt
                  ? "bg-gray-900 text-white shadow-lg"
                  : "text-gray-400 hover:text-gray-900"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 sm:p-12">
        {filteredComplaints.length === 0 ? (
          <div className="py-32 text-center opacity-20 italic text-3xl font-light tracking-tighter">
            Registry segment clear.
          </div>
        ) : (
          <div className="grid gap-8">
            {filteredComplaints.map((c) => (
              <ComplaintItem
                key={c.id}
                complaint={c}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
