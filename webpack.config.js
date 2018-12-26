const path = require ('path')
const HTMLPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack')
const isDev = process.env.NODE_ENV ==='development'
const ExtractPlugin = require('extract-text-webpack-plugin')

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    // plugins: [
    //     // make sure to include the plugin for the magic
    //     new VueLoaderPlugin()
    // ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                // loader: 'vue-loader'
                use:[
               
                    'vue-loader'
                ]
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader']
            },
            {
                // test: /\.styl$/,
                test: /\.styl(us)?$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },                                                                          
                    'stylus-loader'
                ]               
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[ext]'
                        }
                    }

                ]
            }
        ]
    },
    plugins: [
        
        
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"':'"production"'
            }
        }),
        new HTMLPlugin (),
        new VueLoaderPlugin()
    ]
}

if (isDev) {
   config.devServer = {
       port:8000,
       host:'0.0.0.0',
       overlay: {
           errors: true,
       }
   }
}

module.exports = config