"use client";
import { useEffect, useState } from "react";

const features = [
  {
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>,
    title:"Smart Retail Device",
    desc:"A purpose-built device with an advanced Counter OS designed for the rural retail counter. Manages every workflow — sales, inventory, campaigns, payments — from a single screen.",
    detail:"The Namusté device runs a custom operating system built ground-up for rural retail. It replaces the counter notebook, the WhatsApp scheme group, the paper inventory ledger and the manual cash register — with one device that works even without internet.",
    tag:"Hardware + Counter OS", feature:"hero",
    stat:{ val:"1 Device", sub:"replaces everything" },
    points:["Custom Counter OS for rural retail","Fully offline-capable — works without internet","Touch-first, no training required","Secure hardware with auto-updates","Handles sales, inventory, campaigns and payments"],
  },
  {
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zm3 3h4v4h-4z"/></svg>,
    title:"QR Campaign Engine",
    desc:"Customers scan product QR codes at the counter. Retailers approve on the device. Brand rewards, discounts and loyalty points unlock instantly — zero paperwork, zero WhatsApp chains.",
    detail:"Every product can carry a campaign QR code. When a customer scans it, the device instantly checks eligibility, displays the offer and awaits retailer approval. The entire flow — scan, verify, approve, reward — completes in under 10 seconds, fully digital and fully trackable.",
    tag:"Campaigns", feature:"card",
    points:["Scan-to-reward in under 10 seconds","Eligibility verified in real time","Retailer approve or reject control","Complete audit trail per transaction","Compatible with any existing product label"],
  },
  {
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
    title:"Real-time Demand Data",
    desc:"Every counter transaction becomes a live data point. Brands get their first real window into what rural customers are actually buying — by product, region, season and store.",
    detail:"For the first time, brands can see real purchase-level data from rural counters instead of relying on distributor estimates. The Namusté platform aggregates transactions into dashboards — showing product sell-out velocity, campaign ROI, geographic demand and seasonal trends.",
    tag:"Analytics", feature:"card",
    points:["Live sell-out dashboard for brands","Product-level purchase analytics","Regional demand heatmaps","Campaign performance measurement","Seasonal and trend forecasting"],
  },
  {
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>,
    title:"Inventory Management",
    desc:"Track stock levels across every product in real time. Get automated low-stock alerts and place reorder requests directly to distributors from the counter — without a single phone call.",
    detail:"Rural retailers no longer need to manually count stock or chase distributors. The Namusté device tracks every sale, calculates remaining inventory and can trigger a reorder when stock falls below a threshold. Orders are sent digitally and confirmed in the app.",
    tag:"Operations", feature:"card",
    points:["Real-time stock tracking per product","Automated low-stock alerts","One-tap reorder to distributor","Order confirmation and tracking","Multi-category inventory dashboard"],
  },
  {
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>,
    title:"Embedded Fintech",
    desc:"Payments, credit scoring and formal financial services woven directly into the rural counter — unlocking formal finance for retailers and their customers for the first time.",
    detail:"Because every transaction on Namusté is digitally recorded, it creates a financial data trail that can power credit scoring. Retailers can access working capital loans based on their sales history. Customers can access buy-now-pay-later. All invisible within the counter workflow.",
    tag:"Finance", feature:"card",
    points:["Digital payment collection at counter","Sales-history-based credit scoring","Working capital loans for retailers","Customer buy-now-pay-later","Regulatory-grade transaction compliance"],
  },
  {
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77Z"/><path d="m9 12 2 2 4-4"/></svg>,
    title:"Brand Scheme Connect",
    desc:"Trade schemes, seasonal promotions and loyalty programs delivered digitally to every enrolled retailer — fully tracked, verified and reported in real time. No more scheme leakage.",
    detail:"Brands lose crores every year to scheme leakage — discounts claimed but never reaching customers. Namusté eliminates this by gating every redemption through the device. Every claim is verified, every reward tracked, and brands get a real-time scheme performance dashboard.",
    tag:"Brands", feature:"hero",
    stat:{ val:"100%", sub:"verified delivery" },
    points:["Zero scheme leakage guaranteed","Real-time redemption tracking","Customer-level eligibility gating","Brand performance dashboard","Seasonal and product-specific campaigns"],
  },
  {
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    title:"End-to-End Security",
    desc:"Every transaction encrypted and auditable. Trust is built into every touchpoint — from QR scan to campaign approval to reward delivery at the rural counter.",
    detail:"The Namusté platform uses end-to-end encryption for all transaction data. Every action is cryptographically signed and stored in an immutable audit log — making the platform fully compliant and ready for regulatory scrutiny at any scale.",
    tag:"Security", feature:"card",
    points:["End-to-end transaction encryption","Immutable audit log per action","Cryptographic signature on every approval","Role-based access control","Regulatory-grade data compliance"],
  },
  {
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>,
    title:"Offline-First Sync",
    desc:"Built for rural India where connectivity is unreliable. The device works completely offline and syncs all data automatically when connectivity returns — zero data loss, ever.",
    detail:"Most rural counters have poor or no internet. The Namusté device stores all transactions locally in encrypted storage and syncs to the cloud when a connection is available. The retailer never sees a spinner or an error — the device simply works, always.",
    tag:"Reliability", feature:"card",
    points:["100% offline functionality","Automatic background sync on reconnection","Zero transaction data loss","Works on 2G / 3G / 4G / WiFi","Local encrypted storage on device"],
  },
];

