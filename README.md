# Namusté Technologies — Official Website

> The Operating System for Offline Agri Retail

This is the official company + product website for **Namusté Technologies**, built with a modern production-grade tech stack. It showcases the company's mission, the smart retail device, features, how it works, and a contact/demo booking form.

---

## 🌿 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | CSS animations + Framer Motion ready |
| Icons | Lucide React |
| Fonts | Poppins + DM Sans (Google Fonts) |
| Deployment | Vercel |
| Database (optional) | Supabase |
| Package Manager | npm |

---

## 📁 Project Structure

```
namuste-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + metadata/SEO
│   │   ├── page.tsx            # Main page (assembles all sections)
│   │   └── globals.css         # Global styles, CSS variables, animations
│   └── components/
│       ├── Navbar.tsx          # Sticky nav with scroll effect + mobile menu
│       ├── Hero.tsx            # Hero section with device mockup + floating badges
│       ├── Features.tsx        # 8-feature card grid
│       ├── HowItWorks.tsx      # 4-step process + bottom CTA
│       ├── Stats.tsx           # Animated counter stats section
│       ├── About.tsx           # Company info + address + tech stack
│       ├── Testimonials.tsx    # Testimonial cards + partner marquee
│       ├── Contact.tsx         # Contact form (ready for Supabase)
│       └── Footer.tsx          # Full footer with CTA banner
├── public/                     # Static assets
├── .env.local.example          # Environment variables template
├── vercel.json                 # Vercel deployment config
├── tailwind.config.ts          # Tailwind theme with brand colors
└── next.config.ts              # Next.js config
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/namuste-website.git
cd namuste-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase keys (optional, only needed for contact form)
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploy to Vercel

### Option A — Vercel CLI (Recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Next.js.

### Option B — GitHub + Vercel Dashboard

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Vercel auto-detects Next.js settings
5. Add your environment variables in the Vercel dashboard
6. Click **Deploy** ✅

---

## 🗄️ Supabase Setup (Optional — for Contact Form)

The contact form is currently a local state demo. To make it production-ready with Supabase:

### 1. Create a Supabase project at [supabase.com](https://supabase.com)

### 2. Create a `contact_submissions` table

```sql
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  message text,
  created_at timestamp with time zone default now()
);
```

### 3. Create an API route

Create `src/app/api/contact/route.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { error } = await supabase
    .from('contact_submissions')
    .insert([body]);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}
```

### 4. Update Contact.tsx to POST to `/api/contact`

Replace the `handleSubmit` function in `Contact.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  if (res.ok) {
    setSent(true);
    setForm({ name: '', email: '', company: '', message: '' });
  }
};
```

---

## 🎨 Brand Colors

| Name | HEX |
|---|---|
| Deep Forest Green | `#0F4C3A` |
| Fresh Leaf Green | `#4CAF50` |
| Crop Growth Green | `#8BC34A` |
| Sunlight Yellow | `#FFC107` |
| Earth Brown | `#8D6E63` |
| Background White | `#F5F7F4` |
| Dark Text | `#1F2D2A` |
| Light Text | `#6B7C78` |

---

## 📄 Website Sections

| Section | Description |
|---|---|
| **Navbar** | Fixed, scroll-aware, mobile-responsive |
| **Hero** | Full dark hero with device mockup, floating badges, stats |
| **Features** | 8-card grid highlighting device capabilities |
| **How It Works** | 4-step farmer → retailer → reward flow |
| **Stats** | Animated count-up numbers |
| **About** | Company story, address, tech pillars |
| **Testimonials** | 3 testimonial cards + infinite brand marquee |
| **Contact** | Demo booking form (Supabase-ready) |
| **Footer** | CTA banner + full sitemap + contact details |

---

## 🏢 Company Info

**Namusté Technologies**
245 B/1, Raipur Road, Kolkata 700047
West Bengal, India

---

## 📝 License

All rights reserved © 2025 Namusté Technologies Pvt. Ltd.
