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
    </motion.div>
  );
};
