const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  const imagesDir = path.join(__dirname, '..', 'assets', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // 1. Locate the logo file
  const rootFiles = fs.readdirSync(path.join(__dirname, '..'));
  const logoFile = rootFiles.find(f => f.includes('લોગો') || f.toLowerCase().includes('logo'));
  
  if (!logoFile) {
    console.error('Logo file not found in root directory!');
    return;
  }

  const logoPath = path.join(__dirname, '..', logoFile);
  console.log(`Found logo file: ${logoFile}`);

  // Copy original logo to assets/images
  fs.copyFileSync(logoPath, path.join(imagesDir, 'original-logo.jpeg'));

  // 2. Generate standard WebP and PNG versions of logo
  await sharp(logoPath)
    .webp({ quality: 90 })
    .toFile(path.join(imagesDir, 'school-logo.webp'));
  console.log('Created school-logo.webp');

  await sharp(logoPath)
    .png({ compressionLevel: 8 })
    .toFile(path.join(imagesDir, 'school-logo.png'));
  console.log('Created school-logo.png');

  // Also create a 600px version
  await sharp(logoPath)
    .resize(600, null, { fit: 'inside' })
    .webp({ quality: 85 })
    .toFile(path.join(imagesDir, 'school-logo-600.webp'));
  console.log('Created school-logo-600.webp');

  // 3. Generate App Icons & Favicons
  await sharp(logoPath)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(imagesDir, 'icon-512.png'));
  console.log('Created icon-512.png');

  await sharp(logoPath)
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(imagesDir, 'icon-192.png'));
  console.log('Created icon-192.png');

  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(imagesDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  const png32Buffer = await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(imagesDir, 'favicon-32x32.png'), png32Buffer);
  console.log('Created favicon-32x32.png');

  const png16Buffer = await sharp(logoPath)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(imagesDir, 'favicon-16x16.png'), png16Buffer);
  console.log('Created favicon-16x16.png');

  // 4. Create favicon.ico containing 16x16 and 32x32 PNGs
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16Buffer },
    { width: 32, height: 32, buffer: png32Buffer }
  ]);
  fs.writeFileSync(path.join(imagesDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(__dirname, '..', 'favicon.ico'), icoBuffer);
  console.log('Created favicon.ico in assets/images and root');

  // 5. Generate OpenGraph Social Share Image (1200x630)
  // Clean composite with navy background, gold accent line, logo and text
  const logoForOg = await sharp(logoPath)
    .resize(380, 380, { fit: 'contain' })
    .png()
    .toBuffer();

  const ogSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#12133A"/>
          <stop offset="60%" stop-color="#1B1C54"/>
          <stop offset="100%" stop-color="#8B1E1E"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect x="0" y="618" width="1200" height="12" fill="#E5A93C"/>
      <rect x="40" y="40" width="1120" height="550" rx="24" fill="none" stroke="#E5A93C" stroke-width="2" stroke-opacity="0.3"/>
      
      <!-- Text side -->
      <text x="500" y="210" font-family="'Noto Sans Gujarati', sans-serif" font-weight="900" font-size="52" fill="#FFFFFF">
        શ્રી ભડભીડ પ્રાથમિક શાળા
      </text>
      <text x="500" y="270" font-family="'Poppins', sans-serif" font-weight="700" font-size="28" fill="#E5A93C" letter-spacing="2">
        SHREE BHADBHID PRIMARY SCHOOL
      </text>
      <text x="500" y="340" font-family="'Noto Sans Gujarati', sans-serif" font-weight="600" font-size="26" fill="#F8F9FA">
        " સા વિદ્યા યા વિમુક્તયે "
      </text>
      <text x="500" y="400" font-family="'Noto Sans Gujarati', sans-serif" font-weight="500" font-size="22" fill="#CBD5E1">
        ધોરણ ૧ થી ૮ | સરકારી ગ્રાન્ટેડ પ્રાથમિક શાળા
      </text>
      <text x="500" y="445" font-family="'Noto Sans Gujarati', sans-serif" font-weight="500" font-size="20" fill="#94A3B8">
        મુ. ભડભીડ, તા. જી. ભાવનગર, ગુજરાત - 364001
      </text>
      <rect x="500" y="480" width="280" height="44" rx="8" fill="#E5A93C"/>
      <text x="640" y="509" font-family="'Poppins', sans-serif" font-weight="700" font-size="18" fill="#12133A" text-anchor="middle">
        HEPLINE: +91 97242 32366
      </text>
    </svg>
  `;

  const ogComposite = await sharp(Buffer.from(ogSvg))
    .composite([
      {
        input: logoForOg,
        top: 125,
        left: 80
      }
    ])
    .jpeg({ quality: 90 })
    .toFile(path.join(imagesDir, 'og-image.jpg'));

  console.log('Created og-image.jpg (1200x630)');
}

function createIco(images) {
  // ICO header: 6 bytes
  // Icon directory entries: 16 bytes each
  // Image data: raw PNG buffers
  const numImages = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + numImages * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved. Must always be 0.
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(numImages, 4); // Number of images

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width === 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height === 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset to image data
    offset += img.buffer.length;
    entries.push(entry);
  }

  return Buffer.concat([header, ...entries, ...images.map(img => img.buffer)]);
}

main().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});
