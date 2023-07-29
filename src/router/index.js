import {createRouter, createWebHistory} from "vue-router";

const routes = [
	{
		path:"/",
		name: "index",
		component:()=>import("../components/index/index.vue"),
		meta:{
			keepAlive: true,
			required: false,
			transition: 'slide-left' // 动画效果
		}
	},
	{
		path:"/search",
		name:"movieSearch",
		component:()=>import("../components/movie/search.vue"),
		meta:{
			keepAlive: true,
			required: false,
			transition: 'slide-left' // 动画效果
		}
	},
	{
		path:"/detail/:id",
		name:"movieDetail",
		component:()=>import("../components/movie/detail.vue"),
		meta:{
			keepAlive: false,
			required: false,
			transition: 'slide-left' // 动画效果
		}
	},

	{
		path:"/article",
		name:"article",
		component:()=>import("../components/article/index.vue"),
		meta:{
			keepAlive: true,
			required: false,
			transition: 'slide-left' // 动画效果
		}
	},
	{
		path:"/article/:id",
		name:"articleDetail",
		component:()=>import("../components/article/detail.vue"),
		meta:{
			keepAlive: false,
			required: false,
			transition: 'slide-left' // 动画效果
		}
	},

	{
		path:"/user",
		name:"user",
		component:()=>import("../components/user/index.vue"),
		meta:{
			keepAlive: false,
			required: false,
			transition: 'slide-left' // 动画效果
		}
	},

	{
		path:"/login",
		name: "login",
		component:()=>import("../components/login/index.vue"),
		meta:{
			keepAlive: true,
			required: false,
			transition: 'slide-bottom' // 动画效果
		}
	}
];

const router = createRouter({
	history:createWebHistory(),
	routes,
	scrollBehavior(to,from,savePosition){
		return savePosition ? savePosition : {top:0};
	}
});

router.beforeEach(async (to,from,next)=>{
	if (to.meta.required){
		next({
			name:"login"
		});
	}
	next();
})

export default router;
