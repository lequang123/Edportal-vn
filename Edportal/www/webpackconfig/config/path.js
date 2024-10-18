const path = require('path');

const projectRoot = path.resolve(__dirname, '../../../');

const cssPaths = {
    build: 'wwwroot/css',
    main: ['./www/sources/css/main.scss'],
    home: ['./www/sources/css/pages/home/index.scss'],
    communication_setting: ['./www/sources/css/pages/communication-setting/index.scss'],
};

const scriptPaths = {
    language: ['./www/sources/js/common/languages/ViewResources.js'],
    build: 'wwwroot/js',
    home: ['./www/sources/js/pages/home/index.js'],
    communication_setting: ['./www/sources/js/pages/communication-setting/index.js'],
};

module.exports = {
    projectRoot: projectRoot,
    cssPaths: cssPaths,
    scriptPaths: scriptPaths
};