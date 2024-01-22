const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const pathToProject = path.join(__dirname, 'project-dist');
const pathToCopyAssets = path.join(pathToProject, 'assets');
const pathToAssets = path.join(__dirname, 'assets');
const pathToHtml = path.join(__dirname, 'project-dist', 'index.html');
const pathToMainStyle = path.join(__dirname, 'project-dist', 'style.css');
const pathToStyles = path.join(__dirname, 'styles');
const pathToTemplate = path.join(__dirname, 'template.html');
const pathToComponents = path.join(__dirname, 'components');

// ---------- Create 'project-dist' ----------

async function createProject () {
  await fsPromises.mkdir(pathToProject,
    { recursive: true },
    err => {
    if (err) throw err;
    console.log("Папка 'project-dist' была создана\n")
  })
}

try {
createProject ()
  .then(createAssets())
  .then(createHtml())
  .then(createCss())
} catch (error) {
  console.error(error.message);
}

// ---------- Create index.html ----------

async function createHtml() {
  try {
    const files = await fsPromises.readdir(pathToComponents, { withFileTypes: true });

    await fsPromises.readFile(pathToTemplate, 'utf-8').then(async (template) => {
      for (let file of files) {
        const name = file.name.split('.')[0];
        const componentsFile = path.join(pathToComponents, file.name);
        const readComponents = await fsPromises.readFile(componentsFile, 'utf-8');
        template = template.replaceAll(`{{${name}}}`, readComponents);
        console.log(`Файл ${file.name} подключен`)
      }
      await fsPromises.writeFile(pathToHtml, template);
    });

  } catch (error) {
    console.error(error.message);
    return;
  }
}


// ---------- Create style.css ----------

async function createCss() {
  try {
    const files = await fsPromises.readdir(pathToStyles, { withFileTypes: true });

    for (let file of files) {
      const name = file.name.split('.');
      if (file.isFile() && file.name.split('.')[name.length - 1] == 'css') {
        const pathToFile = path.join(pathToStyles, file.name);
        const readStyles = await fsPromises.readFile(pathToFile, 'utf-8');
        await fsPromises.appendFile(pathToMainStyle, readStyles);
        console.log(`Файл ${file.name} подключен`);
      }
    }

  } catch (error) {
    console.error(error.message);
    return;
  }
}


// ---------- Create 'assets' ----------

async function createAssets() {
  try {
    await fsPromises.mkdir(pathToCopyAssets, { recursive: true })
    console.log("Папка 'assets' создана");

    const folders = await fsPromises.readdir(pathToAssets);

    for (let folder of folders) {
      deleteFiles(folder);
      copyFiles(folder);
    };

    async function deleteFiles(folder) {
      try {
        const assetsFiles = await fsPromises.readdir(path.join(pathToAssets, folder), { recursive: true });

        for (let file of assetsFiles) {
          await fsPromises.unlink(path.join(pathToCopyAssets, folder, file))
        }

      } catch (error) {
        console.error(error.message);
        return;
      }
    }

    async function copyFiles(folder) {
      try {
        await fsPromises.mkdir(path.join(pathToCopyAssets, folder), { recursive: true })
        console.log(`Папка '${folder}' создана`);

        const assetsFiles = await fsPromises.readdir(path.join(pathToAssets, folder), { withFileTypes: true });

        for (let file of assetsFiles) {
          const pathToAssetsFiles = path.join(pathToAssets,folder, file.name);
          await fsPromises.copyFile(pathToAssetsFiles, path.join(pathToCopyAssets, folder, file.name))
          console.log(`Файл ${file.name} скопирован`)
        }
      } catch (error) {
        console.error(error.message);
        return;
      }
    }

  } catch (error) {
    console.error(error.message);
    return;
  }
}
