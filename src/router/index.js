import {createRouter, createWebHistory} from "vue-router";

const routes = [
	{
		path:"/",
		component:()=>import("../components/index/index.vue"),
		meta:{
			keepAlive: true,
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
	routes
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
