import axios from "axios";

function baseUrl(url="") {
	return "/api/coupon/" + url;
}

/**
 * 激活码
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function couponStore(params = {}) {
	return axios.post(baseUrl(), params);
}

/**
 * 激活码使用记录
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export function couponLog(params = {}) {
	return axios.get(baseUrl("log"), {params});
}



