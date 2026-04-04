"use client";

// Clean minimal nav — only real links
const navLinks: Record<string, string[]> = {
  Product:  ["Smart Device","QR Campaigns","Analytics"],
  Company:  ["About Us","Contact"],
  Support:  ["FAQs","Support"],
};

export default function Footer() {
  return (
    <footer>
      {/* CTA Banner */}
      <div style={{background:"var(--bg2)",position:"relative",overflow:"hidden"}}>
        <div className="dot-grid" style={{position:"absolute",inset:0,opacity:.5}}/>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:400,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(139,92,246,.1) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"72px 44px",position:"relative",zIndex:2,display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:28}}>
          <div>
            <h2 className="hf" style={{fontWeight:900,color:"#fff",fontSize:"clamp(22px,3vw,38px)",lineHeight:1.2,letterSpacing:"-.6px",marginBottom:8}}>
              Digitize your rural retail <span className="gt">today.</span>
            </h2>
            <p style={{color:"rgba(255,255,255,.38)",fontSize:15}}>Apply for early access — limited spots available.</p>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <a href="#contact" className="btn-purple" style={{fontSize:14}}>Apply for Early Access</a>
            <a href="#contact" className="btn-ghost" style={{fontSize:14}}>Contact Us</a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{background:"var(--bg)",borderTop:"1px solid rgba(139,92,246,.1)",padding:"52px 0 0"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 44px 40px"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:36}} className="fg">

            {/* Brand */}
            <div>
              <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:14}}>
                <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,rgba(139,92,246,.35),rgba(16,185,129,.25))",border:"1px solid rgba(139,92,246,.3)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e9d5ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/></svg>
                </div>
                <span className="hf" style={{fontWeight:800,fontSize:17,color:"#fff"}}>Namusté<span style={{color:"#8b5cf6"}}>.</span></span>
              </div>
              <p style={{color:"rgba(255,255,255,.28)",fontSize:13,lineHeight:1.75,marginBottom:18}}>
                The operating system for rural retail counters. Starting at the counter — the first moment of trust.
              </p>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" style={{marginTop:1,flexShrink:0}}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span style={{color:"rgba(255,255,255,.28)",fontSize:12}}>connect@namuste.com</span>
                </div>
                <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" style={{marginTop:1,flexShrink:0}}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span style={{color:"rgba(255,255,255,.28)",fontSize:12,lineHeight:1.5}}>245 B/1, Raipur Road, Kolkata 700047<br/>West Bengal, India</span>
                </div>
              </div>
            </div>

            {/* Nav columns — cleaned up */}
            {Object.entries(navLinks).map(([group,links])=>(
              <div key={group}>
                <h4 className="hf" style={{fontWeight:600,color:"rgba(255,255,255,.6)",fontSize:13,marginBottom:16}}>{group}</h4>
                <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:10}}>
                  {links.map(link=>(
                    <li key={link}>
                      <a href="#" style={{color:"rgba(255,255,255,.28)",fontSize:13,textDecoration:"none",transition:"color .18s"}}
                        onMouseEnter={e=>(e.currentTarget.style.color="rgba(196,181,253,.65)")}
                        onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,.28)")}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar — no copyright, no social icons, just brand */}
        <div style={{borderTop:"1px solid rgba(139,92,246,.08)",maxWidth:1280,margin:"0 auto",padding:"14px 44px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{color:"rgba(255,255,255,.16)",fontSize:12}}>
            Namusté Technologies Pvt. Ltd. · Kolkata, India
          </span>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:"#8b5cf6",opacity:.5}}/>
            <span style={{color:"rgba(196,181,253,.25)",fontSize:11}}>Building the future of agri retail</span>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:860px){.fg{grid-template-columns:1fr 1fr!important}}
        @media(max-width:480px){.fg{grid-template-columns:1fr!important}}
      `}</style>
    </footer>
  );
}
