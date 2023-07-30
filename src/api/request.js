import axios from "axios";
import router from "../router/index.js";
import LocalStorage from "../utils/LocalStorage.js";
import EnumData from "../utils/EnumData.js";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;

axios.interceptors.request.use((config)=>{
	config.headers['Authorization'] = 'Bearer ' + LocalStorage.get(EnumData.tokenLabel);
	return config;
},(error)=>{
	return Promise.reject(error);
})

axios.interceptors.response.use((response)=>{
	const status = response.data.code;
	switch (status){
		case 200:
		case 202:
			return response.data;
			break;
		case 419:
			return router.push({path:"/login"})
			break;
	}
	return response;
},(error)=>{
	return Promise.reject(error);
})

export default axios;