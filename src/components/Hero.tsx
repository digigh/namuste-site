"use client";
import { useEffect } from "react";

const nodes = [
  { label:"Brands",      col:"#a78bfa", bg:"rgba(139,92,246,.12)", border:"rgba(139,92,246,.3)",  icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77Z"/><path d="m9 12 2 2 4-4"/></svg> },
  { label:"Retailers",   col:"#6ee7b7", bg:"rgba(16,185,129,.1)",  border:"rgba(16,185,129,.25)", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/></svg> },
  { label:"Customers",   col:"#c4b5fd", bg:"rgba(139,92,246,.14)", border:"rgba(139,92,246,.32)", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label:"Distributors",col:"#6ee7b7", bg:"rgba(16,185,129,.1)",  border:"rgba(16,185,129,.25)", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg> },
  { label:"Fintech",     col:"#a78bfa", bg:"rgba(139,92,246,.12)", border:"rgba(139,92,246,.3)",  icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg> },
];

const stars=[
  {x:"5%",y:"9%",s:2,d:0},{x:"14%",y:"5%",s:1,d:.5},{x:"24%",y:"13%",s:2,d:1.1},
  {x:"76%",y:"10%",s:2,d:.7},{x:"86%",y:"4%",s:1,d:1.4},{x:"94%",y:"12%",s:2,d:.3},
  {x:"3%",y:"38%",s:1,d:.6},{x:"97%",y:"35%",s:2,d:.9},{x:"2%",y:"65%",s:2,d:1.5},
  {x:"98%",y:"60%",s:1,d:.4},{x:"4%",y:"82%",s:1,d:2},{x:"95%",y:"78%",s:2,d:.8},
];

export default function Hero() {
  useEffect(()=>{
    const obs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.08});
    document.querySelectorAll(".reveal,.reveal-l,.reveal-r").forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);

  return (
    <section id="product" style={{minHeight:"100vh",background:"var(--bg)",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:72}}>
      {/* Glows */}
      <div style={{position:"absolute",top:"-100px",left:"50%",transform:"translateX(-50%)",width:"min(800px,100vw)",height:"600px",borderRadius:"50%",background:"radial-gradient(ellipse,rgba(139,92,246,.2) 0%,rgba(109,40,217,.06) 45%,transparent 70%)",pointerEvents:"none"}}/>
      <div className="line-grid" style={{position:"absolute",inset:0,pointerEvents:"none"}}/>
      {stars.map((s,i)=>(
        <div key={i} className="aStar" style={{position:"absolute",left:s.x,top:s.y,width:s.s,height:s.s,borderRadius:"50%",background:i%3===0?"#a78bfa":i%3===1?"rgba(255,255,255,.65)":"#6ee7b7",animationDelay:`${s.d}s`,pointerEvents:"none"}}/>
      ))}

      {/* Hero text */}
      <div style={{textAlign:"center",padding:"52px 20px 0",position:"relative",zIndex:10,width:"100%",maxWidth:860,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:18}}>
          <div style={{height:1,width:32,background:"linear-gradient(90deg,transparent,rgba(139,92,246,.5))"}}/>
          <span style={{color:"rgba(196,181,253,.42)",fontSize:11,fontWeight:500,letterSpacing:".07em"}}>India&apos;s First Rural Counter OS</span>
          <div style={{height:1,width:32,background:"linear-gradient(90deg,rgba(139,92,246,.5),transparent)"}}/>
        </div>

        <h1 className="hf" style={{color:"#fff",fontSize:"clamp(30px,6vw,64px)",fontWeight:900,lineHeight:1.06,letterSpacing:"-1.5px",marginBottom:4,textShadow:"0 0 100px rgba(139,92,246,.22)"}}>
          The Counter OS for Every
        </h1>
        <h1 className="hf gt" style={{fontSize:"clamp(30px,6vw,64px)",fontWeight:900,lineHeight:1.06,letterSpacing:"-1.5px",marginBottom:20}}>
          Rural Retail Counter.
        </h1>

        <p style={{color:"rgba(255,255,255,.36)",fontSize:"clamp(14px,2vw,16px)",lineHeight:1.8,maxWidth:480,margin:"0 auto 28px"}}>
          One device. Every transaction tracked. Every campaign connected. Every customer rewarded. The counter is no longer dark.
        </p>

        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:48,padding:"0 16px"}}>
          <a href="#contact" className="btn-purple">Apply for Early Access</a>
          <a href="#features" className="btn-ghost">See How It Works →</a>
        </div>
      </div>

      {/* Node network — desktop: 3-col with stat cards; mobile: center column only */}
      <div style={{width:"100%",maxWidth:1100,padding:"0 20px",position:"relative",zIndex:5}} className="hero-net-wrap">
        {/* Desktop: 3 col layout */}
        <div className="hero-net-desktop">
          <div style={{display:"grid",gridTemplateColumns:"170px 1fr 170px",gap:0,alignItems:"center"}}>
            {/* Left stat card */}
            <div className="af2">
              <div style={{background:"rgba(8,2,22,.9)",border:"1px solid rgba(139,92,246,.22)",borderRadius:14,padding:"14px 16px",backdropFilter:"blur(16px)",boxShadow:"0 12px 40px rgba(139,92,246,.12)"}}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:7}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:"#a78bfa"}}/>
                  <span style={{color:"rgba(167,139,250,.55)",fontSize:9,fontWeight:600,letterSpacing:".07em"}}>MARKET SIZE</span>
                </div>
                <div className="hf" style={{color:"#fff",fontSize:22,fontWeight:900,letterSpacing:"-.5px",lineHeight:1,marginBottom:5}}>₹40L Cr+</div>
                <div style={{height:1,background:"rgba(139,92,246,.15)",marginBottom:7}}/>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <div style={{width:4,height:4,borderRadius:"50%",background:"#f87171"}}/>
                  <span style={{color:"#f87171",fontSize:9,fontWeight:600}}>~0% digitized</span>
                </div>
              </div>
            </div>

            {/* Center: SVG + nodes + orb */}
            <div style={{position:"relative"}}>
              {NodeNetwork()}
            </div>

            {/* Right stat card */}
            <div className="af3">
              <div style={{background:"rgba(8,2,22,.9)",border:"1px solid rgba(16,185,129,.2)",borderRadius:14,padding:"14px 16px",backdropFilter:"blur(16px)",boxShadow:"0 12px 40px rgba(16,185,129,.1)"}}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:7}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:"#6ee7b7"}}/>
                  <span style={{color:"rgba(110,231,183,.55)",fontSize:9,fontWeight:600,letterSpacing:".07em"}}>RURAL INDIA</span>
                </div>
                <div className="hf" style={{color:"#fff",fontSize:22,fontWeight:900,letterSpacing:"-.5px",lineHeight:1,marginBottom:5}}>650M+</div>
                <div style={{height:1,background:"rgba(16,185,129,.15)",marginBottom:7}}/>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <div style={{width:4,height:4,borderRadius:"50%",background:"#6ee7b7"}}/>
                  <span style={{color:"#6ee7b7",fontSize:9,fontWeight:600}}>Rural consumers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: just the center network */}
        <div className="hero-net-mobile" style={{display:"none"}}>
          {NodeNetwork()}
        </div>
      </div>

      {/* Stat pills — mobile only */}
      <div className="hero-stat-pills" style={{display:"none",gap:10,padding:"16px 20px 0",flexWrap:"wrap",justifyContent:"center"}}>
        <div style={{background:"rgba(8,2,22,.9)",border:"1px solid rgba(139,92,246,.22)",borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:4,height:4,borderRadius:"50%",background:"#a78bfa"}}/>
          <span style={{color:"rgba(167,139,250,.7)",fontSize:11,fontWeight:600}}>₹40L Cr+ Market</span>
          <span style={{color:"#f87171",fontSize:10}}>~0% digitized</span>
        </div>
        <div style={{background:"rgba(8,2,22,.9)",border:"1px solid rgba(16,185,129,.2)",borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:4,height:4,borderRadius:"50%",background:"#6ee7b7"}}/>
          <span style={{color:"rgba(110,231,183,.7)",fontSize:11,fontWeight:600}}>650M+ Rural Consumers</span>
        </div>
      </div>

      {/* Bottom contact bar */}
      <div style={{padding:"24px 20px 32px",display:"flex",justifyContent:"center",position:"relative",zIndex:10,width:"100%"}}>
        <div style={{background:"rgba(139,92,246,.06)",border:"1px solid rgba(139,92,246,.17)",borderRadius:12,padding:"12px 18px",display:"flex",alignItems:"center",gap:12,maxWidth:520,width:"100%",backdropFilter:"blur(8px)",flexWrap:"wrap"}}>
          <div style={{position:"relative",width:8,height:8,flexShrink:0}}>
            <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#8b5cf6",animation:"ping 2s ease-out infinite"}}/>
            <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"#8b5cf6"}}/>
          </div>
          <span style={{color:"rgba(255,255,255,.22)",fontSize:12,flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>connect@namuste.com · Kolkata 700047</span>
          <a href="#contact" className="btn-purple" style={{padding:"7px 16px",fontSize:12,whiteSpace:"nowrap",flexShrink:0}}>Book a Demo</a>
        </div>
      </div>

      <style>{`
        @keyframes ping{0%{transform:scale(1);opacity:.7}80%,100%{transform:scale(2.4);opacity:0}}
        @media(min-width:769px){
          .hero-net-desktop{display:block}
          .hero-net-mobile{display:none!important}
          .hero-stat-pills{display:none!important}
        }
        @media(max-width:768px){
          .hero-net-desktop{display:none!important}
          .hero-net-mobile{display:block!important}
          .hero-stat-pills{display:flex!important}
        }
      `}</style>
    </section>
  );
}

