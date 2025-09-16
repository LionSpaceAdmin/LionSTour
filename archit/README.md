# סקירת ארכיטקטורה וצ'ק‑ליסט UI/ביצועים

התיקייה מרכזת ידע ארכיטקטוני עבור LionSTour בצורה מרוכזת וברורה. דיאגרמה אינטראקטיבית זמינה בנתיב האפליקציה `/archit`.

## התחלה מהירה (למתחילים)
- התקנה: `pnpm i` (Node 20, pnpm 9).
- הרצה מקומית: `pnpm dev` ופתחו `http://localhost:3000`.
- בדיקת ארכיטקטורה: `http://localhost:3000/archit` — ריחוף על קופסה מדגיש חיבורים; אפשר לסנן עמודות ולהתאים זום.
- קבצים חשובים: קוד הדיאגרמה ב־`src/app/archit/page.tsx`, תצורת Tailwind ב־`tailwind.config.js`.

## סקירת ארכיטקטורה (בקצרה)
- Edge/CDN: ‏Vercel Edge לניטוב, מטמון ו‑Middleware לביצועים גלובליים.
- Frontend: ‏Next.js 15 (App Router, React 19) על Vercel. מובייל (React Native) — בתכנון.
- API/Gateway: ‏Node.js ללוגיקה עסקית; AI Gateway לתזמור קריאות למודלים (כולל סטרימינג).
- Data: ‏Firestore/Storage עבור נתוני אפליקציה; ‏BigQuery לאנליטיקות (בתכנון).
- AI: ‏Gemini ומודלים ייעודיים דרך Gateway דק עם מטמון בטוח.
- Ops: ‏CI/CD ב‑GitHub Actions, ניטור/לוגים מרכזיים.

## צ'ק‑ליסט UI/Perf (מעשי)
- פונטים/תמונות: `next/font` (Heebo) ו‑`next/image` עם `sizes`/`fill` ו‑blur.
- חלוקת קוד: `next/dynamic` לחלקים כבדים; Skeletons עדיפים על Spinners; כבדו `prefers-reduced-motion`.
- LCP: לטעון מראש רק נכסים קריטיים (פוסטר וידאו/תמונה ראשית); להימנע מסקריפטים חוסמים.
- נגישות: `aria-label`, ‏`aria-expanded`, טבעות Focus, וקישור "דלג לתוכן".
- סטייט/מידע: מינימום סטייט צד‑לקוח; להעדיף Server Components כשאפשר; Debounce לחיפוש ו‑Cache ל‑GET.
- תקציבים: ‏LCP < 2.5s, ‏CLS < 0.1, חבילת ראוט ≤ 200KB.

## פתרון תקלות נפוצות
- דיאגרמה לא מציירת חצים: ודאו שכל `id` של node קיים וש־`setTimeout(calculatePaths, 100)` רץ אחרי הרינדור.
- סגנונות לא נטענים: וודאו שה־Tailwind נטען (ראו `src/app/globals.css`) ושאין קונפליקט Next config.
- וידאו רקע לא מכסה מסך: בדקו את המחלקות ב־`VideoBackground.tsx` (‎`min-w/min-h` ו‑`object-cover`).

## איך לראות/לשנות את הדיאגרמה
- פתיחה: `http://localhost:3000/archit`.
- קוד: `src/app/archit/page.tsx` — ניתן להוסיף קופסאות/חיבורים, להרחיב ה־CSS, ולהגדיר פילטרים/זום.
