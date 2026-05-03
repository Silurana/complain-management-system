import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Save,
  KeyRound,
  Building2,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  ImagePlus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { Stats, Complaint, UserProfile } from "../types";
import { LoaderOverlay } from "../components/shared/LoaderOverlay";
import { Modal } from "../components/shared/Modal";
import { StudentSidebar } from "../components/dashboard/StudentSidebar";
import { StudentHeader } from "../components/dashboard/StudentHeader";
import { StatCard } from "../components/dashboard/StatCard";
import { StudentComplaintItem } from "../components/dashboard/StudentComplaintItem";
import { StudentProfileView } from "../components/dashboard/StudentProfileView";
import API_BASE_URL from "../apiConfig";


const StudentDashboard = () => {
  // States
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    in_progress: 0,
    resolved: 0,
    rejected: 0,
  });
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "",
    email: "",
    regNo: "",
  });

  const [view, setView] = useState<
    "dashboard" | "all-issues" | "raise-issue" | "profile"
  >("dashboard");

  // Form states
  const [newComplaint, setNewComplaint] = useState<{
    title: string;
    subject: string;
    description: string;
    image: File | null;
  }>({
    title: "",
    subject: "",
    description: "",
    image: null,
  });
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirm: "",
  });

  // UI States
  const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complaintFilter, setComplaintFilter] = useState("All");

  useEffect(() => {
    fetchStats();
    fetchComplaints();
    fetchProfile();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/stats`, {

        credentials: "include",
      });
      if (res.ok) setStats(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComplaints = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/complaints`, {

        credentials: "include",
      });
      if (res.ok) setComplaints(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/profile`, {

        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setTempProfile(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", newComplaint.title);
      formData.append("subject", newComplaint.subject);
      formData.append("description", newComplaint.description);
      if (newComplaint.image) {
        formData.append("image", newComplaint.image);
      }

      const res = await fetch(`${API_BASE_URL}/user/complaints`, {

        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        toast.success("Issue successfully listed.");
        setNewComplaint({
          title: "",
          subject: "",
          description: "",
          image: null,
        });
        fetchComplaints();
        fetchStats();
        handleViewChange("all-issues");
      } else {
        toast.error("Failed to list issue.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/user/profile`, {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(tempProfile),
      });
      if (res.ok) {
        toast.success("Identity synced.");
        setProfile(tempProfile);
        setEditProfileModal(false);
      } else {
        toast.error("Failed to sync identity.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordFields.newPassword !== passwordFields.confirm) {
      alert("Verification mismatch.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/user/changePassword`, {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: passwordFields.currentPassword,
          newPassword: passwordFields.newPassword,
        }),
      });
      if (res.ok) {
        toast.success("Passkey rotation complete.");
        setChangePasswordModal(false);
        setPasswordFields({
          currentPassword: "",
          newPassword: "",
          confirm: "",
        });
      } else {
        toast.error("Failed to rotate passkey.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  };

  const handleViewChange = (v: "dashboard" | "all-issues" | "raise-issue" | "profile") => {
    setIsLoadingOverlay(true);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      setView(v);
      setIsLoadingOverlay(false);
    }, 600);
  };

  const statCardsData = [
    {
      title: "Total Issues",
      value: stats.total,
      icon: FileText,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      filter: "All",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
      filter: "Pending",
    },
    {
      title: "In Progress",
      value: stats.in_progress,
      icon: Building2,
      color: "text-blue-500",
      bg: "bg-blue-50",
      filter: "In Progress",
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      filter: "Resolved",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      color: "text-rose-500",
      bg: "bg-rose-50",
      filter: "Rejected",
    },
  ];

  return (
    <div className="relative min-h-screen flex bg-white font-['Outfit']">
      <LoaderOverlay show={isLoadingOverlay} />

      <StudentSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        view={view}
        handleViewChange={handleViewChange}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f9fafb]">
        <StudentHeader
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          view={view}
          profile={profile}
        />

        <div
          className={`flex-1 p-6 lg:p-12 overflow-y-auto transition-all duration-700`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {view === "dashboard" && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
                    Status Intel
                  </h1>
                  <p className="text-gray-400 font-normal mb-8 text-sm">
                    Real-time overview of your campus impact.
                  </p>

                  <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 mb-12">
                    {statCardsData.map((stat) => (
                      <StatCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        color={stat.color}
                        bg={stat.bg}
                        onClick={() => {
                          setComplaintFilter(stat.filter);
                          handleViewChange("all-issues");
                        }}
                      />
                    ))}
                  </div>

                  {/* Personal Distribution Analysis */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-50 mb-12 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
                        Complaint Proportions
                      </h3>
                      <p className="text-gray-400 text-sm font-normal mb-6">
                        A visual breakdown of your filed reports and their current resolutions.
                      </p>
                      <div className="space-y-3">
                        {[
                          { label: "Pending", color: "bg-amber-500", value: stats.pending },
                          { label: "In Progress", color: "bg-blue-500", value: stats.in_progress },
                          { label: "Resolved", color: "bg-emerald-500", value: stats.resolved },
                          { label: "Rejected", color: "bg-rose-500", value: stats.rejected },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{item.label}</span>
                            </div>
                            <span className="text-sm font-black text-gray-900">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-full md:w-[300px] h-[300px] min-h-0">
                      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Pending", value: stats.pending },
                              { name: "In Progress", value: stats.in_progress },
                              { name: "Resolved", value: stats.resolved },
                              { name: "Rejected", value: stats.rejected },
                            ]}
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            <Cell fill="#f59e0b" />
                            <Cell fill="#3b82f6" />
                            <Cell fill="#10b981" />
                            <Cell fill="#f43f5e" />
                          </Pie>
                          <Tooltip 
                            contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>


                  <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-50">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                        Recent Activities
                      </h2>
                      <button
                        onClick={() => handleViewChange("all-issues")}
                        className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline"
                      >
                        View History
                      </button>
                    </div>
                    {complaints.length === 0 ? (
                      <p className="text-center py-20 text-gray-300 italic font-light">
                        No issues synchronized yet.
                      </p>
                    ) : (
                      <div className="space-y-6">
                        {complaints.slice(0, 3).map((c: Complaint) => (
                          <StudentComplaintItem
                            key={c.id}
                            complaint={c}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {view === "all-issues" && (
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-50 shadow-sm overflow-hidden min-h-[500px]">
                  <div className="p-6 sm:p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                        Issue Ledger
                      </h2>
                      <p className="text-gray-400 font-normal mt-1 text-xs sm:text-sm">
                        Detailed history of reported concerns.
                      </p>
                    </div>
                    <div className="flex items-center bg-gray-50 p-1.5 rounded-xl border border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
                      {[
                        "All",
                        "Pending",
                        "In Progress",
                        "Resolved",
                        "Rejected",
                      ].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setComplaintFilter(opt)}
                          className={`px-3 sm:px-4 py-2 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                            complaintFilter === opt
                              ? "bg-white text-indigo-600 shadow-sm"
                              : "text-gray-400"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    {complaints.filter(
                      (c: Complaint) =>
                        complaintFilter === "All" ||
                        c.status === complaintFilter,
                    ).length === 0 ? (
                      <div className="py-24 text-center opacity-20 italic text-2xl font-light">
                        Segment is clear.
                      </div>
                    ) : (
                      <div className="grid gap-8">
                        {complaints
                          .filter(
                            (c: Complaint) =>
                              complaintFilter === "All" ||
                              c.status === complaintFilter,
                          )
                          .map((c: Complaint) => (
                            <StudentComplaintItem
                              key={c.id}
                              complaint={c}
                            />
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {view === "raise-issue" && (
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-gray-50 shadow-sm max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                    Raise Issue
                  </h2>
                  <p className="text-gray-400 font-normal mb-10 text-sm">
                    Document your concern for administrative review.
                  </p>
                  <form onSubmit={handleCreateIssue} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                          Subject Line
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Infrastructure Maintenance"
                          value={newComplaint.title}
                          onChange={(e) =>
                            setNewComplaint({
                              ...newComplaint,
                              title: e.target.value,
                            })
                          }
                          className="w-full bg-gray-50 border border-gray-50 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                          Category
                        </label>
                        <select
                          value={newComplaint.subject}
                          onChange={(e) =>
                            setNewComplaint({
                              ...newComplaint,
                              subject: e.target.value,
                            })
                          }
                          className="w-full bg-gray-50 border border-gray-50 rounded-2xl p-4 outline-none focus:border-indigo-300 transition-colors"
                          required
                        >
                          <option value="">Select Department</option>
                          <option value="Academic">Academic Affairs</option>
                          <option value="Hostel">Hostel Management</option>
                          <option value="Fees">Fees Management</option>
                          <option value="Classroom">Classroom Management</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                        Detailed Description
                      </label>
                      <textarea
                        placeholder="Provide full context for resolution..."
                        value={newComplaint.description}
                        onChange={(e) =>
                          setNewComplaint({
                            ...newComplaint,
                            description: e.target.value,
                          })
                        }
                        rows={6}
                        className="w-full bg-gray-50 border border-gray-50 rounded-2xl p-6 resize-none outline-none focus:border-indigo-300 transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                        Evidence (Optional Photo)
                      </label>
                      <div className="relative group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setNewComplaint({
                              ...newComplaint,
                              image: e.target.files ? e.target.files[0] : null,
                            })
                          }
                          className="hidden"
                          id="complaint-image"
                        />
                        <label
                          htmlFor="complaint-image"
                          className="flex items-center justify-center gap-3 w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
                        >
                          {newComplaint.image ? (
                            <div className="flex flex-col items-center gap-2 text-indigo-600">
                              <CheckCircle size={32} />
                              <span className="text-sm font-bold uppercase tracking-tight">
                                {newComplaint.image.name}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setNewComplaint({
                                    ...newComplaint,
                                    image: null,
                                  });
                                }}
                                className="text-rose-500 text-[10px] font-bold uppercase mt-2 hover:underline"
                              >
                                Remove Image
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                              <ImagePlus size={32} />
                              <span className="text-sm font-medium">
                                Click to upload image evidence
                              </span>
                              <span className="text-[10px]">
                                PNG, JPG or JPEG up to 5MB
                              </span>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold shadow-2xl hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      <Send size={20} /> Submit for Review
                    </button>
                  </form>
                </div>
              )}

              {view === "profile" && (
                <StudentProfileView
                  profile={profile}
                  onEditProfile={() => setEditProfileModal(true)}
                  onChangePassword={() => setChangePasswordModal(true)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Modals for profile and password change */}
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
              placeholder="Registration Number"
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
    </div>
  );
};

export default StudentDashboard;
