<template>
	<!-- 问题：因为max在父组件上绑定的值是通过异步方式获取的，所以在刚开始渲染的
	 时候，拿到的是undefined，所以使用watch来监听父组件传递的max值，最后一次watch
	 改变的时候，就是我们要的数值   :data-numbox-max='max' 使用setOption的话就不需要这个了-->
	<div class="mui-numbox" data-numbox-min="1">
		<button class="muibtn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-btn-numbox-plus" type="number" value="1"
		@change="countChanged" ref="numbox">
		<button class="muibtn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
//导入mui
import mui from "../../lib/mui/js/mui.min.js"

export default{
	mounted() {
		//初始化数字选择框组件
		mui(".mui-numbox").numbox();
	},
	methods:{
		countChanged(){
			//每当文本框的数据被修改的时候，立即把最新的数据，通过事件调用传递给父组件
			// console.log(this.$refs.numbox.value);
			this.$emit("getcount",parseInt(this.$refs.numbox.value));
		}
	},
	props:["max"],
	watch:{
		//属性监听
		max:function(newVal,oldVal){
			//使用js api 设置numbox 的最大值
			mui(".mui-numbox")
			.numbox()
			.setOptions("max",newVal);
		}
	}
}
</script>

<style lang="scss" scoped="scoped">

</style>
