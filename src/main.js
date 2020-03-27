//入口文件
import Vue from 'vue'

//配置vuex， cnpm i vuex -S
//3.1 导入包
import Vuex from 'vuex'
//3.2 注册vuex到vue中
Vue.use(Vuex)

//每次刚进入网站，肯定会调用main.js在刚调用的时候，先从本地存储中，把购物车中的数据
//读出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

//3.3 new Vuex.Store() 实例，得到一个数据仓储对象
var store = new Vuex.Store({
	state:{//this.$store.***
		//存储全局共享数据
		car:car, //将购物车中的数据存储起来，
			   //{id:商品的id，count:要购买的数量，price：商品的单价，selected：false}
	},
	mutations:{
		//如果要操作sotre中的state值，推荐使用mutation中的方法进行操作
		//调用方式：this.$store.commit('方法名')
		//这种调用方式类似于 this.$emit('父组件中的犯法名')
		addToCar(state,goodsinfo){
			//点击加入购物车，把商品信息保存到store中的car上
			//分析：
			//1，如果购物车中有这个商品数据，就加数量
			//2，如果购物车中没有这个商品数据，就push到car上
			
			//设置一个标志位判定有无该数据
			var flag = false;
			state.car.some(item=>{
				if(item.id == goodsinfo.id){
					item.count += parseInt(goodsinfo.count)
					flag = true;
					return true;
				}
			})
			if(!flag){
				state.car.push(goodsinfo);
			}
			//进行本地持久化存储，当更新car之后，把car数组存储到本地的localStorage中
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		//循环购物车中取数据,拿到每个商品的数量
		updateGoodsInfo(state,goodsinfo){
			//修改购物车中商品的数量值
			state.car.some(item=>{
				if(item.id == goodsinfo.id){
					item.count = parseInt(goodsinfo.count);
					return true;
				}
			});
			//当修改完商品的数量，把最新的购物车数据保存到本地存储中
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		removeFormCar(state,id){
			//根据id从state中的购物车中删除对应的那条商品数据
			state.car.some((item,i)=>{
				if(item.id == id){
					state.car.splice(i,1);
					return true;
				}
			});
			//把最新的数据保存到本地中去
			localStorage.setItem('car',JSON.stringify(state.car));
		},
		updateGoodsSelected(state,info){
			state.car.some(item=>{
				if(item.id == info.id){
					item.selected = info.selected;
				}
			});
			//把最新的所有购物车商品的状态存到本地
			localStorage.setItem('car',JSON.stringify(state.car));
		}
	},
	getters:{
		//getters只负责对外提供数据，类似于过滤器，对数据进行一层包装，然后返回给调用者
		//getters和computed比较像，只要state中的数据发生了变化，那么，如果getters也引用了
		//这个数据，那么就会立即触发getters的重新求值；
		
		//购物车上的小徽标
		getAllCount(state){
			var c = 0;
			state.car.forEach(item=>{
				c += item.count;
			})
			return c;
		},
		getGoodsCount(state){
			var o = {};
			state.car.forEach(item=>{
				o[item.id] = item.count;
			})
			return o;
		},
		getGoodsSelected(state){
			var o = {}
			state.car.forEach(item=>{
				o[item.id] = item.selected;
			});
			return o;
		},
		getGoodsCountAndAmount(state){
			var p ={
				count:0,//勾选的数量
				amount:0 //勾选的总价
			};
			state.car.forEach(item=>{
				if(item.selected){
					o.count += item.count;
					o.amount += item.price * item.count;
				}
			});
			return o;
		}
	},
	actions:{
		
	}
})

//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)

//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattern)
})

//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)

//设置请求的根路径
Vue.http.options.root = 'http://vue.studyit.io';
//全局设置post时候表单数据格式组织形式 application/x-www-form-urlencode
Vue.http.options.emulateJSON = true;


//导入MUI的样式
import './lib/mui/css/mui.min.css'
// import './lib/mui/css/icons-extra.css'   //这个额外的样式引入失败
//和这个一起需要引入的还有 mui-icons-extra.ttf  没找到资源

//按需导入Mint-UI中的组件以及样式表
/* import { Header,Swipe,SwipeItem,Button,Lazyload } from 'mint-ui'
import 'mint-ui/lib/style.css'      //导入样式表
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload); */
import MintUI from 'mint-ui'		//为了实现懒加载效果
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//1.3 导入自己的 router.js路由模块
import router from './router.js'

//导入app根组件
import app from './App.vue'

var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router,  //1.4 挂载路由对象
	store,		//3.4 将vuex 创建的store挂载到VM实例上
})