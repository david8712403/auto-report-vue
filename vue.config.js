module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_HOST,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '' }
      },
      '^/auth': {
        target: process.env.VUE_APP_AUTH_HOST,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/auth': '' }
      }
    }
  }
}