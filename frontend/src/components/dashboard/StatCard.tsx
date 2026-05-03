import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bg: string;
  onClick: () => void;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  bg,
  onClick,
}: StatCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 group cursor-pointer"
    >
      <div
        className={`p-3 rounded-xl inline-block mb-4 ${bg} group-hover:scale-110 transition-transform`}
      >
        <Icon size={24} className={color} />
      </div>
      <h2 className="text-[10px] font-semibold text-gray-300 uppercase tracking-[0.3em] mb-1">
        {title}
      </h2>
      <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
    </div>
  );
};
