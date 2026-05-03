import {
  Building2,
  FileText,
  Users,
  CheckCircle,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: FileText,
    title: "Easy Complaint Submission",
    description:
      "Students can quickly submit and track their hostel and campus complaints.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description:
      "Separate dashboards for students, wardens, and admins with proper permissions.",
  },
  {
    icon: CheckCircle,
    title: "Status Tracking",
    description:
      "Real-time status updates and timeline of complaint resolution.",
  },
  {
    icon: Building2,
    title: "Comprehensive Management",
    description:
      "Manage both hostel and campus complaints in one centralized system.",
  },
];

const testimonials = [
  {
    name: "Tapash Barik",
    role: "Superintendent",
    quote:
      "This platform simplified reporting complaints. Resolution is quick and transparent.",
  },
  {
    name: "Ravi Mishra",
    role: "Warden",
    quote: "The dashboards make managing issues efficient and straightforward.",
  },
  {
    name: "Admin Team",
    role: "System Admins",
    quote: "Helps us keep track and resolve campus issues without hassles.",
  },
];

const faqs = [
  {
    question: "Who can use the complaint management system?",
    answer:
      "Students, wardens, and administrators can access customized dashboards to manage complaints effectively.",
  },
  {
    question: "How can I track the status of my complaint?",
    answer:
      "Each complaint has real-time status updates and detailed responses within the platform.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Currently, the platform is accessible via web browsers optimized for mobile and desktop devices.",
  },
  {
    question: "Can I edit or withdraw my complaint once submitted?",
    answer:
      "You can edit your complaint during the review phase or withdraw it by contacting the admin team.",
  },
];

