import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  overlayColor?: string;
}

export const Modal = ({
  open,
  onClose,
  children,
  title,
  overlayColor = "bg-rose-900/10",
}: ModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 ${overlayColor} backdrop-blur-sm z-50`}
            onClick={onClose}
          ></motion.div>
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] shadow-2xl w-full max-w-lg pointer-events-auto relative overflow-hidden border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  {title}
                </h2>
                <button
                  className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-colors"
                  onClick={onClose}
                >
                  <X size={20} />
                </button>
              </div>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
