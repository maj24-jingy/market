// const a = require('anymatch')
// exports.test = () => {} === module.exports = {test: () => {}}

module.exports = {
    // publicPath: './',   //打包时的一个公共路径  pc端nginx部署时的配置

    outputDir: 'simple-demo',
    lintOnSave: false,
    pages: {
        'index': {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'simple demo index page'
        }
    },
    devServer: {
        port: 9527,
        open: true,
        openPage: './index.html',
        proxy: {
            '/apis': {
                target: 'http://www.shuiyue.info:12600',
                pathRewrite: {'/apis': ''}
            }
        }
    }
}