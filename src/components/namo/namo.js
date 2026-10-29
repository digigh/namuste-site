/*!
 * Namo, a voice-agent character (a pearl robot with a glowing visor face). Vanilla JS, no dependencies, no network, no secrets.
 * Usage:  const namo = Namo.createNamo(document.getElementById('box'));
 *         namo.setState('listening'); namo.setLevel(0.4);
 * Works as a <script> (window.Namo), CommonJS, or ES import. Safe to import during server-side rendering.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) { module.exports = api; module.exports.default = api.createNamo; }
  else { root.Namo = api; }
})(typeof self !== 'undefined' ? self : this, function () {
'use strict';
'use strict';
const $ = id => document.getElementById(id);
const clamp = (v,a,b) => Math.min(b, Math.max(a, v));
const lerp = (a,b,t) => a + (b-a)*t;
const rnd = (a,b) => a + Math.random()*(b-a);
const f = n => Math.round(n*10)/10;
const f2 = n => Math.round(n*100)/100;
const NS = 'http://www.w3.org/2000/svg';
const RM = typeof window !== 'undefined' && !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
const AMP = RM ? .4 : 1;
let UID = 0;
function el(tag, attrs, parent){
  const e = document.createElementNS(NS, tag);
  if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
function at(e, attrs){ for (const k in attrs) e.setAttribute(k, attrs[k]); return e; }
function defsOf(svg){ return svg.querySelector('defs') || svg.insertBefore(el('defs'), svg.firstChild); }
function grad(svg, stops, o){
  o = o || {};
  const id = 'g' + (++UID);
  const g = el(o.radial ? 'radialGradient' : 'linearGradient', Object.assign({id}, o.attrs || (o.radial ? {} : {x1:0,y1:0,x2:0,y2:1})), defsOf(svg));
  stops.forEach(s => el('stop', {offset:s[0], 'stop-color':s[1], 'stop-opacity': s[2] == null ? 1 : s[2]}, g));
  return 'url(#' + id + ')';
}
function hexRgb(h){ if (h[0] === 'r') return h.match(/[\d.]+/g).slice(0,3).map(Number); h = h.replace('#',''); return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)]; }
function mix(a, b, t){ const x = hexRgb(a), y = hexRgb(b); return 'rgb(' + x.map((v,i) => Math.round(v + (y[i]-v)*t)).join(',') + ')'; }
class Spring{
  constructor(k, c, x){ this.k = k; this.c = c; this.x = x || 0; this.v = 0; }
  step(target, dt){
    const n = Math.max(1, Math.ceil(dt/.008)), h = dt/n;
    for (let i = 0; i < n; i++){ this.v += ((target - this.x)*this.k - this.v*this.c)*h; this.x += this.v*h; }
    return this.x;
  }
}
function mouthP(cx, cy, hw, open, smile){
  const cornerY = cy - smile*hw*.30, dt = smile*hw*.7;
  const db = dt + open*hw*1.1 + Math.max(0, smile)*hw*.18;
  const lx = cx - hw, rx = cx + hw;
  return `M${f(lx)} ${f(cornerY)} Q${f(cx)} ${f(cornerY + 2*dt)} ${f(rx)} ${f(cornerY)} Q${f(cx)} ${f(cornerY + 2*db)} ${f(lx)} ${f(cornerY)}Z`;
}

/* ---------- sound ---------- */
const S = {sound:true};
let actx = null;
function boop(fr, d, type, vol){
  if (!S.sound) return;
  try{
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
    const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
    d = d || .1; o.type = type || 'sine';
    o.frequency.setValueAtTime(fr, t); o.frequency.exponentialRampToValueAtTime(fr*1.6, t + d);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol || .05, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + d + .04);
    o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + d + .06);
  }catch(e){}
}

/* ---------- lip sync ---------- */
const SH = {a:[.92,.55],e:[.55,.9],i:[.3,1],o:[.82,0],u:[.42,0],y:[.3,.9],w:[.38,0],q:[.38,0],m:[0,.4],b:[0,.4],p:[0,.4],f:[.12,.7],v:[.12,.7]};
const DEF = [.28,.6];
function shapeAt(text, i){
  const raw = text[i], ch = raw.toLowerCase();
  let s = SH[ch];
  if (!s){
    if (ch === ' ') s = [.05,.45];
    else if (/[.,!?;:—-]/.test(ch)) s = [0,.4];
    else if (/[a-z]/.test(ch)) s = DEF;
    else s = [.1,.45];
  }
  if (s === DEF){
    const nx = (text[i+1] || '').toLowerCase(), ns = SH[nx];
    if (ns && 'aeiou'.includes(nx)) s = [lerp(s[0],ns[0],.5), lerp(s[1],ns[1],.5)];
  }
  if (/[A-Z]/.test(raw) || text[i+1] === '!') s = [Math.min(1, s[0]*1.15), s[1]];
  return s;
}
function buildTimeline(text){
  const times = []; let t = 0;
  for (let i = 0; i < text.length; i++){
    times.push(t); const ch = text[i]; let d = 1/13.5;
    if (/[.!?]/.test(ch)) d += .28; else if (/[,;:—]/.test(ch)) d += .14; else if (ch === ' ') d *= .7;
    t += d;
  }
  return {times, total:t};
}
function pickVoice(gender){
  try{
    const vs = speechSynthesis.getVoices();
    const re = gender === 'm' ? /male|david|mark|guy|ravi|hemant|prabhat|rishi/i : /female|zira|samantha|aria|jenny|heera|veena|priya|swara|neerja/i;
    return vs.find(v => /en[-_]IN/i.test(v.lang) && re.test(v.name)) || vs.find(v => /^en/i.test(v.lang) && re.test(v.name)) || vs.find(v => /^en/i.test(v.lang)) || null;
  }catch(e){ return null; }
}

/* ---------- face kit: eyes, brows, mouth, cheeks, shared by most characters ---------- */
function faceKit(parent, o){
  const g = el('g', null, parent);
  const cheekRx = o.cheekRx || 16;
  const cL = el('ellipse', {cx:o.cx - o.cheekDX, cy:o.cheekY, rx:cheekRx, ry:cheekRx*.62, fill:o.blush || '#ff6b7a'}, g);
  if (o.cheekFilter){ cL.setAttribute('filter', o.cheekFilter); }
  const cR = el('ellipse', {cx:o.cx + o.cheekDX, cy:o.cheekY, rx:cheekRx, ry:cheekRx*.62, fill:o.blush || '#ff6b7a'}, g);
  if (o.cheekFilter){ cR.setAttribute('filter', o.cheekFilter); }
  const pupil = o.pupil || '#1b1626';
  const mkEye = () => {
    const e = el('g', null, g), inner = el('g', null, e);
    const sc = el('ellipse', {rx:o.erx, ry:o.ery, fill:o.white || '#fffdfa', 'data-hit':'eye'}, inner);
    if (o.eyeStroke){ sc.setAttribute('stroke', o.eyeStroke); sc.setAttribute('stroke-width', 2); }
    const pg = el('g', {'pointer-events':'none'}, inner);
    el('circle', {r:o.ir, fill:o.irisFill || pupil}, pg);
    if (o.irisFill){ el('circle', {r:o.ir*.52, fill:'#03120a'}, pg); el('circle', {r:o.ir, fill:'none', stroke:'#0a2a16', 'stroke-width':1.6, opacity:.6}, pg); }
    el('circle', {cx:-o.ir*.3, cy:-o.ir*.38, r:o.ir*.36, fill:'#fff'}, pg);
    el('circle', {cx:o.ir*.34, cy:o.ir*.32, r:o.ir*.16, fill:'#fff', opacity:.85}, pg);
    const arc = el('path', {d:`M${-o.erx*.85} ${o.ery*.3} Q0 ${-o.ery*.95} ${o.erx*.85} ${o.ery*.3}`, fill:'none', stroke:pupil, 'stroke-width':o.arcW || 7, 'stroke-linecap':'round', opacity:0, 'pointer-events':'none'}, e);
    return {e, inner, pg, arc};
  };
  const eL = mkEye(), eR = mkEye();
  const bw = o.erx*.72, bcol = o.browColor || pupil;
  const browD = `M${-bw} 0 Q0 -4 ${bw} 0`;
  let bL = null, bR = null;
  if (o.brows !== false){
    bL = el('path', {d:browD, fill:'none', stroke:bcol, 'stroke-width':o.browW || 5, 'stroke-linecap':'round', 'pointer-events':'none'}, g);
    bR = el('path', {d:browD, fill:'none', stroke:bcol, 'stroke-width':o.browW || 5, 'stroke-linecap':'round', 'pointer-events':'none'}, g);
  }
  let mouth = null, mclip = null, tongue = null, teeth = null;
  if (!o.noMouth){
    const cid = 'c' + (++UID);
    mclip = el('path', {d:'M0 0'}); el('clipPath', {id:cid}, defsOf(o.svg)).appendChild(mclip);
    mouth = el('path', {d:'M0 0', fill:o.mouthFill || '#4a1a22', stroke:o.mouthStroke || o.mouthFill || '#4a1a22', 'stroke-width':o.mouthW || 4.5, 'stroke-linejoin':'round', 'pointer-events':'none'}, g);
    const mg = el('g', {'clip-path':`url(#${cid})`, 'pointer-events':'none'}, g);
    if (o.teeth) teeth = el('rect', {x:0, y:0, width:10, height:5, rx:2, fill:o.teeth}, mg);
    tongue = el('ellipse', {cx:o.cx, cy:o.my, rx:8, ry:1, fill:o.tongue || '#ff7d8c'}, mg);
  }
  function update(P){
    const gx = P.lx*(o.gx || 8), gy = P.ly*(o.gy || 5);
    g.setAttribute('transform', `translate(${f(gx)} ${f(gy)})`);
    const sy = Math.max(.05, P.eye*(1 - P.lid*.96)*(1 + P.surprised*.12));
    const sx = 1 + (P.eye - 1)*.3 + P.surprised*.08;
    const lcx = o.cx - o.ex, rcx = o.cx + o.ex;
    for (const [E, cx] of [[eL, lcx], [eR, rcx]]){
      E.e.setAttribute('transform', `translate(${cx} ${o.ey})`);
      E.inner.setAttribute('transform', `scale(${f2(sx)} ${f2(sy)})`);
      E.inner.setAttribute('opacity', f2(1 - P.happy));
      E.pg.setAttribute('transform', `translate(${f(P.lx*o.erx*.42)} ${f(P.ly*o.ery*.44)})`);
      E.arc.setAttribute('opacity', f2(P.happy));
    }
    if (bL){
      const by = o.browY - P.brow*7;
      bL.setAttribute('transform', `translate(${lcx} ${f(by + P.asym*3)}) rotate(${f(-P.worry*14)})`);
      bR.setAttribute('transform', `translate(${rcx} ${f(by - P.asym*6)}) rotate(${f(P.worry*14)})`);
    }
    const co = f2(clamp((o.cheekA == null ? .1 : o.cheekA) + P.cheek*(o.cheekB == null ? .62 : o.cheekB), 0, 1));
    cL.setAttribute('opacity', co); cR.setAttribute('opacity', co);
    if (mouth){
      const hw = o.mhw*(.85 + P.wide*.5), sm = P.smile + P.happy*.3, op = clamp(P.mouth, 0, 1)*(1 + P.surprised*.3);
      const d = mouthP(o.cx, o.my, hw, op, sm);
      mouth.setAttribute('d', d); mclip.setAttribute('d', d);
      const cornerY = o.my - sm*hw*.3, dt = sm*hw*.7, db = dt + op*hw*1.1 + Math.max(0, sm)*hw*.18;
      if (teeth){ at(teeth, {x:f(o.cx - hw), width:f(hw*2), y:f(cornerY + dt - 1), height:f(Math.max(3, hw*.3))}); }
      at(tongue, {cy:f(cornerY + db*.92), rx:f(hw*.55), ry:f(Math.max(.1, op*hw*.55)), opacity:op > .18 ? 1 : 0});
    }
  }
  return {g, update};
}

