const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const pathToText = path.join(__dirname, 'text.txt')

fs.writeFile (
  pathToText,
  '',
    (err) => {
        if (err) throw err;
    }
)

stdout.write('Напишите любое слово\n');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.exit()
  } else {
    fs.appendFile(
      pathToText,
      data,
      err => {
        if (err) throw err;
        console.log('Файл был дополнен');
    })
  }
})

process.on('SIGINT', () => process.exit());
process.on('exit',() => stdout.write('\nУдачи в изучении Node.js!'));