const fs = require('fs');

try {
  const content = fs.readFileSync('C:/Users/admah/.gemini/antigravity-ide/brain/f77cd218-6d00-4177-a6ae-0993e4b2e8c8/.system_generated/steps/157/content.md', 'utf8');
  const videoRegex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
  const titleRegex = /"title":{"runs":\[{"text":"([^"]+)"/g;
  
  const videoIds = [];
  let m;
  while ((m = videoRegex.exec(content)) !== null) {
    if (!videoIds.includes(m[1])) videoIds.push(m[1]);
  }

  console.log('Found video IDs:', videoIds);
} catch (e) {
  console.error(e);
}
