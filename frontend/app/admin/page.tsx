"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { 
  User, Briefcase, Wrench, Mail, LogOut, CheckCircle, 
  Trash2, Plus, Edit, Save, Upload, ShieldAlert, Globe,
  Layers, Sparkles, Award, BookOpen, Heart, Laptop, Terminal, Star, TrendingUp
} from "lucide-react";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/api-config";

type TabName = "inbox" | "profile" | "projects" | "tools" | "experience" | "customSections";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabName>("inbox");
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  // State configurations fetched from backend
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [tools, setTools] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [customSections, setCustomSections] = useState<any[]>([]);

  // Editing forms state helpers
  const [profileForm, setProfileForm] = useState<any>(null);
  const [msgFeedback, setMsgFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // File upload helper states
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingProfilePhoto, setUploadingProfilePhoto] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingProjectImage, setUploadingProjectImage] = useState(false);

  // Modal editor states for Add/Edit Projects & Tools
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingTool, setEditingTool] = useState<any>(null);
  const [editingExp, setEditingExp] = useState<any>(null);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [editingCustomSection, setEditingCustomSection] = useState<any>(null);
  const [expSubTab, setExpSubTab] = useState<"timeline" | "skills">("timeline");

  // Authentication checker & Data pre-loader
  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      try {
        const authRes = await fetch(`${API_BASE_URL}/api/auth-check`, {
          credentials: "include"
        });
        if (!authRes.ok) {
          throw new Error("Unauthorized");
        }
        setAuthChecked(true);

        // Load Portfolio Data
        const portRes = await fetch(`${API_BASE_URL}/api/portfolio`, { cache: "no-store" });
        const portData = await portRes.json();
        setProfile(portData.profile);
        setProfileForm({
          ...portData.profile,
          about: {
            interests: [],
            techStack: [],
            email: "",
            whoIAm: "",
            whatIDo: "",
            myJourney: "",
            vision: "",
            beyondCode: "",
            ...portData.profile?.about
          },
          socials: {
            twitter: "",
            instagram: "",
            github: "",
            linkedin: "",
            ...portData.profile?.socials
          }
        });
        setProjects(portData.projects);
        setTools(portData.tools);
        setExperience(portData.experience);
        setSkills(portData.skills || []);
        setCustomSections(portData.customSections || []);

        // Load Messages
        const msgRes = await fetch(`${API_BASE_URL}/api/messages`, {
          credentials: "include"
        });
        const msgData = await msgRes.json();
        setMessages(msgData);
      } catch (err) {
        localStorage.removeItem("admin_logged");
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndLoadData();
  }, [router]);

  const triggerFeedback = (type: "success" | "error", text: string) => {
    setMsgFeedback({ type, text });
    setTimeout(() => setMsgFeedback(null), 4000);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/logout`, {
        method: "POST",
        credentials: "include"
      });
      localStorage.removeItem("admin_logged");
      router.push("/admin/login");
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------
  // PROFILE SUBMIT OPERATIONS
  // -------------------------
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to save profile");
      const data = await res.json();
      setProfile(data.data);
      triggerFeedback("success", "Profile configuration saved successfully!");
    } catch (err: any) {
      triggerFeedback("error", err.message || "Failed to update profile");
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setUploadingAvatar(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setProfileForm((prev: any) => ({ ...prev, avatar: data.url }));
      triggerFeedback("success", "Avatar uploaded successfully! Click save to apply changes.");
    } catch (err: any) {
      triggerFeedback("error", err.message || "Failed to upload image");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setUploadingProfilePhoto(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setProfileForm((prev: any) => ({ ...prev, profilePhoto: data.url }));
      triggerFeedback("success", "Profile photo uploaded successfully! Click save to apply changes.");
    } catch (err: any) {
      triggerFeedback("error", err.message || "Failed to upload image");
    } finally {
      setUploadingProfilePhoto(false);
    }
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setUploadingProjectImage(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setEditingProject((prev: any) => ({ ...prev, image: data.url }));
      triggerFeedback("success", "Project image uploaded successfully!");
    } catch (err: any) {
      triggerFeedback("error", err.message || "Failed to upload image");
    } finally {
      setUploadingProjectImage(false);
    }
  };

  const handleSaveSkill = async (skill: any) => {
    let updatedList = [...skills];
    if (skill.isNew) {
      const { isNew, ...newSkill } = skill;
      updatedList.push(newSkill);
    } else {
      updatedList = updatedList.map((s) => (s.title === skill.originalTitle ? skill : s));
    }
    // Clean up originalTitle property if it exists
    updatedList = updatedList.map(({ originalTitle, ...rest }: any) => rest);

    try {
      const res = await fetch(`${API_BASE_URL}/api/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to save skills");
      const data = await res.json();
      setSkills(data.data);
      setEditingSkill(null);
      triggerFeedback("success", "Skills updated successfully!");
    } catch (err: any) {
      triggerFeedback("error", err.message);
    }
  };

  const handleDeleteSkill = async (title: string) => {
    if (!confirm(`Are you sure you want to delete the skill category: "${title}"?`)) return;
    const updatedList = skills.filter((s) => s.title !== title);
    try {
      const res = await fetch(`${API_BASE_URL}/api/skills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to delete skill category");
      const data = await res.json();
      setSkills(data.data);
      triggerFeedback("success", "Skill category removed successfully.");
    } catch (err: any) {
      triggerFeedback("error", err.message);
    }
  };

  // -------------------------
  // PROJECTS OPERATIONS
  // -------------------------
  const handleSaveProject = async (proj: any) => {
    let updatedList = [...projects];
    if (proj.isNew) {
      const { isNew, ...newProj } = proj;
      newProj.id = `project_${Date.now()}`;
      updatedList.push(newProj);
    } else {
      updatedList = updatedList.map((p) => (p.id === proj.id ? proj : p));
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to save projects list");
      const data = await res.json();
      setProjects(data.data);
      setEditingProject(null);
      triggerFeedback("success", "Projects inventory updated successfully!");
    } catch (err: any) {
      triggerFeedback("error", err.message);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const updatedList = projects.filter((p) => p.id !== id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to delete project");
      const data = await res.json();
      setProjects(data.data);
      triggerFeedback("success", "Project removed successfully.");
    } catch (err: any) {
      triggerFeedback("error", err.message);
    }
  };

  // -------------------------
  // TOOLS OPERATIONS
  // -------------------------
  const handleSaveTool = async (tool: any) => {
    let updatedList = [...tools];
    if (tool.isNew) {
      const { isNew, ...newTool } = tool;
      updatedList.push(newTool);
    } else {
      updatedList = updatedList.map((t) => (t.name === tool.name ? tool : t));
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/tools`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to save tools");
      const data = await res.json();
      setTools(data.data);
      setEditingTool(null);
      triggerFeedback("success", "Tools catalog updated successfully!");
    } catch (err: any) {
      triggerFeedback("error", err.message);
    }
  };

  const handleDeleteTool = async (name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    const updatedList = tools.filter((t) => t.name !== name);
    try {
      const res = await fetch(`${API_BASE_URL}/api/tools`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to delete tool");
      const data = await res.json();
      setTools(data.data);
      triggerFeedback("success", "Tool removed successfully.");
    } catch (err: any) {
      triggerFeedback("error", err.message);
    }
  };

  // -------------------------
  // EXPERIENCE OPERATIONS
  // -------------------------
  const handleSaveExp = async (exp: any) => {
    let updatedList = [...experience];
    if (exp.isNew) {
      const { isNew, ...newExp } = exp;
      newExp.id = `exp_${Date.now()}`;
      updatedList.push(newExp);
    } else {
      updatedList = updatedList.map((e) => (e.id === exp.id ? exp : e));
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/experience`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to save experience timeline");
      const data = await res.json();
      setExperience(data.data);
      setEditingExp(null);
      triggerFeedback("success", "Experience timeline updated successfully!");
    } catch (err: any) {
      triggerFeedback("error", err.message);
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this career entry?")) return;
    const updatedList = experience.filter((e) => e.id !== id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/experience`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to delete experience timeline");
      const data = await res.json();
      setExperience(data.data);
      triggerFeedback("success", "Timeline entry removed successfully.");
    } catch (err: any) {
      triggerFeedback("error", err.message);
    }
  };

  // -------------------------
  // MESSAGES OPERATIONS
  // -------------------------
  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/messages/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to delete message");
      setMessages((prev) => prev.filter((m) => m.id !== id));
      triggerFeedback("success", "Message deleted successfully.");
    } catch (err: any) {
      triggerFeedback("error", err.message);
    }
  };

  const handleSaveCustomSection = async (sec: any) => {
    let updatedList = [...customSections];
    if (sec.isNew) {
      const { isNew, ...newSec } = sec;
      newSec.id = `sec_${Date.now()}`;
      updatedList.push(newSec);
    } else {
      updatedList = updatedList.map((s) => (s.id === sec.id ? sec : s));
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/custom-sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to save custom sections");
      const data = await res.json();
      setCustomSections(data.data);
      setEditingCustomSection(null);
      triggerFeedback("success", "Custom sections catalog updated successfully!");
    } catch (err: any) {
      triggerFeedback("error", err.message);
    }
  };

  const handleDeleteCustomSection = async (id: string) => {
    if (!confirm("Are you sure you want to delete this custom section?")) return;
    const updatedList = customSections.filter((s) => s.id !== id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/custom-sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to delete custom section");
      const data = await res.json();
      setCustomSections(data.data);
      triggerFeedback("success", "Custom section removed successfully.");
    } catch (err: any) {
      triggerFeedback("error", err.message);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setUploadingVideo(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setProfileForm((prev: any) => ({ ...prev, featuredVideo: data.url }));
      triggerFeedback("success", "Video uploaded successfully! Click save to apply profile.");
    } catch (err: any) {
      triggerFeedback("error", err.message || "Failed to upload video");
    } finally {
      setUploadingVideo(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-t-blue-400 border-zinc-800 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold tracking-wider uppercase">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!authChecked) return null;

  return (
    <div className="min-h-screen relative bg-zinc-950 pt-20 px-4 sm:px-6 lg:px-8 pb-24 antialiased">
      {/* Spotlight Backdrop */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-20" fill="#00E5FF" />

      {/* Grid Pattern Background */}
      <div className="pointer-events-none -z-20 absolute inset-0 [background-size:40px_40px] select-none [background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] opacity-30" />

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Header Panel */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-900 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 to-zinc-400">
              Admin Control Center
            </h1>
            <p className="text-zinc-400 text-sm mt-1">Manage configuration data and client inquiries</p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white transition-all cursor-pointer">
              <Globe className="w-4 h-4" />
              View Site
            </Link>
            <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-2.5 text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Global Feedback Panel */}
        {msgFeedback && (
          <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border p-4 shadow-2xl backdrop-blur-md transition-all ${
            msgFeedback.type === "success" 
              ? "border-blue-500/30 bg-blue-950/80 text-blue-400" 
              : "border-rose-500/30 bg-rose-950/80 text-rose-400"
          }`}>
            {msgFeedback.type === "success" ? <CheckCircle className="w-5 h-5 shrink-0" /> : <ShieldAlert className="w-5 h-5 shrink-0" />}
            <p className="text-sm font-semibold">{msgFeedback.text}</p>
          </div>
        )}

        {/* Control Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-1 space-y-1">
            <button
              onClick={() => setActiveTab("inbox")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                activeTab === "inbox"
                  ? "bg-blue-500/5 border-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59, 130, 246,0.03)]"
                  : "border-transparent text-zinc-400 hover:bg-zinc-900/30 hover:text-zinc-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                Inbox Logs
              </div>
              {messages.length > 0 && (
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {messages.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                activeTab === "profile"
                  ? "bg-blue-500/5 border-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59, 130, 246,0.03)]"
                  : "border-transparent text-zinc-400 hover:bg-zinc-900/30 hover:text-zinc-200"
              }`}
            >
              <User className="w-4 h-4" />
              Edit Profile
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                activeTab === "projects"
                  ? "bg-blue-500/5 border-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59, 130, 246,0.03)]"
                  : "border-transparent text-zinc-400 hover:bg-zinc-900/30 hover:text-zinc-200"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Manage Projects
            </button>

            <button
              onClick={() => setActiveTab("tools")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                activeTab === "tools"
                  ? "bg-blue-500/5 border-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59, 130, 246,0.03)]"
                  : "border-transparent text-zinc-400 hover:bg-zinc-900/30 hover:text-zinc-200"
              }`}
            >
              <Wrench className="w-4 h-4" />
              Manage Tools
            </button>

            <button
              onClick={() => setActiveTab("experience")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                activeTab === "experience"
                  ? "bg-blue-500/5 border-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59, 130, 246,0.03)]"
                  : "border-transparent text-zinc-400 hover:bg-zinc-900/30 hover:text-zinc-200"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Timeline & Skills
            </button>

            <button
              onClick={() => setActiveTab("customSections")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                activeTab === "customSections"
                  ? "bg-blue-500/5 border-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59, 130, 246,0.03)]"
                  : "border-transparent text-zinc-400 hover:bg-zinc-900/30 hover:text-zinc-200"
              }`}
            >
              <Layers className="w-4 h-4" />
              Custom Sections
            </button>
          </aside>

          {/* Edit Forms Container */}
          <main className="lg:col-span-3">
            {/* INBOX TAB */}
            {activeTab === "inbox" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6">
                  <h2 className="text-xl font-bold text-zinc-100 mb-2">Message logs ({messages.length})</h2>
                  <p className="text-zinc-400 text-sm mb-6">User requests submitted directly from the contact form</p>

                  {messages.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl">
                      <Mail className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                      <p className="text-zinc-500 text-sm">No messages received yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className="relative group/msg border border-zinc-900 bg-zinc-900/20 rounded-xl p-5 hover:border-zinc-850 hover:bg-zinc-900/30 transition-all duration-200">
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="absolute top-5 right-5 opacity-0 group-hover/msg:opacity-100 p-2 text-zinc-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/5 transition-all cursor-pointer"
                            title="Delete log"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-zinc-450 uppercase mb-2">
                            <span className="text-zinc-200 font-bold">{msg.name}</span>
                            <span className="text-zinc-700 font-bold">•</span>
                            <span>{msg.email}</span>
                            <span className="text-zinc-700 font-bold">•</span>
                            <span>{new Date(msg.timestamp).toLocaleString()}</span>
                          </div>

                          <h3 className="text-sm font-bold text-zinc-150 mb-2">Subject: {msg.subject}</h3>
                          <p className="text-sm text-zinc-400 leading-relaxed bg-zinc-950/40 border border-zinc-900/60 rounded-lg p-3 whitespace-pre-wrap select-text">
                            {msg.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === "profile" && profileForm && (
              <form onSubmit={handleProfileSave} className="space-y-6">
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6 space-y-6">
                  <h2 className="text-xl font-bold text-zinc-100">Profile Configuration</h2>
                                 {/* Photo & Name Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center border-b border-zinc-900 pb-6">
                    {/* Upload Avatar */}
                    <div className="md:col-span-1 flex flex-col items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-550">Avatar Logo (Sidebar)</span>
                      <div className="relative h-20 w-20 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900">
                        {profileForm.avatar ? (
                          <img
                            src={profileForm.avatar}
                            alt="Avatar Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">No Photo</div>
                        )}
                        {uploadingAvatar && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <div className="w-4 h-4 border border-t-blue-400 border-zinc-700 rounded-full animate-spin" />
                          </div>
                        )}
                      </div>

                      <label className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white transition-all cursor-pointer">
                        <Upload className="w-3 h-3" />
                        Upload Logo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarUpload}
                        />
                      </label>
                    </div>

                    {/* Upload Profile Photo */}
                    <div className="md:col-span-1 flex flex-col items-center gap-3 border-l border-r border-zinc-900/60">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-550">Profile Photo (Homepage)</span>
                      <div className="relative h-20 w-20 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                        {profileForm.profilePhoto ? (
                          <img
                            src={profileForm.profilePhoto}
                            alt="Profile Photo Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">No Photo</div>
                        )}
                        {uploadingProfilePhoto && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <div className="w-4 h-4 border border-t-blue-400 border-zinc-700 rounded-full animate-spin" />
                          </div>
                        )}
                      </div>

                      <label className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white transition-all cursor-pointer">
                        <Upload className="w-3 h-3" />
                        Upload Photo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleProfilePhotoUpload}
                        />
                      </label>
                    </div>

                    {/* Upload Featured Video */}
                    <div className="md:col-span-1 flex flex-col items-center gap-3 border-r border-zinc-900/60">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-550">Featured Video (Homepage)</span>
                      <div className="relative h-20 w-28 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center">
                        {profileForm.featuredVideo ? (
                          <video
                            src={profileForm.featuredVideo}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">No Video</div>
                        )}
                        {uploadingVideo && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <div className="w-4 h-4 border border-t-blue-400 border-zinc-700 rounded-full animate-spin" />
                          </div>
                        )}
                      </div>

                      <label className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white transition-all cursor-pointer">
                        <Upload className="w-3 h-3" />
                        Upload Video
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={handleVideoUpload}
                        />
                      </label>
                    </div>

                    {/* Inputs */}
                    <div className="md:col-span-1 space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Name</label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-1.5 text-zinc-200 outline-none focus:border-blue-500/50 text-xs"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Profile Photo Link</label>
                        <input
                          type="text"
                          value={profileForm.profilePhoto || ""}
                          onChange={(e) => setProfileForm({ ...profileForm, profilePhoto: e.target.value })}
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-1.5 text-zinc-200 outline-none focus:border-blue-500/50 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">Featured Video Link</label>
                        <input
                          type="text"
                          value={profileForm.featuredVideo || ""}
                          onChange={(e) => setProfileForm({ ...profileForm, featuredVideo: e.target.value })}
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-1.5 text-zinc-200 outline-none focus:border-blue-500/50 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Typing Animation Roles */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                      Typing loop words (comma separated)
                    </label>
                    <input
                      type="text"
                      value={profileForm.typingWords.join(", ")}
                      onChange={(e) => setProfileForm({
                        ...profileForm,
                        typingWords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                      })}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-zinc-200 outline-none focus:border-blue-500/50"
                      required
                    />
                  </div>

                  {/* Biography (Home Page Bio Card) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                      Home Biography Paragraph
                    </label>
                    <textarea
                      rows={5}
                      value={profileForm.bioText}
                      onChange={(e) => setProfileForm({ ...profileForm, bioText: e.target.value })}
                      className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-zinc-200 outline-none focus:border-blue-500/50"
                      required
                    />
                  </div>

                  {/* Socials Connection */}
                  <div className="border-t border-zinc-900 pt-6 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Social Connections</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.keys(profileForm.socials).map((soc) => (
                        <div key={soc}>
                          <label className="block text-xs font-semibold capitalize text-zinc-500 mb-1.5">{soc}</label>
                          <input
                            type="text"
                            value={profileForm.socials[soc]}
                            onChange={(e) => setProfileForm({
                              ...profileForm,
                              socials: { ...profileForm.socials, [soc]: e.target.value }
                            })}
                            className="w-full rounded-lg border border-zinc-850 bg-zinc-950/40 px-3.5 py-2 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* About Page Persists */}
                  <div className="border-t border-zinc-900 pt-6 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">About Page Paragraphs</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Who I Am</label>
                        <textarea
                          rows={3}
                          value={profileForm.about.whoIAm}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            about: { ...profileForm.about, whoIAm: e.target.value }
                          })}
                          className="w-full resize-none rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-zinc-300 outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1.5">What I Do</label>
                        <textarea
                          rows={3}
                          value={profileForm.about.whatIDo}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            about: { ...profileForm.about, whatIDo: e.target.value }
                          })}
                          className="w-full resize-none rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-zinc-300 outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1.5">My Journey</label>
                        <textarea
                          rows={3}
                          value={profileForm.about.myJourney}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            about: { ...profileForm.about, myJourney: e.target.value }
                          })}
                          className="w-full resize-none rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-zinc-300 outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Interests (comma separated)</label>
                          <input
                            type="text"
                            value={profileForm.about.interests ? profileForm.about.interests.join(", ") : ""}
                            onChange={(e) => setProfileForm({
                              ...profileForm,
                              about: { 
                                ...profileForm.about, 
                                interests: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) 
                              }
                            })}
                            className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Tech Stack (comma separated)</label>
                          <input
                            type="text"
                            value={profileForm.about.techStack ? profileForm.about.techStack.join(", ") : ""}
                            onChange={(e) => setProfileForm({
                              ...profileForm,
                              about: { 
                                ...profileForm.about, 
                                techStack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) 
                              }
                            })}
                            className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          value={profileForm.about.email || ""}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            about: { ...profileForm.about, email: e.target.value }
                          })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Vision</label>
                        <textarea
                          rows={3}
                          value={profileForm.about.vision || ""}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            about: { ...profileForm.about, vision: e.target.value }
                          })}
                          className="w-full resize-none rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1.5">Beyond Code</label>
                        <textarea
                          rows={3}
                          value={profileForm.about.beyondCode || ""}
                          onChange={(e) => setProfileForm({
                            ...profileForm,
                            about: { ...profileForm.about, beyondCode: e.target.value }
                          })}
                          className="w-full resize-none rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-[#00E5FF] px-6 py-3 text-sm font-bold text-zinc-950 transition-all hover:brightness-110 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      Save Configuration
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* PROJECTS TAB */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                {!editingProject ? (
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-zinc-100">Projects Inventory ({projects.length})</h2>
                        <p className="text-zinc-400 text-xs mt-1">Manage project details, slugs, and source links</p>
                      </div>
                      <button
                        onClick={() => setEditingProject({
                          isNew: true,
                          title: "",
                          slug: "",
                          description: "",
                          detailedDescription: "",
                          image: "/resume.jpg",
                          tags: [],
                          status: "active",
                          techStack: [],
                          features: [],
                          learningOutcomes: [],
                          links: { github: "https://github.com/Adityakumarsahoo" },
                          author: "Aditya Kumar",
                          authorAvatar: "/hexagon.png"
                        })}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 px-3.5 py-2 text-xs font-bold text-blue-400 hover:bg-blue-500/20 transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add New
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projects.map((proj) => (
                        <div key={proj.id} className="group border border-zinc-900 bg-zinc-900/10 rounded-xl p-4 flex gap-4 hover:border-zinc-800 transition-all">
                          <div className="relative h-20 w-32 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0">
                            <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                          </div>

                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-sm text-zinc-200 truncate">{proj.title}</h3>
                                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                                  proj.status === "active" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-zinc-800 text-zinc-400"
                                }`}>
                                  {proj.status}
                                </span>
                              </div>
                              <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">{proj.description}</p>
                            </div>

                            <div className="flex items-center gap-2 mt-3 justify-end">
                              <button
                                onClick={() => setEditingProject({
                                  ...proj,
                                  links: proj.links || {},
                                  tags: proj.tags || [],
                                  techStack: proj.techStack || [],
                                  features: proj.features || [],
                                  learningOutcomes: proj.learningOutcomes || []
                                })}
                                className="inline-flex items-center gap-1 p-1.5 rounded-md hover:bg-zinc-800 border border-transparent hover:border-zinc-700 text-xs text-zinc-300 transition-all cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id)}
                                className="inline-flex items-center gap-1 p-1.5 rounded-md hover:bg-rose-500/5 border border-transparent hover:border-rose-500/20 text-xs text-rose-400 transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Project Edit Form
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-900 pb-3">
                      {editingProject.isNew ? "Create Project Card" : `Edit Project: ${editingProject.title}`}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Project Title</label>
                        <input
                          type="text"
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                          placeholder="My Awesome App"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">URL Slug (URL-Safe)</label>
                        <input
                          type="text"
                          value={editingProject.slug}
                          onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                          placeholder="my-awesome-app"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Image Link / Asset Path</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editingProject.image}
                            onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                            className="flex-1 rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                            placeholder="/resume.jpg or https://..."
                          />
                          <label className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white transition-all cursor-pointer relative min-w-[120px]">
                            {uploadingProjectImage ? (
                              <div className="w-4 h-4 border border-t-blue-400 border-zinc-700 rounded-full animate-spin" />
                            ) : (
                              <>
                                <Upload className="w-3.5 h-3.5" />
                                Upload File
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleProjectImageUpload}
                              disabled={uploadingProjectImage}
                            />
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">GitHub Source Link</label>
                        <input
                          type="text"
                          value={editingProject.links.github || ""}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            links: { ...editingProject.links, github: e.target.value }
                          })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Live Demo Link (Optional)</label>
                        <input
                          type="text"
                          value={editingProject.links.visit || ""}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            links: { ...editingProject.links, visit: e.target.value }
                          })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Status</label>
                        <select
                          value={editingProject.status}
                          onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                        >
                          <option value="active">Active</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Short Card Description</label>
                      <input
                        type="text"
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Detailed Project Overview</label>
                      <textarea
                        rows={4}
                        value={editingProject.detailedDescription}
                        onChange={(e) => setEditingProject({ ...editingProject, detailedDescription: e.target.value })}
                        className="w-full resize-none rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-250 outline-none focus:border-blue-500/50"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={editingProject.tags.join(", ")}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                          })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Tech Stack (comma separated)</label>
                        <input
                          type="text"
                          value={editingProject.techStack.join(", ")}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            techStack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                          })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Key Features (comma separated)</label>
                        <input
                          type="text"
                          value={editingProject.features.join(", ")}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            features: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                          })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Learning Outcomes (comma separated)</label>
                        <input
                          type="text"
                          value={editingProject.learningOutcomes.join(", ")}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            learningOutcomes: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                          })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        onClick={() => handleSaveProject(editingProject)}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-[#00E5FF] px-6 py-3 text-sm font-bold text-zinc-950 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        Save Project
                      </button>
                      <button
                        onClick={() => setEditingProject(null)}
                        className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TOOLS TAB */}
            {activeTab === "tools" && (
              <div className="space-y-6">
                {!editingTool ? (
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-zinc-100">Tools Catalog ({tools.length})</h2>
                        <p className="text-zinc-400 text-xs mt-1">Manage static tool link configurations and devicons</p>
                      </div>
                      <button
                        onClick={() => setEditingTool({
                          isNew: true,
                          name: "",
                          category: "IDE / Editor",
                          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
                          href: ""
                        })}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 px-3.5 py-2 text-xs font-bold text-blue-400 hover:bg-blue-500/20 transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add New
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tools.map((t) => (
                        <div key={t.name} className="group border border-zinc-900 bg-zinc-900/10 rounded-xl p-4 flex items-center justify-between hover:border-zinc-800 transition-all">
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="h-10 w-10 shrink-0 border border-zinc-800 bg-zinc-950 p-1.5 rounded-lg overflow-hidden flex items-center justify-center">
                              <img src={t.icon} alt={t.name} className="object-contain max-h-full max-w-full" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-bold text-sm text-zinc-200 truncate">{t.name}</h3>
                              <p className="text-blue-400 text-[10px] uppercase font-bold tracking-wider">{t.category}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingTool(t)}
                              className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTool(t.name)}
                              className="p-1.5 rounded-md hover:bg-rose-500/5 text-zinc-400 hover:text-rose-400 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Tool Edit Form
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-900 pb-3">
                      {editingTool.isNew ? "Create New Tool Card" : `Edit Tool: ${editingTool.name}`}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Tool Name</label>
                        <input
                          type="text"
                          value={editingTool.name}
                          onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                          placeholder="VS Code"
                          disabled={!editingTool.isNew}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Category</label>
                        <input
                          type="text"
                          value={editingTool.category}
                          onChange={(e) => setEditingTool({ ...editingTool, category: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                          placeholder="IDE / Editor"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">SVG Icon Link (Devicon or asset)</label>
                        <input
                          type="text"
                          value={editingTool.icon}
                          onChange={(e) => setEditingTool({ ...editingTool, icon: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Tool Homepage URL</label>
                        <input
                          type="text"
                          value={editingTool.href}
                          onChange={(e) => setEditingTool({ ...editingTool, href: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                          placeholder="https://code.visualstudio.com"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        onClick={() => handleSaveTool(editingTool)}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-[#00E5FF] px-6 py-3 text-sm font-bold text-zinc-950 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        Save Tool
                      </button>
                      <button
                        onClick={() => setEditingTool(null)}
                        className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* EXPERIENCE & SKILLS TAB */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                {!editingExp && !editingSkill ? (
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6">
                    {/* Sub-tab Navigation */}
                    <div className="flex border-b border-zinc-900 mb-6 gap-6">
                      <button
                        onClick={() => setExpSubTab("timeline")}
                        className={`pb-3 text-sm font-bold tracking-wide transition-all border-b-2 cursor-pointer ${
                          expSubTab === "timeline" ? "border-blue-500 text-blue-400" : "border-transparent text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        Career Timeline
                      </button>
                      <button
                        onClick={() => setExpSubTab("skills")}
                        className={`pb-3 text-sm font-bold tracking-wide transition-all border-b-2 cursor-pointer ${
                          expSubTab === "skills" ? "border-blue-500 text-blue-400" : "border-transparent text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        Technical Skills
                      </button>
                    </div>

                    {expSubTab === "timeline" ? (
                      <>
                        <div className="flex items-center justify-between border-b border-zinc-900/60 pb-4 mb-6">
                          <div>
                            <h2 className="text-lg font-bold text-zinc-100">Timeline Entries ({experience.length})</h2>
                            <p className="text-zinc-400 text-xs mt-1">Manage career logs, internship markers, and responsibilities</p>
                          </div>
                          <button
                            onClick={() => setEditingExp({
                              isNew: true,
                              title: "",
                              role: "",
                              company: "",
                              companySubtitle: "",
                              location: "",
                              type: "full-time",
                              points: [],
                              tags: []
                            })}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 px-3.5 py-2 text-xs font-bold text-blue-400 hover:bg-blue-500/20 transition-all cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add Entry
                          </button>
                        </div>

                        <div className="space-y-4">
                          {experience.map((exp) => (
                            <div key={exp.id} className="group border border-zinc-900 bg-zinc-900/10 rounded-xl p-5 hover:border-zinc-800 transition-all flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2.5 mb-1.5">
                                  <h3 className="font-bold text-sm text-zinc-200">{exp.role} · {exp.company}</h3>
                                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                    exp.type === "full-time" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                  }`}>
                                    {exp.type}
                                  </span>
                                </div>
                                <p className="text-xs text-zinc-400">{exp.title} • {exp.location}</p>
                                <p className="text-xs text-zinc-500 italic mt-1">{exp.companySubtitle}</p>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setEditingExp({
                                    ...exp,
                                    points: exp.points || [],
                                    tags: exp.tags || []
                                  })}
                                  className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteExp(exp.id)}
                                  className="p-1.5 rounded-md hover:bg-rose-500/5 text-zinc-400 hover:text-rose-400 cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between border-b border-zinc-900/60 pb-4 mb-6">
                          <div>
                            <h2 className="text-lg font-bold text-zinc-100">Technical Skills Mastered ({skills.length})</h2>
                            <p className="text-zinc-400 text-xs mt-1">Manage technical skill groups shown on your Experience timeline page</p>
                          </div>
                          <button
                            onClick={() => setEditingSkill({
                              isNew: true,
                              title: "",
                              originalTitle: "",
                              items: [],
                              colorClass: "text-blue-400",
                              hoverBorderClass: "hover:border-blue-500/35 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                            })}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 px-3.5 py-2 text-xs font-bold text-blue-400 hover:bg-blue-500/20 transition-all cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add Skill Group
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {skills.map((cat) => (
                            <div key={cat.title} className="group border border-zinc-900 bg-zinc-900/10 rounded-xl p-5 hover:border-zinc-800 transition-all flex justify-between items-start">
                              <div className="min-w-0 flex-1">
                                <h3 className={`font-bold text-sm mb-1.5 ${cat.colorClass || "text-zinc-200"}`}>{cat.title}</h3>
                                <div className="flex flex-wrap gap-1.5">
                                  {cat.items.map((item: string) => (
                                    <span key={item} className="text-[10px] bg-zinc-950 border border-zinc-900 text-zinc-400 px-2 py-0.5 rounded-full">
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 ml-3">
                                <button
                                  onClick={() => setEditingSkill({
                                    ...cat,
                                    items: cat.items || [],
                                    originalTitle: cat.title,
                                    isNew: false
                                  })}
                                  className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteSkill(cat.title)}
                                  className="p-1.5 rounded-md hover:bg-rose-500/5 text-zinc-400 hover:text-rose-400 cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : editingExp ? (
                  // Experience Edit Form
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-900 pb-3">
                      {editingExp.isNew ? "Create Timeline Entry" : `Edit Entry: ${editingExp.role}`}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Job Role / Position</label>
                        <input
                          type="text"
                          value={editingExp.role}
                          onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                          placeholder="Full Stack Developer"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Company Name</label>
                        <input
                          type="text"
                          value={editingExp.company}
                          onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                          placeholder="Labmentix"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Date Range / Duration</label>
                        <input
                          type="text"
                          value={editingExp.title}
                          onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                          placeholder="Sep 2025 - Mar 2026"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Location details</label>
                        <input
                          type="text"
                          value={editingExp.location}
                          onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                          placeholder="Full-Time · Noida/Remote"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Job Category</label>
                        <select
                          value={editingExp.type}
                          onChange={(e) => setEditingExp({ ...editingExp, type: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                        >
                          <option value="full-time">Full-Time</option>
                          <option value="internship">Internship</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Company Subtitle / description</label>
                        <input
                          type="text"
                          value={editingExp.companySubtitle}
                          onChange={(e) => setEditingExp({ ...editingExp, companySubtitle: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                          placeholder="Full-stack web applications development"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                        Bullet Points (one per line)
                      </label>
                      <textarea
                        rows={5}
                        value={editingExp.points.join("\n")}
                        onChange={(e) => setEditingExp({
                          ...editingExp,
                          points: e.target.value.split("\n").filter(Boolean)
                        })}
                        className="w-full resize-none rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                        placeholder="Engineered scalable systems..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                        Experience tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={editingExp.tags.join(", ")}
                        onChange={(e) => setEditingExp({
                          ...editingExp,
                          tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                        })}
                        className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                        placeholder="React, Spring Boot, MySQL"
                      />
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        onClick={() => handleSaveExp(editingExp)}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-[#00E5FF] px-6 py-3 text-sm font-bold text-zinc-950 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        Save Timeline Entry
                      </button>
                      <button
                        onClick={() => setEditingExp(null)}
                        className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Skill Edit Form
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-900 pb-3">
                      {editingSkill.isNew ? "Create Skill Category" : `Edit Skill Category: ${editingSkill.title}`}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Category Title</label>
                        <input
                          type="text"
                          value={editingSkill.title}
                          onChange={(e) => setEditingSkill({ ...editingSkill, title: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                          placeholder="Frontend"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Text Color Class (Tailwind)</label>
                        <input
                          type="text"
                          value={editingSkill.colorClass}
                          onChange={(e) => setEditingSkill({ ...editingSkill, colorClass: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                          placeholder="text-blue-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Hover Border & Shadow Glow CSS Class (Tailwind)</label>
                      <input
                        type="text"
                        value={editingSkill.hoverBorderClass}
                        onChange={(e) => setEditingSkill({ ...editingSkill, hoverBorderClass: e.target.value })}
                        className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                        placeholder="hover:border-blue-500/35 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                        Skills / Technologies (comma separated)
                      </label>
                      <textarea
                        rows={4}
                        value={editingSkill.items.join(", ")}
                        onChange={(e) => setEditingSkill({
                          ...editingSkill,
                          items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                        })}
                        className="w-full resize-none rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                        placeholder="React.js, Angular.js, HTML5"
                      />
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        onClick={() => handleSaveSkill(editingSkill)}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-[#00E5FF] px-6 py-3 text-sm font-bold text-zinc-950 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        Save Skill Group
                      </button>
                      <button
                        onClick={() => setEditingSkill(null)}
                        className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>      )}
              </div>
            )}

            {/* CUSTOM SECTIONS TAB */}
            {activeTab === "customSections" && (
              <div className="space-y-6">
                {!editingCustomSection ? (
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-zinc-100">Custom Dynamic Sections ({customSections.length})</h2>
                        <p className="text-zinc-400 text-xs mt-1">Add custom content sections to the homepage (e.g., Certificates, Research, etc.)</p>
                      </div>
                      <button
                        onClick={() => setEditingCustomSection({
                          isNew: true,
                          title: "",
                          content: "",
                          icon: "Sparkles",
                          order: customSections.length
                        })}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 px-3.5 py-2 text-xs font-bold text-blue-400 hover:bg-blue-500/20 transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add New Section
                      </button>
                    </div>

                    <div className="space-y-4">
                      {customSections.sort((a, b) => (a.order || 0) - (b.order || 0)).map((sec) => (
                        <div key={sec.id} className="group border border-zinc-900 bg-zinc-900/10 rounded-xl p-5 hover:border-zinc-800 transition-all flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2.5 mb-1.5">
                              <h3 className="font-bold text-sm text-zinc-200">{sec.title}</h3>
                              <span className="text-[10px] bg-zinc-950 border border-zinc-900 text-blue-400 px-2 py-0.5 rounded-full font-bold">
                                Order: {sec.order || 0}
                              </span>
                              <span className="text-[10px] bg-zinc-950 border border-zinc-900 text-zinc-400 px-2 py-0.5 rounded-full">
                                Icon: {sec.icon || "Sparkles"}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-2 mt-1 whitespace-pre-wrap">{sec.content}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingCustomSection({ ...sec, isNew: false })}
                              className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCustomSection(sec.id)}
                              className="p-1.5 rounded-md hover:bg-rose-500/5 text-zinc-400 hover:text-rose-400 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Custom Section Edit Form
                  <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6 space-y-6">
                    <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-900 pb-3">
                      {editingCustomSection.isNew ? "Create Custom Section" : `Edit Custom Section: ${editingCustomSection.title}`}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-550 mb-1.5">Section Title</label>
                        <input
                          type="text"
                          value={editingCustomSection.title}
                          onChange={(e) => setEditingCustomSection({ ...editingCustomSection, title: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                          placeholder="Certificates & Accolades"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-550 mb-1.5">Display Order</label>
                        <input
                          type="number"
                          value={editingCustomSection.order || 0}
                          onChange={(e) => setEditingCustomSection({ ...editingCustomSection, order: parseInt(e.target.value) || 0 })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-550 mb-1.5">Lucide Icon Name</label>
                        <select
                          value={editingCustomSection.icon || "Sparkles"}
                          onChange={(e) => setEditingCustomSection({ ...editingCustomSection, icon: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-300 outline-none focus:border-blue-500/50"
                        >
                          <option value="Sparkles">Sparkles (Default)</option>
                          <option value="Award">Award (Certificates)</option>
                          <option value="BookOpen">BookOpen (Publications/Education)</option>
                          <option value="Heart">Heart (Interests/Interactivity)</option>
                          <option value="Laptop">Laptop (Tech Stack/Hardware)</option>
                          <option value="Terminal">Terminal (Command Line/Development)</option>
                          <option value="Star">Star (Accolades)</option>
                          <option value="TrendingUp">TrendingUp (Growth)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-550 mb-1.5">Custom Icon Text (Or custom CSS/Lucide symbol)</label>
                        <input
                          type="text"
                          value={editingCustomSection.icon || "Sparkles"}
                          onChange={(e) => setEditingCustomSection({ ...editingCustomSection, icon: e.target.value })}
                          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-250 outline-none focus:border-blue-500/50"
                          placeholder="Or type Lucide icon name manually (e.g. Code, Shield)"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-550 mb-1.5">
                        Section Content / Description
                      </label>
                      <textarea
                        rows={10}
                        value={editingCustomSection.content}
                        onChange={(e) => setEditingCustomSection({
                          ...editingCustomSection,
                          content: e.target.value
                        })}
                        className="w-full resize-none rounded-xl border border-zinc-850 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-blue-500/50"
                        placeholder="Describe achievements, display custom markdown or normal paragraphs..."
                      />
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        onClick={() => handleSaveCustomSection(editingCustomSection)}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-[#00E5FF] px-6 py-3 text-sm font-bold text-zinc-950 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        Save Custom Section
                      </button>
                      <button
                        onClick={() => setEditingCustomSection(null)}
                        className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
