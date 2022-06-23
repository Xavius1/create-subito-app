import path from 'path';

const conf = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    filename: 'app.js',
    path: `${path.resolve(path.dirname('./webpack.config.mjs'))}/dist`,
  },
  resolve: {
    fallback: {
      crypto: false,
      os: false,
      http: false,
      url: false,
      stream: false,
      zlib: false,
      util: false,
      path: false,
      net: false,
      fs: false,
      dns: false,
      tls: false,
    },
  },
};

export default conf;