/* ---------- actor: one living character ---------- */
const MOODS = {
  friendly:{smile:.78,brow:.12,asym:0,worry:0,cheek:.5,tilt:0},
  happy:{smile:1,brow:.3,asym:0,worry:0,cheek:.85,tilt:0},
  calm:{smile:.45,brow:-.04,asym:0,worry:0,cheek:.3,tilt:0},
  curious:{smile:.5,brow:.6,asym:.8,worry:0,cheek:.4,tilt:-6},
  caring:{smile:.4,brow:.2,asym:0,worry:.6,cheek:.55,tilt:4},
  confident:{smile:.6,brow:-.1,asym:0,worry:-.3,cheek:.35,tilt:0}
};
const ACCENT = {idle:'#46f08a', listening:'#46f08a', thinking:'#46f08a', speaking:'#46f08a', sleepy:'#5f8a73', error:'#ff6a55'};
const RATE = {lx:9,ly:9,eye:14,smile:10,brow:12,asym:8,worry:10,cheek:8,happy:12,surprised:14,sleepy:3,listen:8,think:6,speak:8,perk:6,glow:6,armL:9,armR:9,tilt:5,mouth:15,wide:11,dangle:10};
const HEART = 'M0 4 C-8 -2 -5 -8 0 -4 C5 -8 8 -2 0 4Z';
const DROP = 'M0 -6 C4 -1 5 2 0 5 C-5 2 -4 -1 0 -6Z';
const NOTE = 'M-3 7 C-7 7 -8 3 -4 2 C-1 1.5 1 3 1 5 L1 -8 L8 -5 L8 -2 L4 -4 L4 5 C4 8 0 9 -3 7Z';
const LEAFP = 'M0 -8 C8 -6 9 4 0 9 C-9 4 -8 -6 0 -8Z';
const SPARK = 'M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2Z';

