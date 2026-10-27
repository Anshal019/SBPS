/**
 * Shree Bhadbhid Primary School - Zero-Dependency Static Site Builder
 * Runs automatically during 'npm run build' on Vercel.
 * Generates:
 * 1. Individual blog post pages at /blog/<slug>/index.html
 * 2. Main blog directory listing at /blog.html
 * 3. XML sitemap at /sitemap.xml
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://shree-bhadbhid-primary-school.vercel.app';
const ROOT_DIR = __dirname;
const BLOG_CONTENT_DIR = path.join(ROOT_DIR, 'content', 'blog');
const BLOG_OUT_DIR = path.join(ROOT_DIR, 'blog');

function loadPartials() {
  const header = fs.readFileSync(path.join(ROOT_DIR, 'partials', 'header.html'), 'utf8');
  const footer = fs.readFileSync(path.join(ROOT_DIR, 'partials', 'footer.html'), 'utf8');
  return { header, footer };
}

function getBlogPosts() {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) return [];
  const files = fs.readdirSync(BLOG_CONTENT_DIR).filter(f => f.endsWith('.json') || f.endsWith('.md'));
  
  const posts = [];
  for (const file of files) {
    try {
      const fullPath = path.join(BLOG_CONTENT_DIR, file);
      if (file.endsWith('.json')) {
        const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        posts.push(data);
      }
    } catch (err) {
      console.warn(`Warning reading blog file ${file}:`, err.message);
    }
  }

  // Sort descending by date
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function buildBlogPosts(posts, { header, footer }) {
  if (!fs.existsSync(BLOG_OUT_DIR)) {
    fs.mkdirSync(BLOG_OUT_DIR, { recursive: true });
  }

  for (const post of posts) {
    const postDir = path.join(BLOG_OUT_DIR, post.slug);
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }

    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    const pageTitle = `${post.title} | શ્રી ભડભીડ પ્રાથમિક શાળા`.slice(0, 60);
    const metaDesc = (post.summary || post.title).slice(0, 155);
    const coverUrl = post.coverImage.startsWith('http') ? post.coverImage : `${SITE_URL}${post.coverImage}`;

    // Other posts for "Related"
    const related = posts.filter(p => p.slug !== post.slug).slice(0, 2);

    const relatedHtml = related.map(r => `
      <div style="background:var(--bg-page); border:1px solid var(--border-color); border-radius:var(--radius-md); overflow:hidden;">
        <img src="${r.coverImage}" alt="${r.title}" style="width:100%; height:160px; object-fit:cover;" loading="lazy">
        <div style="padding:1rem;">
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">${r.date}</span>
          <h4 style="font-size:0.95rem; font-weight:800; color:var(--navy-800); margin:0.35rem 0;">
            <a href="/blog/${r.slug}">${r.title}</a>
          </h4>
        </div>
      </div>
    `).join('');

    const html = `<!DOCTYPE html>
<html lang="gu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="title" content="${escapeHtml(pageTitle)}">
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <link rel="canonical" href="${postUrl}">
  <meta name="theme-color" content="#1B1C54">
  <meta name="robots" content="index, follow">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${postUrl}">
  <meta property="og:title" content="${escapeHtml(post.title)}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:image" content="${coverUrl}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(post.title)}">
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}">
  <meta name="twitter:image" content="${coverUrl}">

  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">

  <!-- Article & BreadcrumbList JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "મુખ્ય પૃષ્ઠ",
            "item": "${SITE_URL}/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "બ્લોગ",
            "item": "${SITE_URL}/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": ${JSON.stringify(post.title)},
            "item": "${postUrl}"
          }
        ]
      },
      {
        "@type": "Article",
        "headline": ${JSON.stringify(post.title)},
        "image": "${coverUrl}",
        "datePublished": "${post.date}",
        "dateModified": "${post.date}",
        "author": {
          "@type": "Organization",
          "name": "શ્રી ભડભીડ પ્રાથમિક શાળા પરિવાર"
        },
        "publisher": {
          "@type": "EducationalOrganization",
          "name": "શ્રી ભડભીડ પ્રાથમિક શાળા",
          "logo": {
            "@type": "ImageObject",
            "url": "${SITE_URL}/assets/images/school-logo.png"
          }
        },
        "description": ${JSON.stringify(metaDesc)}
      }
    ]
  }
  </script>
</head>
<body>
  ${header}

  <!-- Breadcrumbs -->
  <nav aria-label="બ્રેડક્રમ્બ્સ" style="background-color: var(--navy-50); border-bottom: 1px solid var(--border-color); padding: 0.65rem 0;">
    <div class="container" style="font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
      <a href="/" style="color: var(--navy-800); font-weight: 600;">મુખ્ય પૃષ્ઠ</a>
      <span>/</span>
      <a href="/blog" style="color: var(--navy-800); font-weight: 600;">બ્લોગ</a>
      <span>/</span>
      <span style="color: var(--maroon-700); font-weight: 700;">${escapeHtml(post.title)}</span>
    </div>
  </nav>

  <main id="main-content" class="section-padding" style="background-color: var(--bg-surface);">
    <div class="container" style="max-width: 860px;">
      
      <div style="margin-bottom: 1.5rem;">
        <a href="/blog" style="color: var(--maroon-700); font-weight: 700; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.35rem;">
          ← બધા બ્લોગ જુઓ (Back to Blog)
        </a>
      </div>

      <article>
        <span class="section-tag tag-gold">શાળા પ્રવૃત્તિ અહેવાલ</span>
        <h1 style="font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 900; color: var(--navy-800); line-height: 1.3; margin: 0.5rem 0 1rem;">
          ${escapeHtml(post.title)}
        </h1>

        <div style="display: flex; gap: 1rem; align-items: center; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; flex-wrap: wrap; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
          <span>📅 તારીખ: <strong>${post.date}</strong></span>
          <span>•</span>
          <span>✍️ લેખક: <strong>${escapeHtml(post.author || 'શાળા પરિવાર')}</strong></span>
        </div>

        <div style="border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 2rem; box-shadow: var(--shadow-md);">
          <img src="${post.coverImage}" alt="${escapeHtml(post.title)}" style="width: 100%; max-height: 480px; object-fit: cover;">
        </div>

        <div style="font-size: 1.05rem; line-height: 1.85; color: var(--text-primary); margin-bottom: 2.5rem;" class="blog-body-text">
          ${post.content}
        </div>

        <!-- Social Share Strip -->
        <div style="background: var(--navy-50); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 3rem;">
          <span style="font-weight: 800; color: var(--navy-800); font-size: 0.95rem;">આ લેખ અન્ય વાલીઓ સાથે શેર કરો:</span>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <a href="https://wa.me/?text=${encodeURIComponent(post.title + ' ' + postUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="padding: 0.4rem 0.85rem; font-size: 0.85rem;">
              💬 WhatsApp
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-maroon" style="padding: 0.4rem 0.85rem; font-size: 0.85rem;">
              Facebook
            </a>
            <button type="button" onclick="navigator.clipboard.writeText('${postUrl}').then(()=>alert('લિંક કોપી થઈ ગઈ છે!'))" class="btn btn-outline-white" style="color:var(--navy-800); border-color:var(--border-dark); padding: 0.4rem 0.85rem; font-size: 0.85rem;">
              📋 લિંક કોપી
            </button>
          </div>
        </div>

        <!-- Related Posts -->
        ${related.length > 0 ? `
          <div style="border-top: 2px solid var(--border-color); padding-top: 2rem;">
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--navy-800); margin-bottom: 1.25rem;">
              અન્ય તાજા બ્લોગ લેખો
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
              ${relatedHtml}
            </div>
          </div>
        ` : ''}

      </article>

    </div>
  </main>

  ${footer}
</body>
</html>`;

    fs.writeFileSync(path.join(postDir, 'index.html'), html, 'utf8');
    console.log(`✓ Built blog post: /blog/${post.slug}/index.html`);
  }
}

function buildBlogIndex(posts, { header, footer }) {
  const pageTitle = "શાળા બ્લોગ | શ્રી ભડભીડ પ્રાથમિક શાળા - ભાવનગર";
  const metaDesc = "શ્રી ભડભીડ પ્રાથમિક શાળાના શૈક્ષણિક કાર્યક્રમો, ઉત્સવો, રમતોત્સવ અને વિદ્યાર્થી પ્રવૃત્તિઓ અંગેના બ્લોગ લેખો.";
  const canonicalUrl = `${SITE_URL}/blog`;

  const cardsHtml = posts.map(p => `
    <article class="facility-card" style="padding:0; overflow:hidden;">
      <a href="/blog/${p.slug}">
        <img src="${p.coverImage}" alt="${escapeHtml(p.title)}" style="width:100%; height:200px; object-fit:cover;" loading="lazy">
      </a>
      <div style="padding:1.5rem; display:flex; flex-direction:column; flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <span class="section-tag tag-maroon" style="margin-bottom:0; font-size:0.75rem;">શાળા પ્રવૃત્તિ</span>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">${p.date}</span>
        </div>
        <h2 style="font-size:1.15rem; font-weight:800; color:var(--navy-800); line-height:1.4; margin-bottom:0.65rem;">
          <a href="/blog/${p.slug}" style="color:var(--navy-800);">${escapeHtml(p.title)}</a>
        </h2>
        <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6; margin-bottom:1.25rem; flex:1;">
          ${escapeHtml(p.summary || '')}
        </p>
        <div>
          <a href="/blog/${p.slug}" class="btn btn-primary-maroon" style="padding:0.4rem 0.85rem; font-size:0.85rem;">
            વાંચો (Read More) →
          </a>
        </div>
      </div>
    </article>
  `).join('');

  const html = `<!DOCTYPE html>
<html lang="gu">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="title" content="${escapeHtml(pageTitle)}">
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="theme-color" content="#1B1C54">
  <meta name="robots" content="index, follow">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:image" content="${SITE_URL}/assets/images/og-image.jpg">

  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "મુખ્ય પૃષ્ઠ",
        "item": "${SITE_URL}/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "બ્લોગ",
        "item": "${canonicalUrl}"
      }
    ]
  }
  </script>
</head>
<body>
  ${header}

  <!-- Breadcrumbs -->
  <nav aria-label="બ્રેડક્રમ્બ્સ" style="background-color: var(--navy-50); border-bottom: 1px solid var(--border-color); padding: 0.65rem 0;">
    <div class="container" style="font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
      <a href="/" style="color: var(--navy-800); font-weight: 600;">મુખ્ય પૃષ્ઠ</a>
      <span>/</span>
      <span style="color: var(--maroon-700); font-weight: 700;">શાળા બ્લોગ (Blog)</span>
    </div>
  </nav>

  <main id="main-content">
    <section style="background: linear-gradient(135deg, var(--navy-900), var(--navy-800)); color: white; padding: 3rem 0; border-bottom: 4px solid var(--gold-500);">
      <div class="container" style="text-align: center;">
        <span class="section-tag tag-gold">શિક્ષણ અને પ્રવૃત્તિઓ</span>
        <h1 style="font-size: clamp(1.8rem, 4vw, 2.75rem); font-weight: 900; line-height: 1.2; margin: 0.5rem 0;">
          શ્રી ભડભીડ પ્રાથમિક શાળા બ્લોગ
        </h1>
        <p style="color: #CBD5E1; max-width: 680px; margin: 0 auto; font-size: 1rem;">
          શાળામાં ઉજવાતા તહેવારો, રમતગમત સ્પર્ધાઓ, શૈક્ષણિક પ્રવાસ અને સંસ્કાર પ્રવૃત્તિઓ
        </p>
      </div>
    </section>

    <section class="section-padding" style="background-color: var(--bg-surface);">
      <div class="container">
        <div class="facilities-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  </main>

  ${footer}
</body>
</html>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'blog.html'), html, 'utf8');
  console.log(`✓ Built blog directory page: /blog.html`);
}

function buildSitemapXml(posts) {
  const pages = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/about', priority: '0.8', changefreq: 'monthly' },
    { loc: '/facilities', priority: '0.8', changefreq: 'monthly' },
    { loc: '/gallery', priority: '0.8', changefreq: 'weekly' },
    { loc: '/blog', priority: '0.9', changefreq: 'weekly' },
    { loc: '/videos', priority: '0.8', changefreq: 'weekly' },
    { loc: '/notices', priority: '0.9', changefreq: 'daily' },
    { loc: '/admission', priority: '0.9', changefreq: 'weekly' },
    { loc: '/contact', priority: '0.8', changefreq: 'monthly' },
    { loc: '/sitemap.html', priority: '0.5', changefreq: 'monthly' }
  ];

  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const p of pages) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${p.loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
    xml += `    <priority>${p.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  for (const post of posts) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${post.date || today}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), xml, 'utf8');
  console.log(`✓ Generated XML sitemap: /sitemap.xml (${pages.length + posts.length} URLs)`);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

function main() {
  try {
    console.log('🚀 Running zero-dependency static build...');
    const partials = loadPartials();
    const posts = getBlogPosts();
    console.log(`Found ${posts.length} blog posts in content/blog/`);

    buildBlogPosts(posts, partials);
    buildBlogIndex(posts, partials);
    buildSitemapXml(posts);

    console.log('✨ Static build completed successfully!');
  } catch (err) {
    console.error('Build error caught (non-fatal):', err);
  }
}

main();
