const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('C:/Users/habee/.gemini/antigravity-ide/scratch/windows-h-website-folder/src');
const sizeRegex = /text-(lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let lines = content.split('\n');
    let changed = false;
    for (let i = 0; i < lines.length; i++) {
        if (/(text-cyan-400|text-cyan-500|text-blue-400|text-blue-500)/.test(lines[i])) {
            if (sizeRegex.test(lines[i]) || /<h[1-6]/.test(lines[i])) {
                lines[i] = lines[i].replace(/text-(cyan|blue)-(400|500)/g, 'text-gradient theme-lovable text-gradient-animated');
                changed = true;
            }
        }
    }
    if (changed) {
        fs.writeFileSync(file, lines.join('\n'));
        console.log(`Updated ${file}`);
    }
});
