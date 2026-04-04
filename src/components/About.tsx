"use client";
import { useEffect } from "react";

const pillars = [
  {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,title:"Starting at the Counter",desc:"The rural retail counter is where commerce happens for 650 million Indians. It is the first — and most important — moment of trust between brands and customers."},
  {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m6.08 9.5-3.48 1.58a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84l-3.5-1.58"/><path d="m6.08 14.5-3.48 1.58a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84l-3.5-1.58"/></svg>,title:"Full-Stack Platform",desc:"From the device hardware on the counter to the cloud analytics dashboard — we own the entire stack, so every layer works seamlessly together from day one."},
  {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,title:"Retailer-First Design",desc:"Every feature we build starts with what makes life simpler for the rural retailer at the counter — not for the enterprise software buyer in the city."},
];

export default function About() {
  useEffect(() => {
    const obs = new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.08});
    document.querySelectorAll(".reveal,.reveal-l,.reveal-r").forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);

  return (
    <section id="about" style={{padding:"104px 0",background:"var(--bg2)",position:"relative",overflow:"hidden"}}>
      <div className="line-grid" style={{position:"absolute",inset:0,pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"30%",left:"-80px",width:350,height:350,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(139,92,246,.07) 0%,transparent 65%)",pointerEvents:"none"}}/>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 44px",position:"relative",zIndex:2}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"start"}} className="ag">

          <div className="reveal-l">
            <div className="pill" style={{marginBottom:22}}>About Us</div>
            <h2 className="hf" style={{fontWeight:900,color:"#fff",fontSize:"clamp(28px,3.5vw,44px)",lineHeight:1.1,letterSpacing:"-.7px",marginBottom:20}}>
              Building the <span className="gt2">Counter OS</span> for Rural Retail
            </h2>
            <p style={{color:"rgba(255,255,255,.45)",fontSize:16,lineHeight:1.8,marginBottom:14}}>
              Namusté Technologies is building the digital infrastructure layer for India&apos;s 12 million rural retail counters — starting at the counter, the first and most important moment of trust between brands and consumers in rural India.
            </p>
            <p style={{color:"rgba(255,255,255,.38)",fontSize:15,lineHeight:1.8,marginBottom:32}}>
              We digitize transactions, capture real-time demand data, enable brand campaign delivery and unlock fintech — all through a single purpose-built device that sits at the rural retail counter.
            </p>
            <div style={{display:"flex",alignItems:"flex-start",gap:14,background:"rgba(139,92,246,.06)",borderRadius:13,border:"1px solid rgba(139,92,246,.15)",padding:"16px 18px",backdropFilter:"blur(8px)"}}>
              <div style={{width:38,height:38,borderRadius:9,background:"rgba(139,92,246,.12)",border:"1px solid rgba(139,92,246,.22)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"#a78bfa"}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div className="hf" style={{fontWeight:600,color:"#fff",fontSize:13,marginBottom:4}}>Registered Office</div>
                <div style={{color:"rgba(255,255,255,.45)",fontSize:13,lineHeight:1.6}}>245 B/1, Raipur Road, Kolkata 700047<br/>West Bengal, India</div>
              </div>
            </div>
          </div>

          <div className="reveal-r" style={{display:"flex",flexDirection:"column",gap:12}}>
            {pillars.map(p=>(
              <div key={p.title} style={{display:"flex",gap:16,background:"rgba(255,255,255,.03)",padding:"20px",borderRadius:14,border:"1px solid rgba(139,92,246,.12)",backdropFilter:"blur(8px)",transition:"border-color .25s,transform .25s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(139,92,246,.35)";e.currentTarget.style.transform="translateY(-2px)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(139,92,246,.12)";e.currentTarget.style.transform="translateY(0)"}}
              >
                <div style={{width:44,height:44,borderRadius:11,flexShrink:0,background:"rgba(139,92,246,.12)",border:"1px solid rgba(139,92,246,.22)",display:"flex",alignItems:"center",justifyContent:"center",color:"#a78bfa"}}>{p.icon}</div>
                <div>
                  <h3 className="hf" style={{fontWeight:700,color:"#fff",fontSize:15,marginBottom:5}}>{p.title}</h3>
                  <p style={{color:"rgba(255,255,255,.45)",fontSize:13,lineHeight:1.7}}>{p.desc}</p>
                </div>
              </div>
            ))}


          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.ag{grid-template-columns:1fr!important;gap:48px!important}}`}</style>
    </section>
  );
}
