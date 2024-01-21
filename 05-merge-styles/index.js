const fs = require('fs');
const path = require('path');
const pathToStyles = path.join(__dirname, 'styles');
const pathToBundle = path.join(__dirname, 'project-dist', 'bundle.css');

fs.writeFile (
  pathToBundle,
  '',
  (err) => {
    if (err) throw err;
  }
)

fs.readdir(pathToStyles,
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const res = file.name.split('.');
      const extension = res[res.length - 1];
      if (file.isFile() && extension == 'css'){
        const pathToFile = path.join(pathToStyles, file.name);
        fs.readFile(pathToFile,
          'utf-8',
          (err, data) => {
          if (err) throw err;
          fs.appendFile(pathToBundle, data, err =>{
            if(err) throw err;
            console.log(`"${file.name} подключен"`)
          })
        })
      }
    })
})