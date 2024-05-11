import path from 'path';
import {buildWebpack} from './config/build/buildWebpack';
import {BuildMode, BuildPaths, BuildPlatform} from './config/build/types/types';

interface EnvVariables {
  isStaging?: boolean;
  isLocal?: boolean;
  mode?: BuildMode;
  analyzer?: boolean;
  port?: number;
  platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
  const {mode, isLocal, isStaging} = env;

  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),

    entry: path.resolve(__dirname, 'src/app', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src')
  };

  return buildWebpack({
    isDev: mode === 'development',
    isLocal,
    isStaging,
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop'
  });
};
