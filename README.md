# શ્રી ભડભીડ પ્રાથમિક શાળા - Official Website
**Shree Bhadbhid Primary School (Bhavnagar, Gujarat)**

A fast, lightweight, accessible, mobile-first, and SEO-optimized website for Shree Bhadbhid Primary School. 100% free to host on Vercel with zero database, zero framework overhead, and zero running costs.

---

## 🌟 Key Features

1. **Lightweight & High Performance:**
   - 100% Plain Semantic HTML5, handcrafted Vanilla CSS with design variables, and minimal Vanilla JavaScript.
   - Zero Tailwind CDN, zero React/Vue overhead.
   - Next-gen WebP images with responsive ~600px thumbnails to avoid layout shift.
   - Preloaded Google Fonts (**Noto Sans Gujarati** + **Poppins**) with `font-display: swap`.

2. **Technical SEO & Schema.org Structured Data:**
   - Single semantic `<h1>` on every page with natural Gujarati and English keyword hierarchy.
   - Unique `<title>` (under 60 chars) and `<meta name="description">` (under 160 chars).
   - Valid JSON-LD Structured Data:
     - `EducationalOrganization` and `WebSite` on Home (`/`)
     - `FAQPage` on Admission (`/admission`) for Google Search expandable FAQ snippets
     - `VideoObject` on Videos (`/videos`)
     - `Article` on every blog post (`/blog/<slug>`)
     - `BreadcrumbList` on all inner pages
   - Automated `sitemap.xml`, human-readable `/sitemap.html`, and `robots.txt`.

3. **Privacy-Friendly YouTube Lite Embed:**
   - Displays responsive cover thumbnail and custom play button.
   - Connects to `youtube-nocookie.com` only when the user taps play, saving bandwidth and respecting privacy.
   - Connected to the official school channel: `https://youtube.com/@bhadbhidprimaryschool`.

4. **Zero-Cost WhatsApp Admission & Inquiry Forms:**
   - Client-side validation + hidden honeypot anti-spam protection.
   - Directly formats entered student/parent details and opens official WhatsApp (`wa.me/919724232366`).

5. **Built-in Static Blog Engine (`build.js`):**
   - Zero external dependencies (uses native Node `fs` & `path`).
   - Automatically generates `/blog/<slug>/index.html`, `/blog.html`, and `sitemap.xml` from `content/blog/*.json`.
   - Wrapped in a fail-safe `try/catch` so deployments on Vercel never fail.

6. **Teacher Admin CMS (`/admin`):**
   - Powered by **Sveltia CMS** wired directly to your GitHub repository (`Anshal019/SBPS`).
   - Allows non-technical teachers to post blogs, notices, photos, and videos straight from their smartphone.
   - Includes a one-page Gujarati guide: [docs/TEACHER_GUIDE_GU.md](file:///c:/Users/admah/OneDrive/Desktop/sbps/docs/TEACHER_GUIDE_GU.md).

---

## 🚀 100% Free Vercel Deployment Guide

1. Log in to [Vercel](https://vercel.com/) (sign in with your GitHub account).
2. Click **"Add New"** → **"Project"**.
3. Select and import repository: `Anshal019/SBPS`.
4. In the Project Configuration:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `./`
5. Click **"Deploy"**.
6. Your school website will be live in ~30 seconds with automated SSL certificate, global CDN edge caching, and clean URLs!

---

## 💻 Local Development

1. **Install dependencies (only sharp for image preprocessing):**
   ```bash
   npm install
   ```

2. **Run the zero-dependency build (generates blog pages & sitemap):**
   ```bash
   npm run build
   ```

3. **Start local dev server:**
   ```bash
   node scripts/server.js
   ```
   Open `http://localhost:3000` in your browser.

---

## 📂 Project Structure

```
SBPS/
├── assets/
│   ├── css/
│   │   └── style.css            # Handcrafted CSS design system
│   ├── js/
│   │   └── main.js              # Accessible mobile menu, modal, lightbox, lite-embed
│   └── images/                  # Optimized WebP photos, icons, favicons, OG banner
├── blog/                        # Generated static blog pages (/blog/<slug>/index.html)
├── content/
│   ├── site.json                # Single source of truth for school facts & phone
│   ├── notices.json             # Notices board data
│   ├── gallery.json             # Categorized photos with dual-language alt text
│   ├── videos.json              # YouTube channel video items
│   └── blog/                    # Blog post JSON content files
├── partials/
│   ├── header.html              # Shared semantic header partial
│   └── footer.html              # Shared 4-column footer partial
├── admin/
│   ├── index.html               # Teacher CMS interface
│   └── config.yml               # CMS collections config for GitHub
├── docs/
│   ├── TEACHER_GUIDE_GU.md      # Gujarati CMS guide for school staff
│   └── SEO_LAUNCH_CHECKLIST.md  # Search Console and SEO launch checklist
├── index.html                   # Home page
├── about.html                   # About school & principal message
├── facilities.html              # Detailed campus facilities
├── gallery.html                 # Photo gallery with category filters & lightbox
├── admission.html               # Admission guide, checklist & FAQ accordion
├── contact.html                 # Contact details, inquiry form & map
├── notices.html                 # Complete chronological notices board
├── videos.html                  # Official YouTube video gallery
├── sitemap.html                 # Human-readable HTML sitemap
├── 404.html                     # Custom branded 404 error page
├── sitemap.xml                  # Automated search engine sitemap
├── robots.txt                   # Search crawler directives
├── build.js                     # Zero-dependency build script
├── vercel.json                  # Clean URLs, 1-year cache headers, security policies
└── package.json                 # Project scripts
```

---

## 📋 School Information Checklist (Items for You to Confirm When Ready)

| Information Item | Current Value / Status | Action Needed |
| :--- | :--- | :--- |
| **School Name (Gujarati)** | શ્રી ભડભીડ પ્રાથમિક શાળા | Confirmed ✅ |
| **School Name (English)** | Shree Bhadbhid Primary School | Confirm if you prefer "Bhabhid" or "Bhadbhid" (both are in keywords) |
| **Address** | મુ. ભડભીડ, તા. ભાવનગર, જિ. ભાવનગર – 364001 | Confirmed ✅ |
| **Helpline / WhatsApp** | +91 97242 32366 | Confirmed ✅ |
| **YouTube Channel** | `https://youtube.com/@bhadbhidprimaryschool` | Confirmed & Integrated ✅ |
| **Principal Name** | `[TODO: Add Principal Name]` | Provide name when available |
| **Established Year** | `[TODO: Add Established Year]` | Provide year when available |
| **UDISE Code** | `[TODO: Add UDISE Code]` | Provide 11-digit UDISE code when available |
| **School Email** | `[TODO: Add Email]` | Provide official email when available |
| **Google Maps Pin** | Centered on Bhadbhid, Bhavnagar | Confirm exact pin link if you have a Google Business profile |
| **Facebook / Instagram** | `[TODO]` | Provide URLs if school maintains pages |
