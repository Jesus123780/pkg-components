import fs from 'fs'
import path from 'path'

const folders = ['atoms', 'molecules', 'organisms'];
const fileName = 'index.js';
const mainfile = 'stories';

folders.forEach(folder => {
  const folderPath = path.join(__dirname, mainfile, folder);
  const filePath = path.join(folderPath, fileName);
  
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  
  let filesInFolder = fs.readdirSync(folderPath).filter(file => file !== fileName);
  
  if (!filesInFolder.includes(fileName)) {
    // If index2.js doesn't exist, proceed normally
    const exportStatements = filesInFolder.map(file => `export * from './${file.replace('.js', '')}';`).join('\n');
    fs.writeFileSync(filePath, exportStatements, 'utf-8');
    console.log(`Archivo creado en ${filePath}`);
  } else {
    // If index2.js exists, read its content
    const existingContent = fs.readFileSync(filePath, 'utf-8');
    

    fs.writeFileSync(filePath, existingContent, 'utf-8');
    console.log(`Archivo actualizado en ${filePath}`);
  }
});
