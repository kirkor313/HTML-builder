const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const pathToFolder = path.join(__dirname, 'files');
const pathToFolderCopy = path.join(__dirname, 'files-copy');

fsPromises.mkdir(pathToFolderCopy)
  .then(() => {
    console.log("Папка 'files-copy' была создана\n");
    copyFiles ();
  })
  .catch(() => {
    console.log("Папка 'files-copy' была создана ранее\n");
    deleteFiles ();
    copyFiles ();
  })

function copyFiles () {
  fs.readdir(pathToFolder,
    (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const pathToFile = path.join(__dirname, 'files', file);
      const pathToCopyFile = path.join(__dirname, 'files-copy', file);
      fs.copyFile(pathToFile,
        pathToCopyFile,
        (err) => {
        if (err) throw err;
        console.log(`'Файл ${file} был скопирован'`)
      })
    })
  })
}

function deleteFiles () {
  fs.readdir(pathToFolderCopy,
    (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const pathToCopyFile = path.join(__dirname, 'files-copy', file);
      fs.unlink(pathToCopyFile, err => {
        if(err) throw err;
    })
  })
 })
}
