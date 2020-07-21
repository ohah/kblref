module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  runtimeCompiler: true,
  outputDir: "./backend/public",
  chainWebpack: (config) => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = 'KBL 레퍼런스';
            args[0].meta = {viewport: 'width=device-width,initial-scale=1,user-scalable=no'};

         return args;
    })
  }
};
