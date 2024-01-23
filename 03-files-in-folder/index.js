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
          const res = file.name.split('.')
          const name = res.slice(0, res.length-1).join('.');
          const extension = res[res.length - 1];
          const size = stats.size / 1000;
          console.log(`${name} - ${extension} - ${size}kB`)
      })
    }
  })
})