const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  // optional: you can modify antd less variables directly here
  // Or better still you can specify a path to a file
  lessVarsFilePath: "./styles/variables.less",
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},
  // future: {
  //     webpack5: true,
  // },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
