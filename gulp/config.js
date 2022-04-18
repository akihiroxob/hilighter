import {DefinePlugin, LoaderOptionsPlugin} from 'webpack';
import {babel} from '../package.json';

// CONSTANTS
const JS_DEST_DIR = './app';

//----------------------------------------
// WebPack
//----------------------------------------
export const webpack = {
    mode: 'production',
    entry: {
        content: './src/content/script',
        browser: './src/browser/script',
        background: './src/background/script',
        test: './src/test'
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: JS_DEST_DIR
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    cache: true,
    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            cacheDirectory: true,
                            presets: babel.presets,
                            plugins: babel.plugins
                        }
                    }
                ]
            }
        ]
    }
};
