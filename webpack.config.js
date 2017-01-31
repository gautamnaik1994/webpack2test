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
        }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // })
        //use plugin option here or in postcss config(recomended)
        new webpack.LoaderOptionsPlugin({
            options: {
                // postcss: [
                //     require('autoprefixer')({
                //         browsers: ['last 2 versions']
                //     }),
                // ]
                sassLoader: {
                    outputStyle: "expanded",
                    includePaths: [
                      
                    ]
                },
            }
        })
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
                exclude: /node_modules/,
                 use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!postcss-loader"
                })
                // use: [{
                //         loader: "style-loader"
                //     },
                //     {
                //         loader: "css-loader",
                //         options: {
                //             modules: true
                //         }
                //     },
                //     {
                //         loader: "postcss-loader"
                //     }
                // ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!postcss-loader!sass-loader"
                })
                // use: [
                //     {
                //         loader: "style-loader"
                //     },
                //     {
                //         loader: "css-loader",
                //         options: {
                //             modules: true
                //         }
                //     },
                //     {
                //         loader: "postcss-loader"
                //     },
                //     {
                //         loader: "sass-loader"
                //     },
                // ]
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
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
    },
    devtool: process.env.NODE_ENV === 'production' ? undefined : 'eval-source-map'
};