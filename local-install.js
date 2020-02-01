const fs = require('fs');
const shell = require('shelljs');

const files = fs.readdirSync('./');
const file = files.filter(name => {
    const regexp = new RegExp(/\.{1,}vsix$/);
    return regexp.test(name);
})
shell.exec(`code --install-extension ${file[0]}`);