class Actor{
  constructor(ch, svg, opt){
    opt = opt || {};
    this.ch = ch; this.svg = svg; this.auto = !!opt.auto;
    this.state = 'idle'; this.mood = 'friendly'; this.react = null; this.reactUntil = 0; this.t = 0; this.lastAct = 0;
    this.speech = null; this.onState = null; this.onWord = null; this.onEnd = null;
    this.ext = {v:0, t:-9}; this.inputLevel = 0; this.micV = 0; this.micT = 0;
    this.P = {lx:0,ly:0,lid:0,eye:1,smile:.7,brow:.1,asym:0,worry:0,cheek:.5,happy:0,surprised:0,sleepy:0,listen:0,think:0,speak:0,perk:.25,glow:0,armL:0,armR:0,tilt:0,mouth:0,wide:.45,dangle:0,level:0,nod:0,bob:0,accent:ACCENT.idle,t:0};
    this.T = Object.assign({}, this.P);
    this.blinkT = rnd(1,4); this.blinkPh = -1; this.squint = 0;
    this.wT = 0; this.wx = 0; this.wy = 0; this.sT = 0; this.sx = 0; this.sy = 0; this.lookMode = 'pointer';
    this.gest = {t:0, l:0, r:0}; this.fid = rnd(6,10); this.waveUntil = 0; this.laughUntil = 0; this.laughT = 0;
    this.hopY = 0; this.hopV = 0; this.sq = 0; this.sqV = 0; this.dx = 0; this.dy = 0; this.dvx = 0; this.dvy = 0; this.btilt = 0;
    this.kick = 0; this.kickV = 0; this.wob = 0; this.wobV = 0; this.vx = 0; this.vy = 0; this.px = 0; this.py = 0;
    this.cheekBoost = 0; this.drag = null; this.tickle = {n:0, t:-9}; this.pool = [];
    this.wpos = 0; this.goX = null; this.goSpeed = 0; this.gait = 0; this.gaitPh = 0; this.faceDir = 1; this.run = false; this.onArrive = null; this.hopWalk = false; this.hopT = 0;
    this.shadow = el('ellipse', {cx:200, cy:380, rx:96, ry:11, fill:'#000', opacity:.16, 'pointer-events':'none'}, svg);
    this.rig = el('g', null, svg);
    this.upd = ch.build(this.rig, svg, this);
    this.ov = el('g', {'pointer-events':'none'}, this.rig);
    this.dots = [0,1,2].map(() => el('circle', {r:5, fill:ACCENT.thinking, opacity:0}, this.ov));
    this.zs = [0,1,2].map(() => { const e = el('text', {'font-family':'Plus Jakarta Sans, system-ui, sans-serif', 'font-weight':800, fill:'#7a8f84', opacity:0}, this.ov); e.textContent = 'z'; return e; });
    this.fx = el('g', {'pointer-events':'none'}, svg);
  }
  destroy(){ this.endSpeech(true); }
  eff(){
    if (this.drag && this.drag.moved) return 'held';
    if (this.react && this.t < this.reactUntil) return this.react;
    return this.state;
  }
  setState(s){
    if (s !== 'speaking') this.endSpeech(true);
    this.state = s; this.lastAct = this.t;
    if (this.onState) this.onState();
  }
  doReact(name, ms){
    this.react = name; this.reactUntil = this.t + ms/1000;
    if (name === 'happy' || name === 'laugh') this.hop(380);
    if (name === 'surprised') this.hop(300);
  }
  hop(v){ this.hopV = Math.max(this.hopV, v*AMP); }
  walkTo(x, speed, done){ this.wake(); this.lastAct = this.t; this.goX = clamp(x, -58, 58); this.goSpeed = speed || 95; this.onArrive = done || null; }
  stopWalk(){ this.goX = null; this.onArrive = null; this.hopWalk = false; }
  stepGait(dt){
    let moving = false;
    if (this.drag && this.drag.moved) this.goX = null;
    if (this.goX != null){
      const d = this.goX - this.wpos;
      if (Math.abs(d) < 2.5){ this.wpos = this.goX; this.goX = null; const fn = this.onArrive; this.onArrive = null; this.hopWalk = false; if (fn) fn(); }
      else { this.faceDir = d > 0 ? 1 : -1; this.wpos += Math.sign(d)*Math.min(Math.abs(d), this.goSpeed*dt*(RM ? .6 : 1)); moving = true; this.run = this.goSpeed > 150; this.lastAct = this.t; }
    }
    this.gait += ((moving ? 1 : 0) - this.gait)*(1 - Math.exp(-9*dt));
    if (moving){
      this.gaitPh += dt*(this.run ? 14 : 8.5);
      if (this.hopWalk){ this.hopT -= dt; if (this.hopT <= 0){ this.hopT = .42; this.hop(340); } }
    }
  }
  wake(){ if (this.state === 'sleepy'){ this.setState('idle'); this.doReact('surprised', 650); } }
  say(text, o){
    o = o || {}; this.endSpeech(true);
    const tl = buildTimeline(text);
    const sp = {text, times:tl.times, total:tl.total, t0:this.t, cur:0, audio:false, audioOn:false, audioDone:false, mood:o.mood};
    this.speech = sp; this.state = 'speaking'; this.lastAct = this.t;
    if (this.onState) this.onState();
    if (o.sound && 'speechSynthesis' in window){
      try{
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text); u.pitch = o.pitch || 1; u.rate = o.rate || 1;
        const v = pickVoice(o.gender); if (v){ u.voice = v; u.lang = v.lang; }
        u.onstart = () => { if (this.speech === sp){ sp.audioOn = true; sp.t0 = this.t; } };
        u.onboundary = e => { if (this.speech === sp && typeof e.charIndex === 'number') sp.t0 = this.t - sp.times[clamp(e.charIndex, 0, sp.times.length - 1)]; };
        u.onend = u.onerror = () => { if (this.speech === sp) sp.audioDone = true; };
        sp.audio = true; speechSynthesis.speak(u);
      }catch(e){}
    }
  }
  endSpeech(){
    const sp = this.speech; if (!sp) return;
    this.speech = null;
    try{ if (sp.audio) speechSynthesis.cancel(); }catch(e){}
  }
  finishSpeech(){
    const m = this.speech && this.speech.mood;
    this.endSpeech();
    if (this.state === 'speaking') this.state = 'idle';
    if (this.onState) this.onState();
    if (this.onEnd) this.onEnd();
    if (m === 'happy') this.doReact('happy', 900);
  }
  lipsync(T){
    const sp = this.speech, t = this.t; if (!sp) return;
    const e = t - sp.t0, ts = sp.times; let i = sp.cur;
    while (i + 1 < ts.length && ts[i+1] <= e) i++;
    while (i > 0 && ts[i] > e) i--;
    sp.cur = i;
    if (e > sp.total){
      if (sp.audioOn && !sp.audioDone){ T.mouth = .3 + .3*Math.sin(t*13); T.wide = .5; }
      if (sp.audioOn ? (sp.audioDone || e > sp.total*2 + 3) : e > sp.total + .4) this.finishSpeech();
    } else if (e >= 0){
      const s = shapeAt(sp.text, i); T.mouth = s[0]*.78; T.wide = .3 + s[1]*.5;
      if (this.onWord) this.onWord(i);
    }
  }
  setTargets(eff, dt){
    const T = this.T, t = this.t, lvl = this.P.level;
    const m = MOODS[(this.speech && this.speech.mood) || this.mood] || MOODS.friendly;
    Object.assign(T, {eye:1, smile:m.smile, brow:m.brow, asym:m.asym, worry:m.worry, cheek:m.cheek, happy:0, surprised:0, sleepy:0, listen:0, think:0, speak:0, perk:.25, glow:0, armL:0, armR:0, tilt:m.tilt, mouth:0, wide:.45, dangle:0});
    this.lookMode = 'pointer';
    switch (eff){
      case 'idle':
        if (t < this.waveUntil){ T.armR = .8 + Math.sin(t*13)*.18; T.smile = Math.max(T.smile, .85); T.cheek = Math.max(T.cheek, .65); }
        break;
      case 'listening':
        Object.assign(T, {listen:1, perk:1, brow:T.brow + .3, worry:T.worry + .12, smile:T.smile*.55, glow:.5 + lvl*.5, armL:.06, armR:.06, tilt:T.tilt + 4 + Math.sin(t*.8)*3});
        this.lookMode = 'user'; break;
      case 'thinking':
        Object.assign(T, {think:1, perk:.35, asym:.7, brow:.2, worry:0, smile:.12, glow:.35, mouth:.03, wide:.1, armR:.88 + Math.sin(t*2)*.03, tilt:-7 + Math.sin(t*1.3)*2});
        this.lookMode = 'up'; break;
      case 'speaking': {
        const g = this.gest; g.t -= dt;
        if (g.t <= 0){ g.t = rnd(1.8, 3.4); const r = Math.random(); g.l = r < .3 ? rnd(.12, .3) : .04; g.r = r > .6 ? rnd(.12, .32) : .04; }
        Object.assign(T, {speak:1, perk:.5 + lvl*.4, glow:.4 + lvl*.6, armL:g.l, armR:g.r, tilt:T.tilt*.5 + Math.sin(t*.9)*2});
        this.lookMode = 'user'; break; }
      case 'happy':
        Object.assign(T, {happy:1, smile:1, cheek:1, armL:1, armR:1, perk:1, mouth:.5, wide:.9, glow:.4, tilt:Math.sin(t*14)*4}); break;
      case 'laugh':
        Object.assign(T, {happy:1, smile:1, cheek:1, armL:.9, armR:.9, perk:1, mouth:.6 + .3*Math.sin(t*16), wide:.9, glow:.4, tilt:Math.sin(t*18)*6}); break;
      case 'surprised':
        Object.assign(T, {surprised:1, eye:1.25, brow:1, smile:0, perk:1.3, armL:.5, armR:.5, mouth:.8, wide:.05, glow:.3}); break;
      case 'sleepy':
        Object.assign(T, {sleepy:1, eye:.5, smile:.2, perk:-1, tilt:3}); this.lookMode = 'down'; break;
      case 'error':
        Object.assign(T, {worry:1, brow:.8, smile:-.3, cheek:.15, perk:-.5, eye:1.05, mouth:.04, wide:.3, armL:.22, armR:.22, glow:.4, tilt:-5 + Math.sin(t*9)*1.2}); this.lookMode = 'down'; break;
      case 'held':
        Object.assign(T, {surprised:.35, eye:1.1, brow:.7, worry:.4, smile:.15, perk:-.2, mouth:.35, wide:.3, armL:.55 + Math.sin(t*6)*.12, armR:.55 + Math.cos(t*6)*.12, dangle:this.dy < -20 ? 1 : 0});
        this.lookMode = 'user'; break;
    }
    T.cheek = Math.min(1, T.cheek + this.cheekBoost);
  }
  look(dt, look){
    const T = this.T, t = this.t;
    this.wT -= dt; if (this.wT <= 0){ this.wT = rnd(1.4, 3.6); this.wx = RM ? 0 : rnd(-.55, .55); this.wy = RM ? 0 : rnd(-.3, .3); }
    this.sT -= dt; if (this.sT <= 0){ this.sT = rnd(.4, 1.3); this.sx = rnd(-.12, .12); this.sy = rnd(-.09, .09); }
    const m = this.lookMode; let gx, gy;
    if (m === 'up'){ gx = -.55 + Math.sin(t*.7)*.12; gy = -.75; }
    else if (m === 'down'){ gx = 0; gy = .6; }
    else if (m === 'user'){ gx = (look ? look.x*.3 : 0) + this.sx; gy = (look ? look.y*.2 : 0) + this.sy + .05; }
    else if (look){ gx = look.x; gy = look.y; }
    else { gx = this.wx; gy = this.wy; }
    T.lx = gx; T.ly = gy;
  }
  poke(hit, x, y){
    x = x == null ? 200 : x; y = y == null ? 250 : y;
    this.lastAct = this.t; this.wake();
    const eff = this.eff();
    if (hit === 'belly'){
      this.tickle.n = (this.t - this.tickle.t < 1.3) ? this.tickle.n + 1 : 1; this.tickle.t = this.t;
      if (this.tickle.n >= 3){ this.doReact('laugh', 2300); this.laughUntil = this.t + 2.2; this.cheekBoost = .6; this.burst(x, y, 'heart', 6); return; }
      this.sqV += 7*AMP; boop(260, .1); this.cheekBoost = .5; this.burst(x, y, 'heart', 2);
      if (eff === 'idle') this.doReact('happy', 800);
      return;
    }
    if (hit === 'eye'){ this.squint = .35; this.sqV += 3*AMP; boop(520, .06); if (eff === 'idle') this.doReact('surprised', 700); return; }
    if (hit === 'limb'){ this.kickV += 16*AMP; boop(740, .12, 'triangle'); this.burst(x, y, 'spark', 4); if (eff === 'idle') this.doReact('surprised', 550); return; }
    if (hit === 'top'){ this.kickV += 18*AMP; boop(880, .14, 'triangle'); const tp = this.ch.topXY || [200, 100]; this.burst(tp[0], tp[1], 'spark', 8); if (eff === 'idle') this.doReact('happy', 1100); return; }
    this.sqV += 8*AMP; this.hop(260); boop(330, .12); this.cheekBoost = .4;
    if (eff === 'idle') this.doReact('happy', 800);
  }
  beginDrag(hit, x, y, u){ this.drag = {hit, x0:x, y0:y, u, moved:false, tx:this.dx, ty:this.dy, bx:this.dx, by:this.dy}; this.lastAct = this.t; this.wake(); }
  moveDrag(x, y){
    const d = this.drag; if (!d) return;
    const dx = x - d.x0, dy = y - d.y0;
    if (!d.moved && Math.hypot(dx, dy) > 7){ d.moved = true; boop(420, .08, 'triangle'); }
    if (d.moved){ d.tx = clamp(d.bx + dx*d.u, -120, 120); d.ty = clamp(d.by + dy*d.u, -140, 0); }
  }
  endDrag(){ const d = this.drag; this.drag = null; return d; }
  burst(x, y, kind, n, color){ for (let i = 0; i < n; i++) this.emit(x + rnd(-8, 8), y + rnd(-8, 8), kind, color); }
  emit(x, y, kind, color, vx, vy, ttl){ return;
    let p = this.pool.find(q => q.life >= q.ttl);
    if (!p){ if (this.pool.length < 70){ p = {el:el('path', {}, this.fx), life:1, ttl:1}; this.pool.push(p); } else return; }
    p.x = x; p.y = y; p.vx = vx == null ? rnd(-60, 60) : vx; p.vy = vy == null ? rnd(-130, -40) : vy;
    p.life = 0; p.ttl = ttl || rnd(.7, 1.2); p.kind = kind; p.rot = rnd(-30, 30); p.s = rnd(.9, 1.5);
    p.el.setAttribute('d', ({heart:HEART, drop:DROP, note:NOTE, leaf:LEAFP})[kind] || SPARK);
    p.el.setAttribute('fill', color || ({heart:'#ff6b7a', drop:'#58c7b0', note:'#2f6e1a', leaf:'#76c043'})[kind] || '#76c043');
  }
  tick(dt, t, look){
    this.t = t; const P = this.P, T = this.T, A = AMP;
    if (this.react && t >= this.reactUntil) this.react = null;
    if (this.auto && this.state === 'idle' && !this.speech && !this.react && !this.drag && t - this.lastAct > 60) this.setState('sleepy');
    const eff = this.eff();
    this.setTargets(eff, dt); this.look(dt, look);
    if (this.gait > .05){ this.T.lx = lerp(this.T.lx, this.faceDir*.9, this.gait); }
    const extOn = t - this.ext.t < .3;
    if (this.speech) this.lipsync(T);
    else if (this.state === 'speaking' && extOn){ T.mouth = clamp(this.ext.v*1.4, 0, 1); T.wide = .35 + .35*(.5 + .5*Math.sin(t*11)); }
    for (const k in RATE) P[k] += (T[k] - P[k])*(1 - Math.exp(-RATE[k]*dt));
    this.cheekBoost *= Math.exp(-2*dt); this.squint = Math.max(0, this.squint - dt);
    // blink
    this.blinkT -= dt;
    if (this.blinkT <= 0 && this.blinkPh < 0){ this.blinkPh = 0; this.blinkT = Math.random() < .2 ? .22 : rnd(2, 5.5); }
    let pulse = 0;
    if (this.blinkPh >= 0){ this.blinkPh += dt/.17; if (this.blinkPh >= 1) this.blinkPh = -1; else pulse = Math.sin(this.blinkPh*Math.PI); }
    P.lid = clamp(Math.max(pulse, this.squint > 0 ? 1 : 0, P.sleepy*.9), 0, 1);
    // idle fidgets
    if (eff === 'idle' && !RM){
      this.fid -= dt;
      if (this.fid <= 0){
        this.fid = rnd(this.ch.fidgetMin || 8, this.ch.fidgetMax || 15); const r = Math.random();
        if (this.ch.fidget && Math.random() < (this.ch.fidgetP || 0) && !this.em) this.ch.fidget(this);
        else if (r < .25) this.waveUntil = t + 1.8; else if (r < .5) this.hop(300);
        else this.kickV += 12;
      }
    }
    if (t < this.laughUntil){ this.laughT -= dt; if (this.laughT <= 0){ this.laughT = .28; this.hop(170); boop(rnd(500, 800), .07, 'triangle'); } }
    this.stepGait(dt);
    this.stepPhysics(dt);
    // level
    let lt = 0;
    if (this.state === 'speaking' || this.speech) lt = extOn ? this.ext.v : P.mouth;
    else if (eff === 'listening'){
      this.micT -= dt;
      if (this.micT <= 0){ this.micT = rnd(.25, .6); this.micV = Math.random() < .25 ? 0 : rnd(.3, 1); }
      lt = Math.max(extOn ? this.ext.v : 0, this.micV*(.7 + .3*Math.sin(t*17)), this.inputLevel);
    }
    P.level = lerp(P.level, lt, 1 - Math.exp(-16*dt)); this.inputLevel *= Math.exp(-2.5*dt);
    const nodT = eff === 'listening' ? Math.sin(t*2.2)*(this.micV > 0 ? 1.8 : .5) : eff === 'speaking' ? P.level*2.5 : 0;
    P.nod = lerp(P.nod, nodT, 1 - Math.exp(-6*dt)); P.bob = Math.sin(t*1.7); P.t = t;
    P.accent = ACCENT[eff] || ACCENT[this.state] || ACCENT.idle;
    this.draw();
    this.upd(P, this, dt);
    this.overlay(dt);
  }
  stepPhysics(dt){
    this.hopV -= 1900*dt; this.hopY += this.hopV*dt;
    if (this.hopY <= 0){ if (this.hopV < -180) this.sqV += -this.hopV*.012*AMP; this.hopY = 0; this.hopV = this.hopV < -300 ? -this.hopV*.25 : 0; }
    this.sqV += (-260*this.sq - 15*this.sqV)*dt; this.sq += this.sqV*dt;
    const d = this.drag;
    if (d && d.moved){
      const k = 1 - Math.exp(-20*dt), nx = lerp(this.dx, d.tx, k), ny = lerp(this.dy, d.ty, k);
      this.dvx = (nx - this.dx)/dt; this.dvy = (ny - this.dy)/dt; this.dx = nx; this.dy = ny;
    } else {
      this.dvx += (-45*this.dx - 8*this.dvx)*dt; this.dx += this.dvx*dt;
      if (this.dy < 0 || this.dvy < 0){ this.dvy += 1900*dt; this.dy += this.dvy*dt; }
      if (this.dy >= 0){
        if (this.dvy > 150){ this.sqV += this.dvy*.012*AMP; boop(200, .1); this.hop(this.dvy*.25); if (this.eff() === 'idle') this.doReact('surprised', 500); }
        this.dy = 0; this.dvy = 0;
      }
    }
    const held = d && d.moved && this.dy < -20;
    const tt = clamp(-this.dvx*.02, -14, 14) + (held ? Math.sin(this.t*3)*3 : 0);
    this.btilt += (tt - this.btilt)*(1 - Math.exp(-8*dt));
    this.kickV += (-140*this.kick - 5*this.kickV)*dt; this.kick += this.kickV*dt;
    this.wobV += (-90*this.wob - 5*this.wobV)*dt; this.wob += this.wobV*dt;
    const cx = this.dx + this.wpos, cy = this.dy - this.hopY, k2 = 1 - Math.exp(-12*dt);
    this.vx = lerp(this.vx, (cx - this.px)/dt, k2); this.vy = lerp(this.vy, (cy - this.py)/dt, k2); this.px = cx; this.py = cy;
  }
  draw(){
    const P = this.P, t = this.t, sl = P.sleepy > .5;
    const breath = Math.sin(t*(sl ? .9 : 1.7))*(sl ? .02 : .012);
    const sy = 1 - this.sq*.18 + breath + clamp(this.hopV/3200, -.05, .07), sx = 1 + this.sq*.13 - breath*.6;
    this.rig.setAttribute('transform', `translate(${f(this.dx + this.wpos)} ${f(this.dy - this.hopY)}) translate(200 340) rotate(${f(this.btilt)}) translate(-200 -340) translate(200 376) scale(${f2(sx)} ${f2(sy)}) translate(-200 -376)`);
    const h = Math.max(0, this.hopY - this.dy), sc = 1/(1 + h/150);
    this.shadow.setAttribute('transform', `translate(${f(this.dx + this.wpos)} 0) translate(200 380) scale(${f2(sc)} 1) translate(-200 -380)`);
    this.shadow.setAttribute('opacity', f2(.16*sc));
  }
  overlay(dt){
    const P = this.P, t = this.t, an = this.ch.anchors;
    this.dots.forEach((d, i) => {
      const a = t*2.4 + i*2.094, z = (Math.sin(a) + 1)/2;
      at(d, {cx:f(an.top[0] + Math.cos(a)*34), cy:f(an.top[1] + Math.sin(a)*9), r:f(3.5 + z*3), opacity:f2(P.think*(.45 + z*.55))});
    });
    this.zs.forEach((z, i) => {
      const ph = RM ? .5 : ((t*.5 + i/3) % 1);
      at(z, {x:f(an.z[0] + ph*22 + i*2), y:f(an.z[1] - ph*60), 'font-size':f(14 + ph*10), opacity:f2(P.sleepy*Math.sin(ph*Math.PI)*.9)});
    });
    for (const p of this.pool){
      if (p.life >= p.ttl){ p.el.setAttribute('opacity', 0); continue; }
      p.life += dt; p.x += p.vx*dt; p.y += p.vy*dt; p.vy += (p.kind === 'drop' ? 600 : p.kind === 'heart' ? -30 : p.kind === 'note' ? -40 : p.kind === 'leaf' ? 30 : 90)*dt;
      const k = clamp(p.life/p.ttl, 0, 1), sc = p.s*(k < .2 ? k/.2 : 1 - (k - .2)*.5);
      p.el.setAttribute('transform', `translate(${f(p.x)} ${f(p.y)}) rotate(${f(p.rot + p.life*60)}) scale(${f2(sc)})`);
      p.el.setAttribute('opacity', f2(1 - k*k));
    }
  }
}
const CHARS = [];
function reg(c){ CHARS.push(c); }


