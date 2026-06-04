"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IconMail, IconMapPin, IconPhone, IconCheck, IconArrow } from "@/components/Icons";

const WEBHOOK = "https://aiautomation.digicides.com/webhook-test/namuste";

type FormState = {
  role: "retailer" | "distributor" | "brand" | "";
  category: string;
  location: string;
  companySize: string;
  channelSize: string;
  name: string;
  email: string;
  mobile: string;
  company: string;
  message: string;
};

function validateEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function validateMobile(v: string) { return /^[6-9]\d{9}$/.test(v.replace(/\s/g, "")); }

export default function ContactWizardPage() {
  const empty: FormState = {
    role: "",
    category: "agriculture",
    location: "",
    companySize: "<50 employees",
    channelSize: "<100 partners",
    name: "",
    email: "",
    mobile: "",
    company: "",
    message: "",
  };

  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const selectRole = (selectedRole: "retailer" | "distributor" | "brand") => {
    setForm({ ...form, role: selectedRole });
    setStep(2);
  };

  const handleNextStep = () => {
    if (step === 2) {
      const e: Partial<FormState> = {};
      if (form.role !== "brand" && !form.location.trim()) {
        e.location = "Business location/city is required";
        setErrors(e);
        return;
      }
      setErrors({});
      setStep(3);
    }
  };

  const handleBackStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<FormState> = {};

    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim()) errs.email = "Email address is required";
    else if (!validateEmail(form.email)) errs.email = "Enter a valid email address";
    
    if (!form.mobile.trim()) errs.mobile = "Mobile number is required";
    else if (!validateMobile(form.mobile)) errs.mobile = "Enter a valid 10-digit mobile number";

    if (form.message.trim().length > 0 && form.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("loading");

    const payload = JSON.stringify({
      role: form.role,
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      company: form.company,
      location: form.location,
      category: form.role !== "brand" ? form.category : undefined,
      company_size: form.role === "brand" ? form.companySize : undefined,
      channel_size: form.role === "brand" ? form.channelSize : undefined,
      message: form.message,
      submitted_at: new Date().toISOString(),
      source: "namuste.in contact wizard",
    });

    try {
      await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: payload,
      });
    } catch (err) {
      // CORS preflight safety / fallback
    }

    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setForm(empty);
      setStep(1);
      setErrors({});
    }, 7000);
  };

  // Styles utility
  const inputStyle = (field: keyof FormState): React.CSSProperties => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: errors[field] ? "1px solid rgba(248,113,113,.5)" : "1px solid var(--border2)",
    background: "var(--input-bg)",
    color: "var(--ink)",
    outline: "none",
    fontSize: "14px",
    fontFamily: "'DM Sans',system-ui,sans-serif",
    transition: "border-color .2s",
  });

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh", paddingTop: "110px", overflowX: "hidden" }}>
        
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "64px", alignItems: "start" }} className="cg">
            
            {/* Left side informational copy */}
            <div>
              <span className="pill" style={{ marginBottom: "22px" }}>Join the Cohort</span>
              <h1 className="hf" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "18px", color: "var(--ink)" }}>
                Ready to <span className="gt">Optimize</span> Your Channel?
              </h1>
              <p style={{ color: "var(--ink2)", fontSize: "15px", lineHeight: 1.8, marginBottom: "36px" }}>
                Whether you are an independent retail dealer, a regional wholesaler, or a corporate brand director — let&apos;s talk about digitizing your sales counters.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "36px" }}>
                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-green)", flexShrink: 0 }}>
                    <IconMail size={16} />
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>Email Correspondence</span>
                    <h4 className="hf" style={{ fontSize: "14px", color: "var(--ink)", marginTop: "2px" }}>connect@namuste.com</h4>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-green)", flexShrink: 0 }}>
                    <IconMapPin size={16} />
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>Corporate Head Office</span>
                    <h4 className="hf" style={{ fontSize: "14px", color: "var(--ink)", marginTop: "2px", lineHeight: 1.5 }}>245 B/1, Raipur Road, Kolkata 700047, West Bengal</h4>
                  </div>
                </div>
              </div>

              {["Instant cashback opportunities for partners", "Live performance reporting for brand managers", "OTP verification cycle eliminates delivery disputes"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(82,204,79,0.1)", border: "1px solid var(--border2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="3" style={{ margin: "auto" }}><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <span style={{ color: "var(--ink2)", fontSize: "13px" }}>{t}</span>
                </div>
              ))}
            </div>

            {/* Right side Wizard Card */}
            <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "20px", padding: "36px", boxShadow: "var(--shadow)" }}>
              
              {/* SUCCESS VIEW */}
              {status === "success" && (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(82,204,79,0.12)", border: "1px solid var(--accent-green-mid)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <IconCheck size={28} color="var(--accent-green)" />
                  </div>
                  <h3 className="hf" style={{ fontWeight: 800, color: "var(--ink)", fontSize: "22px", marginBottom: "8px" }}>Request Submitted!</h3>
                  <p style={{ color: "var(--ink2)", fontSize: "14px", lineHeight: 1.6, marginBottom: "4px" }}>
                    We have logged your role and target specs.
                  </p>
                  <p style={{ color: "var(--accent-green)", fontSize: "13px", fontWeight: "bold" }}>
                    The Namuste team will follow up at {form.email} soon.
                  </p>
                </div>
              )}

              {/* LOADING VIEW */}
              {status === "loading" && (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="2" style={{ margin: "0 auto 16px" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
                  </svg>
                  <h4 className="hf" style={{ color: "var(--ink)", fontSize: "16px", fontWeight: "bold" }}>Filing Onboarding Request...</h4>
                </div>
              )}

              {/* STEPS RUNNING */}
              {status !== "success" && status !== "loading" && (
                <div>
                  
                  {/* Step Progress indicators */}
                  <div style={{ display: "flex", gap: "10px", marginBottom: "28px" }}>
                    {[1, 2, 3].map((s) => (
                      <div key={s} style={{ 
                        flex: 1, 
                        height: "4px", 
                        borderRadius: "2px", 
                        background: step >= s ? "var(--accent-green)" : "var(--surface)" 
                      }} />
                    ))}
                  </div>

                  {/* STEP 1: Select Role */}
                  {step === 1 && (
                    <div>
                      <h3 className="hf" style={{ fontWeight: 800, fontSize: "18px", color: "var(--ink)", marginBottom: "8px" }}>Who are you?</h3>
                      <p style={{ color: "var(--ink2)", fontSize: "13px", marginBottom: "20px" }}>Select your business category to customize your dynamic form.</p>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {([
                          { id: "retailer", title: "Agri / Kirana Retailer", desc: "For independent dealer counters, pharmacy chemists, and grocery merchants." },
                          { id: "distributor", title: "Wholesale Distributor", desc: "For distributors and dealers shipping inventory orders to retailers." },
                          { id: "brand", title: "Brand / Enterprise Partner", desc: "For companies managing distributed dealer networks and incentives." }
                        ] as const).map((r) => (
                          <button key={r.id} onClick={() => selectRole(r.id)} style={{
                            width: "100%", textAlign: "left", padding: "16px 20px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--surface)", cursor: "pointer", transition: "all .2s"
                          }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-green-mid)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                          >
                            <h4 className="hf" style={{ fontWeight: 700, fontSize: "14px", color: "var(--ink)", marginBottom: "4px" }}>{r.title}</h4>
                            <p style={{ color: "var(--ink2)", fontSize: "12px", lineHeight: 1.5 }}>{r.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Category & Location details */}
                  {step === 2 && (
                    <div>
                      <h3 className="hf" style={{ fontWeight: 800, fontSize: "18px", color: "var(--ink)", marginBottom: "16px" }}>
                        {form.role === "brand" ? "Enterprise Information" : "Shop Details"}
                      </h3>

                      {form.role !== "brand" ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink2)", marginBottom: "6px" }}>Trade Category</label>
                            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={inputStyle("category")}>
                              <option value="agriculture">Agriculture & Seed Input</option>
                              <option value="pharmacy">Pharmacy & Chemist</option>
                              <option value="grocery">Kirana & Grocery Shop</option>
                              <option value="hardware">Hardware & Machinery</option>
                              <option value="textile">Textile & Apparel</option>
                              <option value="electronics">Electronics & Appliances</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink2)", marginBottom: "6px" }}>Business Location (District / State) *</label>
                            <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="e.g. Burdwan, West Bengal" style={inputStyle("location")} />
                            {errors.location && <div style={{ color: "#f87171", fontSize: "11px", marginTop: "4px" }}>{errors.location}</div>}
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink2)", marginBottom: "6px" }}>Company Size</label>
                            <select value={form.companySize} onChange={e => setForm({...form, companySize: e.target.value})} style={inputStyle("companySize")}>
                              <option value="<50 employees">&lt; 50 employees</option>
                              <option value="50-250 employees">50 - 250 employees</option>
                              <option value="250-1000 employees">250 - 1000 employees</option>
                              <option value="1000+ employees">1000+ employees</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink2)", marginBottom: "6px" }}>Distributed Retail Network Size</label>
                            <select value={form.channelSize} onChange={e => setForm({...form, channelSize: e.target.value})} style={inputStyle("channelSize")}>
                              <option value="<100 partners">&lt; 100 dealer counters</option>
                              <option value="100-1000 partners">100 - 1,000 dealers</option>
                              <option value="1000-5000 partners">1,000 - 5,000 dealers</option>
                              <option value="5000+ partners">5,000+ dealers</option>
                            </select>
                          </div>
                        </div>
                      )}

                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", gap: "12px" }}>
                        <button onClick={handleBackStep} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--ink)", cursor: "pointer", fontSize: "13px" }}>Back</button>
                        <button onClick={handleNextStep} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "var(--accent-green)", color: "var(--bg)", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>Next</button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Identification & Submission */}
                  {step === 3 && (
                    <form onSubmit={handleSubmit}>
                      <h3 className="hf" style={{ fontWeight: 800, fontSize: "18px", color: "var(--ink)", marginBottom: "16px" }}>Identities & Message</h3>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink2)", marginBottom: "6px" }}>Your Name *</label>
                          <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full Name" style={inputStyle("name")} />
                          {errors.name && <div style={{ color: "#f87171", fontSize: "11px", marginTop: "4px" }}>{errors.name}</div>}
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink2)", marginBottom: "6px" }}>Contact Email *</label>
                          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@company.com" style={inputStyle("email")} />
                          {errors.email && <div style={{ color: "#f87171", fontSize: "11px", marginTop: "4px" }}>{errors.email}</div>}
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink2)", marginBottom: "6px" }}>Mobile Number *</label>
                          <input type="tel" value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value.replace(/[^0-9]/g, "")})} placeholder="10-digit number" maxLength={10} style={inputStyle("mobile")} />
                          {errors.mobile && <div style={{ color: "#f87171", fontSize: "11px", marginTop: "4px" }}>{errors.mobile}</div>}
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink2)", marginBottom: "6px" }}>Business / Store Name</label>
                          <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Business name (Optional)" style={inputStyle("company")} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink2)", marginBottom: "6px" }}>Notes / Message</label>
                          <textarea rows={2} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us about your operations..." style={{...inputStyle("message"), resize: "none" as const}} />
                          {errors.message && <div style={{ color: "#f87171", fontSize: "11px", marginTop: "4px" }}>{errors.message}</div>}
                        </div>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", gap: "12px" }}>
                        <button type="button" onClick={handleBackStep} style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--surface)", color: "var(--ink)", cursor: "pointer", fontSize: "13px" }}>Back</button>
                        <button type="submit" style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "none", background: "var(--accent-green)", color: "var(--bg)", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>Submit Demo Request</button>
                      </div>
                    </form>
                  )}

                </div>
              )}

            </div>

          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){.cg{grid-template-columns:1fr!important;gap:40px!important}}
        select option{background:var(--bg2);color:var(--ink)}
      `}</style>
    </>
  );
}