function NodeNetwork() {
  const nodes = [
    { label:"Brands",      col:"#a78bfa", bg:"rgba(139,92,246,.12)", border:"rgba(139,92,246,.3)",  icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77Z"/><path d="m9 12 2 2 4-4"/></svg> },
    { label:"Retailers",   col:"#6ee7b7", bg:"rgba(16,185,129,.1)",  border:"rgba(16,185,129,.25)", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M2 7h20"/></svg> },
    { label:"Customers",   col:"#c4b5fd", bg:"rgba(139,92,246,.14)", border:"rgba(139,92,246,.32)", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> },
    { label:"Distributors",col:"#6ee7b7", bg:"rgba(16,185,129,.1)",  border:"rgba(16,185,129,.25)", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg> },
    { label:"Fintech",     col:"#a78bfa", bg:"rgba(139,92,246,.12)", border:"rgba(139,92,246,.3)",  icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg> },
  ];
  return (
    <div style={{position:"relative",maxWidth:520,margin:"0 auto"}}>
      <svg width="100%" viewBox="0 0 520 270" style={{position:"absolute",top:0,left:0,overflow:"visible"}}>
        {[["M52,38 C145,115 220,165 260,210","rgba(139,92,246,.22)","24","0"],["M156,22 C200,95 232,150 260,210","rgba(167,139,250,.18)","24",".3s"],["M260,10 L260,210","rgba(139,92,246,.26)","24",".6s"],["M364,22 C320,95 288,150 260,210","rgba(110,231,183,.18)","24",".9s"],["M468,38 C375,115 300,165 260,210","rgba(139,92,246,.22)","24","1.2s"]].map(([d,stroke,da,begin],i)=>(
          <path key={i} d={d} stroke={stroke} strokeWidth="1.5" fill="none" strokeDasharray={`6 4`}>
            <animate attributeName="stroke-dashoffset" from={da} to="0" dur=".8s" begin={begin} repeatCount="indefinite"/>
          </path>
        ))}
        <circle r="3" fill="#8b5cf6" opacity=".9"><animateMotion dur="2.5s" repeatCount="indefinite"><mpath href="#ml1"/></animateMotion></circle>
        <circle r="2.5" fill="#6ee7b7" opacity=".85"><animateMotion dur="3s" repeatCount="indefinite" begin=".7s"><mpath href="#ml3"/></animateMotion></circle>
        <circle r="2.5" fill="#a78bfa" opacity=".85"><animateMotion dur="2.8s" repeatCount="indefinite" begin="1.4s"><mpath href="#ml5"/></animateMotion></circle>
        <path id="ml1" d="M52,38 C145,115 220,165 260,210" fill="none"/>
        <path id="ml3" d="M260,10 L260,210" fill="none"/>
        <path id="ml5" d="M468,38 C375,115 300,165 260,210" fill="none"/>
        <ellipse cx="260" cy="252" rx="120" ry="9" fill="rgba(139,92,246,.06)"/>
        <line x1="130" y1="251" x2="390" y2="251" stroke="rgba(139,92,246,.2)" strokeWidth="1"/>
      </svg>

      {/* Nodes */}
      <div style={{display:"flex",justifyContent:"space-between",height:80,alignItems:"flex-start",position:"relative",zIndex:10,padding:"0 8px"}}>
        {nodes.map((n,i)=>(
          <div key={n.label} className="af1" style={{textAlign:"center",animationDelay:`${i*.3}s`,width:"18%",flexShrink:0}}>
            <div style={{width:38,height:38,borderRadius:11,background:n.bg,border:`1px solid ${n.border}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 5px",backdropFilter:"blur(8px)",color:n.col}}>{n.icon}</div>
            <div style={{color:"rgba(255,255,255,.4)",fontSize:8,fontWeight:500}}>{n.label}</div>
          </div>
        ))}
      </div>

      {/* Orb */}
      <div style={{display:"flex",justifyContent:"center",position:"relative",zIndex:15,height:160,alignItems:"center"}}>
        <div className="aSpinS" style={{position:"absolute",width:110,height:110,borderRadius:"50%",border:"1px solid rgba(139,92,246,.13)",top:"50%",left:"50%"}}/>
        <div className="aSpinR" style={{position:"absolute",width:82,height:82,borderRadius:"50%",border:"1px dashed rgba(139,92,246,.17)",top:"50%",left:"50%"}}/>
        <div style={{position:"absolute",width:68,height:68,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.28) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
        <div className="aGlow" style={{width:50,height:50,borderRadius:"50%",background:"linear-gradient(145deg,#7c3aed 0%,#8b5cf6 50%,#10b981 100%)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",zIndex:2}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/></svg>
        </div>
      </div>

      {/* Bottom badges */}
      <div style={{display:"flex",justifyContent:"center",gap:10,position:"relative",zIndex:20,paddingTop:4,flexWrap:"wrap"}}>
        <div style={{background:"rgba(8,2,22,.9)",border:"1px solid rgba(139,92,246,.2)",borderRadius:10,padding:"8px 12px",backdropFilter:"blur(14px)",display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:24,height:24,borderRadius:"50%",background:"rgba(139,92,246,.15)",border:"1px solid rgba(139,92,246,.28)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <div>
            <div style={{color:"rgba(167,139,250,.5)",fontSize:7,fontWeight:600,letterSpacing:".07em"}}>CAMPAIGNS</div>
            <div className="hf" style={{color:"#fff",fontSize:11,fontWeight:700}}>5 Brands Active</div>
          </div>
        </div>
        <div style={{background:"rgba(8,2,22,.9)",border:"1px solid rgba(16,185,129,.2)",borderRadius:10,padding:"8px 12px",backdropFilter:"blur(14px)",display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:24,height:24,borderRadius:"50%",background:"rgba(16,185,129,.12)",border:"1px solid rgba(16,185,129,.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <div>
            <div style={{color:"rgba(110,231,183,.5)",fontSize:7,fontWeight:600,letterSpacing:".07em"}}>REWARD</div>
            <div className="hf" style={{color:"#fff",fontSize:11,fontWeight:700}}>₹180 Verified ✓</div>
          </div>
        </div>
      </div>
    </div>
  );
}
