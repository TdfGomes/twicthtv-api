var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app/index.js',
    output:{
        filename : 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {test:/\.js$/, use:'babel-loader'},
            {test:/\.css$/,use:['style-loader','css-loader']}
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./app/index.html'
        })
    ]
}