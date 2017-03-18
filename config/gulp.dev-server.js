var webpack = require('webpack'),
    WebpackDevServer = require("webpack-dev-server");

var server;

var start = function(ready, done){
    var compilerConfig = require('./webpack.dev.js');
    compilerConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:3000/", "webpack/hot/dev-server");
    var config = {
        hot: true,
        historyApiFallback: false,
        stats: 'minimal',
        proxy: { }
    };
    var compiler = webpack(compilerConfig);
    var readied = false;
    if(!!ready)
        compiler.plugin('done', function(){
            if(!readied) ready();
            readied = true;
        });
    server = new WebpackDevServer(compiler, config)
        .listen(3000, '0.0.0.0', function (err) {
            if( !!done ) done(err);
        });
}

var stop = function(){
    if(!!server)
        server.close();
}

module.exports = { start: start, stop: stop };