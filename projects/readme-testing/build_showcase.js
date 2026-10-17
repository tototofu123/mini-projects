const fs = require('fs');
const path = require('path');

const metricsReadme = fs.readFileSync(path.join(__dirname, 'metrics', 'README.md'), 'utf-8');
const awesomeReadme = fs.readFileSync(path.join(__dirname, 'awesome-github-profile-readme', 'README.md'), 'utf-8');

function extractImages(markdown, repoName) {
    const images = [];
    // Match markdown images: ![alt](url)
    const mdRegex = /!\[.*?\]\((.*?)\)/g;
    let match;
    while ((match = mdRegex.exec(markdown)) !== null) {
        images.push({ url: match[1], source: repoName });
    }
    
    // Match html images: <img src="url" ...>
    const htmlRegex = /<img[^>]+src="([^">]+)"/gi;
    while ((match = htmlRegex.exec(markdown)) !== null) {
        let url = match[1];
        if (url.includes('blob/examples')) {
            // Fix GitHub blob URLs to raw URLs for rendering
            url = url.replace('github.com', 'raw.githubusercontent.com').replace('blob/examples', 'examples');
        }
        images.push({ url: url, source: repoName });
    }
    return images;
}

let allImages = [];
allImages = allImages.concat(extractImages(metricsReadme, 'Metrics Plugin Examples'));
allImages = allImages.concat(extractImages(awesomeReadme, 'Awesome Profiles Badges/Headers'));

// Filter out badges or tiny images
allImages = allImages.filter(img => !img.url.includes('shields.io') && !img.url.includes('badge.svg'));

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Profile Showcase</title>
    <style>
        body {
            font-family: 'Inter', system-ui, sans-serif;
            background: #0d1117;
            color: #c9d1d9;
            margin: 0;
            padding: 40px;
        }
        h1 {
            text-align: center;
            color: #58a6ff;
            margin-bottom: 40px;
        }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 30px;
        }
        .card {
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .card img {
            max-width: 100%;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            background: #fff; /* For transparent SVGs to show up */
        }
        .source {
            margin-top: 15px;
            font-size: 0.9em;
            color: #8b949e;
        }
    </style>
</head>
<body>
    <h1>Everything Awesome Showcase</h1>
    <div class="gallery">
        ${allImages.map(img => `
            <div class="card">
                <img src="${img.url}" alt="Showcase Image" loading="lazy" onerror="this.parentElement.style.display='none'">
                <div class="source">${img.source}</div>
            </div>
        `).join('')}
    </div>
</body>
</html>
`;

const showcaseDir = path.join(__dirname, 'showcase');
if (!fs.existsSync(showcaseDir)){
    fs.mkdirSync(showcaseDir);
}
fs.writeFileSync(path.join(showcaseDir, 'index.html'), htmlContent);
console.log('Showcase index.html generated successfully.');
