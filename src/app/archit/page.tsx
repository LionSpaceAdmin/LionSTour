"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Path = { id: string; d: string; from: string; to: string };

function DiagramStyles() {
  return (
    <style jsx global>{`
      :root { --primary: #f59e0b; --bg: #0b1220; --card: #0f172a; --text: #e5e7eb; --muted:#cbd5e1; }
      .architecture-container { color: var(--text); padding: 2rem 1rem; }
      .architecture-container h1 { font-size: 1.75rem; font-weight: 800; margin-bottom: .5rem; }
      .architecture-hint { color:var(--muted); font-size:.9rem; margin-bottom:1rem; }
      .controls { display:flex; gap:.5rem; flex-wrap:wrap; margin-bottom:1rem; align-items:center; }
      .controls .chip { background: rgba(148,163,184,.16); border:1px solid rgba(148,163,184,.25); color:var(--text); padding:.35rem .6rem; border-radius:999px; cursor:pointer; user-select:none; }
      .controls .chip[aria-pressed="true"] { background: rgba(245,158,11,.18); border-color: rgba(245,158,11,.5); color:#fef3c7; }
      .zoom { display:flex; align-items:center; gap:.5rem; }
      .diagram-viewport { overflow-x: auto; -webkit-overflow-scrolling: touch; background: transparent; }
      .diagram-scale { transform-origin: top left; display:inline-block; }
      .diagram-canvas { position: relative; min-width: 1200px; padding: 1rem; background: linear-gradient(180deg,#0b1220,#0e1426); border-radius: 1rem; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06); }
      .architecture-container[data-theme="light"] .diagram-canvas { background: linear-gradient(180deg,#f8fafc,#eef2f7); box-shadow: inset 0 0 0 1px rgba(0,0,0,.06); }
      .diagram-canvas { display: grid; grid-template-columns: repeat(7, minmax(180px, 1fr)); gap: 16px; }
      .diagram-column { display: flex; flex-direction: column; gap: 12px; }
      .column-title { color:var(--muted); font-weight:700; text-transform: uppercase; letter-spacing: .08em; font-size:.75rem; padding:.25rem .5rem; border-left:3px solid var(--primary); }
      .diagram-node { position: relative; background: rgba(15,23,42,.6); border:1px solid rgba(148,163,184,.2); border-radius: 12px; padding: 12px; box-shadow: 0 8px 24px rgba(0,0,0,.25); backdrop-filter: blur(8px); outline: none; }
      .architecture-container[data-theme="light"] .diagram-node { background: rgba(255,255,255,.9); border:1px solid rgba(0,0,0,.06); color:#0b1220; }
      .diagram-node:focus-visible { box-shadow: 0 0 0 2px rgba(245,158,11,.6); }
      .node-title { font-weight:700; margin-bottom: 4px; }
      .node-desc { font-size:.85rem; opacity:.9; }
      .node-tech { margin-top:8px; font-size:.7rem; color:#fef3c7; background: rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.25); display:inline-block; padding:.2rem .45rem; border-radius: 999px; }
      .architecture-container[data-theme="light"] .node-tech { color:#92400e; background: rgba(245,158,11,.15); }
      .connectors { position:absolute; inset:0; pointer-events:none; overflow:visible; }
      .connector-path { fill:none; stroke: rgba(245,158,11,.6); stroke-width:2; marker-end:url(#arrowhead); transition: opacity .2s ease, stroke .2s ease; }
      .connector-path.active { stroke: rgba(245,158,11,.95); }
      .connector-path.dim { opacity: .2; }
      .glass-subtle { background: rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.16); border-radius: 10px; backdrop-filter: blur(8px); }
      .architecture-container[data-theme="light"] .glass-subtle { background: rgba(0,0,0,.05); border-color: rgba(0,0,0,.08); }
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
    'node-webapp': { title: 'Web App', desc: 'דפי הבית/חוויות/תכנון', tech: 'Next.js App Router', files: ['src/app/**'] },
    'node-mobileapp': { title: 'Mobile (תכנון)', desc: 'פעולות מהירות/התראות', tech: 'React Native' },
    'node-api-gw': { title: 'Backend API', desc: 'אימות, לוגיקה עסקית, גישה לנתונים', tech: 'Node | Edge/Serverless', files: ['src/app/api/**'] },
    'node-ai-gw': { title: 'AI Gateway', desc: 'תזמור קריאות למודלים', tech: 'HTTP / Streaming' },
    'node-osint-collector': { title: 'OSINT Collector', desc: 'איסוף/ניטור מקורות', tech: 'Schedulers / Jobs' },
    'node-firestore': { title: 'Firestore', desc: 'נתוני משתמש/מקרים', tech: 'NoSQL' },
    'node-storage': { title: 'Cloud Storage', desc: 'מדיה ונתונים גולמיים', tech: 'Object Store' },
    'node-bigquery': { title: 'BigQuery (תכנון)', desc: 'אנליטיקות/מגמות', tech: 'Warehouse' },
    'node-gemini': { title: 'Google Gemini', desc: 'ניתוח מולטימודלי', tech: 'Vertex AI' },
    'node-other-models': { title: 'מודלים ייעודיים', desc: 'Deepfake/אודיו וכו׳', tech: 'Whisper/Custom' },
    'node-ci-cd': { title: 'CI/CD', desc: 'Build/Test/Deploy', tech: 'GitHub Actions' },
    'node-monitoring': { title: 'Monitoring', desc: 'לוגים/מדדים/התראות', tech: 'Cloud Monitoring' },
  }), []);

  useEffect(() => {
    const calculatePaths = () => {
      const newPaths: Path[] = [];
      const canvas = canvasRef.current || document.querySelector<HTMLDivElement>('.diagram-canvas');
      if (!canvas) return;
      const canvasRect = canvas.getBoundingClientRect();

      const connect = (fromId: string, toId: string) => {
        const from = document.getElementById(fromId);
        const to = document.getElementById(toId);
        if (!from || !to) return;
        const fromRect = from.getBoundingClientRect();
        const toRect = to.getBoundingClientRect();
        const startX = fromRect.right - canvasRect.left;
        const startY = fromRect.top + fromRect.height / 2 - canvasRect.top;
        const endX = toRect.left - canvasRect.left;
        const endY = toRect.top + toRect.height / 2 - canvasRect.top;
        const d = `M ${startX} ${startY} C ${startX + 100} ${startY}, ${endX - 100} ${endY}, ${endX} ${endY}`;
        newPaths.push({ id: `${fromId}-${toId}`, d, from: fromId, to: toId });
      };
      const connections: [string,string][] = [
        ['node-user', 'node-vercel-edge'],
        ['node-vercel-edge', 'node-webapp'],
        ['node-vercel-edge', 'node-mobileapp'],
        ['node-webapp', 'node-api-gw'],
        ['node-mobileapp', 'node-api-gw'],
        ['node-api-gw', 'node-firestore'],
        ['node-api-gw', 'node-storage'],
        ['node-api-gw', 'node-bigquery'],
        ['node-api-gw', 'node-ai-gw'],
        ['node-ai-gw', 'node-gemini'],
        ['node-ai-gw', 'node-other-models'],
        ['node-osint-collector', 'node-storage'],
        ['node-api-gw', 'node-monitoring'],
        ['node-webapp', 'node-monitoring'],
        ['node-ci-cd', 'node-webapp'],
        ['node-ci-cd', 'node-api-gw'],
      ];
      connections.forEach(([from, to]) => connect(from, to));
      setPaths(newPaths);
    };
    const timer = setTimeout(calculatePaths, 100);
    window.addEventListener('resize', calculatePaths);
    return () => { clearTimeout(timer); window.removeEventListener('resize', calculatePaths); };
  }, [positions]);

  const toggle = (key: keyof typeof visible) => setVisible(v => ({ ...v, [key]: !v[key] }));

  const fitToScreen = () => {
    const viewport = document.querySelector<HTMLDivElement>('.diagram-viewport');
    const canvas = canvasRef.current;
    if (!viewport || !canvas) return;
    const vw = viewport.clientWidth;
    const cw = canvas.scrollWidth;
    if (cw > 0) setScale(Math.min(1, Math.max(0.6, vw / cw)));
  };
  useEffect(() => {
    fitToScreen();
    const onResize = () => fitToScreen();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Deep link
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace('#',''));
    if (hash) setActive(hash);
  }, []);
  useEffect(() => {
    if (active) history.replaceState(null, '', `#${encodeURIComponent(active)}`);
    else history.replaceState(null, '', window.location.pathname);
  }, [active]);

  // Load/save node positions
  useEffect(() => {
    try {
      const raw = localStorage.getItem('archit.positions');
      if (raw) setPositions(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem('archit.positions', JSON.stringify(positions)); } catch {}
  }, [positions]);

  const visibleStyle = useMemo(() => (key: keyof typeof visible) => ({ display: visible[key] ? undefined : 'none' as const }), [visible]);
  const nodeStyle = (id: string) => {
    if (!query) return undefined;
    const q = query.toLowerCase();
    const info = NODE_INFO[id];
    const match = [info?.title, info?.desc, info?.tech].some(v => (v||'').toLowerCase().includes(q));
    const base: React.CSSProperties = { display: match ? undefined : 'none' } as React.CSSProperties;
    const p = positions[id];
    if (p) base.transform = `translate(${p.x}px, ${p.y}px)`;
    base.cursor = 'grab';
    return base;
  };

  const showTip = (id: string, e: React.MouseEvent) => { setActive(id); setTip({ show:true, x:e.clientX, y:e.clientY, id }); };
  const moveTip = (e: React.MouseEvent) => setTip(t => ({ ...t, x:e.clientX, y:e.clientY }));
  const hideTip = () => { setActive(null); setTip({ show:false, x:0, y:0 }); };

  const onMouseDown = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const pos = positions[id] || { x: 0, y: 0 };
    dragRef.current = { id, startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y };
    document.body.style.cursor = 'grabbing';
    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = ev.clientX - dragRef.current.startX;
      const dy = ev.clientY - dragRef.current.startY;
      setPositions((p) => ({ ...p, [id]: { x: dragRef.current!.origX + dx, y: dragRef.current!.origY + dy } }));
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      dragRef.current = null;
      setTimeout(() => window.dispatchEvent(new Event('resize')), 0);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const exportPNG = async () => {
    const node = canvasRef.current;
    if (!node) return;
    try {
      const mod = await import('html-to-image').catch(() => null as any);
      if (mod?.toPng) {
        const dataUrl = await mod.toPng(node as HTMLElement, { cacheBust: true, pixelRatio: 2 });
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'architecture.png';
        a.click();
        return;
      }
    } catch {}
    alert('ייצוא PNG דורש html-to-image. ניתן להוסיף חבילה זו או להשתמש בצילום מסך של הדפדפן.');
  };

  const resetLayout = () => {
    setPositions({});
    try { localStorage.removeItem('archit.positions'); } catch {}
    setTimeout(() => window.dispatchEvent(new Event('resize')), 0);
  };

  const copyJSON = async () => {
    const data = {
      nodes: Object.entries(NODE_INFO).map(([id, info]) => ({ id, ...info })),
      connections: paths.map(p => ({ id: p.id, from: p.from, to: p.to })),
      filters: visible,
      mode,
    };
    try { await navigator.clipboard.writeText(JSON.stringify(data, null, 2)); } catch {}
  };

  return (
    <>
      <DiagramStyles />
      <div className="architecture-container" data-theme={theme}>
        <h1>דיאגרמת ארכיטקטורה מקצה לקצה - LionSTour</h1>
        <p className="architecture-hint">ריחוף על קופסה מדגיש חיבורים; ניתן לסנן עמודות ולהתאים זום.</p>
        <div className="controls" role="toolbar" aria-label="בקרות דיאגרמה">
          <button className="chip" onClick={() => { setActive(null); setPanelOpen(false); }}>נקה הדגשה</button>
          <button className="chip" onClick={fitToScreen}>התאם למסך</button>
          <button className="chip" onClick={() => setScale(1)}>איפוס זום</button>
          <div className="zoom">
            <label htmlFor="zoom">זום</label>
            <input id="zoom" type="range" min={0.6} max={1.2} step={0.05} value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} />
          </div>
          <button className="chip" aria-pressed={mode==='beginner'} onClick={() => setMode(m => m==='beginner'?'pro':'beginner')}>{mode==='beginner' ? 'מצב: מתחילים' : 'מצב: מתקדמים'}</button>
          <button className="chip" aria-pressed={theme==='dark'} onClick={() => setTheme(t => t==='dark'?'light':'dark')}>{theme==='dark' ? 'מצב כהה' : 'מצב בהיר'}</button>
          <button className="chip" onClick={copyJSON}>העתק JSON</button>
          <button className="chip" onClick={exportPNG}>ייצוא PNG</button>
          <button className="chip" onClick={resetLayout}>איפוס פריסה</button>
          <label style={{marginInlineStart:'.5rem'}} htmlFor="filter">חיפוש</label>
          <input id="filter" placeholder="חיפוש רכיב..." value={query} onChange={(e)=>setQuery(e.target.value)} style={{ padding: '.3rem .5rem', borderRadius: 8, border: '1px solid rgba(148,163,184,.3)', background: 'rgba(2,6,23,.25)', color: 'inherit' }} />
          <span style={{marginInlineStart:'.5rem'}}>הצג:</span>
          {([
            ['users','משתמשים'], ['edge','Edge'], ['frontend','Frontend'], ['backend','Backend'], ['data','Data'], ['ai','AI'], ['ops','Ops'],
          ] as const).map(([k,label]) => (
            <button key={k} className="chip" aria-pressed={visible[k]} onClick={() => toggle(k)}>{label}</button>
          ))}
        </div>

        <div className="diagram-viewport">
          <div className="diagram-scale" style={{ transform: `scale(${scale})` }}>
            <div ref={canvasRef} className="diagram-canvas">
              <div className="diagram-column" id="col-users" style={visibleStyle('users')}>
                <div className="column-title">Users</div>
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
                <div className="column-title">Edge Network</div>
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
                <div className="column-title">Frontend</div>
                <div className="diagram-node" id="node-webapp" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-webapp',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-webapp')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-webapp'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-webapp')}
                    style={nodeStyle('node-webapp')}>
                  <div className="node-title">Web Application</div>
                  <div className="node-desc">Homepage, Experiences, Planning</div>
                  <div className="node-tech">Next.js / Vercel</div>
                </div>
                <div className="diagram-node" id="node-mobileapp" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-mobileapp',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-mobileapp')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-mobileapp'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-mobileapp')}
                    style={nodeStyle('node-mobileapp')}>
                  <div className="node-title">Mobile App (Planned)</div>
                  <div className="node-desc">Push Notifications, Quick Actions</div>
                  <div className="node-tech">React Native</div>
                </div>
              </div>

              <div className="diagram-column" id="col-backend" style={visibleStyle('backend')}>
                <div className="column-title">Backend</div>
                <div className="diagram-node" id="node-api-gw" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-api-gw',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-api-gw')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-api-gw'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-api-gw')}
                    style={nodeStyle('node-api-gw')}>
                  <div className="node-title">Backend API</div>
                  <div className="node-desc">Auth, Business Logic, Data Access</div>
                  <div className="node-tech">Node.js / Edge/Serverless</div>
                </div>
                <div className="diagram-node" id="node-ai-gw" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-ai-gw',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-ai-gw')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-ai-gw'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-ai-gw')}
                    style={nodeStyle('node-ai-gw')}>
                  <div className="node-title">AI Gateway</div>
                  <div className="node-desc">Orchestrates calls to AI models</div>
                  <div className="node-tech">HTTP / Streaming</div>
                </div>
                <div className="diagram-node" id="node-osint-collector" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-osint-collector',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-osint-collector')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-osint-collector'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-osint-collector')}
                    style={nodeStyle('node-osint-collector')}>
                  <div className="node-title">OSINT Collector</div>
                  <div className="node-desc">Scrapes & monitors sources</div>
                  <div className="node-tech">Schedulers / Jobs</div>
                </div>
              </div>

              <div className="diagram-column" id="col-data" style={visibleStyle('data')}>
                <div className="column-title">Data Stores</div>
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
                  <div className="node-title">Cloud Storage</div>
                  <div className="node-desc">Media files, raw data, backups</div>
                  <div className="node-tech">Object Store</div>
                </div>
                <div className="diagram-node" id="node-bigquery" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-bigquery',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-bigquery')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-bigquery'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-bigquery')}
                    style={nodeStyle('node-bigquery')}>
                  <div className="node-title">BigQuery (Planned)</div>
                  <div className="node-desc">Analytics, trends</div>
                  <div className="node-tech">Warehouse</div>
                </div>
              </div>

              <div className="diagram-column" id="col-ai" style={visibleStyle('ai')}>
                <div className="column-title">AI / ML APIs</div>
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
                  <div className="node-title">Specialized Models</div>
                  <div className="node-desc">Deepfake/audio analysis</div>
                  <div className="node-tech">Whisper, Custom</div>
                </div>
              </div>

              <div className="diagram-column" id="col-ops" style={visibleStyle('ops')}>
                <div className="column-title">Operations</div>
                <div className="diagram-node" id="node-ci-cd" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-ci-cd',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-ci-cd')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-ci-cd'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-ci-cd')}
                    style={nodeStyle('node-ci-cd')}>
                  <div className="node-title">CI/CD Pipeline</div>
                  <div className="node-desc">GitHub → Build → Deploy</div>
                  <div className="node-tech">GH Actions, Docker</div>
                </div>
                <div className="diagram-node" id="node-monitoring" tabIndex={0}
                    onMouseEnter={(e)=>showTip('node-monitoring',e)} onMouseMove={moveTip} onMouseLeave={hideTip}
                    onFocus={()=>setActive('node-monitoring')} onBlur={()=>setActive(null)} onClick={()=>{ setActive('node-monitoring'); setPanelOpen(true); }}
                    onMouseDown={onMouseDown('node-monitoring')}
                    style={nodeStyle('node-monitoring')}>
                  <div className="node-title">Monitoring</div>
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
        {/* Side panel with flow summary */}
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
                    {paths.filter(p => p.to === active).map(p => (
                      <li key={p.id}><code>{p.from}</code></li>
                    ))}
                    {paths.filter(p => p.to === active).length === 0 && <li style={{opacity:.7}}>—</li>}
                  </ul>
                </div>
                <div>
                  <div style={{ fontSize: '.8rem', opacity: .9, marginBottom: 4 }}>יוצא</div>
                  <ul style={{ margin:0, paddingInlineStart: '1rem' }}>
                    {paths.filter(p => p.from === active).map(p => (
                      <li key={p.id}><code>{p.to}</code></li>
                    ))}
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
