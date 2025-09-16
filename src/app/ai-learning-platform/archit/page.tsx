"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type Path = { id: string; d: string; from: string; to: string };

function DiagramStyles() {
  return (
    <style jsx global>{`
      :root { --primary: #f59e0b; --bg: #0b1220; --card: #0f172a; --text: #e5e7eb; --muted:#cbd5e1; }
      /* Fullscreen RTL container with improved contrast */
      .archit-root { position: fixed; inset: 0; background: linear-gradient(180deg,#0b1220,#0e1426); color: var(--text); display:flex; flex-direction:column; }
      .archit-root h1 { font-size: 1.25rem; font-weight: 900; margin: 0 .5rem; }
      .archit-root .architecture-hint { color:var(--muted); font-size:.9rem; margin: 0 .5rem; }
      .archit-root .controls { position: sticky; top: 0; z-index: 10; display:flex; gap:.6rem; align-items:center; flex-wrap:wrap; padding:.7rem 1rem; background: rgba(2,6,23,.55); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(148,163,184,.2); }
      .chip, .archit-root .controls .chip { background: rgba(148,163,184,.16); border:1px solid rgba(148,163,184,.28); color:var(--text); padding:.35rem .6rem; border-radius:999px; cursor:pointer; user-select:none; }
      .chip[aria-pressed="true"], .archit-root .controls .chip[aria-pressed="true"] { background: rgba(245,158,11,.18); border-color: rgba(245,158,11,.6); color:#fef3c7; }
      .zoom { display:flex; align-items:center; gap:.5rem; }
      .layout { display:grid; grid-template-columns: 300px 1fr; gap: 14px; flex:1 1 auto; min-height: 0; padding: 10px; }
      .diagram-viewport { overflow: auto; -webkit-overflow-scrolling: touch; background: transparent; height: calc(100vh - 64px); border: 1px solid rgba(148,163,184,.25); border-radius: 12px; }
      .sidebar { background: rgba(15,23,42,.7); border:1px solid rgba(148,163,184,.25); border-radius: 12px; padding: 12px; overflow:auto; height: calc(100vh - 64px); }
      .archit-root[data-theme="light"] .sidebar { background: rgba(255,255,255,.9); border:1px solid rgba(0,0,0,.08); }
      .sidebar .section-title { font-weight:900; color:#fef3c7; letter-spacing:.06em; margin: 10px 0 8px; font-size:.95rem; }
      .archit-root[data-theme="light"] .sidebar .section-title { color:#92400e; }
      .sidebar ul { list-style:none; padding:0; margin:0; }
      .sidebar li { margin: 4px 0; }
      .sidebar button { width:100%; text-align:right; background: rgba(255,255,255,.06); border:1px solid rgba(148,163,184,.28); color:inherit; padding:.45rem .6rem; border-radius:10px; cursor:pointer; font-weight:600; }
      .sidebar button:hover, .sidebar button[aria-pressed="true"] { background: rgba(245,158,11,.18); border-color: rgba(245,158,11,.6); }
      .diagram-scale { transform-origin: top right; display:inline-block; padding: 10px; }
      .diagram-canvas { position: relative; min-width: 1400px; min-height: calc(100vh - 64px - 20px); padding: 4px; display: grid; grid-template-columns: repeat(7, minmax(220px, 1fr)); gap: 18px; direction: rtl; }
      .diagram-column { display: flex; flex-direction: column; gap: 12px; }
      .column-title { color:var(--muted); font-weight:900; text-transform: uppercase; letter-spacing: .08em; font-size:.85rem; padding:.25rem .5rem; border-right:3px solid var(--primary); }
      .diagram-node { position: relative; background: rgba(15,23,42,.72); border:1px solid rgba(148,163,184,.25); border-radius: 14px; padding: 14px; box-shadow: 0 8px 24px rgba(0,0,0,.25); backdrop-filter: blur(8px); outline: none; }
      .archit-root[data-theme="light"] .diagram-node { background: rgba(255,255,255,.96); border:1px solid rgba(0,0,0,.08); color:#0b1220; }
      .diagram-node:focus-visible { box-shadow: 0 0 0 2px rgba(245,158,11,.6); }
      .node-title { font-weight:900; margin-bottom: 6px; font-size: 1rem; }
      .node-desc { font-size:.95rem; opacity:.95; }
      .node-tech { margin-top:8px; font-size:.75rem; color:#fef3c7; background: rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.25); display:inline-block; padding:.25rem .5rem; border-radius: 999px; }
      .archit-root[data-theme="light"] .node-tech { color:#92400e; background: rgba(245,158,11,.18); }
      .connectors { position:absolute; inset:0; pointer-events:none; overflow:visible; }
      .connector-path { fill:none; stroke: rgba(245,158,11,.7); stroke-width:2; marker-end:url(#arrowhead); transition: opacity .2s ease, stroke .2s ease; }
      .connector-path.active { stroke: rgba(245,158,11,.95); }
      .connector-path.dim { opacity: .18; }
      .glass-subtle { background: rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.16); border-radius: 10px; backdrop-filter: blur(8px); }
      .archit-root[data-theme="light"] .glass-subtle { background: rgba(0,0,0,.05); border-color: rgba(0,0,0,.08); }
      @media (max-width: 768px) { .diagram-canvas{min-width:1000px} }
    `}</style>
  );
}

