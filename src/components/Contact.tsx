"use client";
import { useState } from "react";

export default function Contact() {
  const [form,setForm]=useState({name:"",email:"",company:"",role:"retailer",message:""});
  const [status,setStatus]=useState<"idle"|"loading"|"success">("idle");

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();setStatus("loading");
    await new Promise(r=>setTimeout(r,900));
    setStatus("success");
    setTimeout(()=>{setStatus("idle");setForm({name:"",email:"",company:"",role:"retailer",message:""});},5000);
  };

  const inp:React.CSSProperties={width:"100%",padding:"11px 14px",borderRadius:9,border:"1px solid rgba(139,92,246,.2)",background:"rgba(255,255,255,.03)",fontSize:14,color:"#fff",fontFamily:"'DM Sans',system-ui,sans-serif",outline:"none",transition:"border-color .2s",appearance:"none"};
  const fi=(e:React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>(e.target.style.borderColor="#8b5cf6");
  const fo=(e:React.FocusEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>(e.target.style.borderColor="rgba(139,92,246,.2)");

  return (
    <section id="contact" style={{padding:"104px 0",background:"var(--bg)",position:"relative",overflow:"hidden"}}>
      <div className="line-grid" style={{position:"absolute",inset:0,pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.07) 0%,transparent 70%)",pointerEvents:"none"}}/>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 44px",position:"relative",zIndex:2}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"start"}} className="cg">

          {/* Left */}
          <div>
            <div className="pill" style={{marginBottom:22}}>Contact Us</div>
            <h2 className="hf" style={{fontWeight:900,color:"#fff",fontSize:"clamp(28px,3.5vw,44px)",lineHeight:1.1,letterSpacing:"-.7px",marginBottom:18}}>
              Ready to <span className="gt">Digitize</span> Your Retail?
            </h2>
            <p style={{color:"rgba(255,255,255,.38)",fontSize:16,lineHeight:1.8,marginBottom:38}}>
              Whether you&apos;re an agri retailer, brand or distributor — let&apos;s talk about how Namusté can transform your counter and connect you to the digital agri ecosystem.
            </p>

            {/* Contact details — email + office only */}
            <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:36}}>
              {[
                {icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,label:"Email",val:"connect@namuste.com",c:"#8b5cf6"},
                {icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,label:"Office",val:"245 B/1, Raipur Road, Kolkata 700047, West Bengal",c:"#10b981"},
              ].map(c=>(
                <div key={c.label} style={{display:"flex",alignItems:"flex-start",gap:13}}>
                  <div style={{width:38,height:38,borderRadius:9,flexShrink:0,background:"rgba(139,92,246,.1)",border:"1px solid rgba(139,92,246,.2)",display:"flex",alignItems:"center",justifyContent:"center",color:c.c}}>{c.icon}</div>
                  <div>
                    <div style={{color:"rgba(196,181,253,.5)",fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:".08em",marginBottom:3}}>{c.label}</div>
                    <div className="hf" style={{color:"rgba(255,255,255,.8)",fontSize:14,fontWeight:500}}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust signals */}
            {["No commitment required — just a conversation","We come to you for the first meeting","Built for retailers, brands and distributors alike"].map(t=>(
              <div key={t} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="9" height="9" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#10b981" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{color:"rgba(255,255,255,.45)",fontSize:13}}>{t}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{background:"rgba(139,92,246,.06)",borderRadius:18,border:"1px solid rgba(139,92,246,.18)",padding:36,backdropFilter:"blur(12px)"}}>
            {status==="success"?(
              <div style={{textAlign:"center",padding:"52px 0"}}>
                <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.2)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <h3 className="hf" style={{fontWeight:700,color:"#fff",fontSize:22,marginBottom:8}}>Message Sent!</h3>
                <p style={{color:"rgba(255,255,255,.45)",fontSize:15}}>We&apos;ll reach out to you shortly at <strong style={{color:"#a78bfa"}}>{form.email||"your email"}</strong>.</p>
              </div>
            ):(
              <>
                <h3 className="hf" style={{fontWeight:700,color:"#fff",fontSize:20,marginBottom:6}}>Apply for Early Access</h3>
                <p style={{color:"rgba(196,181,253,.5)",fontSize:13,marginBottom:24}}>We&apos;re onboarding our first cohort of partners now.</p>
                <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:13}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                    <div>
                      <label style={{color:"rgba(196,181,253,.5)",fontSize:11,fontWeight:600,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>Name *</label>
                      <input required type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name" style={inp} onFocus={fi} onBlur={fo}/>
                    </div>
                    <div>
                      <label style={{color:"rgba(196,181,253,.5)",fontSize:11,fontWeight:600,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>Email *</label>
                      <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@company.com" style={inp} onFocus={fi} onBlur={fo}/>
                    </div>
                  </div>
                  <div>
                    <label style={{color:"rgba(196,181,253,.5)",fontSize:11,fontWeight:600,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>Company / Shop</label>
                    <input type="text" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="Your Business Name" style={inp} onFocus={fi} onBlur={fo}/>
                  </div>
                  <div>
                    <label style={{color:"rgba(196,181,253,.5)",fontSize:11,fontWeight:600,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>I am a *</label>
                    <select required value={form.role} onChange={e=>setForm({...form,role:e.target.value})} style={{...inp,cursor:"pointer"}} onFocus={fi} onBlur={fo}>
                      <option value="retailer">Agri Retailer</option>
                      <option value="brand">Agri Brand / Company</option>
                      <option value="distributor">Distributor</option>
                      <option value="investor">Investor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{color:"rgba(196,181,253,.5)",fontSize:11,fontWeight:600,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>Message</label>
                    <textarea rows={3} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us about your business..." style={{...inp,resize:"none"}} onFocus={fi} onBlur={fo}/>
                  </div>
                  <button type="submit" disabled={status==="loading"} style={{background:status==="loading"?"rgba(139,92,246,.4)":"linear-gradient(135deg,#7c3aed,#6d28d9)",color:"#fff",border:"none",cursor:status==="loading"?"not-allowed":"pointer",fontFamily:"'Poppins',system-ui,sans-serif",fontWeight:700,fontSize:14,padding:"13px",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"opacity .2s",boxShadow:"0 4px 20px rgba(124,58,237,.3)"}}
                    onMouseEnter={e=>{if(status!=="loading")e.currentTarget.style.opacity=".85"}}
                    onMouseLeave={e=>{e.currentTarget.style.opacity="1"}}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    {status==="loading"?"Sending...":"Send Message"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.cg{grid-template-columns:1fr!important;gap:48px!important}}select option{background:#0d0520;color:#fff}`}</style>
    </section>
  );
}
