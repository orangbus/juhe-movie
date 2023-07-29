/**
 * 滚动加载
 * @param e
 */
export function handleScroll (callback) {
	// 获取滚动位置
	const scrollTop =
			window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	// 获取可视区域高度
	const clientHeight = window.innerHeight || document.documentElement.clientHeight;
	// 获取页面内容的高度
	const scrollHeight = document.documentElement.scrollHeight;
	// 判断是否滚动到页面底部（偏移值设为 50px）
	if (scrollHeight - (scrollTop + clientHeight) < 50) {
		callback();
	}
}