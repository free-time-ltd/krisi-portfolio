const fs = require('fs')
const path = require('path')

const getMatchingFolders = (baseDir) => {
    const matchingFolders = [];
    const contents = fs.readdirSync(baseDir);
    for (const item of contents) {
        const itemPath = path.join(baseDir, item);
        if (fs.statSync(itemPath).isDirectory()) {
        matchingFolders.push(path.join(baseDir, item, 'node_modules'));
        matchingFolders.push(path.join(baseDir, item, '.turbo'));
        }
    }
    
    return matchingFolders;
}

const folderList = [
    'node_modules', '.turbo', '.next',
    ...getMatchingFolders('packages'),
    ...getMatchingFolders('apps'),
]

folderList.forEach(folder => {
    try {
        const fullPath = path.join(__dirname, folder)
        if (fs.existsSync(fullPath)) {
            fs.rmSync(fullPath, { recursive: true, force: true, })
            console.log(`Deleted: ${folder}`);
        }
    } catch (e) {
        console.error(`Error deleting ${folder}:`, error);
    }
})
