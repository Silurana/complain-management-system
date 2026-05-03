import { Edit, Image as ImageIcon, Trash2 } from "lucide-react";
import type { Complaint } from "../../types";
import { StatusPill } from "../shared/StatusPill";

interface ComplaintItemProps {
  complaint: Complaint;
  onEdit: (complaint: Complaint) => void;
  onDelete?: (id: string) => void;
}

export const ComplaintItem = ({
  complaint,
  onEdit,
  onDelete,
}: ComplaintItemProps) => {
  return (
    <div className="group p-6 sm:p-8 bg-gray-50/30 hover:bg-white rounded-2xl border border-transparent hover:border-indigo-50 hover:shadow-xl transition-all duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 sm:gap-6">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
              {complaint.title}
            </h3>
            <div className="hidden sm:block h-1 w-1 bg-gray-300 rounded-full"></div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
              {complaint.subject}
            </span>
          </div>
          <p className="text-gray-500 font-normal leading-relaxed text-xs sm:text-sm mb-4">
            {complaint.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              {complaint.user?.fullName || "Anonymous"}
            </div>
            <span>•</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          {complaint.imageUrl && (
            <div className="mt-4">
              <a
                href={complaint.imageUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-100 transition-all"
              >
                <ImageIcon size={14} /> View Evidence
              </a>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-4">
          <StatusPill status={complaint.status} />
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
            <button
              onClick={() => onEdit(complaint)}
              className="p-2 bg-white border border-gray-100 rounded-lg text-gray-400 hover:text-indigo-600 hover:border-indigo-100 transition-all"
              title="Edit/Respond"
            >
              <Edit size={16} />
            </button>
            {onDelete &&
              (complaint.status === "Resolved" ||
                complaint.status === "Rejected") && (
                <button
                  onClick={() => onDelete(complaint.id)}
                  className="p-2 bg-white border border-gray-100 rounded-lg text-gray-400 hover:text-rose-600 hover:border-rose-100 transition-all"
                  title="Delete Record"
                >
                  <Trash2 size={16} />
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