export default function ArchitectureDiagramPage() {
  const [paths, setPaths] = useState<Path[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [visible, setVisible] = useState<Record<string, boolean>>({ users: true, edge: true, frontend: true, backend: true, data: true, ai: true, ops: true });
  const [mode, setMode] = useState<'beginner'|'pro'>('beginner');
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [query, setQuery] = useState('');
  const [tip, setTip] = useState<{ show: boolean; x: number; y: number; id?: string }>({ show:false, x:0, y:0 });
  const [panelOpen, setPanelOpen] = useState(false);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const dragRef = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const NODE_INFO: Record<string, { title: string; desc: string; tech: string; files?: string[] } > = useMemo(() => ({
    'node-user': { title: 'משתמשי קצה', desc: 'מטיילים/חוקרים בדפדפן או מובייל', tech: 'Web / Mobile' },
    'node-vercel-edge': { title: 'Vercel Edge', desc: 'CDN, קאשינג ו‑Middleware', tech: 'Edge Runtime', files: ['src/middleware.ts'] },
    'node-webapp': { title: 'אפליקציית ווב', desc: 'Homepage, Experiences, Planning', tech: 'Next.js App Router', files: ['src/app/**'] },
    'node-mobileapp': { title: 'אפליקציית מובייל (מתוכנן)', desc: 'Push Notifications, Quick Actions', tech: 'React Native' },
    'node-api-gw': { title: 'API בקאנד', desc: 'Auth, Business Logic, Data Access', tech: 'Node | Edge/Serverless', files: ['src/app/api/**'] },
    'node-ai-gw': { title: 'שער ה‑AI', desc: 'Orchestrates calls to AI models', tech: 'HTTP / Streaming' },
    'node-osint-collector': { title: 'איסוף OSINT', desc: 'Scrapes & monitors sources', tech: 'Schedulers / Jobs' },
    'node-firestore': { title: 'Firestore', desc: 'User data, cases, reports', tech: 'NoSQL' },
    'node-storage': { title: 'אחסון ענן', desc: 'Media files, raw data, backups', tech: 'Object Store' },
    'node-bigquery': { title: 'BigQuery (מתוכנן)', desc: 'Analytics, trends', tech: 'Warehouse' },
    'node-gemini': { title: 'Google Gemini', desc: 'Multimodal analysis', tech: 'Vertex AI' },
    'node-other-models': { title: 'מודלים ייעודיים', desc: 'Deepfake/audio analysis', tech: 'Whisper/Custom' },
    'node-ci-cd': { title: 'צנרת CI/CD', desc: 'GitHub → Build → Deploy', tech: 'GitHub Actions' },
    'node-monitoring': { title: 'ניטור', desc: 'Logging, Alerts, Perf', tech: 'Cloud Monitoring' },
  }), []);

  useEffect(() => { try { const raw = localStorage.getItem('archit.positions'); if (raw) setPositions(JSON.parse(raw)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem('archit.positions', JSON.stringify(positions)); } catch {} }, [positions]);

  useEffect(() => {
    const calculatePaths = () => {
      const newPaths: Path[] = [];
      const canvas = canvasRef.current || document.querySelector<HTMLDivElement>('.diagram-canvas');
      if (!canvas) return;
      const canvasRect = canvas.getBoundingClientRect();
      const isRTL = getComputedStyle(canvas).direction === 'rtl';
      const connect = (fromId: string, toId: string) => {
        const from = document.getElementById(fromId); const to = document.getElementById(toId);
        if (!from || !to) return;
        const fr = from.getBoundingClientRect(); const tr = to.getBoundingClientRect();
        const startX = (isRTL ? fr.left : fr.right) - canvasRect.left; const startY = fr.top + fr.height / 2 - canvasRect.top;
        const endX = (isRTL ? tr.right : tr.left) - canvasRect.left; const endY = tr.top + tr.height / 2 - canvasRect.top;
        const cp1x = isRTL ? startX - 100 : startX + 100;
        const cp2x = isRTL ? endX + 100 : endX - 100;
        const d = `M ${startX} ${startY} C ${cp1x} ${startY}, ${cp2x} ${endY}, ${endX} ${endY}`;
        newPaths.push({ id: `${fromId}-${toId}`, d, from: fromId, to: toId });
      };
      [
        ['node-user','node-vercel-edge'], ['node-vercel-edge','node-webapp'], ['node-vercel-edge','node-mobileapp'],
        ['node-webapp','node-api-gw'], ['node-mobileapp','node-api-gw'], ['node-api-gw','node-firestore'], ['node-api-gw','node-storage'], ['node-api-gw','node-bigquery'], ['node-api-gw','node-ai-gw'],
        ['node-ai-gw','node-gemini'], ['node-ai-gw','node-other-models'], ['node-osint-collector','node-storage'], ['node-api-gw','node-monitoring'], ['node-webapp','node-monitoring'], ['node-ci-cd','node-webapp'], ['node-ci-cd','node-api-gw']
      ].forEach(([f,t]) => connect(f as string, t as string));
      setPaths(newPaths);
    };
    const timer = setTimeout(calculatePaths, 100);
    window.addEventListener('resize', calculatePaths);
    return () => { clearTimeout(timer); window.removeEventListener('resize', calculatePaths); };
  }, [positions]);

  const toggle = (key: keyof typeof visible) => setVisible(v => ({ ...v, [key]: !v[key] }));
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const scrollToNode = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    try { el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }); } catch {}
    setActive(id); setPanelOpen(true);
    setTimeout(() => document.getElementById(id)?.focus({ preventScroll: true }), 150);
  };
  const fitToScreen = () => { const vp = document.querySelector<HTMLDivElement>('.diagram-viewport'); const c = canvasRef.current; if (!vp || !c) return; const vw = vp.clientWidth; const cw = c.scrollWidth; if (cw>0) setScale(Math.min(1, Math.max(0.6, vw/cw))); };
  useEffect(() => { fitToScreen(); const onR = () => fitToScreen(); window.addEventListener('resize', onR); return () => window.removeEventListener('resize', onR); }, []);
  useEffect(() => { const h = decodeURIComponent(window.location.hash.replace('#','')); if (h) setActive(h); }, []);
  useEffect(() => { if (active) history.replaceState(null,'',`#${encodeURIComponent(active)}`); else history.replaceState(null,'',window.location.pathname); }, [active]);

  const visibleStyle = useMemo(() => (key: keyof typeof visible) => ({ display: visible[key] ? undefined : 'none' as const }), [visible]);
  const nodeStyle = (id: string) => { const q = query.toLowerCase(); const info = NODE_INFO[id]; const match = !q || [info?.title, info?.desc, info?.tech].some(v => (v||'').toLowerCase().includes(q)); const base: any = { cursor: 'grab', opacity: match ? 1 : .35 }; const p = positions[id]; if (p) base.transform = `translate(${p.x}px, ${p.y}px)`; return base; };
  const showTip = (id: string, e: React.MouseEvent) => { setActive(id); setTip({ show:true, x:e.clientX, y:e.clientY, id }); };
  const moveTip = (e: React.MouseEvent) => setTip(t => ({ ...t, x:e.clientX, y:e.clientY }));
  const hideTip = () => { setActive(null); setTip({ show:false, x:0, y:0 }); };
  const onMouseDown = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); const pos = positions[id] || { x:0,y:0 }; dragRef.current = { id, startX:e.clientX, startY:e.clientY, origX:pos.x, origY:pos.y }; document.body.style.cursor='grabbing'; const onMove = (ev: MouseEvent) => { const ref = dragRef.current; if (!ref) return; const dx = ev.clientX-ref.startX; const dy = ev.clientY-ref.startY; setPositions(p=>({ ...p, [ref.id]: { x: ref.origX+dx, y: ref.origY+dy } })); }; const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); document.body.style.cursor=''; dragRef.current=null; setTimeout(()=>window.dispatchEvent(new Event('resize')),0); }; document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp); };
  const exportPNG = async () => { const node = canvasRef.current; if (!node) return; try { const mod = await import('html-to-image').catch(()=>null as any); if (mod?.toPng) { const dataUrl = await mod.toPng(node as HTMLElement, { cacheBust: true, pixelRatio: 2 }); const a = document.createElement('a'); a.href = dataUrl; a.download = 'architecture.png'; a.click(); return; } } catch {} alert('ייצוא PNG דורש html-to-image.'); };
  const resetLayout = () => { setPositions({}); try { localStorage.removeItem('archit.positions'); } catch {}; setTimeout(()=>window.dispatchEvent(new Event('resize')),0); };
  const copyJSON = async () => { const data = { nodes: Object.entries(NODE_INFO).map(([id, info]) => ({ id, ...info })), connections: paths.map(p => ({ id: p.id, from: p.from, to: p.to })), filters: visible, mode }; try { await navigator.clipboard.writeText(JSON.stringify(data,null,2)); } catch {} };

  // no screenshots section (requested)

  return (
    <>
      <DiagramStyles />
      <div className="archit-root" data-theme={theme} dir="rtl">
        {/* Hub section: quick links consolidated into this page */}
        <div className="glass-subtle" style={{ padding: '10px 12px', borderBottom: '1px solid rgba(148,163,184,.2)' }}>
          <div style={{ display:'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 8 }}>
            <div>
              <div className="section-title" style={{ margin: '0 0 6px' }}>מפה וארכיטקטורה</div>
              <div className="flex" style={{ display:'flex', gap: 8, flexWrap:'wrap' as const }}>
                <a href="#" className="chip" aria-pressed="true">הדף הנוכחי</a>
              </div>
            </div>
            <div>
              <div className="section-title" style={{ margin: '0 0 6px' }}>עמודים מרכזיים</div>
              <div className="flex" style={{ display:'flex', gap: 8, flexWrap:'wrap' as const }}>
                <a href="/" className="chip">דף הבית</a>
                <a href="/experiences" className="chip">חוויות</a>
                <a href="/academy" className="chip">אקדמיה</a>
                <a href="/impact" className="chip">השפעה</a>
                <a href="/enterprise" className="chip">ארגונים</a>
                <a href="/dashboard" className="chip">לוח מחוונים</a>
                <a href="/plan" className="chip">מתכנן מסע</a>
                <a href="/trust/safety" className="chip">בטיחות</a>
                <a href="/auth/login" className="chip">התחברות</a>
              </div>
            </div>
            <div>
              <div className="section-title" style={{ margin: '0 0 6px' }}>API — GET</div>
              <div className="flex" style={{ display:'flex', gap: 8, flexWrap:'wrap' as const }}>
                <a href="/api/experiences" className="chip">/api/experiences</a>
                <a href="/api/guides" className="chip">/api/guides</a>
                <a href="/api/chats" className="chip">/api/chats</a>
                <a href="/api/bookings" className="chip">/api/bookings</a>
                <a href="/api/impact" className="chip">/api/impact</a>
                <a href="/api/availability" className="chip">/api/availability</a>
              </div>
            </div>
          </div>
        </div>

        {/* Screenshots carousel (place images under public/screenshots) */}
        {/* screenshots section removed */}
        <h1>דיאגרמת ארכיטקטורה מקצה לקצה - LionSTour</h1>
        <p className="architecture-hint">ריחוף על קופסה מדגיש חיבורים; ניתן לסנן עמודות ולהתאים זום.</p>
        <div className="controls" role="toolbar" aria-label="בקרות דיאגרמה">
          <h1>מפת ארכיטקטורה — LionSTour</h1>
          <span className="architecture-hint">ריחוף מדגיש חיבורים; יש חיפוש, זום וייצוא PNG.</span>
          <button className="chip" onClick={() => { setActive(null); setPanelOpen(false); }}>נקה הדגשה</button>
          <button className="chip" onClick={fitToScreen}>התאם למסך</button>
          <button className="chip" onClick={() => setScale(1)}>איפוס זום</button>
          <div className="zoom"><label htmlFor="zoom">זום</label><input id="zoom" type="range" min={0.6} max={1.2} step={0.05} value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} /></div>
          <button className="chip" aria-pressed={mode==='beginner'} onClick={() => setMode(m => m==='beginner'?'pro':'beginner')}>{mode==='beginner' ? 'מצב: מתחילים' : 'מצב: מתקדמים'}</button>
          <button className="chip" aria-pressed={theme==='dark'} onClick={() => setTheme(t => t==='dark'?'light':'dark')}>{theme==='dark' ? 'מצב כהה' : 'מצב בהיר'}</button>
          <button className="chip" onClick={copyJSON}>העתק JSON</button>
          <button className="chip" onClick={exportPNG}>ייצוא PNG</button>
          <button className="chip" onClick={resetLayout}>איפוס פריסה</button>
          <label style={{marginInlineStart:'.5rem'}} htmlFor="filter">חיפוש</label>
          <input id="filter" placeholder="חיפוש רכיב..." value={query} onChange={(e)=>setQuery(e.target.value)} style={{ padding: '.3rem .5rem', borderRadius: 8, border: '1px solid rgba(148,163,184,.3)', background: 'rgba(2,6,23,.25)', color: 'inherit' }} />
        </div>

        <div className="layout">
          <aside className="sidebar" aria-label="ניווט ארכיטקטורה">
            {([
              ['users','משתמשים',['node-user']],
              ['edge','רשת קצה',['node-vercel-edge']],
              ['frontend','פרונטאנד',['node-webapp','node-mobileapp']],
              ['backend','בקאנד',['node-api-gw','node-ai-gw','node-osint-collector']],
              ['data','נתונים',['node-firestore','node-storage','node-bigquery']],
              ['ai','בינה / ML',['node-gemini','node-other-models']],
              ['ops','תפעול',['node-ci-cd','node-monitoring']]
            ] as const).map(([key, title, nodes]) => (
              <div key={key as string}>
                <div className="section-title">{title}</div>
                <ul>
                  {(nodes as readonly string[]).map((nid) => (
                    <li key={nid}>
                      <button aria-pressed={active===nid} onClick={() => scrollToNode(nid)}>
                        {NODE_INFO[nid]?.title || nid}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>

          <div ref={viewportRef} className="diagram-viewport">
          <div className="diagram-scale" style={{ transform: `scale(${scale})` }}>
            <div ref={canvasRef} className="diagram-canvas">
              <div className="diagram-column" id="col-users" style={visibleStyle('users')}>
                <div className="column-title">משתמשים</div>
                <div className="diagram-node" id="node-user" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-user',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-user')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-user'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-user')}
                    style={nodeStyle('node-user')}>
                  <div className="node-title">משתמשי קצה</div>
                  <div className="node-desc">מטיילים, חוקרים, צרכני תוכן</div>
                  <div className="node-tech">דפדפן / מובייל</div>
                </div>
              </div>

              <div className="diagram-column" id="col-cdn" style={visibleStyle('edge')}>
                <div className="column-title">רשת קצה</div>
                <div className="diagram-node" id="node-vercel-edge" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-vercel-edge',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-vercel-edge')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-vercel-edge'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-vercel-edge')}
                    style={nodeStyle('node-vercel-edge')}>
                  <div className="node-title">Vercel Edge</div>
                  <div className="node-desc">CDN, Caching, Serverless Functions</div>
                  <div className="node-tech">Next.js Middleware</div>
                </div>
              </div>

              <div className="diagram-column" id="col-frontend" style={visibleStyle('frontend')}>
                <div className="column-title">פרונטאנד</div>
                <div className="diagram-node" id="node-webapp" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-webapp',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-webapp')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-webapp'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-webapp')}
                    style={nodeStyle('node-webapp')}>
                  <div className="node-title">אפליקציית ווב</div>
                  <div className="node-desc">Homepage, Experiences, Planning</div>
                  <div className="node-tech">Next.js / Vercel</div>
                </div>
                <div className="diagram-node" id="node-mobileapp" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-mobileapp',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-mobileapp')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-mobileapp'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-mobileapp')}
                    style={nodeStyle('node-mobileapp')}>
                  <div className="node-title">אפליקציית מובייל (מתוכנן)</div>
                  <div className="node-desc">Push Notifications, Quick Actions</div>
                  <div className="node-tech">React Native</div>
                </div>
              </div>

              <div className="diagram-column" id="col-backend" style={visibleStyle('backend')}>
                <div className="column-title">בקאנד</div>
                <div className="diagram-node" id="node-api-gw" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-api-gw',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-api-gw')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-api-gw'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-api-gw')}
                    style={nodeStyle('node-api-gw')}>
                  <div className="node-title">API בקאנד</div>
                  <div className="node-desc">Auth, Business Logic, Data Access</div>
                  <div className="node-tech">Node.js / Edge/Serverless</div>
                </div>
                <div className="diagram-node" id="node-ai-gw" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-ai-gw',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-ai-gw')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-ai-gw'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-ai-gw')}
                    style={nodeStyle('node-ai-gw')}>
                  <div className="node-title">שער ה‑AI</div>
                  <div className="node-desc">Orchestrates calls to AI models</div>
                  <div className="node-tech">HTTP / Streaming</div>
                </div>
                <div className="diagram-node" id="node-osint-collector" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-osint-collector',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-osint-collector')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-osint-collector'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-osint-collector')}
                    style={nodeStyle('node-osint-collector')}>
                  <div className="node-title">איסוף OSINT</div>
                  <div className="node-desc">Scrapes & monitors sources</div>
                  <div className="node-tech">Schedulers / Jobs</div>
                </div>
              </div>

              <div className="diagram-column" id="col-data" style={visibleStyle('data')}>
                <div className="column-title">נתונים</div>
                <div className="diagram-node" id="node-firestore" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-firestore',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-firestore')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-firestore'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-firestore')}
                    style={nodeStyle('node-firestore')}>
                  <div className="node-title">Firestore</div>
                  <div className="node-desc">User data, cases, reports</div>
                  <div className="node-tech">NoSQL</div>
                </div>
                <div className="diagram-node" id="node-storage" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-storage',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-storage')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-storage'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-storage')}
                    style={nodeStyle('node-storage')}>
                  <div className="node-title">אחסון ענן</div>
                  <div className="node-desc">Media files, raw data, backups</div>
                  <div className="node-tech">Object Store</div>
                </div>
                <div className="diagram-node" id="node-bigquery" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-bigquery',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-bigquery')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-bigquery'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-bigquery')}
                    style={nodeStyle('node-bigquery')}>
                  <div className="node-title">BigQuery (מתוכנן)</div>
                  <div className="node-desc">Analytics, trends</div>
                  <div className="node-tech">Warehouse</div>
                </div>
              </div>

              <div className="diagram-column" id="col-ai" style={visibleStyle('ai')}>
                <div className="column-title">בינה / ML</div>
                <div className="diagram-node" id="node-gemini" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-gemini',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-gemini')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-gemini'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-gemini')}
                    style={nodeStyle('node-gemini')}>
                  <div className="node-title">Google Gemini</div>
                  <div className="node-desc">Multimodal analysis</div>
                  <div className="node-tech">Vertex AI</div>
                </div>
                <div className="diagram-node" id="node-other-models" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-other-models',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-other-models')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-other-models'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-other-models')}
                    style={nodeStyle('node-other-models')}>
                  <div className="node-title">מודלים ייעודיים</div>
                  <div className="node-desc">Deepfake/audio analysis</div>
                  <div className="node-tech">Whisper, Custom</div>
                </div>
              </div>

              <div className="diagram-column" id="col-ops" style={visibleStyle('ops')}>
                <div className="column-title">תפעול</div>
                <div className="diagram-node" id="node-ci-cd" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-ci-cd',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-ci-cd')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-ci-cd'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-ci-cd')}
                    style={nodeStyle('node-ci-cd')}>
                  <div className="node-title">צנרת CI/CD</div>
                  <div className="node-desc">GitHub → Build → Deploy</div>
                  <div className="node-tech">GH Actions, Docker</div>
                </div>
                <div className="diagram-node" id="node-monitoring" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-monitoring',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-monitoring')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-monitoring'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-monitoring')}
                    style={nodeStyle('node-monitoring')}>
                  <div className="node-title">ניטור</div>
                  <div className="node-desc">Logging, Alerts, Perf</div>
                  <div className="node-tech">Cloud Monitoring</div>
                </div>
              </div>

              <svg className="connectors">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="var(--primary)" />
                  </marker>
                </defs>
                {paths.map((path) => {
                  const isActive = !!active && (path.from === active || path.to === active);
                  const className = `connector-path ${active ? (isActive ? 'active' : 'dim') : ''}`;
                  return <path key={path.id} d={path.d} className={className} data-from={path.from} data-to={path.to} />;
                })}
              </svg>
            </div>
          </div>
          </div>
        </div>

        {tip.show && tip.id && (
          <div role="tooltip" style={{ position:'fixed', left: tip.x + 12, top: tip.y + 12, zIndex: 10000, maxWidth: 260 }} className="glass-subtle">
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{NODE_INFO[tip.id]?.title}</div>
              <div style={{ fontSize: '.85rem', opacity: .9 }}>{NODE_INFO[tip.id]?.desc}</div>
              {mode==='pro' && NODE_INFO[tip.id]?.files?.length ? (
                <div style={{ marginTop: 6, fontSize: '.75rem', opacity: .9 }}>
                  קבצים רלוונטיים:
                  <ul style={{ margin: 0, paddingInlineStart: '1rem' }}>
                    {NODE_INFO[tip.id]!.files!.map((f) => <li key={f}><code>{f}</code></li>)}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {panelOpen && active && (
          <aside style={{ position:'fixed', right: 16, top: 96, width: 320, maxWidth:'90vw', zIndex: 9999 }} className="glass-subtle">
            <div style={{ padding: 14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8 }}>
                <strong>{NODE_INFO[active]?.title || active}</strong>
                <button className="chip" onClick={() => setPanelOpen(false)}>סגור</button>
              </div>
              <div style={{ fontSize: '.9rem', opacity: .9, marginBottom: 8 }}>{NODE_INFO[active]?.desc}</div>
              <div style={{ fontSize: '.8rem', marginBottom: 8 }}>טכנולוגיה: <code>{NODE_INFO[active]?.tech}</code></div>
              <hr style={{ borderColor: 'rgba(148,163,184,.25)', margin: '8px 0' }} />
              <div style={{ fontWeight: 600, marginBottom: 6 }}>זרימות</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8 }}>
                <div>
                  <div style={{ fontSize: '.8rem', opacity: .9, marginBottom: 4 }}>נכנס</div>
                  <ul style={{ margin:0, paddingInlineStart: '1rem' }}>
                    {paths.filter(p => p.to === active).map(p => (<li key={p.id}><code>{p.from}</code></li>))}
                    {paths.filter(p => p.to === active).length === 0 && <li style={{opacity:.7}}>—</li>}
                  </ul>
                </div>
                <div>
                  <div style={{ fontSize: '.8rem', opacity: .9, marginBottom: 4 }}>יוצא</div>
                  <ul style={{ margin:0, paddingInlineStart: '1rem' }}>
                    {paths.filter(p => p.from === active).map(p => (<li key={p.id}><code>{p.to}</code></li>))}
                    {paths.filter(p => p.from === active).length === 0 && <li style={{opacity:.7}}>—</li>}
                  </ul>
                </div>
              </div>
              {mode === 'pro' && (NODE_INFO[active]?.files?.length ?? 0) > 0 && (
                <>
                  <hr style={{ borderColor: 'rgba(148,163,184,.25)', margin: '8px 0' }} />
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>קבצים רלוונטיים</div>
                  <ul style={{ margin:0, paddingInlineStart: '1rem' }}>
                    {NODE_INFO[active]!.files!.map((f) => (
                      <li key={f} style={{ display:'flex', justifyContent:'space-between', gap: 8, alignItems:'center' }}>
                        <code>{f}</code>
                        <button className="chip" onClick={async ()=>{ try{ await navigator.clipboard.writeText(f); }catch{} }}>העתק</button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </aside>
        )}
      </div>
    </>
  );
}
