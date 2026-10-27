const fs = require('fs');

const content = fs.readFileSync('C:/Users/admah/.gemini/antigravity-ide/brain/f77cd218-6d00-4177-a6ae-0993e4b2e8c8/.system_generated/steps/157/content.md', 'utf8');

// Regex for lockupMetadataViewModel with videoId and title
const regex = /"watchEndpoint":\{"videoId":"([a-zA-Z0-9_-]{11})".*?"lockupMetadataViewModel":\{"title":\{"content":"([^"]+)"\}/g;
let m;
const videos = [];
const seen = new Set();
while ((m = regex.exec(content)) !== null) {
  if (!seen.has(m[1])) {
    seen.add(m[1]);
    videos.push({
      videoId: m[1],
      title: m[2]
    });
  }
}

console.log(JSON.stringify(videos, null, 2));
