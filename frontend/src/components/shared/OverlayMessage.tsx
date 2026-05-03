import { motion, AnimatePresence } from "framer-motion";

interface OverlayMessageProps {
  message: string | null;
  color?: string;
}

export const OverlayMessage = ({
  message,
  color = "bg-rose-500",
}: OverlayMessageProps) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] bg-gray-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
        >
          <div className={`w-2 h-2 ${color} rounded-full animate-pulse`}></div>
          <span className="font-bold text-sm tracking-wide">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
