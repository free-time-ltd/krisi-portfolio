import fs from "fs";
import path from "path";
import archiver from "archiver";
import pkgJson from "../package.json" assert { type: "json" }
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const functionName = "createThumbnails";

const rootDir = __dirname;

const outDir = path.join(rootDir, "/../build");

const distDir = path.join(rootDir, "/../dist");

const output = fs.createWriteStream(path.join(outDir, `${functionName}.zip`));
const archive = archiver("zip");

archive.directory(distDir, false);

archive.append(fs.createReadStream(path.join(__dirname, "/../package.json")), { name: "package.json" });

// Add all the dependencies to the ZIP archive
for (const dep of Object.keys(pkgJson.dependencies)) {
  const depPath = path.join(rootDir, "/../node_modules", dep);
  if (fs.existsSync(depPath)) {
    archive.directory(depPath, path.join("node_modules", dep));
  } else {
    console.error(`Couldn't locate path: ${depPath}`)
  }
}

archive.pipe(output);
archive.finalize();

console.info("Packaging of S3 function complete", output.path);
