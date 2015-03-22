require.config({
    baseUrl: '/static/src/js',
    map: {
      '*': { 'jquery': 'jquery-noconflict' },
      'jquery-noconflict': { 'jquery': 'jquery' },
    },
    paths: {
        'backbone': 'vendor/backbone',
        'handlebars.runtime': 'vendor/handlebars.runtime.amd',
        'jquery': 'vendor/jquery',
        'jquery-noconflict': 'lib/jquery-noconflict',
        'underscore': 'vendor/underscore',
    },
});

require([
    'router',
], function (Router) {
    'use strict';

    new Router();
});
