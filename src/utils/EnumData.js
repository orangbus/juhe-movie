const EnumData = {
	appName: "西安石油大学虚拟仿真实验",
	tokenLabel: "token",
	refreshTokenLabel: "refresh_token",
	userLabel: "user",
	authorizationLabel: "authorization",
	websiteLabel: "website",
	friendLabel: "friend",
	scoreLabel: "score",

	movieApiLabel: "movie_api",
	movieApiListLabel:"movie_api_list",

	videoApiLabel: "video_api",

	settingLabel: "setting",
	setting:{
		pageStyle:1, // 1
		playType: 1,
	},
	pageStyleList:[
		{type:1,name:"滚动加载"},
		{type:2,name:"分页加载"},
	],
	playTypeDialog: 2,
	playTypeList:[
		{type:1,name:"详情"},
		{type:2,name:"弹窗"},
	],

	movieGrid:{
		xl: 2, // 4K 和超宽屏幕
		lg: 2, // 桌面端
		md: 4, // 大型号平板到手提电脑
		sm: 4, // 小型号到中型号的平板
		xs: 4 // 小型号到大型号的手机
	},
	grid:{
		xl: 4,
		lg: 4,
		md: 4,
		sm: 12,
		xs: 12,
		offsetMd:4,
		offsetLg:4,
		offsetSm:0,
		offsetXl:4,
	}
}

export default EnumData;