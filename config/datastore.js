let path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

let config = {
    development: {
        root: rootPath,
        app: {
            name: 'mobile-wallet'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://localhost/MobileWallet',
    }
};

module.exports = config[env];