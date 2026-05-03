import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  LayoutDashboard,
  FileText,
  PlusCircle,
  User,
  LogOut,
} from "lucide-react";
import API_BASE_URL from "../../apiConfig";

interface StudentSidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  view: string;
  handleViewChange: (view: "dashboard" | "all-issues" | "raise-issue" | "profile") => void;
}

export const StudentSidebar = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  view,
  handleViewChange,
}: StudentSidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Monitor", icon: LayoutDashboard },
    { id: "all-issues", label: "Issues", icon: FileText },
    { id: "raise-issue", label: "Submit", icon: PlusCircle },
    { id: "profile", label: "Identity", icon: User },
  ];

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 w-80 bg-white border-r border-gray-100 flex flex-col z-[60] transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="p-8 lg:p-10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <img
                src="https://www.campussync.in/img/logo.png"
                alt=""
                className="w-full h-15"
              />
            </div>
            <button
              className="lg:hidden p-2 text-gray-400 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((v) => (
              <button
                key={v.id}
                onClick={() => handleViewChange(v.id as "dashboard" | "all-issues" | "raise-issue" | "profile")}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                  view === v.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                    : "text-gray-400 hover:bg-gray-50 hover:text-indigo-600"
                }`}
              >
                <v.icon
                  size={18}
                  className={view === v.id ? "text-white" : "text-gray-400"}
                />
                {v.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-10">
            <button
              onClick={() => {
                if (!window.confirm("Terminate portal session?")) return;
                fetch(`${API_BASE_URL}/user/logout`, { credentials: "include" });
                window.location.href = "/";
              }}
              className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl font-semibold text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 border border-transparent hover:border-rose-100"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
