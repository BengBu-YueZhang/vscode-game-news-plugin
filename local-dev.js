const fs = require('fs');
const shell = require('shelljs');

const files = fs.readdirSync('./');
const file = files.filter(name => {
    const regexp = new RegExp(/\.{1,}vsix$/);
    return regexp.test(name);
});

if (file[0]) {
    shell.exec(`rm ${file[0]}`);
}
shell.exec('npm run local:install');
