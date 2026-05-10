import { motion } from "framer-motion";

export const StatSkeleton = () => (
  <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-100 shadow-sm animate-pulse">
    <div className="w-12 h-12 bg-gray-200 rounded-2xl mb-6"></div>
    <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
    <div className="w-16 h-8 bg-gray-200 rounded"></div>
  </div>
);

export const ComplaintSkeleton = () => (
  <div className="p-6 sm:p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm animate-pulse flex flex-col md:flex-row justify-between md:items-start gap-4">
    <div className="flex-1 space-y-4">
      <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
      <div className="w-full h-4 bg-gray-200 rounded"></div>
      <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
      <div className="w-1/4 h-4 bg-gray-200 rounded mt-4"></div>
    </div>
    <div className="w-24 h-8 bg-gray-200 rounded-full shrink-0"></div>
  </div>
);

export const DashboardSkeleton = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {[...Array(5)].map((_, i) => <StatSkeleton key={i} />)}
      </div>
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm animate-pulse">
        <div className="w-48 h-8 bg-gray-200 rounded mb-8"></div>
        <div className="w-full h-64 bg-gray-100 rounded-2xl"></div>
      </div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => <ComplaintSkeleton key={i} />)}
      </div>
    </motion.div>
  );
};
