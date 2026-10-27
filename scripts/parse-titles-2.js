const fs = require('fs');

const content = fs.readFileSync('C:/Users/admah/.gemini/antigravity-ide/brain/f77cd218-6d00-4177-a6ae-0993e4b2e8c8/.system_generated/steps/157/content.md', 'utf8');

const regex = /"videoId":"([a-zA-Z0-9_-]{11})"[^}]+?"title":\{"runs":\[\{"text":"([^"]+)"\}/g;
let m;
const list = [];
while ((m = regex.exec(content)) !== null) {
  list.push({ id: m[1], title: m[2] });
}

// If regex didn't catch, check aria-label or title text
if (list.length === 0) {
  const matches = [...content.matchAll(/"title":\{"runs":\[\{"text":"([^"]+)"\}\]/g)];
  console.log('Sample titles found:', matches.slice(0, 10).map(x => x[1]));
} else {
  console.log('Matched list:', list.slice(0, 8));
}
