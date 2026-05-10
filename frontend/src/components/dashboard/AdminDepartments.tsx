import React, { useState } from "react";
import { Building2, Plus, Trash2, Pencil, Search, X } from "lucide-react";

export interface Department {
  _id: string;
  name: string;
  code: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AdminDepartmentsProps {
  departments: Department[];
  onAdd: () => void;
  onEdit: (dept: Department) => void;
  onDelete: (id: string) => void;
}

export const AdminDepartments: React.FC<AdminDepartmentsProps> = ({
  departments,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-8 sm:p-12 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gray-50/30">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="text-amber-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Departments
              </h2>
            </div>
            <p className="text-gray-400 font-normal text-sm">
              Manage complaint routing departments and their codes.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-amber-50 rounded-xl text-amber-600 font-bold text-xs uppercase tracking-widest">
              {departments.length} Departments
            </div>
            <button
              id="add-department-btn"
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all"
            >
              <Plus size={14} /> Add Department
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-8 sm:px-12 py-5 border-b border-gray-50 bg-white">
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
            />
            <input
              id="department-search"
              type="text"
              placeholder="Search by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:border-amber-200 transition-colors placeholder:text-gray-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-gray-500 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-6 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  Department Name
                </th>
                <th className="px-8 py-6 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  Code
                </th>
                <th className="px-8 py-6 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  Created
                </th>
                <th className="px-8 py-6 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((dept) => (
                <tr
                  key={dept._id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 font-bold text-xs group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-amber-100">
                        {dept.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {dept.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      {dept.code}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-400 font-medium">
                    {dept.createdAt
                      ? new Date(dept.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(dept)}
                        className="p-2.5 text-gray-300 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                        title="Edit Department"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(dept._id)}
                        className="p-2.5 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        title="Delete Department"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-8 py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center">
                        <Building2 size={24} className="text-gray-200" />
                      </div>
                      <p className="text-gray-300 italic text-sm">
                        {searchQuery
                          ? "No departments match your search."
                          : "No departments created yet."}
                      </p>
                      {!searchQuery && (
                        <button
                          onClick={onAdd}
                          className="mt-2 text-xs font-bold text-amber-600 hover:text-amber-700 uppercase tracking-widest transition-colors"
                        >
                          + Create your first department
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
