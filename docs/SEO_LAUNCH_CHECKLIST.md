# Shree Bhadbhid Primary School - Technical SEO Launch Checklist

This checklist outlines the steps to verify and maximize Google Search and Local Maps ranking for **શ્રી ભડભીડ પ્રાથમિક શાળા (Shree Bhadbhid Primary School, Bhavnagar)**.

---

## 1. Domain & Vercel Deployment
- [ ] Connect custom school domain (or use `shree-bhadbhid-primary-school.vercel.app`).
- [ ] Verify HTTPS is active and SSL certificate is valid.
- [ ] Ensure clean URLs are active without `.html` extensions.

---

## 2. Google Search Console & Verification
- [ ] Add site property in **Google Search Console**: `https://search.google.com/search-console/`
- [ ] Verify ownership via HTML Meta tag:
  - Replace `GOOGLE_SITE_VERIFICATION_PLACEHOLDER` in `index.html` with your verification code.
  - Or verify via domain DNS TXT record.
- [ ] Submit XML Sitemap:
  - Path: `https://shree-bhadbhid-primary-school.vercel.app/sitemap.xml`
  - Verify status: **"Success"**.

---

## 3. Schema.org Structured Data Validation
Test each page in Google's **Rich Results Test Tool** (`https://search.google.com/test/rich-results`):
- [x] **Home (`/`)**: `EducationalOrganization` + `WebSite` Schema.
- [x] **Admission (`/admission`)**: `FAQPage` + `BreadcrumbList` Schema (eligible for expandable Google search FAQ snippets).
- [x] **Videos (`/videos`)**: `VideoObject` Schema.
- [x] **Blog Posts (`/blog/<slug>`)**: `Article` + `BreadcrumbList` Schema.
- [x] **Inner Pages (`/about`, `/facilities`, `/gallery`, `/contact`, `/notices`)**: `BreadcrumbList` Schema.

---

## 4. Google Business Profile & Google Maps Pin
- [ ] Claim / Verify "Shree Bhadbhid Primary School" on Google Business Profile.
- [ ] Set exact category: **"Primary School" / "Government School"**.
- [ ] Set address: **મુ. ભડભીડ, તા. ભાવનગર, જિ. ભાવનગર, ગુજરાત – 364001**.
- [ ] Set phone number: **+91 97242 32366**.
- [ ] Link website to the live Vercel URL.
- [ ] Upload school logo (`school-logo.png`) and exterior campus photos.

---

## 5. Core Web Vitals & Performance Check
- [x] Preloaded critical fonts (Noto Sans Gujarati, Poppins with `font-display: swap`).
- [x] All images formatted as lightweight WebP with explicit width/height.
- [x] Zero render-blocking heavy frameworks (no React, no jQuery, no Tailwind runtime CDN).
- [x] YouTube video embeds use privacy-friendly lite facade (`youtube-nocookie.com` only loaded on user tap).
- [x] 1-year immutable caching configured for `/assets/` in `vercel.json`.

---

## 6. On-Page Keyword Targeting
- Primary Gujarati Keywords:
  - `શ્રી ભડભીડ પ્રાથમિક શાળા`
  - `ભડભીડ શાળા ભાવનગર`
  - `ભાવનગર પ્રાથમિક શાળા`
  - `સરકારી પ્રાથમિક શાળા ભાવનગર`
  - `ધોરણ ૧ થી ૮ પ્રવેશ ભાવનગર`
  - `પીએમ પોષણ મધ્યાહન ભોજન ભાવનગર`
- English Keywords:
  - `Shree Bhadbhid Primary School Bhavnagar`
  - `Shree Bhabhid Primary School`
  - `primary school in Bhavnagar`
  - `government primary school Gujarat`
  - `school admission Bhavnagar`
