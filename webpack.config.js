var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        './public/js/webApplication/app.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'public/js/webApplication'],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};
