import { motion } from "framer-motion";
import { CheckCircle, Image as ImageIcon } from "lucide-react";
import type { Complaint } from "../../types";
import { StatusPill } from "../shared/StatusPill";

interface StudentComplaintItemProps {
  complaint: Complaint;
}

export const StudentComplaintItem = ({
  complaint,
}: StudentComplaintItemProps) => {
  return (
    <motion.div
      layout
      className="group p-6 sm:p-8 bg-gray-50/30 hover:bg-white rounded-2xl border border-transparent hover:border-indigo-50 hover:shadow-xl transition-all duration-500"
    >
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 sm:gap-6 mb-6">
        <div className="max-w-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
              {complaint.title}
            </h3>
            <div className="hidden sm:block h-1 w-1 bg-gray-300 rounded-full"></div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
              {complaint.subject}
            </span>
          </div>
          <p className="text-gray-500 font-normal leading-relaxed text-xs sm:text-sm">
            {complaint.description}
          </p>
        </div>
        <div className="self-start flex items-center gap-3">
          <StatusPill status={complaint.status} />
        </div>
      </div>
      {complaint.imageUrl && (
        <div className="mb-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <ImageIcon size={12} /> Supporting Evidence
          </p>
          <div className="relative rounded-2xl overflow-hidden border border-gray-100 max-w-sm">
            <img
              src={complaint.imageUrl || undefined}
              alt="Evidence"
              className="w-full h-auto object-cover max-h-64"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>
      )}
      {complaint.response && (
        <div className="mt-8 pt-8 border-t border-gray-100 flex gap-4 sm:gap-6">
          <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle size={20} className="sm:size-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1.5">
              Authority Resolution
            </p>
            <p className="text-gray-600 italic leading-relaxed font-normal text-xs sm:text-sm">
              "{complaint.response}"
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
