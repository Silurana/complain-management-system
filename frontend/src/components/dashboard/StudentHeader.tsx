import { Menu, ChevronRight } from "lucide-react";
import type { UserProfile } from "../../types";

interface StudentHeaderProps {
  setIsMobileMenuOpen: (open: boolean) => void;
  view: string;
  profile: UserProfile;
}

export const StudentHeader = ({
  setIsMobileMenuOpen,
  view,
  profile,
}: StudentHeaderProps) => {



  return (
    <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Navigation
          </span>
          <ChevronRight size={14} className="hidden sm:block text-gray-300" />
          <span className="text-sm font-bold text-gray-900 capitalize tracking-tight">
            {view.replace("-", " ")}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">

        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gray-900 leading-none mb-1">
            {profile.fullName || "Student Hub"}
          </p>
          <p className="text-[10px] font-semibold text-indigo-500 uppercase tracking-[0.2em] leading-none">
            Registered Student
          </p>
        </div>
        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-900 rounded-lg lg:rounded-xl flex items-center justify-center text-white text-xs lg:text-sm font-bold shadow-lg">
          {profile.fullName?.charAt(0) || "S"}
        </div>
      </div>
    </header>
  );
};
