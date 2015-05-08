require.config({
    baseUrl: '/static/src/js',
    map: {
      '*': { 'jquery': 'jquery-noconflict' },
      'jquery-noconflict': { 'jquery': 'jquery' },
    },
    paths: {
        'backbone': 'vendor/backbone',
        'jquery': 'vendor/jquery',
        'jquery-noconflict': 'lib/jquery-noconflict',
        'swig': 'vendor/swig',
        'underscore': 'vendor/underscore',
    },
});

require([
    'router',
], function (Router) {
    'use strict';

    new Router();
});
