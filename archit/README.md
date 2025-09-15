# סקירת ארכיטקטורה וצ'ק‑ליסט UI/ביצועים

תיקייה זו מרכזת את מסמכי הארכיטקטורה של LionSTour כדי לשמור על סדר בשורש הריפו. דיאגרמה אינטראקטיבית זמינה בנתיב האפליקציה `/archit`.

## סקירת ארכיטקטורה
- Edge/CDN: ‏Vercel Edge לניטוב, מטמון ו‑Middleware לביצועים גלובליים.
- Frontend: ‏Next.js 15 (App Router, React 19) על Vercel. אפליקציית מובייל (React Native) — בתכנון.
- API/Gateway: ‏Node.js ללוגיקה עסקית ואימות; AI Gateway לתזמור קריאות למודלים (כולל סטרימינג).
- Data: נתוני אפליקציה ב‑Firestore/Storage; ‏BigQuery לאנליטיקות (בתכנון).
- AI: ‏Gemini ומודלים ייעודיים דרך Gateway דק עם מטמונים בטוחים.
- Ops: ‏CI/CD ב‑GitHub Actions, לוגים/מדדים וניטור מרכזי.

## צ'ק‑ליסט UI/Perf
- פונטים/תמונות: `next/font` (Heebo) ו‑`next/image` עם `sizes`/`fill` ו‑blur placeholders.
- חלוקת קוד: `next/dynamic` לחלקים כבדים; להעדיף Skeletons; לכבד `prefers-reduced-motion`.
- LCP: לטעון מראש רק נכסים קריטיים (למשל פוסטר וידאו); להימנע מסקריפטים חוסמים.
- נגישות: `aria-label`, ‏`aria-expanded`, טבעות Focus וקישור "דלג לתוכן".
- סטייט/מידע: למזער סטייט צד‑לקוח; להעדיף Server Components כשאפשר; Debounce לחיפוש ו‑Cache ל‑GET.
- תקציבים: ‏LCP < 2.5s, ‏CLS < 0.1, חבילת ראוט ≤ 200KB.

## איך לראות את הדיאגרמה
- הרצה מקומית: `pnpm dev` → לפתוח `http://localhost:3000/archit`.
- העמוד מציג עמודות (Users → Edge → Frontend → Backend → Data → AI → Ops) עם חצים שמחושבים מחדש בעת שינוי גודל.

הערות
- לא לשמור סודות בקוד. משתני סביבה דרך Vercel או קבצי `.env` מקומיים שמחוץ ל‑git.
- שמרו PRים קטנים ותארו השפעה ארכיטקטונית (אם יש). צרפו צילום מסך של `/archit` בעת שינוי הדיאגרמה.