const Display = () => {
  const navigate = useNavigate();
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800 flex flex-col ">
      {/* Sticky Header */}
      <header className="sticky top-0 z-[100] bg-white/70 backdrop-blur-xl border-b border-gray-100 flex justify-center px-4">
        <div className="max-w-7xl w-full flex justify-between items-center py-5 px-4 md:px-8">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <img
              src="https://www.campussync.in/img/logo.png"
              alt=""
              className="w-full h-15"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/auth")}
              className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              Login
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 lg:px-12 py-20 overflow-hidden bg-[#050608] font-poppins">
        {/* Advanced Background Design */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[#050608]"></div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[100px]"
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay"></div>
        </div>

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-start"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 backdrop-blur-md"
            >
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              The Future of Campus Governance
            </motion.div>

            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8">
              Syncing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-rose-400">
                Resolutions.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0">
              A premium administrative layer for modern campus life. Voice your
              concerns with radical transparency and track every step of the
              resolution lifecycle.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/auth")}
                className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-2xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3"
              >
                Explore
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all"
              >
                View Live Demo
              </motion.button>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 opacity-40">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#050608] bg-gray-800"
                  ></div>
                ))}
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Used by 2,000+ Students
              </p>
            </div>
          </motion.div>

          {/* Right Column: Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Main Mockup Card */}
            <div className="relative z-20 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 backdrop-blur-3xl rounded-[3rem] border border-white/10 p-2 shadow-2xl overflow-hidden group">
              <div className="bg-[#0a0c10] rounded-[2.8rem] p-8 aspect-[4/3] flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                  </div>
                  <div className="w-24 h-2 bg-white/5 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 rounded-3xl bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/20"></div>
                    <div className="space-y-2">
                      <div className="w-12 h-2 bg-white/20 rounded-full"></div>
                      <div className="w-8 h-1.5 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                  <div className="h-32 rounded-3xl bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                    <div className="w-8 h-8 rounded-xl bg-violet-500/20"></div>
                    <div className="space-y-2">
                      <div className="w-12 h-2 bg-white/20 rounded-full"></div>
                      <div className="w-8 h-1.5 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 rounded-3xl bg-gradient-to-t from-white/5 to-transparent border border-white/5 p-6 relative overflow-hidden">
                   <div className="absolute bottom-0 left-0 w-full h-1/2 bg-indigo-500/10 blur-[40px]"></div>
                   <div className="relative space-y-4">
                      <div className="w-full h-3 bg-white/10 rounded-full"></div>
                      <div className="w-3/4 h-3 bg-white/5 rounded-full"></div>
                      <div className="w-1/2 h-3 bg-white/5 rounded-full"></div>
                   </div>
                </div>
              </div>
            </div>

            {/* Floating Accents */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 z-30 w-40 h-40 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 shadow-2xl flex flex-col justify-between"
            >
               <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full border-2 border-emerald-500/50 border-t-transparent animate-spin"></div>
               </div>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Resolving...</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 z-30 px-8 py-6 bg-white text-[#050608] rounded-3xl shadow-2xl flex items-center gap-4"
            >
               <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">✓</div>
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Status</p>
                  <p className="text-sm font-black uppercase">Confirmed</p>
               </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/10 flex justify-center p-2"
          >
            <div className="w-1 h-2 bg-indigo-500 rounded-full"></div>
          </motion.div>
          <span className="text-[8px] font-bold text-gray-600 uppercase tracking-[0.4em]">Explore</span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-[0.3em] mb-4 block">
                Core Infrastructure
              </span>
              <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
                ENGINEERED FOR <br />
                <span className="text-indigo-600 underline decoration-indigo-200 decoration-8 underline-offset-8">
                  EFFICIENCY
                </span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-sm text-sm font-light leading-relaxed">
              We've redesigned the campus complaint lifecycle from the ground up
              to ensure no voice goes unheard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 bg-gray-50 rounded-[3rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 leading-none tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm font-light">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="bg-[#fcfcff] py-32 border-y border-gray-50"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-[0.3em] mb-4 block">
              Proven Reliability
            </span>
            <h2 className="text-5xl font-black text-gray-900 tracking-tighter mb-6">
              TRUSTED BY LEADERS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(({ name, role, quote }) => (
              <div
                key={name}
                className="bg-white rounded-[2.5rem] p-12 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow relative group"
              >
                <div className="absolute top-10 right-12 text-6xl text-indigo-50 font-serif group-hover:text-indigo-100 transition-colors">
                  &ldquo;
                </div>
                <p className="mb-10 text-gray-600 leading-relaxed font-light relative z-10 text-lg">
                  {quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{name}</h4>
                    <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
          .font-poppins {
            font-family: "Poppins", sans-serif;
          }
        `}
      </style>

      <section className="w-full flex flex-col items-center justify-center py-24 px-4 bg-white font-poppins">
        <div className="w-full max-w-5xl">
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-neutral-900 text-center md:text-start mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-500 max-w-[416px] text-sm text-center md:text-start mx-auto md:mx-0 leading-relaxed">
              We're here to help you and solve doubts. Find answers to the most
              common questions below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                onClick={() => toggleFaq(index)}
                className={`bg-slate-50 p-4 rounded-xl cursor-pointer transition-all duration-300 border border-slate-200 hover:bg-slate-100 ${
                  faqOpenIndex === index ? "ring-1 ring-indigo-100 border-indigo-200 bg-white" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-neutral-800">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1 rounded-lg transition-all ${
                      faqOpenIndex === index
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {faqOpenIndex === index ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    )}
                  </div>
                </div>
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    faqOpenIndex === index
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-neutral-500 leading-relaxed font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 text-white py-20 text-center">
        <h2 className="text-4xl font-extrabold mb-6">Ready to get started?</h2>
        <p className="max-w-3xl mx-auto mb-10 opacity-90 text-lg">
          Join our campus complaint platform and improve your living and
          learning environment.
        </p>
        <button
          onClick={() => navigate("/auth")}
          className="px-10 py-4 rounded-xl border-2 border-white hover:bg-white hover:text-blue-700 font-semibold transition"
        >
          Create Account
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 text-center text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            © {new Date().getFullYear()} Campus Complaint System. All rights
            reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="Linkedin" className="hover:text-blue-700">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Display;