/* ---------- Namo: pearl-white robot companion with a glowing visor face ---------- */
const EMB = {wave:1.9, dance:3.8, cheer:2.2, love:2.6, shy:2.4, zap:1.8, stretch:2.6, ring:3.2, info:4.4, process:1.8, namaste:2.6, sorry:3.0, calendar:4.2, pin:4.0, pay:4.0, phone:4.0, clock:4.2, check:2.8, search:4.2, chart:4.2, chat:4.6, idea:3.2, jump:1.3, doublejump:1.9, pointR:2.8, pointL:2.8, present:3.2, nod:1.5, shake:1.5, shrug:1.9, clap:2.4, look:3.6};
function doEmoteB(A, n){
  if (!EMB[n]) return;
  A.em = {n, t0:A.t, dur:EMB[n], last:-9};
  if (n === 'cheer'){ A.hop(480); boop(660, .12, 'triangle'); }
  else if (n === 'dance'){ A.hop(240); boop(440, .1, 'triangle'); }
  else if (n === 'love'){ boop(740, .12); }
  else if (n === 'zap'){ A.kickV += 22*AMP; boop(900, .1, 'sawtooth', .03); }
  else if (n === 'wave'){ A.hop(200); }
  else if (n === 'info'){ boop(560, .1, 'triangle'); }
  else if (n === 'jump'){ setTimeout(() => { A.hop(470); boop(520, .1, 'triangle'); }, 120); }
  else if (n === 'doublejump'){ setTimeout(() => { A.hop(450); boop(480, .1, 'triangle'); }, 120); setTimeout(() => { A.hopV = Math.max(A.hopV, 520*AMP); A.sqV -= .6; boop(700, .1, 'triangle'); }, 700); }
  else if (n === 'clap'){ boop(500, .06, 'square', .02); }
  else if (n === 'pointR' || n === 'pointL'){ boop(620, .08, 'triangle'); }
  else if (n === 'process'){ boop(400, .08, 'triangle'); }
  else if (n === 'namaste' || n === 'sorry'){ boop(n === 'sorry' ? 260 : 520, .14); }
  else if (n === 'check'){ boop(700, .1, 'triangle'); setTimeout(() => boop(940, .12, 'triangle'), 150); }
  else if (n === 'pay'){ boop(800, .06, 'triangle'); setTimeout(() => boop(1050, .08, 'triangle'), 1300); }
  else { boop(560, .09, 'triangle'); }
}