const tags = ["All","Hardware + Counter OS","Campaigns","Analytics","Operations","Finance","Brands","Security","Reliability"];

export default function Features() {
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState<string|null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.07});
    document.querySelectorAll(".reveal,.reveal-l,.reveal-r").forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  }, []);

  const filtered = active === "All" ? features : features.filter(f => f.tag === active);

  return (
    <section id="features" style={{padding:"104px 0",background:"var(--bg2)",position:"relative",overflow:"hidden"}}>
      <div className="dot-grid" style={{position:"absolute",inset:0,opacity:.45,pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.05) 0%,transparent 70%)",pointerEvents:"none"}}/>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 44px",position:"relative",zIndex:2}}>
        <div className="reveal" style={{textAlign:"center",maxWidth:640,margin:"0 auto 48px"}}>
          <div className="pill" style={{marginBottom:18}}>Platform Features</div>
          <h2 className="hf" style={{fontWeight:900,color:"#fff",fontSize:"clamp(30px,4vw,48px)",lineHeight:1.1,letterSpacing:"-.8px",marginBottom:16}}>
            Everything at <span className="gt">the Counter</span>
          </h2>
          <p style={{color:"rgba(255,255,255,.38)",fontSize:16,lineHeight:1.75}}>
            One device replaces the notebook, WhatsApp scheme groups, paper ledger and manual cash register — built for every rural retail counter.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="reveal" style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:44}}>
          {tags.map(t=>(
            <button key={t} onClick={()=>{setActive(t);setExpanded(null);}} style={{
              background: active===t ? "linear-gradient(135deg,#7c3aed,#6d28d9)" : "rgba(255,255,255,.04)",
              border: active===t ? "1px solid rgba(139,92,246,.5)" : "1px solid rgba(139,92,246,.15)",
              color: active===t ? "#fff" : "rgba(196,181,253,.55)",
              padding:"7px 18px", borderRadius:999, fontSize:12, fontWeight:600,
              cursor:"pointer", transition:"all .2s",
              fontFamily:"'Poppins',system-ui,sans-serif",
              boxShadow: active===t ? "0 4px 16px rgba(124,58,237,.3)" : "none",
            }}>{t}</button>
          ))}
        </div>

        {/* Bento grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:12}} className="feat-bento">
          {filtered.map((f,i)=>{
            const isHero = f.feature === "hero" && active === "All";
            const isOpen = expanded === f.title;
            return (
              <div key={f.title} className="reveal" style={{
                gridColumn: isHero ? "span 8" : "span 4",
                background: isHero ? "rgba(139,92,246,.09)" : "rgba(255,255,255,.03)",
                border: isHero ? "1px solid rgba(139,92,246,.25)" : "1px solid rgba(139,92,246,.12)",
                borderRadius:18, padding: isHero ? "36px 36px" : "26px 24px",
                backdropFilter:"blur(8px)",
                transition:"border-color .25s,background .25s,transform .25s",
                transitionDelay:`${i*45}ms`,
                position:"relative", overflow:"hidden",
              }}
                onMouseEnter={e=>{if(!isOpen){e.currentTarget.style.borderColor="rgba(139,92,246,.45)";if(!isHero)e.currentTarget.style.background="rgba(139,92,246,.07)";e.currentTarget.style.transform="translateY(-2px)";}}}
                onMouseLeave={e=>{if(!isOpen){e.currentTarget.style.borderColor=isHero?"rgba(139,92,246,.25)":"rgba(139,92,246,.12)";if(!isHero)e.currentTarget.style.background="rgba(255,255,255,.03)";e.currentTarget.style.transform="translateY(0)";}}}
              >
                {isHero&&<div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.12) 0%,transparent 70%)",pointerEvents:"none"}}/>}

                <div style={{display:"inline-block",marginBottom:isHero?20:14,padding:"3px 10px",borderRadius:5,background:"rgba(139,92,246,.12)",border:"1px solid rgba(139,92,246,.22)",fontSize:9,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"#a78bfa"}}>{f.tag}</div>
                <div style={{width:isHero?50:42,height:isHero?50:42,borderRadius:isHero?14:11,marginBottom:isHero?20:14,background:"rgba(139,92,246,.12)",border:"1px solid rgba(139,92,246,.2)",display:"flex",alignItems:"center",justifyContent:"center",color:"#a78bfa"}}>{f.icon}</div>

                {isHero ? (
                  <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:24,alignItems:"start"}}>
                    <div>
                      <h3 className="hf" style={{fontWeight:700,fontSize:22,color:"#fff",marginBottom:10,lineHeight:1.25}}>{f.title}</h3>
                      <p style={{fontSize:15,lineHeight:1.78,color:"rgba(255,255,255,.5)",marginBottom:16}}>{f.desc}</p>
                      <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:20}}>
                        {f.points?.map(p=>(
                          <div key={p} style={{display:"flex",alignItems:"center",gap:8}}>
                            <div style={{width:16,height:16,borderRadius:"50%",background:"rgba(16,185,129,.12)",border:"1px solid rgba(16,185,129,.25)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                              <svg width="8" height="8" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="#10b981" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                            <span style={{color:"rgba(255,255,255,.55)",fontSize:13}}>{p}</span>
                          </div>
                        ))}
                      </div>
                      <a href="#contact" className="btn-purple" style={{display:"inline-flex",fontSize:13,padding:"9px 20px"}}>Apply for Early Access</a>
                    </div>
                    {f.stat&&(
                      <div style={{background:"rgba(139,92,246,.12)",border:"1px solid rgba(139,92,246,.22)",borderRadius:14,padding:"18px 22px",textAlign:"center",flexShrink:0,minWidth:110}}>
                        <div className="hf" style={{fontWeight:900,fontSize:26,color:"#c4b5fd",lineHeight:1,marginBottom:4}}>{f.stat.val}</div>
                        <div style={{color:"rgba(196,181,253,.45)",fontSize:10,fontWeight:500,lineHeight:1.3}}>{f.stat.sub}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <h3 className="hf" style={{fontWeight:700,fontSize:15,color:"#fff",marginBottom:8,lineHeight:1.3}}>{f.title}</h3>
                    <p style={{fontSize:13,lineHeight:1.72,color:"rgba(255,255,255,.42)",marginBottom:14}}>{f.desc}</p>
                    {isOpen&&(
                      <div style={{marginBottom:14,paddingTop:14,borderTop:"1px solid rgba(139,92,246,.15)"}}>
                        <p style={{fontSize:13,lineHeight:1.78,color:"rgba(255,255,255,.55)",marginBottom:12}}>{f.detail}</p>
                        <div style={{display:"flex",flexDirection:"column",gap:6}}>
                          {f.points?.map(p=>(
                            <div key={p} style={{display:"flex",alignItems:"center",gap:7}}>
                              <div style={{width:14,height:14,borderRadius:"50%",background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.22)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                                <svg width="7" height="7" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="#10b981" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </div>
                              <span style={{color:"rgba(255,255,255,.5)",fontSize:12}}>{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <button onClick={()=>setExpanded(isOpen?null:f.title)} style={{background:"none",border:"1px solid rgba(139,92,246,.22)",color:"#a78bfa",fontSize:12,fontWeight:600,padding:"6px 12px",borderRadius:7,cursor:"pointer",fontFamily:"'Poppins',system-ui,sans-serif",transition:"all .2s"}}
                        onMouseEnter={e=>{e.currentTarget.style.background="rgba(139,92,246,.12)";e.currentTarget.style.borderColor="rgba(139,92,246,.4)"}}
                        onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.borderColor="rgba(139,92,246,.22)"}}
                      >{isOpen?"Show less ↑":"Learn more ↓"}</button>
                      {isOpen&&<a href="#contact" style={{color:"#6ee7b7",fontSize:12,fontWeight:600,textDecoration:"none"}}>Apply for Access →</a>}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){.feat-bento{grid-template-columns:repeat(6,1fr)!important}.feat-bento>*{grid-column:span 3!important}}
        @media(max-width:640px){.feat-bento{grid-template-columns:1fr!important}.feat-bento>*{grid-column:span 1!important}}
      `}</style>
    </section>
  );
}
