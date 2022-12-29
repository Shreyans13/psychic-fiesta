import path from 'path'
import nodeExternals from 'webpack-node-externals'
import { Configuration } from 'webpack'
import WebpackShellPluginNext from 'webpack-shell-plugin-next'
// const ESLintPlugin = require('eslint-webpack-plugin')
import ESLintPlugin from 'eslint-webpack-plugin'
import eslint from './.eslintrc.json'

const getConfig = (env: { [key: string]: string }, argv: { [key: string]: string }): Configuration => {
  require('dotenv').config({
    path: path.resolve(__dirname, `.env.${env.mode}`)
  })
  return {
    entry: './src/index.ts',
    target: 'node',
    mode: argv.mode === 'production' ? 'production' : 'development',
    externals: [nodeExternals()],
    plugins: [
      new ESLintPlugin({
        // overrideConfig: eslint,
        extensions: ['ts', 'tsx'],
        // failOnError: true
        useEslintrc: true
      }),
      new WebpackShellPluginNext({
        onBuildStart: {
          scripts: ['yarn run clean:dev && yarn run clean:prod'],
          blocking: true,
          parallel: false
        },
        onBuildEnd: {
          scripts: ['yarn run dev'],
          blocking: false,
          parallel: true
        }
      })
    ],
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          loader: 'ts-loader',
          options: {},
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        src: path.resolve(__dirname, 'src')
      }
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.js'
    },
    optimization: {
      moduleIds: 'deterministic',
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}

export default getConfig