reg({
  id:'bot', name:'Namo', kind:'Robot companion', gender:'f', pitch:1.12, rate:1.0, tint:'#0f3d22',
  anchors:{top:[-300,-300], z:[316,128]}, topXY:[200,70],
  fidgetMin:5, fidgetMax:9, fidgetP:.6,
  fidget(A){ if (A.gait > .1 || A.goX != null) return; const L = ['dance', 'zap', 'stretch', 'wave', 'love', 'shy', 'namaste', 'look', 'nod', 'clap']; doEmoteB(A, L[Math.floor(Math.random()*L.length)]); },
  emote:doEmoteB,
  blurb:'A pearl-white robot with a glass visor and a glowing green face. It shows what the agent is doing with its eyes, listening waves, a thinking bubble and a live information panel.',
  traits:['Eyes change per state: smile arcs, listening pills, thinking crescents, hearts','Listening waves, a processing ring and an information panel for bookings and answers','Its leaf sprout and ear glow react to your voice and touch'],
  hint:'Move your cursor and Namo follows you. Tap the visor, the sprout or the belly mark, flick an arm, or drag Namo up and let go.',
  build(g, svg, A){
    const D = defsOf(svg);
    const blurF = sd => { const id = 'f' + (++UID), fl = el('filter', {id, x:'-60%', y:'-60%', width:'220%', height:'220%'}, D); el('feGaussianBlur', {stdDeviation:sd}, fl); return `url(#${id})`; };
    const b3 = blurF(3), b6 = blurF(6), b9 = blurF(9);
    const nid = 'f' + (++UID), nf = el('filter', {id:nid, x:'-40%', y:'-40%', width:'180%', height:'180%'}, D);
    el('feGaussianBlur', {stdDeviation:4.5, result:'b'}, nf); const mg = el('feMerge', null, nf);
    el('feMergeNode', {in:'b'}, mg); el('feMergeNode', {in:'b'}, mg); el('feMergeNode', {in:'SourceGraphic'}, mg);
    const NEON = `url(#${nid})`, GREEN = '#46f08a';
    const RAD = (stops, a) => grad(svg, stops, {radial:true, attrs:a});
    const pearl = RAD([[0, '#ffffff'], [.45, '#f6f5f1'], [.8, '#d8dbd7'], [1, '#a4aea9']], {cx:.36, cy:.26, r:.88, fx:.3, fy:.2});
    const pearlShade = grad(svg, [[0, '#08240f', 0], [.6, '#08240f', 0], [1, '#08240f', .3]], {attrs:{x1:.2, y1:0, x2:.85, y2:1}});
    const rimG = grad(svg, [[0, '#ffffff', .8], [.4, '#ffffff', 0], [.7, GREEN, 0], [1, GREEN, .9]], {attrs:{x1:0, y1:0, x2:1, y2:1}});
    const armG = grad(svg, [[0, '#ffffff'], [.55, '#e9ebe7'], [1, '#b5bfb9']], {attrs:{x1:0, y1:0, x2:1, y2:0}});
    const blackG = RAD([[0, '#343b38'], [.55, '#0d100f'], [1, '#000']], {cx:.4, cy:.3, r:.9});
    const visorG = RAD([[0, '#10201a'], [.55, '#030605'], [1, '#000']], {cx:.5, cy:.3, r:.8});
    const HEAD = 'M200 88 C290 88 328 126 328 186 C328 246 290 282 200 282 C110 282 72 246 72 186 C72 126 110 88 200 88Z';
    const TORSO = 'M200 236 C272 236 286 292 282 332 C278 368 244 382 200 382 C156 382 122 368 118 332 C114 292 128 236 200 236Z';
    const VISOR = 'M200 118 C270 118 304 140 304 186 C304 232 270 254 200 254 C130 254 96 232 96 186 C96 140 130 118 200 118Z';
    const w = el('g', {transform:'translate(200 370) scale(.8) translate(-200 -382)'}, g);
    const fxg = el('g', {'pointer-events':'none'}, w);
    const rb = el('g', null, w);
    /* feet */
    const feet = [-40, 40].map(x => { const gf = el('g', {transform:`translate(${200 + x} 380)`, 'pointer-events':'none'}, rb);
      el('ellipse', {cx:0, cy:6, rx:28, ry:12, fill:GREEN, opacity:.45, filter:b6}, gf);
      el('ellipse', {cx:0, cy:0, rx:27, ry:14, fill:pearl}, gf);
      el('ellipse', {cx:0, cy:0, rx:27, ry:14, fill:pearlShade}, gf);
      el('path', {d:'M-24 6 C-12 14 12 14 24 6', fill:'none', stroke:GREEN, 'stroke-width':3, 'stroke-linecap':'round', opacity:.9}, gf);
      return gf; });
    const ping = el('g', {opacity:0}, fxg);
    [0, 1].forEach(() => el('circle', {r:10, fill:'none', stroke:GREEN, 'stroke-width':3}, ping));
    el('circle', {r:4, fill:GREEN, filter:b3}, ping);
    /* torso */
    el('path', {d:TORSO, fill:'none', stroke:GREEN, 'stroke-width':8, opacity:.6, filter:b9, 'pointer-events':'none'}, rb);
    el('path', {d:TORSO, fill:pearl}, rb);
    el('path', {d:TORSO, fill:pearlShade, 'pointer-events':'none'}, rb);
    el('path', {d:TORSO, fill:'none', stroke:rimG, 'stroke-width':3, 'pointer-events':'none'}, rb);
    el('ellipse', {cx:200, cy:300, rx:52, ry:40, fill:'transparent', 'data-hit':'belly'}, rb);
    /* belly mark: three leaf strokes forming a sprout */
    const mark = el('g', {transform:'translate(200 332)', 'pointer-events':'none'}, rb);
    [['#2f9e44', 'M-16 22 C-16 4 -6 -14 6 -34', 5.5], ['#f28c28', 'M6 22 C8 2 12 -16 6 -34', 5.5], ['#f6b73c', 'M20 22 C22 6 16 -14 6 -34', 5], ['#7ddb4c', 'M-4 22 C-6 8 -2 -10 6 -34', 4]].forEach(c => el('path', {d:c[1], fill:'none', stroke:c[0], 'stroke-width':c[2], 'stroke-linecap':'round'}, mark));
    /* head group (moves a little more than the body: parallax) */
    const headG = el('g', null, rb);
    el('ellipse', {cx:200, cy:262, rx:92, ry:20, fill:'#05180b', opacity:.35, filter:b6, 'pointer-events':'none'}, headG);
    el('path', {d:HEAD, fill:'none', stroke:GREEN, 'stroke-width':8, opacity:.55, filter:b9, 'pointer-events':'none'}, headG);
    /* ear cups */
    const cups = [72, 328].map((x, i) => {
      const c = el('g', {transform:`translate(${x} 190) rotate(${i ? 7 : -7})`}, headG);
      el('ellipse', {rx:25, ry:42, fill:'none', stroke:GREEN, 'stroke-width':7, opacity:.5, filter:b6}, c);
      el('ellipse', {rx:22, ry:40, fill:blackG}, c);
      const ring = el('ellipse', {rx:13, ry:27, fill:'none', stroke:GREEN, 'stroke-width':6, filter:NEON}, c);
      el('ellipse', {rx:7, ry:19, fill:'#020403'}, c);
      el('ellipse', {cx:-9, cy:-24, rx:6, ry:3, fill:'#fff', opacity:.18, transform:'rotate(-30 -9 -24)'}, c);
      el('ellipse', {rx:25, ry:42, fill:'transparent', 'data-hit':'limb'}, c);
      return {c, ring};
    });
    el('path', {d:HEAD, fill:pearl}, headG);
    el('path', {d:HEAD, fill:pearlShade, 'pointer-events':'none'}, headG);
    el('path', {d:HEAD, fill:'none', stroke:rimG, 'stroke-width':3.5, 'pointer-events':'none'}, headG);
    el('ellipse', {cx:128, cy:112, rx:44, ry:16, fill:'#fff', opacity:.8, transform:'rotate(-24 128 112)', filter:b6, 'pointer-events':'none'}, headG);
    /* visor + face */
    const faceG = el('g', null, headG);
    el('path', {d:VISOR, fill:'none', stroke:GREEN, 'stroke-width':3, opacity:.22, filter:b3}, faceG);
    el('path', {d:VISOR, fill:visorG, 'data-hit':'eye'}, faceG);
    el('path', {d:'M112 160 C124 134 160 128 196 128', fill:'none', stroke:'#fff', 'stroke-width':3, 'stroke-linecap':'round', opacity:.16, 'pointer-events':'none'}, faceG);
    el('ellipse', {cx:236, cy:236, rx:48, ry:8, fill:'#fff', opacity:.05, 'pointer-events':'none'}, faceG);
    const eg = el('g', {color:GREEN, filter:NEON, 'pointer-events':'none'}, faceG);
    const PILL = 'M-12 -8 C-12 -21 12 -21 12 -8 L12 8 C12 21 -12 21 -12 8Z';
    const mkEye = x => {
      const e = el('g', null, eg), inner = el('g', null, e);
      const pill = el('path', {d:PILL, fill:'currentColor'}, inner);
      const arc = el('path', {d:'M-19 9 Q0 -17 19 9', fill:'none', stroke:'currentColor', 'stroke-width':7.5, 'stroke-linecap':'round'}, inner);
      const moon = el('path', {d:'M7 -17 A19 19 0 1 0 7 17 A13 13 0 1 1 7 -17Z', fill:'currentColor'}, inner);
      const heart = el('path', {d:'M0 15 C-24 -1 -18 -21 -6 -17 C-2 -15 0 -11 0 -9 C0 -11 2 -15 6 -17 C18 -21 24 -1 0 15Z', fill:'currentColor'}, inner);
      return {e, inner, pill, arc, moon, heart, x};
    };
    const eyes = [mkEye(-46), mkEye(46)];
    const mouthP2 = el('path', {d:'M0 0', fill:'#032612', stroke:'currentColor', 'stroke-width':4, 'stroke-linejoin':'round', 'stroke-linecap':'round'}, eg);
    /* sprout */
    const sprout = el('g', null, headG);
    const bladeCols = [[['#8fe35a', '#2a8a3a'], -24, 80, -7], [['#ffb347', '#e8731a'], 6, 96, 0], [['#ffe27a', '#f09a1c'], 26, 82, 7]];
    const blades = bladeCols.map(([cs, base, len, ox], i) => {
      const b = el('g', null, sprout);
      el('path', {d:'M-8 0 C-12 -24 -6 -48 3 -66 C15 -48 16 -24 9 0Z', fill:grad(svg, [[0, cs[0]], [1, cs[1]]])}, b);
      el('path', {d:'M-1 -4 C-3 -24 0 -44 3 -60', fill:'none', stroke:'#fff', 'stroke-width':1.6, 'stroke-linecap':'round', opacity:.45}, b);
      return {b, base, len, ox, sp:new Spring(140, 7, 0)};
    });
    el('circle', {cx:200, cy:56, r:34, fill:'transparent', 'data-hit':'top'}, headG);
    /* arms: pearl capsules with black shoulder joints, drawn in front */
    const ARM = 'M-15 0 C-19 22 -22 42 -20 56 C-18 76 20 76 22 56 C24 42 19 22 15 0Z';
    const mkArm = () => {
      const a = el('g', null, rb);
      el('path', {d:ARM, fill:'none', stroke:GREEN, 'stroke-width':7, opacity:.6, filter:b6}, a);
      el('path', {d:ARM, fill:armG, 'data-hit':'limb'}, a);
      el('path', {d:ARM, fill:'none', stroke:GREEN, 'stroke-width':2.4, opacity:.6, 'pointer-events':'none'}, a);
      el('rect', {x:-9, y:8, width:5, height:40, rx:2.5, fill:'#fff', opacity:.55, 'pointer-events':'none'}, a);
      el('circle', {r:17, fill:blackG}, a); el('circle', {r:9, fill:'#1b211f'}, a); el('circle', {cx:-4, cy:-5, r:3, fill:'#fff', opacity:.25}, a);
      return a;
    };
    const armL = mkArm(), armR = mkArm();
    /* state effects: listening waves, thinking dots, processing ring, info panel */
    const waves = [-1, 1].map(dir => [0, 1, 2].map(i => el('path', {d:'M0 -26 Q-12 0 0 26', fill:'none', stroke:GREEN, 'stroke-width':4.5, 'stroke-linecap':'round', transform:`translate(${200 + dir*(150 + i*14)} 190) scale(${-dir*(1 - i*.1)} ${1 - i*.12})`, opacity:0, filter:b3}, fxg)));
    const dots = [0, 1, 2, 3, 4].map(() => el('circle', {r:4, fill:GREEN, opacity:0, filter:b3}, fxg));
    const ringG = el('g', {transform:'translate(352 150)', opacity:0}, fxg);
    const ring = el('circle', {r:22, fill:'none', stroke:GREEN, 'stroke-width':7, 'stroke-linecap':'round', 'stroke-dasharray':'92 46', filter:b3}, ringG);
    const panel = el('g', {opacity:0}, fxg);
    el('rect', {x:0, y:0, width:94, height:146, rx:13, fill:'#1ec46a', 'fill-opacity':.14, stroke:GREEN, 'stroke-width':1.8}, panel);
    el('rect', {x:11, y:13, width:24, height:22, rx:4, fill:'none', stroke:GREEN, 'stroke-width':2.2}, panel);
    el('path', {d:'M11 21 H35 M18 10 V16 M28 10 V16', stroke:GREEN, 'stroke-width':2.2, 'stroke-linecap':'round'}, panel);
    el('rect', {x:44, y:16, width:38, height:5, rx:2.5, fill:GREEN, opacity:.9}, panel); el('rect', {x:44, y:27, width:24, height:5, rx:2.5, fill:GREEN, opacity:.5}, panel);
    [56, 84, 112].forEach((y, i) => { el('circle', {cx:17, cy:y + 2.5, r:5.5, fill:GREEN}, panel); el('rect', {x:31, y, width:[50, 56, 44][i], height:5, rx:2.5, fill:GREEN, opacity:.75}, panel); });

    /* ---------- on-screen props: holographic cards the agent can show ---------- */
    const ease = x => { x = clamp(x, 0, 1); return 1 - Math.pow(1 - x, 3); };
    const DK = '#032612';
    const txt = (p, x, y, size, str, anchor, fill, weight) => { const t = el('text', {x, y, 'font-size':size, 'font-family':"'DM Mono', ui-monospace, monospace", 'font-weight':weight || 500, fill:fill || GREEN, 'text-anchor':anchor || 'middle', 'letter-spacing':'.06em'}, p); t.textContent = str; return t; };
    const cardBg = p => el('rect', {x:0, y:0, width:94, height:146, rx:13, fill:'#1ec46a', 'fill-opacity':.14, stroke:GREEN, 'stroke-width':1.8}, p);
    const cardPlace = e => `translate(${f(300 + (1 - e)*16)} 122) scale(${f2(.92 + .08*e)})`;
    const PROPS = {info:{g:panel, shift:44, arm:true, place:cardPlace, anim:null}};
    const prop = (name, shift, arm, place, build) => { const g = el('g', {opacity:0}, fxg); PROPS[name] = {g, shift, arm, place, anim:build(g)}; };
    const line = (p, d, w, op, extra) => el('path', Object.assign({d, fill:'none', stroke:GREEN, 'stroke-width':w, 'stroke-linecap':'round', 'stroke-linejoin':'round', opacity:op == null ? 1 : op}, extra || {}), p);

    prop('calendar', 44, true, cardPlace, g => {
      cardBg(g);
      el('path', {d:'M0 13 A13 13 0 0 1 13 0 H81 A13 13 0 0 1 94 13 V30 H0Z', fill:GREEN, opacity:.3}, g);
      txt(g, 47, 21, 12, 'OCT');
      [24, 64].forEach(x => el('rect', {x:x - 3, y:-5, width:6, height:12, rx:3, fill:GREEN}, g));
      for (let i = 0; i < 28; i++) el('rect', {x:7 + (i % 7)*12.2, y:42 + Math.floor(i/7)*15, width:8, height:8, rx:2, fill:GREEN, opacity:.32}, g);
      const hx = 7 + 3*12.2 + 4, hy = 42 + 2*15 + 4;
      const hl = el('rect', {x:hx - 10, y:hy - 10, width:20, height:20, rx:6, fill:GREEN, filter:b3}, g);
      const bk = el('g', null, g); el('rect', {x:12, y:114, width:70, height:22, rx:11, fill:GREEN}, bk); txt(bk, 47, 129, 10, 'BOOKED', 'middle', DK, 700);
      return (k, e, t) => { const s = ease((k - .4)/.5); hl.setAttribute('transform', `translate(${hx} ${hy}) scale(${f2(s*(1 + .08*Math.sin(t*6)))}) translate(${-hx} ${-hy})`); hl.setAttribute('opacity', f2(s)); bk.setAttribute('opacity', f2(ease((k - 1.3)/.3))); };
    });
    prop('pin', 44, true, cardPlace, g => {
      cardBg(g);
      [28, 56, 84, 112].forEach(y => line(g, `M8 ${y} H86`, 1, .2)); [24, 47, 70].forEach(x => line(g, `M${x} 8 V138`, 1, .2));
      const route = line(g, 'M16 124 C32 98 22 80 62 62', 2.4, .85, {'stroke-dasharray':'6 6'});
      const rip = [0, 1].map(() => el('ellipse', {cx:62, cy:64, rx:10, ry:4, fill:'none', stroke:GREEN, 'stroke-width':2}, g));
      const pin = el('g', null, g); el('path', {d:'M0 0 C-11 -14 -17 -23 -17 -30 A17 17 0 1 1 17 -30 C17 -23 11 -14 0 0Z', fill:GREEN}, pin); el('circle', {cy:-30, r:6.5, fill:DK}, pin);
      txt(g, 47, 134, 9, 'NEARBY');
      return (k, e, t) => { const d = ease(k/.5); pin.setAttribute('transform', `translate(62 ${f(62 - (1 - d)*44 - (k > .5 ? Math.abs(Math.sin((k - .5)*5))*5*Math.exp(-(k - .5)*1.5) : 0))})`); route.setAttribute('stroke-dashoffset', f(-k*18)); rip.forEach((r, i) => { const ph = (k*.9 + i*.5) % 1; at(r, {rx:f(8 + ph*30), ry:f(3 + ph*11), opacity:f2((1 - ph)*.9*ease((k - .4)/.3))}); }); };
    });
    prop('pay', 44, true, cardPlace, g => {
      cardBg(g);
      const coin = el('g', null, g); el('circle', {r:29, fill:GREEN, 'fill-opacity':.18, stroke:GREEN, 'stroke-width':3}, coin); el('circle', {r:22, fill:'none', stroke:GREEN, 'stroke-width':1.2, opacity:.5}, coin);
      const rs = txt(coin, 0, 12, 32, '₹', 'middle', GREEN, 700); rs.setAttribute('font-family', 'system-ui, sans-serif'); rs.setAttribute('letter-spacing', '0');
      const pill = el('g', null, g); el('rect', {x:12, y:104, width:70, height:24, rx:12, fill:GREEN}, pill); line(pill, 'M25 116 L30 121 L39 110', 3, 1, {stroke:DK}); txt(pill, 60, 120, 10, 'PAID', 'middle', DK, 700);
      return (k) => { const fl = k < 1.3 ? Math.max(.06, Math.abs(Math.cos(k/1.3*Math.PI*3))) : 1; coin.setAttribute('transform', `translate(47 52) scale(${f2(fl)} 1)`); pill.setAttribute('opacity', f2(ease((k - 1.4)/.3))); };
    });
    prop('phone', 44, true, cardPlace, g => {
      cardBg(g);
      const ph = el('g', null, g);
      el('rect', {x:-17, y:-31, width:34, height:62, rx:8, fill:GREEN, 'fill-opacity':.12, stroke:GREEN, 'stroke-width':2.6}, ph);
      el('rect', {x:-6, y:-26, width:12, height:3, rx:1.5, fill:GREEN}, ph); el('circle', {cy:-6, r:7, fill:GREEN}, ph); el('path', {d:'M-13 20 C-13 7 13 7 13 20Z', fill:GREEN}, ph);
      const arcs = [0, 1, 2].map(i => line(ph, `M${24 + i*7} -16 Q${34 + i*8} -3 ${24 + i*7} 10`, 2.6));
      txt(g, 47, 106, 9, 'TRANSFER'); const dots = [36, 47, 58].map(x => el('circle', {cx:x, cy:124, r:4, fill:GREEN}, g));
      return (k, e, t) => { ph.setAttribute('transform', `translate(40 56) rotate(${f(Math.sin(t*30)*2.2*(k < 2.2 ? 1 : .3))})`); arcs.forEach((a, i) => a.setAttribute('opacity', f2(.2 + .8*Math.max(0, Math.sin(t*5 - i*.8))))); dots.forEach((d, i) => d.setAttribute('cy', f(124 - 5*Math.max(0, Math.sin(t*7 - i*.7))))); };
    });
    prop('clock', 44, true, cardPlace, g => {
      cardBg(g);
      const cg = el('g', {transform:'translate(47 58)'}, g);
      el('circle', {r:36, fill:GREEN, 'fill-opacity':.1, stroke:GREEN, 'stroke-width':3}, cg);
      for (let i = 0; i < 12; i++){ const a = i*Math.PI/6; line(cg, `M${f(Math.sin(a)*29)} ${f(-Math.cos(a)*29)} L${f(Math.sin(a)*33)} ${f(-Math.cos(a)*33)}`, i % 3 ? 1.4 : 2.6); }
      const hh = line(cg, 'M0 0 L0 -17', 4), mh = line(cg, 'M0 0 L0 -27', 2.6); el('circle', {r:3.4, fill:GREEN}, cg);
      const pill = el('g', null, g); el('rect', {x:9, y:108, width:76, height:24, rx:12, fill:GREEN}, pill); txt(pill, 47, 124, 10, 'OPEN 9–6', 'middle', DK, 700);
      return (k) => { const s = ease(k/1.6); mh.setAttribute('transform', `rotate(${f((1 - s)*900)})`); hh.setAttribute('transform', `rotate(${f(s*270)})`); pill.setAttribute('opacity', f2(ease((k - 1.5)/.3))); };
    });
    prop('check', 36, false, e => `translate(338 150) scale(${f2(.6 + .4*e)})`, g => {
      const C = 2*Math.PI*34;
      el('circle', {r:34, fill:GREEN, 'fill-opacity':.12}, g);
      const ring = el('circle', {r:34, fill:'none', stroke:GREEN, 'stroke-width':6, 'stroke-linecap':'round', 'stroke-dasharray':C, transform:'rotate(-90)', filter:b3}, g);
      const tick = line(g, 'M-15 3 L-4 14 L16 -12', 7, 1, {'stroke-dasharray':60});
      const burst = el('circle', {r:34, fill:'none', stroke:GREEN, 'stroke-width':2}, g);
      return (k) => { ring.setAttribute('stroke-dashoffset', f(C*(1 - ease(k/.7)))); tick.setAttribute('stroke-dashoffset', f(60*(1 - ease((k - .55)/.4)))); const b = clamp((k - .8)/.9, 0, 1); at(burst, {r:f(34 + b*28), opacity:f2((1 - b)*.8*(k > .8 ? 1 : 0))}); };
    });
    prop('search', 44, true, cardPlace, g => {
      cardBg(g);
      const rows = [22, 48, 74, 100].map((y, i) => ({y, bar:el('rect', {x:30, y, width:[50, 38, 56, 44][i], height:12, rx:6, fill:GREEN}, g), dot:el('circle', {cx:16, cy:y + 6, r:5, fill:GREEN}, g)}));
      const mag = el('g', null, g); el('circle', {r:13, fill:'#1ec46a', 'fill-opacity':.25, stroke:GREEN, 'stroke-width':3.4}, mag); line(mag, 'M9 9 L19 19', 4.5);
      const yAt = k => { const sw = kk => 22 + (.5 - .5*Math.cos(kk*3.2))*60; return k < 2.5 ? sw(k) : lerp(sw(2.5), 80, ease((k - 2.5)/.5)); };
      return (k) => { const y = yAt(k); mag.setAttribute('transform', `translate(60 ${f(y)})`); rows.forEach((r, i) => { const hit = k > 3 && i === 3 ? 1 : Math.exp(-Math.pow((r.y + 6 - y)/16, 2)); const o = f2(.25 + .75*hit); r.bar.setAttribute('opacity', o); r.dot.setAttribute('opacity', o); }); };
    });
    prop('chart', 44, true, cardPlace, g => {
      cardBg(g);
      line(g, 'M10 112 H84', 1.6, .6);
      const H = [28, 44, 36, 70], bars = H.map((h, i) => el('rect', {x:14 + i*18, y:112, width:13, height:0, rx:3, fill:GREEN, opacity:.85}, g));
      const tr = line(g, 'M20 78 L38 62 L56 70 L74 36', 3, 1, {'stroke-dasharray':100}); const top = el('circle', {cx:74, cy:36, r:4.4, fill:GREEN}, g);
      const tx = txt(g, 47, 30, 16, '+24%', 'middle', GREEN, 700);
      return (k) => { bars.forEach((b, i) => { const h = H[i]*ease((k - .15 - i*.22)/.5); at(b, {y:f(112 - h), height:f(h)}); }); tr.setAttribute('stroke-dashoffset', f(100*(1 - ease((k - 1.2)/.6)))); top.setAttribute('opacity', f2(ease((k - 1.7)/.2))); tx.setAttribute('opacity', f2(ease((k - 1.4)/.3))); };
    });
    prop('chat', 44, true, cardPlace, g => {
      cardBg(g);
      const b1 = el('g', null, g); el('rect', {x:8, y:14, width:60, height:28, rx:10, fill:GREEN, 'fill-opacity':.28}, b1); el('rect', {x:16, y:22, width:36, height:4, rx:2, fill:GREEN}, b1); el('rect', {x:16, y:31, width:24, height:4, rx:2, fill:GREEN, opacity:.7}, b1);
      const ty = el('g', null, g); el('rect', {x:8, y:52, width:40, height:22, rx:10, fill:GREEN, 'fill-opacity':.28}, ty); const dts = [20, 28, 36].map(x => el('circle', {cx:x, cy:63, r:3, fill:GREEN}, ty));
      const b2 = el('g', null, g); el('rect', {x:26, y:56, width:60, height:30, rx:10, fill:GREEN}, b2); el('rect', {x:34, y:64, width:36, height:4, rx:2, fill:DK, opacity:.75}, b2); line(b2, 'M62 79 L66 83 L73 74 M69 79 L73 83 L80 74', 2, 1, {stroke:DK});
      const tk = b2.lastChild;
      return (k, e, t) => { b1.setAttribute('opacity', f2(ease((k - .2)/.3))); ty.setAttribute('opacity', k > .8 && k < 1.9 ? 1 : 0); dts.forEach((d, i) => d.setAttribute('cy', f(63 - 4*Math.max(0, Math.sin(t*9 - i*.8))))); const s = ease((k - 1.8)/.3); b2.setAttribute('opacity', f2(s)); b2.setAttribute('transform', `translate(0 ${f((1 - s)*8)})`); tk.setAttribute('opacity', f2(ease((k - 2.6)/.3))); };
    });
    prop('idea', 0, false, e => `translate(340 62) scale(${f2(.6 + .4*e)})`, g => {
      el('circle', {r:28, fill:GREEN, opacity:.32, filter:b6}, g);
      const rays = el('g', null, g); for (let i = 0; i < 8; i++){ const a = i*Math.PI/4; line(rays, `M${f(Math.sin(a)*27)} ${f(-Math.cos(a)*27)} L${f(Math.sin(a)*37)} ${f(-Math.cos(a)*37)}`, 3.4); }
      el('path', {d:'M0 -18 C-14 -18 -18 -4 -10 6 C-6 11 -6 14 -6 18 H6 C6 14 6 11 10 6 C18 -4 14 -18 0 -18Z', fill:GREEN}, g);
      el('rect', {x:-6, y:19, width:12, height:5, rx:2, fill:GREEN, opacity:.8}, g); el('rect', {x:-4, y:25, width:8, height:4, rx:2, fill:GREEN, opacity:.8}, g);
      line(g, 'M-4 9 L-4 -2 L0 3 L4 -2 L4 9', 2, 1, {stroke:DK});
      return (k, e, t) => { rays.setAttribute('opacity', f2(.35 + .65*Math.abs(Math.sin(t*6)))); rays.setAttribute('transform', `rotate(${f(Math.sin(t*2)*6)})`); };
    });
    const sweat = el('path', {d:DROP, fill:'#8dffb8', opacity:0, 'pointer-events':'none'}, fxg);
    return function(P, A, dt){
      const t = P.t; let em = A.em;
      if (em && A.t - em.t0 > em.dur){ A.em = em = null; }
      const k = em ? A.t - em.t0 : 0, e = em ? clamp(Math.min(k/.2, (em.dur - k)/.3), 0, 1) : 0;
      const Q = em ? Object.assign({}, P) : P;
      let propW = 0, angL = null, angR = null, sad = 0, lift = 0, rot = 0, sy = 1, aL = P.armL, aR = P.armR, chinL = 0, chinR = P.think, love = 0, flick = 0, infoW = 0, procW = 0, jit = 0, sway = 0, shift = 0;
      const G = A.gait, PH = A.gaitPh, RK = A.run ? 1 : 0, air = clamp(A.hopY/12, 0, 1);
      let hdy = 0, hrot = 0, pingX = 0, pingW = 0, pingY = 268;
      if (G > .04){
        const sw = Math.sin(PH);
        lift -= Math.abs(sw)*(4 + 6*RK)*G; rot += A.faceDir*(2 + 8*RK)*G + sw*1.6*G;
        aL = lerp(aL, .2 + (.26 + .34*RK)*sw, G); aR = lerp(aR, .2 - (.26 + .34*RK)*sw, G);
        sy = 1 - Math.abs(Math.cos(PH))*.025*G;
      }
      feet.forEach((F, i) => { const side = i ? 1 : -1, ph = Math.sin(PH + (i ? Math.PI : 0)), cs = Math.cos(PH + (i ? Math.PI : 0));
        const fx = ph*(15 + 12*RK)*G*A.faceDir*0 + ph*(15 + 12*RK)*G, fy = -Math.max(0, cs)*(7 + 7*RK)*G - air*10;
        F.setAttribute('transform', `translate(${f(200 + side*40 + fx)} ${f(380 + fy)}) rotate(${f(-air*8*side + cs*3*G)})`); });
      if (em){
        const n = em.n;
        if (n === 'wave'){ aR = lerp(P.armR, .85 + Math.sin(k*13)*.17, e); Q.smile = lerp(P.smile, .95, e); rot = Math.sin(k*3)*2*e; chinR = P.think*(1 - e); }
        else if (n === 'dance'){ const s = Math.sin(k*7.2); lift = -Math.abs(s)*14*e; rot = s*7*e; sway = s*e; aL = lerp(P.armL, .5 + .45*s, e); aR = lerp(P.armR, .5 - .45*s, e); Q.happy = lerp(P.happy, 1, e); chinR = 0; }
        else if (n === 'cheer'){ lift = -Math.abs(Math.sin(k*8))*14*e; rot = Math.sin(k*8)*3*e; aL = aR = lerp(P.armL, .92 + .08*Math.sin(k*22), e); Q.happy = e; chinR = 0; }
        else if (n === 'love'){ love = e; rot = Math.sin(k*3)*4*e; sy = 1 + .02*Math.sin(k*10)*e; aL = aR = lerp(P.armL, .3, e); chinR = 0; }
        else if (n === 'shy'){ chinL = e; chinR = e; Q.happy = lerp(P.happy, 1, e); rot = Math.sin(k*2)*3*e; }
        else if (n === 'zap'){ jit = e; rot = (Math.random() - .5)*4*e; flick = e; Q.surprised = e*.4; }
        else if (n === 'stretch'){ aL = aR = lerp(P.armL, 1, e); sy = 1 + .06*e; rot = -3*e; Q.eye = lerp(P.eye, .3, e); Q.mouth = .8*e; Q.speak = Math.max(Q.speak, e); chinR = 0; }
        else if (n === 'ring'){ const b = Math.max(0, Math.sin(k*5.2)); rot = Math.sin(k*38)*3*b; lift = -b*9; Q.surprised = .6*e; aL = aR = .3; chinR = 0; if (k - em.last > .62){ em.last = k; boop(880, .12, 'square', .025); setTimeout(() => boop(990, .12, 'square', .025), 130); } }
        else if (n === 'info'){ infoW = e; shift = -44*e; aR = lerp(P.armR, .62 + Math.sin(k*2)*.03, e); chinR = P.think*(1 - e); Q.happy = 0; }
        else if (n === 'process'){ procW = e; chinR = P.think*(1 - e); Q.think = P.think*(1 - e); }
        else if (n === 'namaste'){ angL = lerp(12 + P.armL*138, -62, e); angR = lerp(-(12 + P.armR*138), 62, e); rot = 8*e; lift = 4*e; Q.happy = lerp(P.happy, 1, e); chinR = 0; }
        else if (n === 'sorry'){ sad = e; rot = -5*e; Q.happy = 0; Q.smile = 0; chinR = 0; aL = aR = lerp(P.armL, .12, e); }
        else if (n === 'jump' || n === 'doublejump'){ const cr = k < .12 ? Math.sin(k/.12*Math.PI/2) : Math.max(0, 1 - (k - .12)/.14); const a2 = air*e; sy = 1 - .13*cr*(k < .5 ? 1 : 0); aL = aR = lerp(P.armL, .95, a2); Q.happy = lerp(P.happy, 1, a2); Q.surprised = .25*a2; rot = Math.sin(k*10)*1.5*a2; }
        else if (n === 'pointR' || n === 'pointL'){ const d = n === 'pointR' ? 1 : -1, w = Math.sin(k*5)*2.5; if (d > 0) angR = lerp(-(12 + P.armR*138), -97 + w, e); else angL = lerp(12 + P.armL*138, 97 - w, e); chinR = d > 0 ? 0 : chinR; Q.lx = lerp(P.lx, d*.9, e); rot = d*3*e; hrot = d*4*e; Q.happy = lerp(P.happy, .7, e); pingW = clamp((k - .25)/.2, 0, 1)*e; pingX = d > 0 ? 372 : 28; }
        else if (n === 'present'){ angR = lerp(-(12 + P.armR*138), -86 - Math.sin(k*2.2)*10, e); angL = lerp(12 + P.armL*138, 24, e*.8); Q.lx = lerp(P.lx, .8, e); rot = 3*e; chinR = 0; Q.happy = lerp(P.happy, 1, e); hrot = 3*e; }
        else if (n === 'nod'){ hdy = Math.sin(k*11)*6*e; Q.happy = lerp(P.happy, .8, e); chinR = P.think*(1 - e); }
        else if (n === 'shake'){ hrot = Math.sin(k*15)*6*e; Q.lx = Math.sin(k*15)*.9*e; chinR = P.think*(1 - e); Q.happy = 0; Q.smile = lerp(P.smile, .1, e); }
        else if (n === 'shrug'){ const s2 = Math.sin(clamp(k/.35, 0, 1)*Math.PI/2); aL = aR = lerp(P.armL, .34, e); lift = -5*s2*e; hrot = 6*e; hdy = 4*e; Q.happy = 0; Q.smile = lerp(P.smile, .25, e); Q.eye = lerp(P.eye, .75, e); chinR = 0; }
        else if (n === 'clap'){ const c = .5 + .5*Math.sin(k*20); angL = lerp(12 + P.armL*138, -66 + 18*c, e); angR = lerp(-(12 + P.armR*138), 66 - 18*c, e); lift = -Math.abs(Math.sin(k*10))*4*e; Q.happy = lerp(P.happy, 1, e); chinR = 0; if (Math.floor(k*20/Math.PI/2 + .25) !== Math.floor(em.last)){ em.last = Math.floor(k*20/Math.PI/2 + .25); if (e > .5) boop(900 + Math.random()*150, .04, 'square', .02); } }
        else if (n === 'look'){ Q.lx = Math.sin(k*1.9)*e; Q.ly = Math.sin(k*3.1)*.25*e; hrot = Math.sin(k*1.9)*5*e; rot = Math.sin(k*1.9)*2*e; Q.surprised = .2*e; chinR = P.think*(1 - e); }
        else if (PROPS[n]){ propW = e; shift = -PROPS[n].shift*e; if (PROPS[n].arm) aR = lerp(P.armR, .62 + Math.sin(k*2)*.03, e); chinR = P.think*(1 - e); Q.happy = n === 'check' ? e : 0; if (n === 'idea'){ Q.surprised = .35*e; rot = 3*e; } }
      }
      rb.setAttribute('transform', `translate(${f(P.lx*3 + shift)} ${f(lift)}) translate(200 382) rotate(${f(P.tilt*.5 + A.wob*2 + rot + P.lx*1.2)}) scale(1 ${f2(sy)}) translate(-200 -382) translate(0 ${f(P.bob*.8 + P.nod*.6)})`);
      headG.setAttribute('transform', `translate(${f(P.lx*4)} ${f(P.ly*2 + P.bob*.8 + P.nod*.8 + hdy)}) translate(200 250) rotate(${f(hrot)}) translate(-200 -250)`);
      ping.setAttribute('opacity', f2(pingW)); ping.setAttribute('transform', `translate(${pingX} ${pingY}) scale(${f2(.6 + pingW*.4)})`); ping.childNodes.forEach((c, i) => { if (i < 2){ const q = ((t*1.4 + i*.5) % 1); c.setAttribute('r', f(6 + q*22)); c.setAttribute('opacity', f2(1 - q)); } });
      faceG.setAttribute('transform', `translate(${f(P.lx*5)} ${f(P.ly*3)})`);
      /* eyes */
      const isErr = A.eff() === 'error', zap = flick > .1 && Math.random() < .35;
      eg.setAttribute('color', isErr ? '#ff6a55' : zap ? '#e2ffe9' : GREEN);
      eg.setAttribute('transform', `translate(${f(200 + Q.lx*9)} ${f(187 + Q.ly*5 + sad*5)})`);
      eg.setAttribute('opacity', flick > .1 && Math.random() < .25 ? .35 : 1);
      const calm = 1 - clamp(Q.listen + Q.think + Q.speak + Q.surprised, 0, 1), v = calm*Q.smile + Q.happy;
      let arcW = clamp((v - .35)/.2, 0, 1)*(1 - love), moonW = clamp(Q.think, 0, 1)*(1 - procW)*(1 - love), heartW = love;
      let pillW = clamp(1 - arcW - moonW - heartW, 0, 1);
      const ey = Math.max(.06, Q.eye*(1 - P.lid*.96)*(1 + Q.surprised*.25))*(1 + (Q.listen + Q.speak)*P.level*.1), pulse = 1 + love*.12*Math.sin(t*10);
      eyes.forEach(E => {
        E.e.setAttribute('transform', `translate(${E.x} 0)`);
        E.inner.setAttribute('transform', `rotate(${f((E.x < 0 ? 1 : -1)*sad*24)}) scale(${f2((1 + Q.surprised*.12)*pulse)} ${f2(ey*pulse*(1 - sad*.12))})`);
        E.pill.setAttribute('opacity', f2(pillW)); E.arc.setAttribute('opacity', f2(arcW)); E.moon.setAttribute('opacity', f2(moonW)); E.heart.setAttribute('opacity', f2(heartW));
      });
      const mop = clamp(Q.speak*.9 + Q.mouth*1.6, 0, 1)*(1 - love);
      mouthP2.setAttribute('d', mouthP(200 - 200, 236 - 187, 14 + Q.wide*10, clamp(Q.mouth, 0, 1)*.9, Q.smile*.8 + Q.happy*.3));
      mouthP2.setAttribute('transform', 'translate(0 0)');
      mouthP2.setAttribute('opacity', f2(mop));
      /* ear glow follows the voice */
      cups.forEach((c, i) => { c.ring.setAttribute('opacity', f2(.7 + .3*Math.sin(t*3 + i) + P.level*.3 + P.listen*.2)); c.ring.setAttribute('stroke-width', f(6 + P.level*3)); });
      /* sprout springs */
      blades.forEach((B, i) => {
        const tgt = P.tilt*.9 + A.kick*14*(i + 1)*.5 - A.vx*.05 + Math.sin(t*1.6 + i*1.3)*3 + sway*8 + (jit ? rnd(-9, 9)*jit : 0) + P.lx*3;
        const a = B.sp.step(tgt, dt);
        B.b.setAttribute('transform', `translate(${200 + B.ox} 96) rotate(${f(B.base + a)}) scale(1 ${f2(B.len/66*(1 + P.perk*.04))})`);
      });
      /* arms */
      const aLd = lerp(lerp(12 + aL*138, -128, chinL), -12 - 0, 0), aRd = lerp(lerp(-(12 + aR*138), 128, chinR), 128, 0);
      armL.setAttribute('transform', `translate(128 268) rotate(${f(angL != null ? angL : lerp(12 + aL*138, -115, chinL))})`);
      armR.setAttribute('transform', `translate(272 268) rotate(${f(angR != null ? angR : lerp(-(12 + aR*138), 115, chinR))})`);
      /* listening waves */
      const wv = clamp(P.listen + P.speak*.5, 0, 1);
      waves.forEach(side => side.forEach((p, i) => p.setAttribute('opacity', f2(wv*(.25 + .75*Math.abs(Math.sin(t*4 - i*.9)))*(.45 + P.level*.55)))));
      /* thinking dots */
      dots.forEach((d, i) => { const ph = (t*.55 + i*.21) % 1; at(d, {cx:f(346 + (i % 2)*14 + ph*8), cy:f(176 - ph*54 + (i % 3)*10), r:f(3 + (i % 3)*1.6), opacity:f2(clamp(P.think, 0, 1)*Math.sin(ph*Math.PI)*.95*(1 - procW))}); });
      /* processing ring */
      ringG.setAttribute('opacity', f2(procW)); ring.setAttribute('transform', `rotate(${f(t*300)})`);
      /* on-screen props */
      const act = em && PROPS[em.n] ? em.n : null;
      for (const n in PROPS){ const pr = PROPS[n]; if (n === act){ pr.g.setAttribute('opacity', f2(e)); pr.g.setAttribute('transform', pr.place(e)); if (pr.anim) pr.anim(k, e, t); } else pr.g.setAttribute('opacity', 0); }
      /* sweat drop when sorry */
      const sp = em && em.n === 'sorry' ? (k*1.1) % 1 : 0;
      at(sweat, {transform:`translate(${f(316 + shift)} ${f(112 + sp*38)}) scale(1.7)`, opacity:f2(sad*(1 - sp)*.9)});
    };
  }
});

