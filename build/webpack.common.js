const path = require('path')

module.exports = {
    target: 'node',
    entry: path.resolve(__dirname, './../src/index.ts'),
    output: {
        path: path.resolve(__dirname, './../dist')
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
}