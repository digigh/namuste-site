"use client";
import { useEffect } from "react";

const benefits = [
  "Priority onboarding and device setup at no extra cost",
  "Founding partner pricing — locked in forever",
  "Direct access to the Namuste product team",
  "Shape the features that matter to your business",
  "Early access to fintech and credit features",
  "Be part of India's first rural retail digitization story",
];

const opportunity = [
  {val:"12M+",  label:"Rural retail counters across India", color:"var(--gold)"},
  {val:"₹40L Cr+",label:"Annual rural retail market size",  color:"var(--accent-green)"},
  {val:"~0%",   label:"Of transactions digitized today",   color:"var(--bronze)"},
];

export default function Testimonials() {
  useEffect(() => {
    const obs = new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.08});
    document.querySelectorAll(".reveal,.reveal-l,.reveal-r").forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);

  return (
    <section style={{padding:"104px 0",background:"var(--bg2)",position:"relative",overflow:"hidden"}}>
      <div className="dot-grid" style={{position:"absolute",inset:0,opacity:.4,pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"30%",right:"-80px",width:350,height:350,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(82,204,79,.04) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 44px",position:"relative",zIndex:2}}>

        <div className="reveal" style={{textAlign:"center",maxWidth:620,margin:"0 auto 60px"}}>
          <div className="pill" style={{marginBottom:18}}>Market Opportunity</div>
          <h2 className="hf" style={{fontWeight:900,color:"#fff",fontSize:"clamp(28px,3.5vw,48px)",lineHeight:1.1,letterSpacing:"-.8px",marginBottom:14}}>
            The opportunity is <span className="gt">right now.</span>
          </h2>
          <p style={{color:"var(--ink2)",fontSize:16,lineHeight:1.8}}>
            India&apos;s rural retail network is the largest untouched commerce infrastructure in the world. 12 million counters. Trillions in annual transactions. Zero digital layer.
          </p>
        </div>

        {/* Opportunity stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"var(--border)",borderRadius:18,overflow:"hidden",marginBottom:20}} className="op-grid">
          {opportunity.map((o,i)=>(
            <div key={o.label} className="reveal" style={{background:"var(--bg3)",padding:"44px 32px",textAlign:"center",transitionDelay:`${i*80}ms`,transition:"background .25s",borderRight:i<2?"1px solid var(--border)":"none"}}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(82,204,79,.03)")}
              onMouseLeave={e=>(e.currentTarget.style.background="var(--bg3)")}
            >
              <div className="hf" style={{fontWeight:900,fontSize:"clamp(34px,5vw,56px)",color:o.color,lineHeight:1,marginBottom:14}}>{o.val}</div>
              <p style={{color:"var(--ink2)",fontSize:14,lineHeight:1.65,maxWidth:180,margin:"0 auto"}}>{o.label}</p>
            </div>
          ))}
        </div>

        {/* Early access split */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"var(--border)",borderRadius:18,overflow:"hidden"}} className="ea-grid">
          <div style={{background:"var(--bg3)",padding:"52px 44px",position:"relative",overflow:"hidden",backdropFilter:"blur(8px)"}}>
            <div style={{position:"absolute",top:-60,right:-60,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(82,204,79,.08) 0%,transparent 70%)"}}/>
            <div style={{position:"relative",zIndex:2}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(251,191,36,.1)",border:"1px solid rgba(251,191,36,.22)",borderRadius:999,padding:"5px 14px",marginBottom:24}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:"#fbbf24",display:"inline-block",animation:"blink 1.8s infinite"}}/>
                <span className="hf" style={{color:"#fbbf24",fontSize:11,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase"}}>Now Accepting Early Partners</span>
              </div>
              <h3 className="hf" style={{fontWeight:900,color:"#fff",fontSize:"clamp(20px,2.5vw,30px)",lineHeight:1.2,letterSpacing:"-.5px",marginBottom:16}}>
                Be a founding partner.<br/><span className="gt">Shape the future</span> of rural retail.
              </h3>
              <p style={{color:"var(--ink2)",fontSize:15,lineHeight:1.8,marginBottom:28}}>
                We&apos;re selectively onboarding our first retailers, brands and distributors to build and validate the platform together. Limited spots available.
              </p>
              <a href="#contact" className="btn-green" style={{display:"inline-flex"}}>Apply for Early Access →</a>
            </div>
          </div>
          <div style={{background:"var(--bg3)",padding:"52px 44px",borderLeft:"1px solid var(--border)"}}>
            <div className="hf" style={{fontWeight:700,color:"#fff",fontSize:16,marginBottom:28}}>What early partners get:</div>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {benefits.map((b,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12}}>
                  <div style={{width:22,height:22,borderRadius:"50%",flexShrink:0,marginTop:1,background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.22)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#10b981" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{color:"var(--ink2)",opacity:0.9,fontSize:14,lineHeight:1.6}}>{b}</span>
                </div>
              ))}
            </div>
            <div style={{marginTop:28,padding:"14px 18px",background:"rgba(82,204,79,.04)",borderRadius:12,border:"1px solid rgba(82,204,79,.15)"}}>
              <p style={{color:"var(--ink2)",fontSize:13,lineHeight:1.6}}>
                <strong style={{color:"var(--accent-green)"}}>Limited spots.</strong> We start with a focused cohort in select geographies to ensure every partner gets hands-on support from the Namuste team.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes blink{0%,100%{opacity:.4}50%{opacity:1}}
        @media(max-width:860px){.op-grid{grid-template-columns:1fr!important}.ea-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
