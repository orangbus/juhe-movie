import {useToast} from "vue-toastification"

const toast = useToast();

let snackbar = {
	msg: (msg = "") => {
		return toast(msg);
	},
	success: (msg = "success") => {
		return toast(msg);
	},
	info: (msg = "提示") => {
		return toast.info(msg);
	},
	warning: (msg = "警告") => {
		return toast.warning(msg);
	},
	error: (msg = "error") => {
		return toast.error(msg);
	},
	resultMsg(code = 200,msg="success") {
		return code === 200 ? toast(msg) : toast.error(msg);
	}
}

export default snackbar;
