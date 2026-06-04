"use client";
import { useState } from "react";

const WEBHOOK = "https://aiautomation.digicides.com/webhook-test/namuste";

type FormState = { name:string; email:string; mobile:string; company:string; role:string; industry:string; message:string };
type Status = "idle"|"loading"|"success"|"error";

function validateEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
function validateMobile(v: string) { return /^[6-9]\d{9}$/.test(v.replace(/\s/g,"")); }

export default function Contact() {
  const empty: FormState = { name:"", email:"", mobile:"", company:"", role:"retailer", industry:"agriculture", message:"" };
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState,boolean>>>({});

  const validate = (f: FormState) => {
    const e: Partial<FormState> = {};
    if (!f.name.trim())                         e.name    = "Name is required";
    if (!f.email.trim())                        e.email   = "Email is required";
    else if (!validateEmail(f.email))           e.email   = "Enter a valid email address";
    if (!f.mobile.trim())                       e.mobile  = "Mobile number is required";
    else if (!validateMobile(f.mobile))         e.mobile  = "Enter a valid 10-digit Indian mobile number";
    if (f.message.trim().length > 0 && f.message.trim().length < 10)
                                                e.message = "Message must be at least 10 characters";
    return e;
  };

  const blur = (field: keyof FormState) => {
    setTouched(t => ({...t, [field]:true}));
    setErrors(validate(form));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Touch all fields to show errors
    setTouched({ name:true, email:true, mobile:true, company:true, role:true, industry:true, message:true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");

    const payload = JSON.stringify({
      name:         form.name,
      email:        form.email,
      mobile:       form.mobile,
      company:      form.company,
      role:         form.role,
      industry:     form.industry,
      message:      form.message,
      submitted_at: new Date().toISOString(),
      source:       "namuste.in contact form",
    });

    // Fire-and-forget — use text/plain to bypass CORS preflight on cross-origin webhooks
    fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: payload,
    }).catch(() => { /* silent — webhook still receives the data */ });

    // Always show Thank You immediately, never block the user on a fetch error
    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setForm(empty);
      setErrors({});
      setTouched({});
    }, 7000);
  };

  const inp = (field: keyof FormState, extra?: React.CSSProperties): React.CSSProperties => ({
    width:"100%", padding:"11px 14px", borderRadius:9,
    border: `1px solid ${touched[field] && errors[field] ? "rgba(248,113,113,.5)" : "var(--border)"}`,
    background:"rgba(255,255,255,.03)",
    fontSize:14, color:"#fff",
    fontFamily:"'DM Sans',system-ui,sans-serif",
    outline:"none", transition:"border-color .2s", appearance:"none",
    ...extra,
  });

  const fi = (field: keyof FormState) => (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    e.target.style.borderColor = touched[field] && errors[field] ? "rgba(248,113,113,.7)" : "var(--accent-green)";
  };
  const fo = (field: keyof FormState) => (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    blur(field);
    e.target.style.borderColor = touched[field] && errors[field] ? "rgba(248,113,113,.5)" : "var(--border)";
  };

  const renderErrMsg = (field: keyof FormState) => touched[field] && errors[field]
    ? <div style={{color:"#f87171",fontSize:11,marginTop:4,paddingLeft:2}}>{errors[field]}</div>
    : null;

  return (
    <section id="contact" style={{padding:"80px 0",background:"var(--bg)",position:"relative",overflow:"hidden"}}>
      <div className="line-grid" style={{position:"absolute",inset:0,pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(82,204,79,.04) 0%,transparent 70%)",pointerEvents:"none"}}/>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px",position:"relative",zIndex:2}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"start"}} className="cg">

          {/* Left */}
          <div>
            <div className="pill" style={{marginBottom:22}}>Contact Us</div>
            <h2 className="hf" style={{fontWeight:900,color:"#fff",fontSize:"clamp(26px,3.5vw,44px)",lineHeight:1.1,letterSpacing:"-.7px",marginBottom:18}}>
              Ready to <span className="gt">Digitize</span> Your Retail?
            </h2>
            <p style={{color:"rgba(255,255,255,.38)",fontSize:15,lineHeight:1.8,marginBottom:36}}>
              Whether you&apos;re a rural retailer, brand or distributor — let&apos;s talk about how Namuste can transform your counter.
            </p>

            <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:32}}>
              {[
                { icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, label:"Email", val:"connect@namuste.com", c:"var(--gold)" },
                { icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>, label:"Office", val:"245 B/1, Raipur Road, Kolkata 700047, West Bengal", c:"var(--accent-green)" },
              ].map(c => (
                <div key={c.label} style={{display:"flex",alignItems:"flex-start",gap:13}}>
                  <div style={{width:38,height:38,borderRadius:9,flexShrink:0,background:"rgba(82,204,79,.05)",border:"1px solid var(--border2)",display:"flex",alignItems:"center",justifyContent:"center",color:c.c}}>{c.icon}</div>
                  <div>
                    <div style={{color:"var(--ink2)",fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:".08em",marginBottom:3}}>{c.label}</div>
                    <div className="hf" style={{color:"rgba(255,255,255,.8)",fontSize:14,fontWeight:500}}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {["No commitment required — just a conversation","We come to you for the first meeting","Built for retailers, brands and distributors alike"].map(t => (
              <div key={t} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="9" height="9" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#10b981" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{color:"rgba(255,255,255,.45)",fontSize:13}}>{t}</span>
              </div>
            ))}
          </div>

          {/* Right: Form */}
          <div style={{background:"var(--bg3)",borderRadius:18,border:"1px solid var(--border)",padding:"32px",backdropFilter:"blur(12px)"}}>

            {/* ── SUCCESS ── */}
            {status === "success" && (
              <div style={{textAlign:"center",padding:"48px 0"}}>
                <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(16,185,129,.12)",border:"1px solid rgba(16,185,129,.25)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <h3 className="hf" style={{fontWeight:800,color:"#fff",fontSize:24,marginBottom:10}}>Thank You!</h3>
                <p style={{color:"rgba(255,255,255,.55)",fontSize:15,lineHeight:1.7,marginBottom:8}}>
                  Your message has been received successfully.
                </p>
                <p style={{color:"var(--ink2)",fontSize:14,lineHeight:1.7}}>
                  We&apos;ll get back to you at <strong style={{color:"var(--accent-green-mid)"}}>{form.email}</strong> soon.
                </p>
              </div>
            )}

            {/* ── FORM ── */}
            {status !== "success" && (
              <>
                <h3 className="hf" style={{fontWeight:700,color:"#fff",fontSize:20,marginBottom:6}}>Apply for Early Access</h3>
                <p style={{color:"var(--ink2)",fontSize:13,marginBottom:24}}>We&apos;re onboarding our first cohort of partners now.</p>

                <form onSubmit={handleSubmit} noValidate style={{display:"flex",flexDirection:"column",gap:13}}>

                  {/* Name + Email */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}} className="form-row">
                    <div>
                      <label style={{color:"var(--ink2)",fontSize:11,fontWeight:600,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>Name *</label>
                      <input type="text" value={form.name}
                        onChange={e => setForm({...form,name:e.target.value})}
                        onFocus={fi("name")} onBlur={fo("name")}
                        placeholder="Your name" style={inp("name")}
                      />
                      {renderErrMsg("name")}
                    </div>
                    <div>
                      <label style={{color:"var(--ink2)",fontSize:11,fontWeight:600,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>Email *</label>
                      <input type="email" value={form.email}
                        onChange={e => setForm({...form,email:e.target.value})}
                        onFocus={fi("email")} onBlur={fo("email")}
                        placeholder="you@company.com" style={inp("email")}
                      />
                      {renderErrMsg("email")}
                    </div>
                  </div>

                  {/* Mobile */}
                  <div>
                    <label style={{color:"var(--ink2)",fontSize:11,fontWeight:600,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>Mobile Number *</label>
                    <input type="tel" value={form.mobile}
                      onChange={e => setForm({...form,mobile:e.target.value.replace(/[^0-9]/g,"")})}
                      onFocus={fi("mobile")} onBlur={fo("mobile")}
                      placeholder="10-digit mobile number" maxLength={10}
                      style={inp("mobile")}
                    />
                    {renderErrMsg("mobile")}
                  </div>

                  {/* Company */}
                  <div>
                    <label style={{color:"var(--ink2)",fontSize:11,fontWeight:600,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>Company / Shop</label>
                    <input type="text" value={form.company}
                      onChange={e => setForm({...form,company:e.target.value})}
                      onFocus={fi("company")} onBlur={fo("company")}
                      placeholder="Your Business Name" style={inp("company")}
                    />
                  </div>

                  {/* Role + Industry */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}} className="form-row">
                    <div>
                      <label style={{color:"var(--ink2)",fontSize:11,fontWeight:600,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>I am a *</label>
                      <select value={form.role}
                        onChange={e => setForm({...form,role:e.target.value})}
                        onFocus={fi("role")} onBlur={fo("role")}
                        style={{...inp("role"),cursor:"pointer"}}
                      >
                        <option value="retailer">Retailer</option>
                        <option value="brand">Brand / Company</option>
                        <option value="distributor">Distributor</option>
                        <option value="investor">Investor</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label style={{color:"var(--ink2)",fontSize:11,fontWeight:600,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>Industry *</label>
                      <select value={form.industry}
                        onChange={e => setForm({...form,industry:e.target.value})}
                        onFocus={fi("industry")} onBlur={fo("industry")}
                        style={{...inp("industry"),cursor:"pointer"}}
                      >
                        <option value="agriculture">Agriculture</option>
                        <option value="pharmacy">Pharmacy / Chemist</option>
                        <option value="grocery">Kirana / FMCG / Grocery</option>
                        <option value="hardware">Hardware / Electronics</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{color:"var(--ink2)",fontSize:11,fontWeight:600,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>
                      Message
                      <span style={{color:"var(--muted)",fontWeight:400,textTransform:"none",letterSpacing:0,marginLeft:6}}>(min 10 characters)</span>
                    </label>
                    <textarea rows={3} value={form.message}
                      onChange={e => setForm({...form,message:e.target.value})}
                      onFocus={fi("message")} onBlur={fo("message")}
                      placeholder="Tell us about your business..."
                      style={{...inp("message"),resize:"none"}}
                    />
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                      {renderErrMsg("message")}
                      <span style={{color:"var(--muted)",fontSize:11,marginLeft:"auto"}}>{form.message.length} chars</span>
                    </div>
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={status==="loading"} style={{
                    background: status==="loading" ? "rgba(82,204,79,.4)" : "linear-gradient(135deg,var(--accent-green-mid),var(--accent-green-deep))",
                    color:"var(--bg)", border:"none",
                    cursor: status==="loading" ? "not-allowed" : "pointer",
                    fontFamily:"'Poppins',system-ui,sans-serif", fontWeight:700, fontSize:14,
                    padding:"13px", borderRadius:9,
                    display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                    transition:"opacity .2s",
                    boxShadow:"0 4px 20px var(--green-glow)",
                    marginTop:4,
                  }}
                    onMouseEnter={e=>{if(status!=="loading")e.currentTarget.style.opacity=".85"}}
                    onMouseLeave={e=>{e.currentTarget.style.opacity="1"}}
                  >
                    {status==="loading" ? (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.cg{grid-template-columns:1fr!important;gap:40px!important}}
        @media(max-width:480px){.form-row{grid-template-columns:1fr!important}}
        select option{background:#0d0520;color:#fff}
      `}</style>
    </section>
  );
}