const STATES = ['idle', 'listening', 'thinking', 'speaking', 'sleepy', 'error'];
function createNamo(container, opts){
  if (typeof document === 'undefined') throw new Error('createNamo needs a browser');
  opts = opts || {};
  S.sound = !!opts.sound;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 400 400'); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', opts.label || 'Namo, the voice agent');
  svg.style.cssText = 'display:block;width:100%;height:100%;overflow:visible;touch-action:none;user-select:none;-webkit-user-select:none;cursor:' + (opts.interactive === false ? 'default' : 'grab');
  container.appendChild(svg);
  const actor = new Actor(CHARS[0], svg, {auto:opts.autoSleep !== false});
  actor.mood = opts.mood || 'friendly';
  const fid = 'wsh' + (++UID), fl = el('filter', {id:fid, filterUnits:'userSpaceOnUse', x:-60, y:300, width:520, height:140}, defsOf(svg));
  el('feGaussianBlur', {stdDeviation:10}, fl); actor.shadow.setAttribute('filter', 'url(#' + fid + ')');
  if (opts.shadow === false) actor.shadow.setAttribute('display', 'none');
  const ptr = {x:0, y:0, seen:false, t:-9}, manual = {x:0, y:0, on:false};
  const onMove = e => { ptr.x = e.clientX; ptr.y = e.clientY; ptr.seen = true; ptr.t = performance.now()/1000; };
  if (opts.followPointer !== false) window.addEventListener('pointermove', onMove, {passive:true});
  function lookFor(){
    if (manual.on) return {x:clamp(manual.x, -1, 1), y:clamp(manual.y, -1, 1)};
    if (opts.followPointer === false || !ptr.seen || performance.now()/1000 - ptr.t > 6) return null;
    const r = svg.getBoundingClientRect(), cx = r.left + r.width/2, cy = r.top + r.height*.5;
    return {x:Math.tanh((ptr.x - cx)/(r.width*.9)*1.4), y:Math.tanh((ptr.y - cy)/(r.height*.9)*1.4)};
  }
  const down = e => {
    actor.lastAct = actor.t; actor.wake();
    const h = e.target.closest && e.target.closest('[data-hit]'); if (!h){ if (opts.tapToWalk){ const r0 = svg.getBoundingClientRect(), tx = (e.clientX - r0.left)/r0.width*400 - 200; if (Math.abs(tx - actor.wpos) > 22) actor.walkTo(tx, Math.abs(tx - actor.wpos) > 110 ? 210 : 100); } return; }
    const r = svg.getBoundingClientRect(); actor.beginDrag(h.getAttribute('data-hit'), e.clientX, e.clientY, 400/r.width);
    try{ svg.setPointerCapture(e.pointerId); }catch(err){}
  };
  const move = e => { if (actor.drag) actor.moveDrag(e.clientX, e.clientY); };
  const up = e => {
    const d = actor.endDrag(); if (!d || d.moved) return;
    const r = svg.getBoundingClientRect(); actor.poke(d.hit, (e.clientX - r.left)/r.width*400, (e.clientY - r.top)/r.height*400);
  };
  if (opts.interactive !== false){ svg.addEventListener('pointerdown', down); svg.addEventListener('pointermove', move); svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', up); }
  let last = 0, raf = 0, visible = true, dead = false, io = null;
  if ('IntersectionObserver' in window){ io = new IntersectionObserver(es => { visible = es[es.length - 1].isIntersecting; }); io.observe(svg); }
  function frame(ts){
    if (dead) return; raf = requestAnimationFrame(frame);
    const t = ts/1000;
    if (!visible || document.hidden){ last = t; return; }
    const dt = clamp(t - last, .001, .05); last = t;
    actor.tick(dt, t, lookFor());
  }
  raf = requestAnimationFrame(frame);
  return {
    element:svg, actor,
    setState(s){ if (STATES.indexOf(s) < 0) return; actor.wake(); actor.setState(s); },
    getState(){ return actor.eff(); },
    setLevel(v){ actor.ext.v = clamp(+v || 0, 0, 1); actor.ext.t = actor.t; },
    setMood(m){ if (MOODS[m]) actor.mood = m; },
    react(n, ms){ actor.wake(); actor.doReact(n, ms || 1500); },
    emote(n){ actor.wake(); actor.ch.emote(actor, n); },
    say(text, o){
      o = o || {}; actor.wake();
      actor.say(String(text || ''), {sound:!!o.speak && 'speechSynthesis' in window, pitch:CHARS[0].pitch, rate:CHARS[0].rate, gender:CHARS[0].gender, mood:o.mood});
      if (o.onEnd){ const prev = actor.onEnd; actor.onEnd = () => { actor.onEnd = prev; if (prev) prev(); o.onEnd(); }; }
    },
    stop(){ actor.endSpeech(true); if (actor.state === 'speaking') actor.setState('idle'); },
    /** Walk (or run, speed > 150) to x in -58..58 (0 = centre). Resolves on arrival. */
    walkTo(x, speed){ return new Promise(res => { actor.wake(); actor.walkTo(x, speed || 95, res); }); },
    run(x){ return this.walkTo(x, 210); },
    hopTo(x){ actor.hopWalk = true; return this.walkTo(x, 110); },
    stopWalk(){ actor.stopWalk(); },
    getPosition(){ return actor.wpos; },
    jump(double){ actor.wake(); actor.ch.emote(actor, double ? 'doublejump' : 'jump'); },
    point(dir){ actor.wake(); actor.ch.emote(actor, dir === 'left' ? 'pointL' : 'pointR'); },
    lookAt(x, y){ manual.on = x != null; manual.x = x || 0; manual.y = y || 0; },
    destroy(){ dead = true; cancelAnimationFrame(raf); if (io) io.disconnect(); window.removeEventListener('pointermove', onMove); actor.destroy(); svg.remove(); }
  };
}
return {createNamo:createNamo, states:STATES, emotes:['wave', 'dance', 'cheer', 'love', 'shy', 'zap', 'stretch', 'info', 'process', 'namaste', 'sorry', 'calendar', 'pin', 'pay', 'phone', 'clock', 'check', 'search', 'chart', 'chat', 'idea', 'jump', 'doublejump', 'pointR', 'pointL', 'present', 'nod', 'shake', 'shrug', 'clap', 'look'], moods:Object.keys(MOODS)};
});
