const fs = require('fs');
const path = require('path');

const lookbookDir = path.join(__dirname, 'assets', 'lookbook');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function folderToId(folder) {
    return folder.toLowerCase().replace(/\s+/g, '-');
}

function folderToName(folder) {
    return folder.charAt(0).toUpperCase() + folder.slice(1);
}

const collections = fs.readdirSync(lookbookDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => {
        const folder = entry.name;
        const folderPath = path.join(lookbookDir, folder);
        const images = fs.readdirSync(folderPath)
            .filter(file => imageExtensions.has(path.extname(file).toLowerCase()))
            .sort()
            .map(file => `assets/lookbook/${folder}/${file}`);

        return {
            id: folderToId(folder),
            name: folderToName(folder),
            images
        };
    })
    .filter(collection => collection.images.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

const output = `const lookbookCollections = ${JSON.stringify(collections, null, 4)};\n`;

fs.writeFileSync(path.join(__dirname, 'lookbook-data.js'), output);
console.log(`Generated ${collections.length} collection(s) in lookbook-data.js`);
