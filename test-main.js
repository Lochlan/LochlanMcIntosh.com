// Function.prototype.bind polyfill for PhantomJS (pre-2.0)
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs   = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP    = function() {},
                fBound  = function() {
                    return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                                 aArgs.concat(Array.prototype.slice.call(arguments)));
                };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
    return path.replace(/^\/base\//, '../../../').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(pathToModule(file));
    }
});

require.config({
    baseUrl: '/base/static/src/js',
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

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});
