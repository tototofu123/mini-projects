const fs = require('fs');
const path = require('path');

const metricsReadme = fs.readFileSync(path.join(__dirname, 'metrics', 'README.md'), 'utf-8');
const awesomeReadme = fs.readFileSync(path.join(__dirname, 'awesome-github-profile-readme', 'README.md'), 'utf-8');
const analysisContent = fs.readFileSync(path.join(__dirname, 'readme_analysis.md'), 'utf-8');

function extractImages(markdown, repoName) {
    const images = [];
    const mdRegex = /!\[.*?\]\((.*?)\)/g;
    let match;
    while ((match = mdRegex.exec(markdown)) !== null) {
        images.push({ url: match[1], source: repoName });
    }
    
    const htmlRegex = /<img[^>]+src="([^">]+)"/gi;
    while ((match = htmlRegex.exec(markdown)) !== null) {
        let url = match[1];
        if (url.includes('blob/examples')) {
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

// Generate Markdown Gallery
let galleryMd = `\n\n## 🎨 Visual Showcase Gallery\n\nHere are some of the dynamically generated images and plugins in action from these repositories:\n\n<div align="center">\n`;

// Since there are many, let's limit to maybe 30 good ones so the README doesn't crash or take 5 mins to load
const showcaseImages = allImages.slice(0, 30);

for (const img of showcaseImages) {
    galleryMd += `  <img src="${img.url}" width="400" style="margin: 10px;" />\n`;
}

galleryMd += `</div>\n`;

const finalReadme = analysisContent + galleryMd;
fs.writeFileSync(path.join(__dirname, 'README.md'), finalReadme);
console.log('README.md generated successfully.');
