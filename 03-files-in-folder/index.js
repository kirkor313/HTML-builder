const fs = require ('fs');
const { stat } = require('fs/promises');
const path = require('path');
const pathToSecretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToSecretFolder,
  { withFileTypes: true },
  (err, files) => {
  console.log("\nФайлы текущей директории:");
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile()) {
      const pathToFile = path.join(pathToSecretFolder, file.name)
      fs.stat(pathToFile,
        (err,stats) => {
          if (err) throw err;
          const res = path.parse(pathToFile)
          const size = stats.size / 1000;
          console.log(`${res.name} - ${res.ext.slice(1)} - ${size}KB`)
      })
    }
  })
})