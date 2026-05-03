import { motion, AnimatePresence } from "framer-motion";

interface LoaderOverlayProps {
  show: boolean;
  message?: string;
  colorClass?: string;
  bgClass?: string;
  textColorClass?: string;
}

export const LoaderOverlay = ({
  show,
  message = "Syncing experience...",
  colorClass = "border-rose-600",
  bgClass = "border-rose-100",
  textColorClass = "text-rose-900",
}: LoaderOverlayProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-md"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
              <div
                className={`absolute inset-0 border-4 ${bgClass} rounded-full`}
              ></div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className={`absolute inset-0 border-4 ${colorClass} rounded-full border-t-transparent`}
              ></motion.div>
            </div>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`mt-6 text-lg font-medium ${textColorClass}`}
            >
              {message}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
