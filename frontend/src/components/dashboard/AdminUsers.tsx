import React from "react";
import { UserPlus, Trash2, ShieldCheck, User } from "lucide-react";
import type { UserProfile } from "../../types";

interface AdminUsersProps {
  users: UserProfile[];
  currentUserEmail: string;
  onAddAdmin: () => void;
  onDeleteUser: (email: string) => void;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({
  users,
  currentUserEmail,
  onAddAdmin,
  onDeleteUser,
}) => {
  const admins = users.filter((u) => u.role === "admin" || u.role === "superadmin");
  const students = users.filter((u) => u.role === "student" || !u.role);

  return (
    <div className="space-y-8">
      {/* Admins Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 sm:p-12 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gray-50/30">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Administrators
              </h2>
            </div>
            <p className="text-gray-400 font-normal text-sm">
              Manage system staff and department privileges.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-indigo-50 rounded-xl text-indigo-600 font-bold text-xs uppercase tracking-widest">
              {admins.length} Staff
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
                  Role / Dept
                </th>
                <th className="px-8 py-6 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {admins.map((u) => (
                <tr
                  key={u.email}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-xs group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-indigo-100">
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
                    <div className="flex flex-col gap-1">
                      <span className={`w-max px-3 py-1 border rounded-lg text-[10px] font-bold uppercase tracking-widest ${u.role === "superadmin" ? "bg-purple-50 text-purple-600 border-purple-100" : "bg-white text-gray-500 border-gray-100"}`}>
                        {u.role === "superadmin" ? "Super Admin" : "Dept Admin"}
                      </span>
                      {u.department && u.role !== "superadmin" && (
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          {u.department}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right">
                    {u.email !== currentUserEmail ? (
                      <button
                        onClick={() => onDeleteUser(u.email)}
                        className="p-2.5 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-2">
                        Current User
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-gray-300 italic">No administrators found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 sm:p-12 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gray-50/30">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <User className="text-emerald-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Registered Students
              </h2>
            </div>
            <p className="text-gray-400 font-normal text-sm">
              View and manage standard student accounts.
            </p>
          </div>
          <div className="px-4 py-2 bg-emerald-50 rounded-xl text-emerald-600 font-bold text-xs uppercase tracking-widest">
            {students.length} Students
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
              {students.map((u) => (
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
                    {u.email !== currentUserEmail ? (
                      <button
                        onClick={() => onDeleteUser(u.email)}
                        className="p-2.5 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-2">
                        Current User
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-gray-300 italic">No students registered yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
