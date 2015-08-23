require.config({
    baseUrl: '/static/src/js',
    map: {
        '*': { 'jquery': 'jquery-noconflict' },
        'jquery-noconflict': { 'jquery': 'jquery' },
        'jquery.serialize-object': { 'jquery': 'jquery' },
    },
    paths: {
        'backbone': 'vendor/backbone',
        'jquery': 'vendor/jquery',
        'jquery-noconflict': 'lib/jquery-noconflict',
        'jquery.serialize-object': 'vendor/jquery.serialize-object',
        'swig': 'vendor/swig',
        'underscore': 'vendor/underscore',
    },
});

require([
    'app',
], function (App) {
    'use strict';

    new App();
});
