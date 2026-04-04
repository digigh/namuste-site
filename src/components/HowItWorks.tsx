"use client";
import { useEffect } from "react";

const steps = [
  {num:"01",title:"Farmer Visits Retailer",desc:"A farmer walks into the agri retailer shop to purchase seeds, fertilisers, or crop-protection products.",c:"#8b5cf6",gc:"rgba(139,92,246,.15)",bc:"rgba(139,92,246,.3)",icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>},
  {num:"02",title:"Product QR Scanned",desc:"The retailer scans the product's QR code on the Namusté device. Farmer details and eligibility verified instantly.",c:"#10b981",gc:"rgba(16,185,129,.12)",bc:"rgba(16,185,129,.25)",icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zm3 3h4v4h-4z"/></svg>},
  {num:"03",title:"Retailer Approves",desc:"The retailer reviews the order and campaign details on the smart device screen and approves the transaction.",c:"#a78bfa",gc:"rgba(167,139,250,.15)",bc:"rgba(167,139,250,.3)",icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>},
  {num:"04",title:"Farmer Gets Rewarded",desc:"The farmer receives their offer — discount, cashback, loyalty perk, or brand reward — instantly upon approval.",c:"#6ee7b7",gc:"rgba(110,231,183,.12)",bc:"rgba(110,231,183,.25)",icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77Z"/><path d="m9 12 2 2 4-4"/></svg>},
];

export default function HowItWorks() {
  useEffect(() => {
    const obs = new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.08});
    document.querySelectorAll(".reveal,.reveal-l,.reveal-r").forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  }, []);

  return (
    <section id="solutions" style={{padding:"104px 0",background:"var(--bg)",position:"relative",overflow:"hidden"}}>
      <div className="dot-grid" style={{position:"absolute",inset:0,opacity:.4,pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"40%",right:"-80px",width:400,height:400,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(16,185,129,.06) 0%,transparent 65%)",pointerEvents:"none"}}/>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 44px",position:"relative",zIndex:2}}>
        <div className="reveal" style={{textAlign:"center",maxWidth:580,margin:"0 auto 72px"}}>
          <div className="pill" style={{marginBottom:18}}>How It Works</div>
          <h2 className="hf" style={{fontWeight:900,color:"#fff",fontSize:"clamp(30px,4vw,48px)",lineHeight:1.1,letterSpacing:"-.8px",marginBottom:14}}>
            4 Steps. <span className="gt-green">One Device.</span>
          </h2>
          <p style={{color:"var(--muted2)",fontSize:16,lineHeight:1.75}}>From farmer arrival to reward delivery — the entire journey runs through Namusté.</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:64,position:"relative"}} className="steps-g">
          {/* Connector line */}
          <div style={{position:"absolute",top:38,left:"12.5%",right:"12.5%",height:1,background:"linear-gradient(90deg,#8b5cf6,#10b981,#6ee7b7)",opacity:.2,pointerEvents:"none"}} className="step-line"/>
          {steps.map((s,i)=>(
            <div key={s.num} className="reveal" style={{textAlign:"center",transitionDelay:`${i*90}ms`}}>
              <div style={{width:76,height:76,borderRadius:"50%",margin:"0 auto 18px",background:s.gc,border:`1px solid ${s.bc}`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",zIndex:2,color:s.c,transition:"background .25s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=s.bc}}
                onMouseLeave={e=>{e.currentTarget.style.background=s.gc}}
              >
                {s.icon}
                <div style={{position:"absolute",top:-6,right:-6,width:22,height:22,borderRadius:"50%",background:s.c,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span className="hf" style={{fontSize:9,fontWeight:800,color:i===0||i===2?"#fff":"#06010f"}}>{i+1}</span>
                </div>
              </div>
              <div className="hf" style={{fontWeight:900,fontSize:28,color:s.c,opacity:.12,lineHeight:1,marginBottom:4}}>{s.num}</div>
              <h3 className="hf" style={{fontWeight:700,fontSize:15,color:"#fff",marginBottom:10,lineHeight:1.3}}>{s.title}</h3>
              <p style={{fontSize:13,color:"var(--muted2)",lineHeight:1.7}}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="reveal" style={{background:"rgba(139,92,246,.08)",border:"1px solid rgba(139,92,246,.2)",borderRadius:20,padding:"52px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:28,position:"relative",overflow:"hidden",backdropFilter:"blur(8px)"}}>
          <div className="dot-grid" style={{position:"absolute",inset:0,opacity:.4}}/>
          <div style={{position:"absolute",top:-60,left:-60,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.15) 0%,transparent 70%)"}}/>
          <div style={{position:"relative",zIndex:2}}>
            <p className="hf" style={{color:"#a78bfa",fontSize:10,fontWeight:600,letterSpacing:".12em",textTransform:"uppercase",marginBottom:10}}>End-to-End Secured</p>
            <h3 className="hf" style={{fontWeight:800,color:"#fff",fontSize:"clamp(18px,2.5vw,28px)",lineHeight:1.3}}>
              Brand visibility. Retailer empowered.<br/>Farmer rewarded.
            </h3>
          </div>
          <div style={{position:"relative",zIndex:2}}>
            <a href="#contact" className="btn-purple">See It In Action →</a>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:860px){.steps-g{grid-template-columns:repeat(2,1fr)!important}.step-line{display:none}}@media(max-width:480px){.steps-g{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
