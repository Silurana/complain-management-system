import type { AdminProfile } from "../../types";

interface AdminProfileViewProps {
  profile: AdminProfile;
  onEditProfile: () => void;
  onChangePassword: () => void;
}

export const AdminProfileView = ({
  profile,
  onEditProfile,
  onChangePassword,
}: AdminProfileViewProps) => {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
        Administrative Profile
      </h1>
      <p className="text-gray-400 font-normal mb-8 text-sm">
        Official credentials and system access.
      </p>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 sm:p-8 border-b border-gray-50 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
          <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 border border-gray-100 font-bold text-xl shadow-sm">
            {profile.fullName?.charAt(0) || "A"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 leading-none mb-2 sm:mb-1">
              {profile.fullName}
            </h2>
            <p className="text-[10px] sm:text-xs font-semibold text-indigo-500 uppercase tracking-widest">
              System Administrator Account
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:grid sm:grid-cols-3 sm:items-center gap-1 sm:gap-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Full Name
            </span>
            <span className="sm:col-span-2 text-sm font-medium text-gray-900">
              {profile.fullName}
            </span>
          </div>
          <div className="flex flex-col sm:grid sm:grid-cols-3 sm:items-center gap-1 sm:gap-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Email Address
            </span>
            <span className="sm:col-span-2 text-sm font-medium text-gray-900 break-all">
              {profile.email}
            </span>
          </div>
          <div className="flex flex-col sm:grid sm:grid-cols-3 sm:items-center gap-1 sm:gap-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Service ID
            </span>
            <span className="sm:col-span-2 text-sm font-medium text-gray-900">
              {profile.regNo}
            </span>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50/50 flex items-center gap-4">
          <button
            onClick={onEditProfile}
            className="flex-1 bg-white border border-gray-200 text-gray-900 h-10 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors shadow-sm"
          >
            Edit Profile
          </button>
          <button
            onClick={onChangePassword}
            className="flex-1 bg-indigo-600 text-white h-10 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-100"
          >
            Access Security
          </button>
        </div>
      </div>
    </div>
  );
};
