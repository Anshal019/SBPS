const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = 'C:\\Users\\admah\\.gemini\\antigravity-ide\\brain\\f77cd218-6d00-4177-a6ae-0993e4b2e8c8';
const destDir = path.join(__dirname, '..', 'assets', 'images');

const imageMappings = [
  { prefix: 'school_building_front', name: 'school-building-front' },
  { prefix: 'morning_prayer_assembly', name: 'prabhat-prarthana-assembly' },
  { prefix: 'annual_sports_day', name: 'varshik-ramotsav-sports-day' },
  { prefix: 'smart_classroom_learning', name: 'smart-classroom-teaching' },
  { prefix: 'pm_poshan_midday_meal', name: 'pm-poshan-midday-meal' }
];

async function run() {
  const brainFiles = fs.readdirSync(brainDir);

  for (const item of imageMappings) {
    const file = brainFiles.find(f => f.startsWith(item.prefix) && f.endsWith('.jpg'));
    if (!file) {
      console.log(`Could not find ${item.prefix}`);
      continue;
    }
    const srcPath = path.join(brainDir, file);
    console.log(`Processing ${item.name} from ${file}...`);

    // Max 1600px wide main WebP
    await sharp(srcPath)
      .resize(1600, null, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(destDir, `${item.name}.webp`));

    // 600px thumbnail WebP
    await sharp(srcPath)
      .resize(600, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(destDir, `${item.name}-thumb.webp`));

    console.log(`Saved ${item.name}.webp and ${item.name}-thumb.webp`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
