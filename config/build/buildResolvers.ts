import {Configuration} from 'webpack';
import {BuildOptions} from './types/types';

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@app': options.paths.src + '/app',
      '@pages': options.paths.src + '/pages',
      '@widgets': options.paths.src + '/widgets',
      '@features': options.paths.src + '/features',
      '@entities': options.paths.src + '/entities',
      '@shared': options.paths.src + '/shared'
    }
  };
}
