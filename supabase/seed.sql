-- Minimal seed data for development
insert into public.guides (id, name, email, bio, is_veteran, languages, specialties, is_active)
values
  (gen_random_uuid(), 'שרה מירושלים', 'sara@example.com', 'ארכיאולוגית ומשוחררת, חולקת סודות עתיקים', true, '{"he","en"}', '{"history","culture"}', true),
  (gen_random_uuid(), 'אחמד מחיפה', 'ahmad@example.com', 'בונה גשרים תרבותיים ומנהיג קהילה', false, '{"he","ar","en"}', '{"culture","community"}', true)
on conflict do nothing;

insert into public.experiences (id, title, description, duration, price, max_guests, category, location, images, guide_id, is_active)
select
  gen_random_uuid(),
  'ירושלים: עתיקה וקדושה',
  'התהלכו דרך 3000 שנות היסטוריה עם מדריכים שיודעים כל אבן וסיפור',
  240, 450, 12, 'historical', 'Jerusalem', '{"/images/jerusalem.jpg"}', g.id, true
from public.guides g
where g.email = 'sara@example.com'
on conflict do nothing;

insert into public.articles (slug, title, category, excerpt, content, cover_image, published_at)
values
  ('resilience-101', 'חוסן ישראלי: סיפורים של תקווה', 'resilience', 'כיצד חוסן אישי וקהילתי מעצב את ישראל שאחרי המלחמה', 'תוכן ארוך...', '/images/resilience.jpg', now()),
  ('cultural-bridges', 'גשרים תרבותיים: מפגשים אותנטיים', 'culture', 'ללמוד על תרבויות מקומיות דרך מפגש אנושי', 'תוכן ארוך...', '/images/culture.jpg', now())
on conflict do nothing;

