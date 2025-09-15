"use client";

import { useEffect, useState } from "react";

type Path = { id: string; d: string };

function DiagramStyles() {
  return (
    <style jsx global>{`
      :root { --primary: #f59e0b; --bg: #0b1220; --card: #0f172a; }
      .architecture-container { color: #e5e7eb; padding: 2rem 1rem; }
      .architecture-container h1 { font-size: 1.75rem; font-weight: 800; margin-bottom: 1rem; }
      .diagram-viewport { overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .diagram-canvas { position: relative; min-width: 1200px; padding: 1rem; background: linear-gradient(180deg,#0b1220,#0e1426); border-radius: 1rem; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06); }
      .diagram-canvas { display: grid; grid-template-columns: repeat(7, minmax(180px, 1fr)); gap: 16px; }
      .diagram-column { display: flex; flex-direction: column; gap: 12px; }
      .column-title { color:#cbd5e1; font-weight:700; text-transform: uppercase; letter-spacing: .08em; font-size:.75rem; padding:.25rem .5rem; border-left:3px solid var(--primary); }
      .diagram-node { position: relative; background: rgba(15,23,42,.6); border:1px solid rgba(148,163,184,.2); border-radius: 12px; padding: 12px; box-shadow: 0 8px 24px rgba(0,0,0,.25); backdrop-filter: blur(8px); }
      .node-title { font-weight:700; color:#fff; margin-bottom: 4px; }
      .node-desc { font-size:.85rem; color:#cbd5e1; }
      .node-tech { margin-top:8px; font-size:.7rem; color:#fef3c7; background: rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.25); display:inline-block; padding:.2rem .45rem; border-radius: 999px; }
      .connectors { position:absolute; inset:0; pointer-events:none; overflow:visible; }
      .connector-path { fill:none; stroke: rgba(245,158,11,.9); stroke-width:2; marker-end:url(#arrowhead); }
      @media (max-width: 768px) { .diagram-canvas{min-width:1000px} }
    `}</style>
  );
}

export default function ArchitectureDiagramPage() {
  const [paths, setPaths] = useState<Path[]>([]);

  useEffect(() => {
    const calculatePaths = () => {
      const newPaths: Path[] = [];
      const canvas = document.querySelector<HTMLDivElement>('.diagram-canvas');
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
        newPaths.push({ id: `${fromId}-${toId}`, d });
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
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePaths);
    };
  }, []);

  return (
    <>
      <DiagramStyles />
      <div className="architecture-container">
        <h1>דיאגרמת ארכיטקטורה מקצה לקצה - LionSTour</h1>
        <div className="diagram-viewport">
          <div className="diagram-canvas">
            <div className="diagram-column" id="col-users">
              <div className="column-title">Users</div>
              <div className="diagram-node" id="node-user">
                <div className="node-title">משתמשי קצה</div>
                <div className="node-desc">מטיילים, חוקרים, צרכני תוכן</div>
                <div className="node-tech">דפדפן / מובייל</div>
              </div>
            </div>

            <div className="diagram-column" id="col-cdn">
              <div className="column-title">Edge Network</div>
              <div className="diagram-node" id="node-vercel-edge">
                <div className="node-title">Vercel Edge</div>
                <div className="node-desc">CDN, Caching, Serverless Functions</div>
                <div className="node-tech">Next.js Middleware</div>
              </div>
            </div>

            <div className="diagram-column" id="col-frontend">
              <div className="column-title">Frontend</div>
              <div className="diagram-node" id="node-webapp">
                <div className="node-title">Web Application</div>
                <div className="node-desc">Homepage, Experiences, Planning</div>
                <div className="node-tech">Next.js / Vercel</div>
              </div>
              <div className="diagram-node" id="node-mobileapp">
                <div className="node-title">Mobile App (Planned)</div>
                <div className="node-desc">Push Notifications, Quick Actions</div>
                <div className="node-tech">React Native</div>
              </div>
            </div>

            <div className="diagram-column" id="col-backend">
              <div className="column-title">Backend</div>
              <div className="diagram-node" id="node-api-gw">
                <div className="node-title">Backend API</div>
                <div className="node-desc">Auth, Business Logic, Data Access</div>
                <div className="node-tech">Node.js / Edge/Serverless</div>
              </div>
              <div className="diagram-node" id="node-ai-gw">
                <div className="node-title">AI Gateway</div>
                <div className="node-desc">Orchestrates calls to AI models</div>
                <div className="node-tech">HTTP / Streaming</div>
              </div>
              <div className="diagram-node" id="node-osint-collector">
                <div className="node-title">OSINT Collector</div>
                <div className="node-desc">Scrapes & monitors sources</div>
                <div className="node-tech">Schedulers / Jobs</div>
              </div>
            </div>

            <div className="diagram-column" id="col-data">
              <div className="column-title">Data Stores</div>
              <div className="diagram-node" id="node-firestore">
                <div className="node-title">Firestore</div>
                <div className="node-desc">User data, cases, reports</div>
                <div className="node-tech">NoSQL</div>
              </div>
              <div className="diagram-node" id="node-storage">
                <div className="node-title">Cloud Storage</div>
                <div className="node-desc">Media files, raw data, backups</div>
                <div className="node-tech">Object Store</div>
              </div>
              <div className="diagram-node" id="node-bigquery">
                <div className="node-title">BigQuery (Planned)</div>
                <div className="node-desc">Analytics, trends</div>
                <div className="node-tech">Warehouse</div>
              </div>
            </div>

            <div className="diagram-column" id="col-ai">
              <div className="column-title">AI / ML APIs</div>
              <div className="diagram-node" id="node-gemini">
                <div className="node-title">Google Gemini</div>
                <div className="node-desc">Multimodal analysis</div>
                <div className="node-tech">Vertex AI</div>
              </div>
              <div className="diagram-node" id="node-other-models">
                <div className="node-title">Specialized Models</div>
                <div className="node-desc">Deepfake/audio analysis</div>
                <div className="node-tech">Whisper, Custom</div>
              </div>
            </div>

            <div className="diagram-column" id="col-ops">
              <div className="column-title">Operations</div>
              <div className="diagram-node" id="node-ci-cd">
                <div className="node-title">CI/CD Pipeline</div>
                <div className="node-desc">GitHub → Build → Deploy</div>
                <div className="node-tech">GH Actions, Docker</div>
              </div>
              <div className="diagram-node" id="node-monitoring">
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
              {paths.map((path) => (
                <path key={path.id} d={path.d} className="connector-path" />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

