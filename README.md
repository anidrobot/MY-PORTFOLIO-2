# Anidro Paul — Portfolio Website

A modern, responsive personal portfolio website built with HTML5, CSS3, and Vanilla JavaScript.

## ✨ Features

- Dark glassmorphism theme with neon accent colors
- Animated hero section with particle canvas
- Typed-text role animation
- Scroll reveal animations (IntersectionObserver)
- Animated skill progress bars
- Certificate modal popup (Achievements & Workshops)
- Contact form with JS validation + EmailJS-ready
- Custom cursor
- Sticky navbar with active-section highlight
- Fully responsive (mobile hamburger menu)
- Scroll-to-top button
- Loading screen animation
- SEO-friendly HTML structure

## 📁 File Structure

```
portfolio/
├── index.html          ← Main HTML
├── style.css           ← All styles
├── script.js           ← All JavaScript
├── vercel.json         ← Vercel deployment config
├── assets/
│   ├── images/
│   │   ├── profile.jpg    ← Hero profile photo (recommended: square, min 400×400)
│   │   ├── about.jpg      ← About section photo
│   │   ├── project1.jpg   ← Project screenshots (600×340 recommended)
│   │   └── ...
│   ├── certificates/
│   │   ├── achievement1.jpg
│   │   ├── achievement2.jpg
│   │   ├── workshop1.jpg
│   │   └── ...
│   ├── research/
│   │   ├── research1.pdf
│   │   └── ...
│   └── resume.pdf
└── README.md
```

## 🚀 Deploy on Vercel

### Method 1 — Vercel CLI

```bash
npm install -g vercel
cd portfolio
vercel
```

Follow the prompts. Your site will be live instantly.

### Method 2 — Vercel Dashboard (recommended)

1. Push this folder to a **GitHub / GitLab / Bitbucket** repository
2. Go to [vercel.com](https://vercel.com) and click **"New Project"**
3. Import your repository
4. Framework preset: **Other** (Static Site)
5. Leave build settings blank — click **Deploy**
6. Your portfolio will be live at `https://your-project.vercel.app`

## 📧 Enable EmailJS (Contact Form)

1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Add an email service and a template
3. Add the EmailJS SDK before `</body>` in `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   <script>emailjs.init("YOUR_PUBLIC_KEY");</script>
   ```
4. In `script.js`, uncomment the `emailjs.send(...)` block and replace:
   - `SERVICE_ID` → your EmailJS service ID
   - `TEMPLATE_ID` → your EmailJS template ID
5. Remove the simulated `await new Promise(...)` line above it

## 🎨 Customisation

| What to change | Where |
|---|---|
| Name / titles / bio | `index.html` — respective sections |
| Accent color | `style.css` → `--accent` variable |
| Profile photo | `assets/images/profile.jpg` |
| Skills, projects, research | `index.html` — respective `<section>` blocks |
| Social links | All `href` attributes on `.social-icon` and `.contact-social` |
| Typed roles | `script.js` → `const roles = [...]` |

## 🛠 Tech Stack

- HTML5, CSS3, Vanilla JS (no frameworks)
- Google Fonts: Syne + DM Sans
- Font Awesome 6 (CDN)
- IntersectionObserver API (scroll reveal + bar animation)
- Canvas API (hero particle network)
- EmailJS (contact form, optional)

---

Built with ♥ by **Anidro Paul**
