const path = require('path');

const projectRoot = path.resolve(__dirname, '../../../');

const cssPaths = {
    build: 'wwwroot/css',
    main: ['./www/sources/css/main.scss'],
    admin: ['./www/sources/css/pages/admin/index.scss'],
};

const scriptPaths = {
    build: 'wwwroot/js',
    admin: ['./www/sources/js/pages/index.js'],
};

module.exports = {
    projectRoot: projectRoot,
    cssPaths: cssPaths,
    scriptPaths: scriptPaths
};