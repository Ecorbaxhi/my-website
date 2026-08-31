# Portfolio Website

A simple, responsive static portfolio built with HTML, CSS, and vanilla JavaScript.
No backend or database — deployed for free with GitHub Pages.

## Sections

- **Home** — intro / hero with resume download and social links
- **About** — bio and quick facts
- **Experience** — timeline of jobs / education
- **Projects** — project cards with code & live demo links
- **Skills** — animated skill bars
- **Contact** — contact details and a form (optional Formspree integration)

## Features

- Fixed navigation bar with active-link highlighting
- Smooth scrolling between sections
- Scroll-triggered fade-in animations
- Fully responsive layout (mobile hamburger menu, desktop nav)
- Downloadable resume (`assets/resume/resume.pdf`)
- GitHub / LinkedIn links

## Project Structure

```
my_site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── resume/
│       └── resume.pdf
└── README.md
```

## Customize

1. Replace placeholder text in [index.html](index.html) (name, title, bio, experience, projects, skills, contact info).
2. Replace the SVG placeholders in `assets/images/` with your real photo and project screenshots.
3. Replace `assets/resume/resume.pdf` with your actual resume.
4. Update social links (GitHub / LinkedIn) and the contact form action (e.g. a [Formspree](https://formspree.io) endpoint) if you want the form to send real emails.

## Run Locally

Just open `index.html` in a browser, or serve it with any static server, e.g.:

```powershell
npx serve .
```

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages** in your GitHub repo.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Select the `main` branch and `/ (root)` folder, then **Save**.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.
