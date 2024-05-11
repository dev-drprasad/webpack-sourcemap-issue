export interface BuildPaths {
  entry: string;
  html: string;
  public: string;
  output: string;
  src: string;
}

export type BuildMode = 'production' | 'development' | 'staging';
export type BuildPlatform = 'mobile' | 'desktop';

export interface BuildOptions {
  isDev: boolean;
  isLocal: boolean;
  isStaging: boolean;
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  platform: BuildPlatform;
  analyzer?: boolean;
}
