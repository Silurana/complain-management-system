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
      
      {/* Audit Trail Timeline */}
      {complaint.history && complaint.history.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Audit Trail</p>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-1.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {complaint.history.map((log, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-3 h-3 rounded-full border border-white bg-indigo-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-[2px] md:ml-0 z-10"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl border border-gray-100 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <time className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">{new Date(log.timestamp).toLocaleString()}</time>
                  </div>
                  <div className="text-xs text-gray-600">{log.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
