"use client";

import Link from "next/link";

export default function EnterpriseApiDocs() {
  const endpoints = [
    { method: "GET", path: "/api/experiences", desc: "List experiences" },
    { method: "GET", path: "/api/experiences/[id]", desc: "Get one experience" },
    { method: "GET", path: "/api/guides", desc: "List guides" },
    { method: "GET", path: "/api/guides/[id]", desc: "Get one guide" },
    { method: "POST", path: "/api/bookings", desc: "Create booking" },
    { method: "POST", path: "/api/itineraries", desc: "Plan story-based itinerary" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Enterprise API</h1>
        <p className="text-lg text-gray-700 mb-10">
          Lightweight JSON API for experiences, guides, bookings, and itinerary planning.
        </p>

        <div className="space-y-4">
          {endpoints.map((e) => (
            <div key={e.path} className="bg-white rounded-xl p-5 shadow">
              <div className="text-sm font-mono font-semibold text-amber-700">{e.method}</div>
              <div className="font-mono text-gray-900">{e.path}</div>
              <div className="text-sm text-gray-600 mt-1">{e.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex gap-4">
          <Link href="/enterprise" className="btn-outline px-6 py-3">Back to Enterprise</Link>
          <Link href="/" className="btn-primary px-6 py-3">Home</Link>
        </div>
      </div>
    </div>
  );
}

