<template>
<div class="shopcar-container">
	<!-- 商品列表项 -->
	<div class="goods-list">
		<div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<!-- 选择按钮 -->
					<mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
					@change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
					<!-- 商品图片 -->
					<img src="../../images/menu1.png">
					
					<!-- 上下盒子 -->
					<div class="info">
						<h1>{{item.title}}</h1>
						<p>
							<span class="price">￥{{item.sell_price}}</span>
							<numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id">
								
							</numbox>
							<!-- 问题：如何从购物车中获取商品的数量呢 -->
							<!-- 1，创建一个空对象，然后循环购物车中数据，把当前循环的这条商品
							 的id，作为对象的属性，count值作为对象的属性值
							 2，这样当循环结束后，就有了一个对象{id:count，id:count}-->
							<a href="#" @click.prevent="remove(item.id,i)">删除</a>
						</p>
					</div>
					
				</div>
			</div>
		</div>
	</div>
	<!-- 结算区域 -->
	<div class="goods-list">
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
					<!-- 结算区域 -->
					<div class="left">
						<p>总计(不含运费)</p>
						<p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，
						总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span>
						</p>
					</div>
					<mt-button type="danger">去结算</mt-button>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'

export default{
	data(){
		return{
			goodslist:[] //购物车中所有商品的数据
		};
	},
	created() {
		this.getGoodsList();
	},
	methods:{
		getGoodsList(){
			//1，获取store中所有商品的id，然后拼接处一个用逗号分隔的字符串
			var idArr = [];
			this.$store.state.car.forEach(item=>idArr.push(item.id));
			//如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
			if(idArr.length <= 0)
			{
				return ;
			}
			//获取购物车商品列表
			this.$http.get("api/goods/getshopcarlist/"+idArr.join(","))
			.then(result=>{
				if(result.body.status === 0)
				{
					this.goodslist = result.body.message;
				}
			});
		},
		remove(id,index){
			//点击删除，把商品从store中根据传递的id删除，同时，把当前组件中的goodslist中
			//对应要删除的那个商品，使用index来删除
			this.goodslist.splice(index,1);
			//调用mutation中的数据，删除本地存储中的数据
			this.$store.commit("removeFormCar",id);
		},
		selectedChanged(id,val){
			//没当点击开关，把最新的开关状态同步到store中
			this.$store.commit('updateGoodsSelected',{id,selected:val});
		}
	},
	components:{
		numbox
	}
}
</script>

<style lang="scss" scoped>
.shopcar-container{
	background-color: #eee;
	overflow: hidden;
	
	.goods-list{
		.mui-card-content-inner{
			display: flex;
			align-items: center;
		}
		img{
			width: 60px;
			height: 60px;
		}
		h1{
			font-size: 14px;
		}
		.info{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.price{
				color:red;
				font-weight: bold;
			}
		}
	}
	.jiesuan{
		display: flex;
		justify-content: space-between;
		align-items:center;
		.red{
			color:red;
			font-weight: bold;
			font-size: 16px;
		}
	}
}
</style>