"use client";
import { useEffect } from "react";

const problems = [
  {num:"01",title:"The rural counter has no digital record",desc:"Hundreds of crores flow through rural retail counters every day — and virtually none of it is digitally tracked. Brands operate on distributor estimates, not real data.",color:"var(--bronze)",bg:"rgba(204,138,90,.05)",border:"rgba(204,138,90,.15)"},
  {num:"02",title:"Brand schemes travel by WhatsApp",desc:"Trade promotions, loyalty schemes and seasonal campaigns are communicated by printout and WhatsApp group — untracked, unverified and invisible to the brand.",color:"var(--accent-green-mid)",bg:"rgba(82,204,79,.05)",border:"rgba(82,204,79,.15)"},
  {num:"03",title:"Rural retail is completely offline",desc:"The rural counter — where billions of transactions happen — has zero digital infrastructure. No inventory system, no payment data, no campaign tracking, no connection to the formal economy.",color:"var(--gold)",bg:"rgba(255,208,96,.05)",border:"rgba(255,208,96,.15)"},
];

const solutions = [
  {icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>,title:"Digitize the counter",desc:"A purpose-built device sits at the rural counter and records every transaction digitally — creating the first real data layer on top of rural retail."},
  {icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zm3 3h4v4h-4z"/></svg>,title:"Connect brands to retailers",desc:"Brands run campaigns through our platform. Retailers and customers participate via QR scan — no paperwork, no WhatsApp chains, every redemption fully verified."},
  {icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,title:"Unlock real purchase intelligence",desc:"For the first time, brands see exactly what is selling at the rural counter — by product, region and season — giving them demand intelligence they have never had."},
];

export default function Stats() {
  useEffect(() => {
    const obs = new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.08});
    document.querySelectorAll(".reveal,.reveal-l,.reveal-r").forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  }, []);

  return (
    <>
      {/* PROBLEM */}
      <section style={{padding:"104px 0",background:"var(--bg3)",position:"relative",overflow:"hidden"}}>
        <div className="dot-grid" style={{position:"absolute",inset:0,opacity:.3,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,right:"15%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(204,138,90,.02) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 44px",position:"relative",zIndex:2}}>
          <div className="reveal" style={{maxWidth:660,marginBottom:64}}>
            <div className="pill" style={{marginBottom:20,background:"rgba(204,138,90,.06)",border:"1px solid rgba(204,138,90,.2)"}}>
              <span style={{color:"var(--bronze)"}}>The Problem</span>
            </div>
            <h2 className="hf" style={{fontWeight:900,color:"#fff",fontSize:"clamp(30px,4vw,50px)",lineHeight:1.1,letterSpacing:"-.8px",marginBottom:16}}>
              Rural retail is{" "}
              <span className="gt">completely dark.</span>
            </h2>
            <p style={{color:"var(--ink2)",fontSize:17,lineHeight:1.8}}>
              India has over 12 million rural retail counters processing transactions every day — and virtually none of it is digitally recorded. Brands, distributors and retailers all operate blind.
            </p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"var(--border)",borderRadius:18,overflow:"hidden"}} className="prob-grid">
            {problems.map((p,i)=>(
              <div key={p.num} className="reveal" style={{background:"var(--bg2)",padding:"36px 28px",transitionDelay:`${i*80}ms`,transition:"background .25s",borderRight:i<2?"1px solid var(--border)":"none"}}
                onMouseEnter={e=>(e.currentTarget.style.background=p.bg)}
                onMouseLeave={e=>(e.currentTarget.style.background="var(--bg2)")}
              >
                <div className="hf" style={{fontWeight:900,fontSize:34,color:p.color,opacity:.15,lineHeight:1,marginBottom:6}}>{p.num}</div>
                <h3 className="hf" style={{fontWeight:700,fontSize:16,color:"#fff",marginBottom:12,lineHeight:1.3}}>{p.title}</h3>
                <p style={{color:"var(--ink2)",fontSize:14,lineHeight:1.78}}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{padding:"104px 0",background:"var(--bg)",position:"relative",overflow:"hidden"}}>
        <div className="line-grid" style={{position:"absolute",inset:0,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(82,204,79,.04) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 44px",position:"relative",zIndex:2}}>
          <div className="reveal" style={{textAlign:"center",maxWidth:620,margin:"0 auto 64px"}}>
            <div className="pill" style={{marginBottom:18}}><span className="pill-dot"/>Our Answer</div>
            <h2 className="hf" style={{fontWeight:900,color:"#fff",fontSize:"clamp(30px,4vw,50px)",lineHeight:1.1,letterSpacing:"-.8px",marginBottom:14}}>
              We built the <span className="gt-green">missing layer.</span>
            </h2>
            <p style={{color:"var(--ink2)",fontSize:16,lineHeight:1.8}}>
              Namuste is the digital infrastructure layer connecting brands, distributors, retailers and customers — at the rural counter, for the first time.
            </p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:"var(--border)",borderRadius:18,overflow:"hidden"}} className="prob-grid">
            {solutions.map((s,i)=>(
              <div key={s.title} className="reveal" style={{background:"var(--bg3)",padding:"40px 32px",transitionDelay:`${i*90}ms`,transition:"background .25s",position:"relative",overflow:"hidden",borderRight:i<2?"1px solid var(--border)":"none"}}
                onMouseEnter={e=>(e.currentTarget.style.background="rgba(82,204,79,.04)")}
                onMouseLeave={e=>(e.currentTarget.style.background="var(--bg3)")}
              >
                <div style={{width:52,height:52,borderRadius:14,background:"rgba(82,204,79,.06)",border:"1px solid rgba(82,204,79,.15)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:22,color:"var(--accent-green)"}}>{s.icon}</div>
                <h3 className="hf" style={{fontWeight:700,fontSize:17,color:"#fff",marginBottom:12,lineHeight:1.3}}>{s.title}</h3>
                <p style={{color:"var(--ink2)",fontSize:14,lineHeight:1.8}}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Vision quote */}
          <div className="reveal" style={{marginTop:40,padding:"36px 44px",background:"rgba(82,204,79,.04)",border:"1px solid rgba(82,204,79,.15)",borderRadius:18,display:"flex",alignItems:"center",gap:28,flexWrap:"wrap",backdropFilter:"blur(8px)"}}>
            <div style={{flex:1,minWidth:260}}>
              <p className="hf" style={{fontWeight:800,fontSize:"clamp(16px,2vw,22px)",color:"var(--ink)",lineHeight:1.45,fontStyle:"italic"}}>
                &ldquo;The first company to digitize the rural retail counter owns the most valuable commercial data asset in India.&rdquo;
              </p>
            </div>
            <div style={{width:1,height:50,background:"rgba(82,204,79,.18)",flexShrink:0}} className="quote-div"/>
            <div style={{flexShrink:0}}>
              <div className="hf" style={{fontWeight:700,fontSize:14,color:"var(--accent-green-mid)"}}>Namuste Technologies</div>
              <div style={{color:"var(--ink2)",fontSize:12,marginTop:3}}>Our founding thesis</div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:860px){.prob-grid{grid-template-columns:1fr!important}.quote-div{display:none}}`}</style>
      </section>
    </>
  );
}
