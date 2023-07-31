import axios from "axios";

function baseUrl(url) {
	return "/api/video/" + url;
}

/**
 * 视频接口
 */
export function videoApiList(params = {}) {
	return axios.get(baseUrl("api"), {params});
}

/**
 * 视频列表
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function videoList(params = {}) {
	return axios.get(baseUrl("list"), {params});
}

/**
 * 视频详情
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function videoDetail(params = {}) {
	return axios.get(baseUrl("detail"), {params});
}

