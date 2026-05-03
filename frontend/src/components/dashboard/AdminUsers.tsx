import React from "react";
import { UserPlus, Trash2 } from "lucide-react";
import type { UserProfile } from "../../types";

interface AdminUsersProps {
  users: UserProfile[];
  onAddAdmin: () => void;
  onDeleteUser: (email: string) => void;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({
  users,
  onAddAdmin,
  onDeleteUser,
}) => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 sm:p-12 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Personnel Roster
          </h2>
          <p className="text-gray-400 font-normal mt-2 text-sm">
            Registered stakeholders and access control.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-indigo-50 rounded-xl text-indigo-600 font-bold text-xs uppercase tracking-widest">
            {users.length} Identities
          </div>
          <button
            onClick={onAddAdmin}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all"
          >
            <UserPlus size={14} /> Add Admin
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white">
              <th className="px-8 py-6 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                Identity
              </th>
              <th className="px-8 py-6 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                Credentials
              </th>
              <th className="px-8 py-6 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                Registry ID
              </th>
              <th className="px-8 py-6 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u) => (
              <tr
                key={u.email}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 font-bold text-xs group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-100">
                      {u.fullName.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {u.fullName}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-500 font-medium">
                  {u.email}
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <span className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    {u.regNo}
                  </span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right">
                  <button
                    onClick={() => onDeleteUser(u.email)}
                    className="p-2.5 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
