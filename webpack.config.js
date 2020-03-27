//webpack是基于node构建的，所以可以使用webpack语法
var path = require('path')

//在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle.js注入到页面底部
//如果要配置插件，需要在导出的对象中，挂载一个plugin节点
var htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')//处理vue文件

//以命令行形式运行webpack或webpack-dev-server，工具会查找要打包的文件的入口和出口
//读取该文件，拿到导出的这个配置对象，然后根据该对象，进行打包构建

module.exports = {
    entry:path.join(__dirname,'./src/main.js'), //入口文件
    output:{                //指定输出选项
        path:path.join(__dirname,'./dist'), //输出路径
        filename:'bundle.js'        //指定输出文件的名称
    },
    plugins:[        //所有webpack 插件的配置节点
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),//指定模板路径
            filename:'index.html'   //设置生成的内存页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module:{    //配置所有第三方loader规则的
        rules:[     //第三方模块的匹配规则
            {test:/\.css$/, use: ['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader'},    //图片类型
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},   //处理字体文件的loader
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},//配置babel来转换高级的es语法
            {test:/\.vue$/,loader:'vue-loader'}
        ]
    }

}