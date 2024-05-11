import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildMode, BuildOptions } from './types/types';

interface Config extends Omit<webpack.Configuration, 'mode'> {
  mode: BuildMode;
}

export function buildWebpack(options: BuildOptions): Config {
  const { mode, paths, isDev } = options;

  return {
    mode: mode ?? 'development',
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
      publicPath: '/'
    },
    target: 'web',
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options)
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-cheap-module-source-map' : 'source-map',
    devServer: isDev ? buildDevServer(options) : undefined
  };
}
