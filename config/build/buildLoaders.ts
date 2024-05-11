import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { BuildOptions } from './types/types';

export function buildLoaders({ isDev }: BuildOptions): ModuleOptions['rules'] {
  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource'
  };

  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors'
              }
            ]
          }
        }
      }
    ]
  };

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
      }
    }
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, cssLoaderWithModules, 'sass-loader']
  };

  const tsLoader = {
    exclude: /node_modules/,
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          // transpileOnly: true,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
          }),
        }
      }
    ],
  };

  const sourceMapLoader = {
    test: /\.tsx?$/,
    enforce: "pre",
    use: ["source-map-loader"],
  }

  return [assetLoader, scssLoader, tsLoader, svgrLoader,];
}
