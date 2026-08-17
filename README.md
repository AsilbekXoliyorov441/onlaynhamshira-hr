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

## Nimalar hisobga olingan

- 1280 / 1024 / 768 / 390 px kengliklarida moslashadi; mobilda ustunlar ustma-ust.
- Klaviatura fokusi koʻrinadi (`:focus-visible`).
- `prefers-reduced-motion: reduce` boʻlsa barcha animatsiyalar oʻchadi.
- Dekorativ elementlarda `aria-hidden`, shuning uchun skrinrider matnni toza oʻqiydi.
# onlaynhamshira-hr
