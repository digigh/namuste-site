"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position:"fixed",top:0,left:0,right:0,zIndex:200,
      transition:"all .35s ease",
      padding: scrolled ? "10px 0" : "16px 0",
      background: scrolled ? "rgba(6,1,15,.97)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(139,92,246,.15)" : "none",
    }}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        {/* Logo */}
        <a href="#" style={{display:"flex",alignItems:"center",gap:8,textDecoration:"none",flexShrink:0}}>
          <div style={{width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,rgba(139,92,246,.4),rgba(16,185,129,.3))",border:"1px solid rgba(139,92,246,.35)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e9d5ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/></svg>
          </div>
          <span className="hf" style={{color:"#fff",fontWeight:800,fontSize:17,letterSpacing:"-.3px"}}>Namusté<span style={{color:"#8b5cf6"}}>.</span></span>
        </a>

        {/* Desktop nav */}
        <nav className="d-nav" style={{display:"flex",gap:28}}>
          {["Product","Features","Solutions","About","Contact"].map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`} style={{color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:13,fontWeight:500,transition:"color .18s"}}
              onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
              onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,.5)")}
            >{l}</a>
          ))}
        </nav>

        <div className="d-nav">
          <a href="#contact" className="btn-purple" style={{padding:"9px 20px",fontSize:13}}>Get Started</a>
        </div>

        {/* Mobile hamburger */}
        <button className="m-btn" onClick={()=>setOpen(!open)} style={{background:"none",border:"1px solid rgba(139,92,246,.3)",color:"#fff",cursor:"pointer",fontSize:18,display:"none",width:38,height:38,borderRadius:8,alignItems:"center",justifyContent:"center"}}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{background:"rgba(6,1,15,.98)",borderTop:"1px solid rgba(139,92,246,.12)",padding:"16px 20px 24px"}}>
          {["Product","Features","Solutions","About","Contact"].map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setOpen(false)}
              style={{display:"block",color:"rgba(255,255,255,.7)",textDecoration:"none",padding:"12px 0",fontSize:16,borderBottom:"1px solid rgba(139,92,246,.08)",fontWeight:500}}
            >{l}</a>
          ))}
          <a href="#contact" className="btn-purple" style={{marginTop:16,width:"100%",justifyContent:"center",display:"flex",fontSize:15}}>Get Started</a>
        </div>
      )}
      <style>{`
        @media(max-width:768px){.d-nav{display:none!important}.m-btn{display:flex!important}}
        @media(min-width:769px){.m-btn{display:none!important}}
      `}</style>
    </header>
  );
}
