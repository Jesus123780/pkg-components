const fs = require('fs');

// Lee el contenido de package.json
const packageJson = JSON.parse(fs.readFileSync('package.json'));

// Obtiene la versión actual y la divide en partes (ej. 1.0.0 => [1, 0, 0])
const versionParts = packageJson.version.split('.').map(part => parseInt(part));

// Incrementa la parte de la versión en 10
versionParts[2] += 10;

// Si la parte menor de la versión es mayor o igual a 100, incrementa la parte media y reinicia la parte menor
if (versionParts[2] >= 100) {
    versionParts[1]++;
    versionParts[2] = 0;
}

// Si la parte media de la versión es mayor o igual a 10, incrementa la parte mayor y reinicia la parte media
if (versionParts[1] >= 10) {
    versionParts[0]++;
    versionParts[1] = 0;
}

// Actualiza la versión en el package.json
packageJson.version = versionParts.join('.');

// Escribe los cambios en package.json
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
