const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'app'),
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
    // entry: {

    //     rhl: 'react-hot-loader/patch',
    //     wds: 'webpack-dev-server/client?http://localhost:8080',
    //     wdhos: 'webpack/hot/only-dev-server',
    //     app: './app.jsx',
    // },

    // entry: [
    //     'react-hot-loader/patch',
    //     // activate HMR for React

    //     'webpack-dev-server/client?http://localhost:8080',
    //     // bundle the client for webpack-dev-server
    //     // and connect to the provided endpoint

    //     'webpack/hot/only-dev-server',
    //     // bundle the client for hot reloading
    //     // only- means to only hot reload for successful updates

    //     './app.js'

    // ],
    entry: {
        app: ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './app.js'],
        vendor: ['react', 'react-dom'],
    },

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    // externals: {
    //     jquery: 'jQuery'
    // },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].bundle.css',
            allChunks: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
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
        }),
    ],
    resolve: {
        // modules: [
        //     path.join(__dirname, "./app/components"),
        //     "node_modules"
        // ],
        extensions: ['.js', '.jsx']
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
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
                // options: {
                //     presets: ['react', "es2015", 'stage-0']

                // }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        hot: true
        //compress: true,
    },
    devtool: process.env.NODE_ENV === 'production' ? undefined : 'eval-source-map'
};