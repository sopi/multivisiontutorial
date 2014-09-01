var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/multivision',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://sopi:1234Qwer@ds033760.mongolab.com:33760/multivisionsopi',
        port: process.env.PORT || 80
    }
};