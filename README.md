# Muhammad Zahid Iqbal — Personal Portfolio

> A premium, fully-responsive portfolio built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff69b4)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

---

## 🌟 Features

| Feature | Status |
|---|---|
| Multi-page routing (Home, About, Projects, Resume, Contact) | ✅ |
| Dark / Light mode with persistence | ✅ |
| Smooth animations (Framer Motion) | ✅ |
| Typewriter hero with animated stats | ✅ |
| Projects with category filter + search | ✅ |
| Contact form with Resend API | ✅ |
| Animated skill progress bars | ✅ |
| JSON-LD structured data (Person + WebSite) | ✅ |
| Dynamic sitemap.xml + robots.txt | ✅ |
| Open Graph + Twitter Cards | ✅ |
| Accessibility (WCAG, ARIA, keyboard nav) | ✅ |
| Mobile-first responsive design | ✅ |
| GitHub Actions CI/CD pipeline | ✅ |
| All data from JSON files (no hardcoded content) | ✅ |

---

## 🗂️ Project Structure

```
portfolio/
├── app/
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact page
│   ├── projects/page.tsx       # Projects page
│   ├── resume/page.tsx         # Resume page
│   ├── api/contact/route.ts    # Contact form API (Resend)
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout + metadata
│   ├── page.tsx                # Home page
│   ├── sitemap.ts              # Dynamic sitemap
│   └── robots.ts               # Robots.txt
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky glass nav with active states
│   │   ├── Footer.tsx          # Rich footer
│   │   └── ThemeProviderWrapper.tsx
│   ├── pages/
│   │   ├── AboutPageContent.tsx
│   │   ├── ProjectsPageContent.tsx
│   │   ├── ResumePageContent.tsx
│   │   └── ContactPageContent.tsx
│   ├── sections/               # Home page sections
│   │   ├── Hero.tsx            # Typewriter + animated stats
│   │   ├── About.tsx           # Skills overview
│   │   ├── Projects.tsx        # Featured projects
│   │   ├── Resume.tsx          # Timeline
│   │   └── Contact.tsx         # Contact form
│   └── ui/
│       ├── AnimatedCounter.tsx
│       ├── Badge.tsx
│       ├── SectionHeader.tsx
│       ├── SkillBadge.tsx
│       ├── ThemeToggle.tsx
│       ├── Timeline.tsx
│       └── Toast.tsx
├── data/
│   ├── education.json
│   ├── experience.json
│   ├── projects.json
│   └── skills.json
├── hooks/
│   └── useAnimatedCounter.ts
├── lib/
│   └── utils.ts
├── public/
│   └── resume/                 # Place zahid-iqbal-resume.pdf here
├── types/
│   └── index.ts
├── .env.example
├── .github/workflows/ci.yml
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** 18+ (20 recommended)
- **npm** 9+

### 1. Clone & Install

```bash
git clone https://github.com/zahidhml/zahid-portfolio.git
cd zahid-portfolio
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Required for contact form (get from resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Your deployed URL
NEXT_PUBLIC_SITE_URL=https://zahidiqbal.dev

# Email to receive contact form messages
NEXT_PUBLIC_CONTACT_EMAIL=zahidbinsahib@gmail.com

# Optional: Google Search Console verification
GOOGLE_SITE_VERIFICATION=your_token_here
```

### 3. Add Your Resume

Place your resume PDF at:
```
public/resume/zahid-iqbal-resume.pdf
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

---

## 🚀 Deployment (Vercel)

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option B — GitHub Integration (Recommended)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add environment variables in Vercel dashboard:
	 - `RESEND_API_KEY`
	 - `NEXT_PUBLIC_SITE_URL` (your Vercel URL or custom domain)
	 - `NEXT_PUBLIC_CONTACT_EMAIL`
4. Deploy!

Vercel automatically deploys every push to `main`.

---

## 📧 Contact Form Setup (Resend)

1. Sign up at [resend.com](https://resend.com) (free tier: 3,000 emails/month)
2. Create an API key: **Settings → API Keys → Add API Key**
3. Add the key to your `.env.local` as `RESEND_API_KEY`
4. *(Optional)* Verify your domain to send from your own email address

> **Dev mode:** If `RESEND_API_KEY` is not set, the form will still show success in development and log submissions to the console.

---

## 🔧 Customization

### Update Your Info

All content is driven by JSON files — no need to edit component code:

| File | Contains |
|---|---|
| `data/projects.json` | Project cards, links, tech, descriptions |
| `data/skills.json` | Skills by category with proficiency levels |
| `data/experience.json` | Work experience entries |
| `data/education.json` | Education entries |

### Change Color Scheme

Edit `tailwind.config.ts`:

```ts
colors: {
	primary: {
		DEFAULT: '#0F6E56',   // deep teal
		light: '#1D9E75',     // lighter teal
	},
	accent: '#BA7517',      // golden amber
}
```

Also update CSS variables in `app/globals.css`.

---

## 🤖 CI/CD

The GitHub Actions workflow at `.github/workflows/ci.yml` runs on every push:

1. **ESLint** — code quality
2. **TypeScript** — type safety
3. **Next.js Build** — production build validation

Add these secrets to your GitHub repo for the workflow:
- `RESEND_API_KEY`
- `CONTACT_EMAIL`

---

## 📱 Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, About preview, Projects preview, Resume, Contact |
| `/about` | Full biography, career timeline, skills grid, languages |
| `/projects` | All projects with search + category filter |
| `/resume` | Resume with timeline, skill bars, certifications |
| `/contact` | Contact form with FAQ |

---

## 🔍 SEO Features

- **JSON-LD** — Person + WebSite schemas for rich search results
- **Dynamic sitemap** — `/sitemap.xml` auto-generated
- **robots.txt** — `/robots.txt` auto-generated
- **Open Graph** — per-page OG tags for social sharing
- **Twitter Cards** — summary_large_image cards
- **Canonical URLs** — prevents duplicate content
- **Dynamic metadata** — per-page title + description

---

## ♿ Accessibility

- **Semantic HTML** (main, nav, header, footer, article, section)
- **Skip to content** link for keyboard users
- **ARIA labels** on all interactive elements
- **Focus-visible** styles throughout
- **Keyboard navigation** fully supported
- **Reduced motion** media query support
- **Screen reader** friendly (role, aria-label, aria-invalid)

---

## 📄 License

MIT © 2024 Muhammad Zahid Iqbal

---

*Built with ❤️ from Chitral, Pakistan*

