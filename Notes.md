# verShopping Notes

## 前期配置
    
    安装 npm
        npm i                   安装npm
        npm init -y             生成package.json 文件
    安装 webpack
        npm i webpack -g        全局安装
        npm i webpack -D        本地安装
    
    生成 bundle.js 打包文件
        webpack .\src\main.js -o .\dist\bundle.js   //使用webpack处理js文件
    
    
    安装webpack-dev-server 进行实时更新,自动打包编译
        cnpm i webpack-dev-server -D

    安装html-webpack-plugin插件配置启动页面(将html页面置于内存中，而不是之前的物理层)
        cnpm i html-webpack-plugin
    
    loader 配置，处理css文件
        loader配置，处理css文件
    
         1，   //这个节点，用于配置所用第三方模块加载器
            module: {
                rules: [//所有第三方模块的匹配规则
                    {test:/\.css$/, use: ['style-loader','css-loader']},//配置处理 .css文件的第三方loader规则
        
                ]
            }
         2，cnpm i style-loader css-loader -D
         
         3，npm run dev 
         
        loader配置，处理scss文件
            1，{test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
                //配置处理 .scss 文件的第三方loader规则
            2，cnpm i style-loader css-loader sass-loader
            3，npm run dev
        
        然后对于 图片加载的loader模块为
        cnpm i url-loader file-loader -D
        webpack.config.js module模块配置
        {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader'}  图片类型
        {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'} 处理字体文件的loader
    
    cnpm i bootstrap -S
    
    webpack中的babel的配置
    main.js
        通过 Babel，实现高级语法到低级语法的转化
        1，在webpack中，可以运行如下两套命令，安装Babel相关的loader功能：
        1.1 第一套包：cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
        1.2 第二套包：cnpm i babel-preset-env babel-preset-stage-0 -D
        2. 打开webpack的配置文件，在module节点下的rules数组中，添加一个新的匹配规则：
        2.1 {test:/\.js$/,use:'babel-loader',exclude:/node_modules/}
        2.2 注意：在配置babel的loader规则的时候，必须把node_modules目录，通过exclude选项排除掉
        2.2.1 如果不排除node_modules，则babel会把node_modules中所有的第三方js文件，都打包编译
                太慢，而且耗费资源
        3.在项目的根目录中，新建一个叫做 .babelrc 的babel配置文件，这个配置文件属于json格式，所以不能写注释，字符串必须用双引号
        3.1 在 .babelrc 写如下配置
        {
            "presets":[],
            "plugins":["transform-runtime"]
        }
        4. 了解：目前安装的babel-preset-env 等于与版本字典，主要到语法对应版本，然后使用另一套进行转换
        
    webpack.config.js
        {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},//配置babel来转换高级的es语法
        
        
        升级core-js 到3 版本
            npm install --save core-js@^3
        
        babel-loader | babel 的版本必须对应
        
        两种解决方案:
            回退低版本
            npm install -D babel-loader@7 babel-core babel-preset-env
            
            更新到最高版本:
            npm install -D babel-loader @babel/core @babel/preset-env webpack

## 开发过程

加载轮播图数据
	
	1,获取数据，使用vue-resource
	2,使用 vue-resource 的this.$http.get 获取数据
	3,获取到的数据保存到data上
	4,使用 v-for 进行数据渲染

查看端口3000是否被占用
	
	netstat -nao | findstr 3000

查看3000端口的具体应用
	
	tasklist | findstr 进程号

强行终止这个进程
	
	taskkill /pid 进程号 /F