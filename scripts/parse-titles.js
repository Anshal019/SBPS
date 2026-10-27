const fs = require('fs');

try {
  const content = fs.readFileSync('C:/Users/admah/.gemini/antigravity-ide/brain/f77cd218-6d00-4177-a6ae-0993e4b2e8c8/.system_generated/steps/157/content.md', 'utf8');
  
  // Find videoRenderers
  const regex = /"videoRenderer":\{"videoId":"([^"]+)","thumbnail":\{"thumbnails":\[\{"url":"([^"]+)".*?"title":\{"runs":\[\{"text":"([^"]+)"/g;
  let m;
  const videos = [];
  while ((m = regex.exec(content)) !== null) {
    videos.push({
      videoId: m[1],
      title: m[3]
    });
  }

  // Also match simple video IDs and nearby titles
  if (videos.length === 0) {
    const vMatch = [...content.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})".*?"title":\{.*?"text":"([^"]+)"/g)];
    vMatch.forEach(vm => {
      videos.push({ videoId: vm[1], title: vm[2] });
    });
  }

  console.log('Parsed videos:', JSON.stringify(videos.slice(0, 8), null, 2));
} catch (e) {
  console.error(e);
}
