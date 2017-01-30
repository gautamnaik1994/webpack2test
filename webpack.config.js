const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    context: path.resolve(__dirname, './app'),
    //can specify multiple entry file types  
    //   entry: {
    //     home: './home.js',
    //     events: './events.js',
    //     contact: './contact.js',
    //   },  
    //will create home.bundle,event.bundle ...   
    //alternatively use vendor
    //     entry: {
    //     index: './index.js',
    //     vendor: ['react', 'react-dom', 'rxjs'],
    //   },
    entry: {
        app: './app.jsx',
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: '[name].bundle.js',
    },
    // externals: {
    //     jquery: 'jQuery'
    // },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].bundle.css',
            allChunks: true,
        })
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // })
    ],
    resolve: {
        modules: [
            path.join(__dirname, "./app"),
            "node_modules"
        ]
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader", // Do not use "use" here
                options: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 9000
    }
};