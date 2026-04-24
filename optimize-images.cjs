const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, 'src', 'img');

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const basename = path.basename(file, ext);
        const webpPath = path.join(directory, `${basename}.webp`);

        console.log(`Processing ${fullPath}...`);
        
        try {
          await sharp(fullPath)
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(webpPath);
            
          console.log(`Successfully compressed to ${webpPath}`);
          
          // Delete original to save space
          fs.unlinkSync(fullPath);
          console.log(`Deleted original: ${fullPath}`);
        } catch (err) {
          console.error(`Error processing ${fullPath}:`, err);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting image optimization...');
  try {
    await processDirectory(imgDir);
    console.log('Image optimization complete!');
  } catch (err) {
    console.error('Script failed:', err);
  }
}

run();
