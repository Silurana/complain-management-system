import { Clock, CheckCircle, XCircle, type LucideIcon } from "lucide-react";

interface StatusPillProps {
  status: string;
}

export const StatusPill = ({ status }: StatusPillProps) => {
  const configs: Record<string, { bg: string; text: string; icon: LucideIcon }> = {
    Pending: { bg: "bg-amber-50", text: "text-amber-700", icon: Clock },
    "In Progress": { bg: "bg-blue-50", text: "text-blue-700", icon: Clock },
    Resolved: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      icon: CheckCircle,
    },
    Rejected: { bg: "bg-rose-50", text: "text-rose-700", icon: XCircle },
  };

  const config = configs[status] || configs["Pending"];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.text} border border-current/10`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
};
