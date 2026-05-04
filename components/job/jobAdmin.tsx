"use client";

import { useState, useRef } from "react";

import { INITIAL_JOBS } from "@/constants/initialJobs";
import type { Job } from "@/types/job";

export default function JobAdmin() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "active" | "closed">("All");
  const [modal, setModal] = useState<null | "new" | "edit">(null);
  const [editJob, setEditJob] = useState<Job | null>(null);

  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "Full-time" as const,
    salary: "",
    description: "",
    requirements: "",
    tags: ""
  });

  const [notification, setNotification] = useState<{ msg: string; type?: "success" | "error" } | null>(null);

  const nextId = useRef(100);

  const notify = (msg: string, type: "success" | "error" = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2800);
  };

  const filteredJobs = jobs.filter((job) => {
    const q = search.toLowerCase();
    const matchSearch = job.title.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || job.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openNew = () => {
    setForm({ title: "", location: "", type: "Full-time", salary: "", description: "", requirements: "", tags: "" });
    setEditJob(null);
    setModal("new");
  };

  const openEdit = (job: Job) => {
    setForm({
      title: job.title,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements.join(", "),
      tags: job.tags.join(", ")
    });
    setEditJob(job);
    setModal("edit");
  };

  const saveJob = () => {
    if (!form.title.trim()) {
      notify("Job Title is required!", "error");
      return;
    }

    const requirements = form.requirements.split(",").map(r => r.trim()).filter(Boolean);
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);

    const now = new Date().toLocaleDateString("en-GB", { 
      day: "numeric", 
      month: "short", 
      year: "numeric" 
    });

    if (editJob) {
      setJobs(jobs.map(j => 
        j.id === editJob.id 
          ? { ...j, ...form, requirements, tags, postedDate: now }
          : j
      ));
      notify("Job updated successfully!");
    } else {
      const newJob: Job = {
        id: nextId.current++,
        title: form.title,
        company: "Laneway Tech",        // Fixed company
        location: form.location,
        type: form.type,
        salary: form.salary,
        description: form.description,
        requirements,
        tags,
        postedDate: now,
        status: "active"
      };
      setJobs([...jobs, newJob]);
      notify("New job posted successfully!");
    }
    setModal(null);
  };

  const deleteJob = (id: number) => {
    setJobs(jobs.filter(j => j.id !== id));
    notify("Job deleted", "error");
  };

  const toggleStatus = (id: number) => {
    setJobs(jobs.map(j => 
      j.id === id ? { ...j, status: j.status === "active" ? "closed" : "active" } : j
    ));
    notify("Job status updated");
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#0A0A0A", 
      color: "#e8e8ee", 
      fontFamily: "'DM Sans', sans-serif" 
    }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap');
      `}</style>

      {notification && <Notification message={notification.msg} type={notification.type} />}

      {/* Header */}
      <div style={{ 
        padding: "1.8rem 2.5rem", 
        background: "#111111", 
        borderBottom: "1px solid #222222",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#F5B513", margin: 0 }}>
            Laneway Jobs Admin
          </h1>
          <p style={{ color: "#888", margin: "6px 0 0 0" }}>{filteredJobs.length} jobs found</p>
        </div>

        <button 
          onClick={openNew}
          style={{
            background: "#F5B513",
            color: "#111",
            padding: "14px 28px",
            border: "none",
            borderRadius: "12px",
            fontWeight: 600,
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          + Post New Job
        </button>
      </div>

      {/* Search & Filter */}
      <div style={{ padding: "1.5rem 2.5rem", background: "#111111", borderBottom: "1px solid #222" }}>
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "520px",
            padding: "14px 18px",
            background: "#1A1A1A",
            border: "2px solid #F5B513",
            borderRadius: "12px",
            color: "white",
            fontSize: "15px",
            outline: "none"
          }}
        />
      </div>

      {/* Jobs Table */}
      <div style={{ padding: "2rem 2.5rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #333" }}>
              <th style={{ textAlign: "left", padding: "14px 12px", color: "#aaa" }}>Job Title</th>
              <th style={{ textAlign: "left", padding: "14px 12px", color: "#aaa" }}>Location</th>
              <th style={{ textAlign: "left", padding: "14px 12px", color: "#aaa" }}>Type</th>
              <th style={{ textAlign: "left", padding: "14px 12px", color: "#F5B513" }}>Salary</th>
              <th style={{ textAlign: "center", padding: "14px 12px", color: "#aaa" }}>Status</th>
              <th style={{ textAlign: "center", padding: "14px 12px", color: "#aaa" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: "80px 20px", color: "#666" }}>No jobs found</td></tr>
            ) : (
              filteredJobs.map((job) => (
                <tr key={job.id} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "18px 12px", fontWeight: 500 }}>{job.title}</td>
                  <td style={{ padding: "18px 12px" }}>{job.location}</td>
                  <td style={{ padding: "18px 12px" }}>{job.type}</td>
                  <td style={{ padding: "18px 12px", color: "#F5B513", fontWeight: 500 }}>{job.salary}</td>
                  <td style={{ padding: "18px 12px", textAlign: "center" }}>
                    <span style={{
                      padding: "8px 18px",
                      borderRadius: "999px",
                      fontSize: "13.5px",
                      background: job.status === "active" ? "rgba(103, 232, 249, 0.15)" : "rgba(156, 163, 175, 0.15)",
                      color: job.status === "active" ? "#67E8F9" : "#9CA3AF",
                      border: `1px solid ${job.status === "active" ? "#67E8F9" : "#6B7280"}`
                    }}>
                      {job.status === "active" ? "● Active" : "○ Closed"}
                    </span>
                  </td>
                  <td style={{ padding: "18px 12px", textAlign: "center" }}>
                    <button onClick={() => openEdit(job)} style={{ margin: "0 5px", padding: "8px 16px", background: "#222", border: "1px solid #555", borderRadius: "8px", color: "#ddd" }}>Edit</button>
                    <button onClick={() => toggleStatus(job.id)} style={{ margin: "0 5px", padding: "8px 16px", background: "#222", border: "1px solid #555", borderRadius: "8px", color: "#ddd" }}>
                      {job.status === "active" ? "Close" : "Reopen"}
                    </button>
                    <button onClick={() => deleteJob(job.id)} style={{ margin: "0 5px", padding: "8px 16px", background: "#3A1010", color: "#F87171", border: "1px solid #7F1D1D", borderRadius: "8px" }}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Job Posting Modal */}
      <Modal open={modal !== null} onClose={() => setModal(null)}>
        <div style={{ color: "#F5B513", fontSize: "24px", fontWeight: 700, marginBottom: "1.5rem" }}>
          {modal === "edit" ? "Edit Job" : "Post New Job"}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", color: "#aaa", fontSize: "14px" }}>Job Title *</label>
            <input 
              value={form.title} 
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Senior Frontend Developer"
              style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white", fontSize: "15px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", color: "#aaa", fontSize: "14px" }}>Location</label>
            <input 
              value={form.location} 
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Delhi, India or Remote"
              style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white", fontSize: "15px" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "6px", color: "#aaa", fontSize: "14px" }}>Job Type</label>
              <select 
                value={form.type} 
                onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white" }}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "6px", color: "#aaa", fontSize: "14px" }}>Salary</label>
              <input 
                value={form.salary} 
                onChange={(e) => setForm({ ...form, salary: e.target.value })}
                placeholder="e.g. ₹12 - 18 LPA"
                style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white", fontSize: "15px" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", color: "#aaa", fontSize: "14px" }}>Description</label>
            <textarea 
              value={form.description} 
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              placeholder="Write about the job role and responsibilities..."
              style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white", resize: "vertical", fontSize: "15px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", color: "#aaa", fontSize: "14px" }}>Requirements (comma separated)</label>
            <input 
              value={form.requirements} 
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
              placeholder="React, Next.js, TypeScript, Tailwind CSS"
              style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white", fontSize: "15px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", color: "#aaa", fontSize: "14px" }}>Tags (comma separated)</label>
            <input 
              value={form.tags} 
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="Frontend, React, Hiring"
              style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white", fontSize: "15px" }}
            />
          </div>
        </div>

        <div style={{ marginTop: "2rem", display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button 
            onClick={() => setModal(null)} 
            style={{ padding: "12px 24px", border: "1px solid #555", borderRadius: "10px", background: "transparent", color: "#ddd" }}
          >
            Cancel
          </button>
          <button 
            onClick={saveJob}
            style={{ 
              background: "#F5B513", 
              color: "#111", 
              padding: "12px 28px", 
              border: "none", 
              borderRadius: "10px", 
              fontWeight: 600,
              fontSize: "15px"
            }}
          >
            {modal === "edit" ? "Update Job" : "Post Job"}
          </button>
        </div>
      </Modal>
    </div>
  );
}