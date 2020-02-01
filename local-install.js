const fs = require('fs');
const { exec } = require('child_process');

const files = fs.readdirSync('./');
const file = files.filter(name => {
    const regexp = new RegExp(/\.{1,}vsix$/);
    return regexp.test(name);
})
exec(`code --install-extension ${file[0]}`);