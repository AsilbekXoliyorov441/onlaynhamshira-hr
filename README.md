# Onlayn Hamshira — hero sahifa (Next.js 14 + Tailwind)

Skrinshotdagi dizayn piksel darajasida qayta qurilgan. Rasm fayllari kerak emas —
telefon, qoʻl, 3D ikonkalar va fon nurlari toʻliq CSS va SVG bilan chizilgan.

## Ishga tushirish

```bash
npm install
npm run dev
# http://localhost:3000
```

## Tuzilma

```
app/
  layout.tsx        Manrope (sarlavha) + Inter (matn) shriftlari, metadata
  page.tsx          Sahifa: fon + Navbar + Hero
  globals.css       Fon gradientlari, tugma gradienti, shisha panel
components/
  Navbar.tsx        Logotip, menyu, Login / Sign alman, mobil menyu
  Hero.tsx          Chap matn bloki + oʻng kompozitsiya (joylashuvlar shu yerda)
  PhoneMockup.tsx   Telefon korpusi, ilova ekrani, ushlab turgan qoʻl
  FloatingCard.tsx  Oq suzuvchi kartochka
  Decor.tsx         Yurak, pul qopchasi, diagramma, stetoskop, punktir chiziqlar
  Icons.tsx         Barcha kichik ikonkalar
tailwind.config.ts  Ranglar, soyalar, animatsiyalar
```

## Tez sozlash

**Matnlar.** Menyu yorliqlari `components/Navbar.tsx` ichidagi `NAV` massivida.
Sarlavha, tavsif va tugmalar — `components/Hero.tsx` ichida.

**Ranglar.** `tailwind.config.ts` → `colors.brand`. Tugma gradienti va sahifa
foni — `app/globals.css` (`.btn-primary`, `.hero-canvas`).

**Kartochka joylashuvi.** `Hero.tsx` dagi `FloatingCard` larning
`left/right/top/bottom` foizlari. Ular `aspect-[600/660]` konteynerga nisbatan
hisoblanadi, shuning uchun ekran kengaygan sayin kompozitsiya buzilmaydi.

**Real suratlar.** Telefon ekranidagi hamshira surati va avatarlar hozir
gradient plashholder. Almashtirish uchun `PhoneMockup.tsx` dagi `UserGlyph`
blokini `next/image` bilan almashtiring:

```tsx
import Image from "next/image";

<Image
  src="/nurse.jpg"
  alt="Hamshira"
  fill
  className="object-cover"
  priority
/>;
```

Faylni `public/nurse.jpg` ga qoʻying. Xuddi shu usul `Hero.tsx` dagi avatarlar
uchun ham ishlaydi.

## Mavzu (yorugʻ / toʻq rejim)

Sayt ikkala rejimda ishlaydi. **Standart holat — yorugʻ rejim**; tanlov
`localStorage` dagi `theme` kalitida saqlanadi va headerdagi tugma orqali
almashtiriladi.

```
app/layout.tsx                     <head> dagi kichik skript — sahifa
                                   chizilishidan oldin `dark` sinfini qoʻyadi
                                   (yorugʻ fon "chaqnab" ketmasligi uchun)
components/theme/ThemeProvider.tsx  holat, localStorage, `useTheme()`
components/theme/ThemeToggle.tsx    headerdagi almashtirgich
app/globals.css                     `:root` (yorugʻ) va `.dark` (toʻq) tokenlari
tailwind.config.ts                  `darkMode: "class"` + tokenlarga bogʻlangan ranglar
```

### Ranglarni qanday yozish kerak

Komponentlarda **hech qachon toʻgʻridan-toʻgʻri hex rang yozilmaydi** — hamma
narsa tokenlar orqali oʻtadi, shunda ikkala rejim oʻz-oʻzidan toʻgʻri chiqadi:

| Maqsad | Ishlatiladi |
| --- | --- |
| Sarlavha / asosiy matn | `text-ink` |
| Oddiy matn | `text-body` |
| Ikkilamchi matn | `text-mute` |
| Chegara chizigʻi | `border-line` |
| Boʻlim foni | `bg-page` yoki `.section-page` |
| Kartochka foni | `bg-surface` |
| Shisha kartochka | `.glass-card` / `.glass-panel` |
| Yashil CTA ustidagi matn | `text-onbrand` (ikkala rejimda ham toʻq) |
| Boʻlim chetlari | `.fade-top` / `.fade-bottom` / `.edge-fade-y` |
| Bezak nurlari | `.decor-glow` (toʻq rejimda avtomatik soʻnadi) |

Boshqa nozik ranglar CSS oʻzgaruvchilari orqali olinadi, masalan
`bg-[color:var(--map-bg)]`, `stroke="var(--track)"`, `text-[color:var(--note-fg)]`.

`framer-motion` `var()` qiymatlarini interpolyatsiya qila olmaydi — animatsiya
qilinadigan ranglar uchun `useTheme()` dan foydalaniladi (`PrepChecklist`,
`OnboardingFlow` ga qarang).

## Nimalar hisobga olingan

- 1280 / 1024 / 768 / 390 px kengliklarida moslashadi; mobilda ustunlar ustma-ust.
- Klaviatura fokusi koʻrinadi (`:focus-visible`).
- `prefers-reduced-motion: reduce` boʻlsa barcha animatsiyalar oʻchadi.
- Dekorativ elementlarda `aria-hidden`, shuning uchun skrinrider matnni toza oʻqiydi.
- Mavzu tugmasi `role="switch"` + `aria-checked` — holat ekran oʻqigichga eʼlon qilinadi.
- Toʻq rejimda barcha matn/fon juftliklari WCAG AA dan oʻtadi (asosiy matn 9:1 dan yuqori).
- `color-scheme` ikkala rejimda ham eʼlon qilinadi — brauzer scrollbar va
  formalarni mos rangda chizadi.
- Yashiringan yopishqoq header `invisible` — havolalari Tab tartibiga tushmaydi.
# onlaynhamshira-hr
