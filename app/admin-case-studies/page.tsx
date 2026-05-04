"use client";

import { useState, useRef, useEffect } from "react";

type CaseStudy = {
  id: number;
  name: string;
  category: "Our projects" | "Client projects" | "Other case studies";
  tagline: string;
  problem: string;
  solution: string;
  results: string[];
  logo: string;
  href: string;
  showDetails: boolean;
  status: "active" | "inactive";
};

export default function CaseStudiesAdmin() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"All" | "Our projects" | "Client projects" | "Other case studies">("All");
  const [modal, setModal] = useState<null | "new" | "edit">(null);
  const [editStudy, setEditStudy] = useState<CaseStudy | null>(null);
  const [notification, setNotification] = useState<{ msg: string; type?: "success" | "error" } | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "Our projects" as const,
    tagline: "",
    problem: "",
    solution: "",
    results: "",
    logo: "",
    href: "",
    showDetails: true
  });

  const nextId = useRef(100);

  const notify = (msg: string, type: "success" | "error" = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2800);
  };

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  useEffect(() => {
    const saved = localStorage.getItem('laneway-case-studies');
    if (saved) {
      const savedStudies: CaseStudy[] = JSON.parse(saved);
      setCaseStudies(savedStudies);
      nextId.current = Math.max(0, ...savedStudies.map(s => s.id)) + 1;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('laneway-case-studies', JSON.stringify(caseStudies));
  }, [caseStudies]);

  const filteredStudies = caseStudies.filter((study) => {
    const q = search.toLowerCase();
    const matchSearch = study.name.toLowerCase().includes(q) || study.tagline.toLowerCase().includes(q);
    const matchCategory = categoryFilter === "All" || study.category === categoryFilter;
    const matchStatus = study.status === 'active';
    return matchStatus && matchSearch && matchCategory;
  });

  const openNew = () => {
    setForm({
      name: "",
      category: "Our projects",
      tagline: "",
      problem: "",
      solution: "",
      results: "",
      logo: "",
      href: "",
      showDetails: true
    });
    setEditStudy(null);
    setModal("new");
  };

  const openEdit = (study: CaseStudy) => {
    setForm({
      name: study.name,
      category: study.category,
      tagline: study.tagline,
      problem: study.problem,
      solution: study.solution,
      results: study.results.join(", "),
      logo: study.logo,
      href: study.href,
      showDetails: study.showDetails
    });
    setEditStudy(study);
    setModal("edit");
  };

  const saveStudy = () => {
    if (!form.name.trim()) {
      notify("Name is required!", "error");
      return;
    }

    const results = form.results.split(",").map(r => r.trim()).filter(Boolean);

    setCaseStudies(currentStudies => {
      if (editStudy) {
        const updated = currentStudies.map(s => 
          s.id === editStudy.id 
            ? { 
                ...s, 
                name: form.name,
                category: form.category,
                tagline: form.tagline,
                problem: form.problem,
                solution: form.solution,
                results,
                logo: form.logo,
                href: form.href,
                showDetails: form.showDetails
              }
            : s
        );
        notify("Case study updated!");
        localStorage.setItem('laneway-case-studies', JSON.stringify(updated));
        return updated;
      } else {
        const newStudy: CaseStudy = {
          id: nextId.current++,
          name: form.name,
          category: form.category,
          tagline: form.tagline,
          problem: form.problem,
          solution: form.solution,
          results,
          logo: form.logo,
          href: form.href,
          showDetails: form.showDetails,
          status: "active" as const
        };
        const updated = [...currentStudies, newStudy];
        localStorage.setItem('laneway-case-studies', JSON.stringify(updated));
        notify("New case study added! 🎉");
        return updated;
      }
    });
    setModal(null);
  };

  const deleteStudy = (id: number) => {
    setCaseStudies(current => {
      const newStudies = current.filter(s => s.id !== id);
      localStorage.setItem('laneway-case-studies', JSON.stringify(newStudies));
      return newStudies;
    });
    notify("Case study deleted", "error");
  };

  const toggleStatus = (id: number) => {
    setCaseStudies(current => {
      const newStudies = current.map(s => 
        s.id === id 
          ? { ...s, status: s.status === "active" ? "inactive" as const : "active" as const }
          : s
      );
      localStorage.setItem('laneway-case-studies', JSON.stringify(newStudies));
      return newStudies;
    });
    notify("Status updated");
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#0A0A0A", 
      color: "#e8e8ee", 
      fontFamily: "'DM Sans', sans-serif" 
    }}>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          background: #111111;
          border: 1px solid #333;
          border-radius: 16px;
          padding: 2rem;
          width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          max-width: 95vw;
          box-shadow: 0 25px 80px rgba(0,0,0,0.8);
        }
      `}</style>

      {notification && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 2000,
          background: notification.type === "error" ? "#3a1010" : "#0e2a1a",
          border: `1px solid ${notification.type === "error" ? "#7f1d1d" : "#14532d"}`,
          color: notification.type === "error" ? "#fca5a5" : "#86efac",
          padding: "12px 20px", borderRadius: 12, fontSize: 15, fontWeight: 500
        }}>
          {notification.msg}
        </div>
      )}

      <div style={{ 
        padding: "1.8rem 2.5rem", 
        background: "#111111", 
        borderBottom: "1px solid #222222",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h1 style={{ fontSize: "29px", fontWeight: 700, color: "#F5B513", margin: 0 }}>
            Case Studies Admin
          </h1>
          <p style={{ color: "#888", marginTop: "6px" }}>{filteredStudies.length} case studies</p>
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
            cursor: "pointer"
          }}
        >
          + Add New Case Study
        </button>
      </div>

      <div style={{ padding: "2rem 2.5rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #333" }}>
              <th style={{ textAlign: "left", padding: "16px 12px", color: "#aaa" }}>Name</th>
              <th style={{ textAlign: "left", padding: "16px 12px", color: "#aaa" }}>Category</th>
              <th style={{ textAlign: "center", padding: "16px 12px", color: "#aaa" }}>Status</th>
              <th style={{ textAlign: "center", padding: "16px 12px", color: "#aaa" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudies.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "80px", color: "#666" }}>
                  No case studies found. Add one using the button above.
                </td>
              </tr>
            ) : (
              filteredStudies.map((study) => (
                <tr key={study.id} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "18px 12px" }}>{study.name}</td>
                  <td style={{ padding: "18px 12px" }}>{study.category}</td>
                  <td style={{ padding: "18px 12px", textAlign: "center" }}>
                    <span style={{
                      padding: "8px 18px",
                      borderRadius: "999px",
                      fontSize: "13.5px",
                      background: study.status === "active" ? "rgba(103, 232, 249, 0.15)" : "rgba(156, 163, 175, 0.15)",
                      color: study.status === "active" ? "#67E8F9" : "#9CA3AF"
                    }}>
                      {study.status === "active" ? "● Active" : "○ Inactive"}
                    </span>
                  </td>
                  <td style={{ padding: "18px 12px", textAlign: "center" }}>
                    <button onClick={() => openEdit(study)} style={{ margin: "0 4px", padding: "8px 16px", background: "#222", border: "1px solid #555", borderRadius: "8px", color: "#ddd" }}>Edit</button>
                    <button onClick={() => toggleStatus(study.id)} style={{ margin: "0 4px", padding: "8px 16px", background: "#222", border: "1px solid #555", borderRadius: "8px", color: "#ddd" }}>
                      {study.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => deleteStudy(study.id)} style={{ margin: "0 4px", padding: "8px 16px", background: "#3A1010", color: "#F87171", border: "1px solid #7F1D1D", borderRadius: "8px" }}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ color: "#F5B513", fontSize: "24px", fontWeight: 700, marginBottom: "1.5rem" }}>
              {modal === "edit" ? "Edit Case Study" : "Add New Case Study"}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>Name *</label>
                <input 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>Category</label>
                <select 
                  value={form.category} 
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white" }}
                >
                  <option value="Our projects">Our projects</option>
                  <option value="Client projects">Client projects</option>
                  <option value="Other case studies">Other case studies</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>Tagline</label>
                <input 
                  value={form.tagline} 
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>Problem</label>
                <textarea 
                  value={form.problem} 
                  onChange={(e) => setForm({ ...form, problem: e.target.value })}
                  rows={3}
                  style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>Solution</label>
                <textarea 
                  value={form.solution} 
                  onChange={(e) => setForm({ ...form, solution: e.target.value })}
                  rows={3}
                  style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>Results (comma separated)</label>
                <textarea 
                  value={form.results} 
                  onChange={(e) => setForm({ ...form, results: e.target.value })}
                  rows={3}
                  style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>Logo Image Path</label>
                <input 
                  value={form.logo} 
                  onChange={(e) => setForm({ ...form, logo: e.target.value })}
                  placeholder="/logo.png"
                  style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "6px", color: "#aaa" }}>Subpage URL</label>
                <input 
                  value={form.href} 
                  onChange={(e) => setForm({ ...form, href: e.target.value })}
                  placeholder="/our-projects/my-project"
                  style={{ width: "100%", padding: "14px", background: "#1A1A1A", border: "1px solid #444", borderRadius: "10px", color: "white" }}
                />
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <label style={{ color: "#aaa" }}>
                  <input type="checkbox" checked={form.showDetails} onChange={(e) => setForm({ ...form, showDetails: e.target.checked })} />
                  Show Details Section
                </label>
              </div>
            </div>
            <div style={{ marginTop: "2rem", display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button onClick={() => setModal(null)} style={{ padding: "12px 24px", border: "1px solid #555", borderRadius: "10px", background: "transparent", color: "#ddd" }}>Cancel</button>
              <button onClick={saveStudy} style={{ background: "#F5B513", color: "#111", padding: "12px 28px", border: "none", borderRadius: "10px", fontWeight: 600 }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
