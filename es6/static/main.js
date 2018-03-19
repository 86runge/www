requirejs.config({
    baseUrl: '../static/',
    urlArgs: 'v=' + (new Date()).getTime(),
    paths: {
        jquery: "./jquery-1.11.3/jquery.min",
    }
});

require(['jquery'], function(jquery) {

});
