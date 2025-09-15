import Link from "next/link";

export const dynamic = "force-static";

export default function TeamPlacePage() {
  const sections: { title: string; links: { href: string; label: string; note?: string }[] }[] = [
    {
      title: "מפה וארכיטקטורה",
      links: [
        { href: "/ai-learning-platform/archit", label: "מפת ארכיטקטורה (Archit)" },
      ],
    },
    {
      title: "עמודים מרכזיים",
      links: [
        { href: "/", label: "דף הבית" },
        { href: "/experiences", label: "חוויות" },
        { href: "/academy", label: "אקדמיה" },
        { href: "/impact", label: "השפעה" },
        { href: "/enterprise", label: "ארגונים" },
        { href: "/dashboard", label: "לוח מחוונים" },
        { href: "/plan", label: "מתכנן מסע" },
        { href: "/trust/safety", label: "בטיחות" },
        { href: "/auth/login", label: "התחברות" },
      ],
    },
    {
      title: "API — קריאות GET זמינות",
      links: [
        { href: "/api/experiences", label: "/api/experiences" },
        { href: "/api/guides", label: "/api/guides" },
        { href: "/api/chats", label: "/api/chats" },
        { href: "/api/bookings", label: "/api/bookings" },
        { href: "/api/impact", label: "/api/impact" },
      ],
    },
  ];

  return (
    <main className="min-h-screen w-full px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold">מרכז צוות — TeamPlace</h1>
          <p className="text-white/70 mt-2">
            עמוד מרכזי שמקשר לכל מה שחשוב בפרויקט. הכל מרוכז ומתועד כאן.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <section key={section.title} className="glass-subtle">
              <div className="p-5">
                <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 border border-white/10"
                      >
                        <span className="font-medium">{l.label}</span>
                        <span className="text-white/60">{l.note}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

