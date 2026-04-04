"use client";
import { useEffect } from "react";

const nodes = [
  { label:"Brands",     col:"#a78bfa", bg:"rgba(139,92,246,.12)", border:"rgba(139,92,246,.3)",  icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77Z"/><path d="m9 12 2 2 4-4"/></svg> },
  { label:"Retailers",  col:"#6ee7b7", bg:"rgba(16,185,129,.1)",  border:"rgba(16,185,129,.25)", icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/></svg> },
  { label:"Customers",  col:"#c4b5fd", bg:"rgba(139,92,246,.14)", border:"rgba(139,92,246,.32)", icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label:"Distributors",col:"#6ee7b7",bg:"rgba(16,185,129,.1)",  border:"rgba(16,185,129,.25)", icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg> },
  { label:"Fintech",    col:"#a78bfa", bg:"rgba(139,92,246,.12)", border:"rgba(139,92,246,.3)",  icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg> },
];

const stars = [
  {x:"5%",y:"9%",s:2,d:0},{x:"14%",y:"5%",s:1,d:.5},{x:"24%",y:"13%",s:2,d:1.1},
  {x:"76%",y:"10%",s:2,d:.7},{x:"86%",y:"4%",s:1,d:1.4},{x:"94%",y:"12%",s:2,d:.3},
  {x:"3%",y:"38%",s:1,d:.6},{x:"97%",y:"35%",s:2,d:.9},{x:"2%",y:"65%",s:2,d:1.5},
  {x:"98%",y:"60%",s:1,d:.4},{x:"4%",y:"82%",s:1,d:2},{x:"95%",y:"78%",s:2,d:.8},
  {x:"44%",y:"3%",s:1,d:1.2},{x:"57%",y:"92%",s:2,d:.6},{x:"22%",y:"88%",s:1,d:1.8},
  {x:"78%",y:"85%",s:2,d:.2},{x:"36%",y:"95%",s:1,d:1},{x:"65%",y:"94%",s:1,d:1.6},
];

export default function Hero() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: .08 }
    );
    document.querySelectorAll(".reveal,.reveal-l,.reveal-r").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="product" style={{
      minHeight:"100vh", background:"var(--bg)",
      position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column", alignItems:"center",
      paddingTop:72,
    }}>
      {/* Ambient glows */}
      <div style={{position:"absolute",top:"-100px",left:"50%",transform:"translateX(-50%)",width:"800px",height:"700px",borderRadius:"50%",background:"radial-gradient(ellipse,rgba(139,92,246,.2) 0%,rgba(109,40,217,.06) 45%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"8%",right:"6%",width:"320px",height:"320px",borderRadius:"50%",background:"radial-gradient(ellipse,rgba(16,185,129,.07) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"45%",left:"-80px",width:"280px",height:"280px",borderRadius:"50%",background:"radial-gradient(ellipse,rgba(139,92,246,.05) 0%,transparent 65%)",pointerEvents:"none"}}/>

      {/* Grid + Stars */}
      <div className="line-grid" style={{position:"absolute",inset:0,pointerEvents:"none"}}/>
      {stars.map((s,i) => (
        <div key={i} className="aStar" style={{position:"absolute",left:s.x,top:s.y,width:s.s,height:s.s,borderRadius:"50%",background:i%3===0?"#a78bfa":i%3===1?"rgba(255,255,255,.65)":"#6ee7b7",animationDelay:`${s.d}s`,pointerEvents:"none"}}/>
      ))}

      {/* ── HERO TEXT ── */}
      <div style={{textAlign:"center",padding:"52px 24px 0",position:"relative",zIndex:10,width:"100%",maxWidth:900,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:20}}>
          <div style={{height:1,width:44,background:"linear-gradient(90deg,transparent,rgba(139,92,246,.5))"}}/>
          <span style={{color:"rgba(196,181,253,.42)",fontSize:11,fontWeight:500,letterSpacing:".08em"}}>India&apos;s First Rural Counter OS</span>
          <div style={{height:1,width:44,background:"linear-gradient(90deg,rgba(139,92,246,.5),transparent)"}}/>
        </div>

        <h1 className="hf" style={{color:"#fff",fontSize:"clamp(34px,5vw,64px)",fontWeight:900,lineHeight:1.06,letterSpacing:"-2px",marginBottom:6,textShadow:"0 0 100px rgba(139,92,246,.22)",whiteSpace:"nowrap"}}>
          The Counter OS for Every
        </h1>
        <h1 className="hf gt" style={{fontSize:"clamp(34px,5vw,64px)",fontWeight:900,lineHeight:1.06,letterSpacing:"-2px",marginBottom:24,whiteSpace:"nowrap"}}>
          Rural Retail Counter.
        </h1>

        <p style={{color:"rgba(255,255,255,.36)",fontSize:16,lineHeight:1.85,maxWidth:520,margin:"0 auto 30px"}}>
          Namusté digitizes the offline rural counter — connecting brands, retailers and customers through one smart device. Real-time transactions, brand campaigns and fintech, at the point of sale.
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",marginBottom:52}}>
          <a href="#contact" className="btn-purple">Apply for Early Access</a>
          <a href="#features" className="btn-ghost">View How It Works →</a>
        </div>
      </div>

      {/* ── NETWORK ILLUSTRATION ── */}
      <div style={{width:"100%",maxWidth:1100,padding:"0 32px",position:"relative",zIndex:5,display:"grid",gridTemplateColumns:"180px 1fr 180px",gap:0,alignItems:"center"}}>

        {/* LEFT stat card */}
        <div className="af2" style={{alignSelf:"center",justifySelf:"start"}}>
          <div style={{background:"rgba(8,2,22,.9)",border:"1px solid rgba(139,92,246,.22)",borderRadius:16,padding:"16px 18px",backdropFilter:"blur(16px)",boxShadow:"0 12px 40px rgba(139,92,246,.12)",minWidth:160}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"#a78bfa"}}/>
              <span style={{color:"rgba(167,139,250,.55)",fontSize:9,fontWeight:600,letterSpacing:".07em"}}>MARKET SIZE</span>
            </div>
            <div className="hf" style={{color:"#fff",fontSize:26,fontWeight:900,letterSpacing:"-.5px",lineHeight:1,marginBottom:6}}>₹40L Cr+</div>
            <div style={{height:1,background:"rgba(139,92,246,.15)",marginBottom:8}}/>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:"#f87171"}}/>
              <span style={{color:"#f87171",fontSize:10,fontWeight:600}}>~0% digitized</span>
            </div>
          </div>
        </div>

        {/* CENTER */}
        <div style={{position:"relative"}}>
          <svg width="100%" viewBox="0 0 580 300" style={{position:"absolute",top:0,left:0,overflow:"visible"}}>
            <path d="M58,42  C160,120 240,180 290,230" stroke="rgba(139,92,246,.22)" strokeWidth="1.5" fill="none" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" from="24" to="0" dur=".8s" repeatCount="indefinite"/></path>
            <path d="M174,24 C220,100 258,160 290,230" stroke="rgba(167,139,250,.18)" strokeWidth="1.5" fill="none" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" from="24" to="0" dur=".8s" begin=".3s" repeatCount="indefinite"/></path>
            <path d="M290,12 L290,230" stroke="rgba(139,92,246,.26)" strokeWidth="1.5" fill="none" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" from="24" to="0" dur=".8s" begin=".6s" repeatCount="indefinite"/></path>
            <path d="M406,24 C360,100 322,160 290,230" stroke="rgba(110,231,183,.18)" strokeWidth="1.5" fill="none" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" from="24" to="0" dur=".8s" begin=".9s" repeatCount="indefinite"/></path>
            <path d="M522,42 C420,120 340,180 290,230" stroke="rgba(139,92,246,.22)" strokeWidth="1.5" fill="none" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" from="24" to="0" dur=".8s" begin="1.2s" repeatCount="indefinite"/></path>
            <circle cx="174" cy="136" r="2.5" fill="#8b5cf6" opacity=".7"/>
            <circle cx="232" cy="100"  r="2"   fill="#6ee7b7" opacity=".6"/>
            <circle cx="290" cy="121"  r="2"   fill="#a78bfa" opacity=".5"/>
            <circle cx="348" cy="100"  r="2"   fill="#6ee7b7" opacity=".6"/>
            <circle cx="406" cy="136"  r="2.5" fill="#8b5cf6" opacity=".7"/>
            <circle r="3.5" fill="#8b5cf6" opacity=".9"><animateMotion dur="2.5s" repeatCount="indefinite"><mpath href="#l1"/></animateMotion></circle>
            <circle r="3" fill="#6ee7b7" opacity=".85"><animateMotion dur="3s" repeatCount="indefinite" begin=".7s"><mpath href="#l3"/></animateMotion></circle>
            <circle r="3" fill="#a78bfa" opacity=".85"><animateMotion dur="2.8s" repeatCount="indefinite" begin="1.4s"><mpath href="#l5"/></animateMotion></circle>
            <circle r="2.5" fill="#6ee7b7" opacity=".75"><animateMotion dur="3.2s" repeatCount="indefinite" begin=".4s"><mpath href="#l4"/></animateMotion></circle>
            <path id="l1" d="M58,42  C160,120 240,180 290,230" fill="none"/>
            <path id="l3" d="M290,12 L290,230" fill="none"/>
            <path id="l4" d="M406,24 C360,100 322,160 290,230" fill="none"/>
            <path id="l5" d="M522,42 C420,120 340,180 290,230" fill="none"/>
            <ellipse cx="290" cy="274" rx="140" ry="10" fill="rgba(139,92,246,.06)"/>
            <line x1="140" y1="273" x2="440" y2="273" stroke="rgba(139,92,246,.2)" strokeWidth="1"/>
          </svg>

          {/* Nodes */}
          <div style={{display:"flex",justifyContent:"space-between",height:88,alignItems:"flex-start",position:"relative",zIndex:10}}>
            {nodes.map((n, i) => (
              <div key={n.label} className="af1" style={{textAlign:"center",animationDelay:`${i*.3}s`,width:70,flexShrink:0}}>
                <div style={{width:46,height:46,borderRadius:13,background:n.bg,border:`1px solid ${n.border}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 7px",backdropFilter:"blur(8px)",color:n.col,boxShadow:`0 4px 20px ${n.bg}`}}>{n.icon}</div>
                <div style={{color:"rgba(255,255,255,.4)",fontSize:9,fontWeight:500}}>{n.label}</div>
              </div>
            ))}
          </div>

          {/* Orb */}
          <div style={{display:"flex",justifyContent:"center",position:"relative",zIndex:15,height:180,alignItems:"center"}}>
            <div className="aSpinS" style={{position:"absolute",width:128,height:128,borderRadius:"50%",border:"1px solid rgba(139,92,246,.13)",top:"50%",left:"50%"}}/>
            <div className="aSpinR" style={{position:"absolute",width:96,height:96,borderRadius:"50%",border:"1px dashed rgba(139,92,246,.17)",top:"50%",left:"50%"}}/>
            <div style={{position:"absolute",width:78,height:78,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.28) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
            <div className="aGlow" style={{width:58,height:58,borderRadius:"50%",background:"linear-gradient(145deg,#7c3aed 0%,#8b5cf6 50%,#10b981 100%)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",zIndex:2}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/></svg>
            </div>
          </div>

          {/* Bottom badges */}
          <div style={{display:"flex",justifyContent:"center",gap:14,position:"relative",zIndex:20,paddingTop:4}}>
            <div className="af1" style={{background:"rgba(8,2,22,.9)",border:"1px solid rgba(139,92,246,.2)",borderRadius:12,padding:"9px 14px",backdropFilter:"blur(14px)",display:"flex",alignItems:"center",gap:9}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(139,92,246,.15)",border:"1px solid rgba(139,92,246,.28)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <div>
                <div style={{color:"rgba(167,139,250,.5)",fontSize:8,fontWeight:600,letterSpacing:".07em"}}>CAMPAIGNS LIVE</div>
                <div className="hf" style={{color:"#fff",fontSize:12,fontWeight:700}}>5 Brands Active</div>
              </div>
            </div>
            <div className="af2" style={{background:"rgba(8,2,22,.9)",border:"1px solid rgba(16,185,129,.2)",borderRadius:12,padding:"9px 14px",backdropFilter:"blur(14px)",display:"flex",alignItems:"center",gap:9}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(16,185,129,.12)",border:"1px solid rgba(16,185,129,.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <div>
                <div style={{color:"rgba(110,231,183,.5)",fontSize:8,fontWeight:600,letterSpacing:".07em"}}>REWARD UNLOCKED</div>
                <div className="hf" style={{color:"#fff",fontSize:12,fontWeight:700}}>₹180 · Verified ✓</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT stat card */}
        <div className="af3" style={{alignSelf:"center",justifySelf:"end"}}>
          <div style={{background:"rgba(8,2,22,.9)",border:"1px solid rgba(16,185,129,.2)",borderRadius:16,padding:"16px 18px",backdropFilter:"blur(16px)",boxShadow:"0 12px 40px rgba(16,185,129,.1)",minWidth:160}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"#6ee7b7"}}/>
              <span style={{color:"rgba(110,231,183,.55)",fontSize:9,fontWeight:600,letterSpacing:".07em"}}>RURAL INDIA</span>
            </div>
            <div className="hf" style={{color:"#fff",fontSize:26,fontWeight:900,letterSpacing:"-.5px",lineHeight:1,marginBottom:6}}>650M+</div>
            <div style={{height:1,background:"rgba(16,185,129,.15)",marginBottom:8}}/>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:"#6ee7b7"}}/>
              <span style={{color:"#6ee7b7",fontSize:10,fontWeight:600}}>Rural consumers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom contact bar */}
      <div style={{padding:"28px 44px 36px",display:"flex",justifyContent:"center",position:"relative",zIndex:10,width:"100%"}}>
        <div style={{background:"rgba(139,92,246,.06)",border:"1px solid rgba(139,92,246,.17)",borderRadius:14,padding:"13px 22px",display:"flex",alignItems:"center",gap:14,maxWidth:540,width:"100%",backdropFilter:"blur(8px)"}}>
          <div style={{position:"relative",width:9,height:9,flexShrink:0}}>
            <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#8b5cf6",animation:"ping 2s ease-out infinite"}}/>
            <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#8b5cf6"}}/>
          </div>
          <span style={{color:"rgba(255,255,255,.22)",fontSize:13,flex:1}}>connect@namuste.com · 245 B/1, Raipur Road, Kolkata 700047</span>
          <a href="#contact" className="btn-purple" style={{padding:"8px 20px",fontSize:12,whiteSpace:"nowrap"}}>Book a Demo</a>
        </div>
      </div>

      <style>{`@keyframes ping{0%{transform:scale(1);opacity:.7}80%,100%{transform:scale(2.4);opacity:0}}`}</style>
    </section>
  );
}
