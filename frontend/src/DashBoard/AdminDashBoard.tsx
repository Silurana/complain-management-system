import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Save,
  KeyRound,
  UserPlus,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminOverview } from "../components/dashboard/AdminOverview";
import { AdminComplaints } from "../components/dashboard/AdminComplaints";
import { AdminUsers } from "../components/dashboard/AdminUsers";
import { AdminDepartments } from "../components/dashboard/AdminDepartments";
import type { Department } from "../components/dashboard/AdminDepartments";
import type { Stats, Complaint, UserProfile, AdminProfile } from "../types";
import { LoaderOverlay } from "../components/shared/LoaderOverlay";
import { Modal } from "../components/shared/Modal";
import { AdminSidebar } from "../components/dashboard/AdminSidebar";
import { AdminHeader } from "../components/dashboard/AdminHeader";
import { AdminProfileView } from "../components/dashboard/AdminProfileView";
import { DashboardSkeleton } from "../components/shared/SkeletonLoader";
import API_BASE_URL from "../apiConfig";

const AdminDashboard = () => {
  // Data states
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    in_progress: 0,
    resolved: 0,
    rejected: 0,
  });
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [profile, setProfile] = useState<AdminProfile>({
    fullName: "",
    email: "",
    regNo: "",
  });

  const [view, setView] = useState<
    "dashboard" | "complaints" | "users" | "departments" | "profile"
  >("dashboard");

  // Department states
  const [departments, setDepartments] = useState<Department[]>([]);
  const [addDepartmentModal, setAddDepartmentModal] = useState(false);
  const [editDepartmentModal, setEditDepartmentModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [deptForm, setDeptForm] = useState({ name: "", code: "" });

  // Modal states
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [tempProfile, setTempProfile] = useState<AdminProfile>(profile);

  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirm: "",
  });

  // Complaint editing
  const [editComplaintModal, setEditComplaintModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null,
  );
  const [complaintUpdate, setComplaintUpdate] = useState<{
    status: string;
    response: string;
  }>({
    status: "",
    response: "",
  });

  // Admin creation
  const [addAdminModal, setAddAdminModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email: "",
    password: "",
    regNo: "",
    department: "",
  });

  // UI States
  const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter for complaints by status
  const [complaintStatusFilter, setComplaintStatusFilter] =
    useState<string>("All");

  useEffect(() => {
    setIsFetching(true);
    Promise.all([fetchStats(), fetchComplaints(), fetchUsers(), fetchProfile(), fetchDepartments()]).finally(() => {
      setIsFetching(false);
    });

    // Real-time auto-refresh (every 30 seconds)
    const interval = setInterval(() => {
      fetchStats();
      fetchComplaints();
    }, 30000);

    return () => clearInterval(interval);
  }, []);


  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/admin/create-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: newAdmin.username,
          email: newAdmin.email,
          password: newAdmin.password,
          regiNo: newAdmin.regNo,
          department: newAdmin.department,
        }),
      });
      if (res.ok) {
        toast.success("New admin added successfully");
        setAddAdminModal(false);
        setNewAdmin({ username: "", email: "", password: "", regNo: "", department: "" });
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to add admin");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };


  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/stats`, {
        credentials: "include",
      });
      if (res.status === 403 || res.status === 401) {
        window.location.href = "/";
        return;
      }
      if (res.ok) {
        const data: Stats = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComplaints = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/complaints`, {
        credentials: "include",
      });
      if (res.status === 403 || res.status === 401) {
        window.location.href = "/";
        return;
      }
      if (res.ok) {
        const data: Complaint[] = await res.json();
        setComplaints(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users`, {
        credentials: "include",
      });
      if (res.status === 403 || res.status === 401) {
        window.location.href = "/";
        return;
      }
      if (res.ok) {
        const data: UserProfile[] = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/profile`, {
        credentials: "include",
      });
      if (res.status === 403 || res.status === 401) {
        window.location.href = "/";
        return;
      }
      if (res.ok) {
        const data: AdminProfile = await res.json();
        setProfile(data);
        setTempProfile(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (email: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users/${email}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Account successfully purged");
        fetchUsers();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const handleDeleteComplaint = async (id: string) => {
    if (
      !window.confirm("Are you sure you want to permanently erase this record?")
    )
      return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/complaints/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Record expunged");
        fetchComplaints();
        fetchStats();
      } else {
        toast.error("Failed to delete record");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const handleUpdateComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/complaints/${selectedComplaint.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(complaintUpdate),
        },
      );
      if (res.ok) {
        toast.success("Complaint updated successfully!");
        fetchStats();
        fetchComplaints();
        setEditComplaintModal(false);
      } else {
        toast.error("Failed to update complaint");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/admin/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(tempProfile),
      });
      if (res.ok) {
        toast.success("Profile updated successfully!");
        fetchProfile();
        setEditProfileModal(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordFields.newPassword !== passwordFields.confirm) {
      toast.error("Verification mismatch.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/admin/changePassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: passwordFields.currentPassword,
          newPassword: passwordFields.newPassword,
        }),
      });
      if (res.ok) {
        toast.success("Password updated successfully!");
        setChangePasswordModal(false);
        setPasswordFields({
          currentPassword: "",
          newPassword: "",
          confirm: "",
        });
      } else {
        const error = await res.text();
        toast.error(error || "Failed to update password");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const handleViewChange = (v: typeof view) => {
    setIsLoadingOverlay(true);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      setView(v);
      setIsLoadingOverlay(false);
    }, 600);
  };

  // Department CRUD
  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/departments`, {
        credentials: "include",
      });
      if (res.ok) {
        const data: Department[] = await res.json();
        setDepartments(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/departments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(deptForm),
      });
      if (res.ok) {
        toast.success("Department created successfully");
        setAddDepartmentModal(false);
        setDeptForm({ name: "", code: "" });
        fetchDepartments();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to create department");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const handleUpdateDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDepartment) return;
    try {
      const res = await fetch(`${API_BASE_URL}/departments/${selectedDepartment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(deptForm),
      });
      if (res.ok) {
        toast.success("Department updated successfully");
        setEditDepartmentModal(false);
        setSelectedDepartment(null);
        setDeptForm({ name: "", code: "" });
        fetchDepartments();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to update department");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const handleDeleteDepartment = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/departments/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Department deleted");
        fetchDepartments();
      } else {
        toast.error("Failed to delete department");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };



  return (
    <div className="relative min-h-screen flex bg-white font-['Outfit']">
      <LoaderOverlay show={isLoadingOverlay} />

      <AdminSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        view={view}
        handleViewChange={handleViewChange}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f9fafb]">
        <AdminHeader
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          view={view}
          profile={profile}
        />

        <div
          className="flex-1 p-6 lg:p-12 overflow-y-auto transition-all duration-700"
        >
          <AnimatePresence mode="wait">
            {isFetching ? (
              <DashboardSkeleton />
            ) : (
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
              {view === "dashboard" && (
                <AdminOverview
                  stats={stats}
                  users={users}
                  complaints={complaints}
                  handleViewChange={handleViewChange}
                />
              )}

              {view === "complaints" && (
                <AdminComplaints
                  complaints={complaints}
                  complaintStatusFilter={complaintStatusFilter}
                  setComplaintStatusFilter={setComplaintStatusFilter}
                  onEdit={(complaint) => {
                    setSelectedComplaint(complaint);
                    setComplaintUpdate({
                      status: complaint.status,
                      response: complaint.response || "",
                    });
                    setEditComplaintModal(true);
                  }}
                  onDelete={handleDeleteComplaint}
                />
              )}

              {view === "users" && (
                <AdminUsers
                  users={users}
                  currentUserEmail={profile.email}
                  onAddAdmin={() => setAddAdminModal(true)}
                  onDeleteUser={deleteUser}
                />
              )}

              {view === "departments" && (
                <AdminDepartments
                  departments={departments}
                  onAdd={() => {
                    setDeptForm({ name: "", code: "" });
                    setAddDepartmentModal(true);
                  }}
                  onEdit={(dept) => {
                    setSelectedDepartment(dept);
                    setDeptForm({ name: dept.name, code: dept.code });
                    setEditDepartmentModal(true);
                  }}
                  onDelete={handleDeleteDepartment}
                />
              )}

              {view === "profile" && (
                <AdminProfileView
                  profile={profile}
                  onEditProfile={() => setEditProfileModal(true)}
                  onChangePassword={() => setChangePasswordModal(true)}
                />
              )}
            </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modals for complaint update, profile edit, and password change */}
      <Modal
        open={editComplaintModal}
        onClose={() => setEditComplaintModal(false)}
        title="Resolution Protocol"
      >
        <form onSubmit={handleUpdateComplaint} className="space-y-6">
          <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 mb-6">
            <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">
              Issue Intel
            </h4>
            <p className="text-sm font-bold text-gray-900 mb-2">
              {selectedComplaint?.title}
            </p>
            <p className="text-xs text-indigo-500 font-medium leading-relaxed">
              {selectedComplaint?.description}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Status Designation
            </label>
            <select
              value={complaintUpdate.status}
              onChange={(e) =>
                setComplaintUpdate({
                  ...complaintUpdate,
                  status: e.target.value,
                })
              }
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors"
            >
              <option value="Pending">Pending Audit</option>
              <option value="In Progress">Under Review</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Dismissed</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Official Response
            </label>
            <textarea
              value={complaintUpdate.response}
              onChange={(e) =>
                setComplaintUpdate({
                  ...complaintUpdate,
                  response: e.target.value,
                })
              }
              placeholder="Provide detailed resolution steps..."
              rows={4}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold shadow-lg shadow-gray-200 hover:bg-black transition-all flex items-center justify-center gap-2"
          >
            Index Resolution
          </button>
        </form>
      </Modal>

      <Modal
        open={editProfileModal}
        onClose={() => setEditProfileModal(false)}
        title="Identity Settings"
      >
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={tempProfile.fullName}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, fullName: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={tempProfile.email}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, email: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors"
              required
            />
            <input
              type="text"
              placeholder="Service ID"
              value={tempProfile.regNo}
              onChange={(e) =>
                setTempProfile({ ...tempProfile, regNo: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            <Save size={18} /> Save Identity
          </button>
        </form>
      </Modal>

      <Modal
        open={changePasswordModal}
        onClose={() => setChangePasswordModal(false)}
        title="Access Security"
      >
        <form onSubmit={handleChangePassword} className="space-y-6">
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Passkey"
              value={passwordFields.currentPassword}
              onChange={(e) =>
                setPasswordFields({
                  ...passwordFields,
                  currentPassword: e.target.value,
                })
              }
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors"
              required
            />
            <input
              type="password"
              placeholder="New Passkey"
              value={passwordFields.newPassword}
              onChange={(e) =>
                setPasswordFields({
                  ...passwordFields,
                  newPassword: e.target.value,
                })
              }
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors"
              required
            />
            <input
              type="password"
              placeholder="Verify Passkey"
              value={passwordFields.confirm}
              onChange={(e) =>
                setPasswordFields({
                  ...passwordFields,
                  confirm: e.target.value,
                })
              }
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            <KeyRound size={18} /> Rotate Passkey
          </button>
        </form>
      </Modal>
      <Modal
        open={addAdminModal}
        onClose={() => setAddAdminModal(false)}
        title="Admin Registration"
      >
        <form onSubmit={handleAddAdmin} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newAdmin.username}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, username: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={newAdmin.email}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, email: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors"
              required
            />
            <input
              type="text"
              placeholder="Admin ID / Reg No"
              value={newAdmin.regNo}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, regNo: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors"
              required
            />
            <input
              type="password"
              placeholder="Secure Password"
              value={newAdmin.password}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, password: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors"
              required
            />
            <select
              value={newAdmin.department}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, department: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors"
              required
            >
              <option value="">Select Department (or All for Super Admin)</option>
              <option value="All">All (Super Admin)</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2"
          >
            <UserPlus size={18} /> Register Admin
          </button>
        </form>
      </Modal>

      {/* Add Department Modal */}
      <Modal
        open={addDepartmentModal}
        onClose={() => setAddDepartmentModal(false)}
        title="New Department"
      >
        <form onSubmit={handleAddDepartment} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                Department Name
              </label>
              <input
                id="dept-name-input"
                type="text"
                placeholder="e.g. Electrical Engineering"
                value={deptForm.name}
                onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-amber-300 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                Department Code
              </label>
              <input
                id="dept-code-input"
                type="text"
                placeholder="e.g. EE"
                value={deptForm.code}
                onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value.toUpperCase() })}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-amber-300 transition-colors font-mono uppercase tracking-widest"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2"
          >
            <Building2 size={18} /> Create Department
          </button>
        </form>
      </Modal>

      {/* Edit Department Modal */}
      <Modal
        open={editDepartmentModal}
        onClose={() => setEditDepartmentModal(false)}
        title="Edit Department"
      >
        <form onSubmit={handleUpdateDepartment} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                Department Name
              </label>
              <input
                id="dept-edit-name-input"
                type="text"
                placeholder="Department Name"
                value={deptForm.name}
                onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-amber-300 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                Department Code
              </label>
              <input
                id="dept-edit-code-input"
                type="text"
                placeholder="Department Code"
                value={deptForm.code}
                onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value.toUpperCase() })}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 outline-none focus:border-amber-300 transition-colors font-mono uppercase tracking-widest"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-amber-100 hover:bg-amber-700 transition-all flex items-center justify-center gap-2"
          >
            <Save size={18} /> Update Department
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;

