import webpack, { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins({
  isDev,
  isLocal,
  isStaging,
  mode,
  paths,
  analyzer,
  platform
}: BuildOptions): Configuration['plugins'] {
  const isProd = mode === 'production';

  const dotenvFilename = isLocal ? '.env.local' : isStaging ? '.env.staging' : `.env.${mode}`;

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico')
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode)
    }),
    new Dotenv({
      path: dotenvFilename,
      systemvars: isDev
    })
  ];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
    // plugins.push(new webpack.EvalSourceMapDevToolPlugin({
    //   module: true, columns: true, fileContext: "fileContext", sourceRoot: "sourceRoot", test: /\.tsx?$/,
    //   moduleFilenameTemplate: (info: any) => {
    //     const rootDir = process.cwd()
    //     const rel = path.relative(rootDir, info.absoluteResourcePath)
    //     console.log(rel)
    //     return `webpack:///namespace/${rel}`
    //   },
    // }))

    plugins.push(
      new CopyPlugin({
        patterns: [
          { from: path.resolve(paths.public, 'assets'), to: path.resolve(paths.output, 'assets') }
        ]
      })
    );
  }

  if (isProd || isStaging) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      })
    );
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
