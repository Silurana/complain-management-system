import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  LayoutDashboard,
  FileText,
  User,
  Edit,
  LogOut,
} from "lucide-react";
import API_BASE_URL from "../../apiConfig";

interface AdminSidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
  view: string;
  handleViewChange: (v: "dashboard" | "complaints" | "users" | "profile") => void;
}

export const AdminSidebar = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  view,
  handleViewChange,
}: AdminSidebarProps) => {
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
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "complaints", label: "Complaints", icon: FileText },
              { id: "users", label: "Students", icon: User },
              { id: "profile", label: "Admin", icon: Edit },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => handleViewChange(v.id as "dashboard" | "complaints" | "users" | "profile")}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                  view === v.id
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-100"
                    : "text-gray-400 hover:bg-gray-50 hover:text-rose-600"
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
