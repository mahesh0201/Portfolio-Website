# 🛡️ Cybersecurity & Full-Stack Developer Portfolio

A stunning, production-ready portfolio website built with **React 18**, **Material UI v5**, and **Framer Motion** — featuring parallax effects, animated hexagons, smooth scroll animations, and a neon cyberpunk aesthetic.

---

## ✨ Features

- 🎨 Dark theme with neon cyan/electric blue accents
- 🌊 Parallax scrolling effects throughout
- 🖱️ Mouse-tracking parallax on Hero section
- ⌨️ Typewriter animation for roles
- 📱 Fully responsive (mobile-first)
- 🔍 Project filter by category
- 📄 Resume download button
- 📬 Contact form with validation (EmailJS ready)
- 🔝 Back-to-top button
- 🎯 Active section highlighting in navbar

---

## 🚀 Quick Start

### 1. Clone or Download
```bash
git clone https://github.com/yourusername/portfolio-react.git
cd portfolio-react
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## ✏️ How to Customize

Search for `{/* REPLACE */}` comments throughout the source code to find every placeholder.

| What to Change | Where to Edit | What to Look For |
|---|---|---|
| Your name | `src/components/Hero.jsx`, `Navbar.jsx`, `Footer.jsx` | `{/* REPLACE */}` comments |
| Profile photo | `public/assets/images/` | Replace `profile-placeholder.svg`, update path in `Hero.jsx` |
| About me bio | `src/components/About.jsx` | Bio text and interest tags array |
| Skills & levels | `src/components/Skills.jsx` | `cyberSkills`, `devSkills` arrays |
| Projects | `src/components/Projects.jsx` | `projects` array |
| Certifications | `src/components/Certifications.jsx` | `certifications` array |
| Work experience | `src/components/Resume.jsx` | `experience` and `education` arrays |
| Resume PDF | `public/assets/resume/resume.pdf` | Add your PDF, update download href |
| Theme colors | `src/styles/theme.js` | Change `primary.main` |
| Contact form | `src/components/Contact.jsx` | EmailJS credentials |
| Social links | `src/components/Contact.jsx` + `Footer.jsx` | `socialLinks` arrays |

---

## 📧 Setting Up the Contact Form

This portfolio uses **EmailJS** (no backend required):

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create an Email Service and Email Template
3. In `src/components/Contact.jsx`, update:
   ```js
   const EMAILJS_SERVICE_ID = 'your_service_id';
   const EMAILJS_TEMPLATE_ID = 'your_template_id';
   const EMAILJS_PUBLIC_KEY = 'your_public_key';
   ```
4. Uncomment the EmailJS `send()` call in `handleSubmit`

---

## 🚢 Deploy

### Netlify
1. Push code to a GitHub repository
2. Log in to [netlify.com](https://netlify.com) → **New site from Git**
3. Select your repo
4. Build command: `npm run build`
5. Publish directory: `build`
6. Click **Deploy**

### Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import repo
3. Vercel auto-detects Create React App settings
4. Click **Deploy**

---

## 🎨 Customizing Parallax Effects

Each section has its own parallax configuration using Framer Motion:

- **Hero**: Mouse-tracking parallax — adjust multipliers in `Hero.jsx` (lines with `mousePos.x *`)
- **Hero scroll**: Adjust `useTransform(scrollY, [0, 500], [0, -120])` range
- **Contact bg**: Adjust `useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])`
- **Animation speeds**: Modify `duration` and `delay` in each `motion.div` component

---

## 📁 Project Structure

```
portfolio-react/
├── public/
│   ├── index.html
│   └── assets/
│       ├── images/profile-placeholder.svg
│       ├── certificates/         ← Add certificate images here
│       └── resume/resume.pdf     ← Add your resume here
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            ← Sticky navbar with mobile drawer
│   │   ├── Hero.jsx              ← Parallax hero + typewriter
│   │   ├── About.jsx             ← Bio + highlight cards
│   │   ├── Skills.jsx            ← 3D tilt skill cards + progress bars
│   │   ├── Projects.jsx          ← Filtered project grid
│   │   ├── ProjectModal.jsx      ← Project detail dialog
│   │   ├── Certifications.jsx    ← Certification cards
│   │   ├── Resume.jsx            ← Experience & education timeline
│   │   ├── Contact.jsx           ← Contact form + social links
│   │   ├── Footer.jsx            ← Footer with quick nav
│   │   └── BackToTop.jsx         ← Floating back-to-top button
│   ├── styles/
│   │   └── theme.js              ← MUI theme configuration
│   ├── App.jsx
│   ├── index.js
│   └── index.css
└── package.json
```

---

## 🛠️ Tech Stack

- **React 18** — UI framework
- **Material UI v5** — Component library + theming
- **Framer Motion** — Animations & parallax
- **React Intersection Observer** — Scroll-triggered animations
- **React Type Animation** — Typewriter effect
- **React Scroll** — Smooth scrolling
- **EmailJS** — Contact form (no backend)

---

## 📄 License

MIT — free to use and modify for personal and commercial projects.
