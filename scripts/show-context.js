const fs = require('fs');
const content = fs.readFileSync('C:/Users/admah/.gemini/antigravity-ide/brain/f77cd218-6d00-4177-a6ae-0993e4b2e8c8/.system_generated/steps/157/content.md', 'utf8');

const idx = content.indexOf('hLT2WsZ0-gA');
if (idx !== -1) {
  console.log(content.slice(idx + 4000, idx + 5500));
}
