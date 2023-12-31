import axios from "axios";

// const app_debug = process.env.VUE_APP_DEBUG;

function baseUrl(url="") {
	return "/api/article/" + url;
}

/**
 * 文章列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function articleList(params = {}) {
	return axios.get(baseUrl("list"), {params});
}

export function articleDetail(id=0) {
	return axios.get(baseUrl("detail/"+id) );
}

/**
 * 分类
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function articleCate(params = {}) {
	return axios.get(baseUrl("cate"), params);
}



