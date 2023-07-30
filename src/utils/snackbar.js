import { useToast} from "vue-toastification"

const toast = useToast();

let snackbar ={
	msg:(msg="")=>{
		return toast(msg);
	},
	success:(msg="success")=>{
		return toast.success(msg);
	},
	info:(msg="提示")=>{
		return toast.info(msg);
	},
	warning:(msg="警告")=>{
		return toast.warning(msg);
	},
	error:(msg="error")=>{
		return toast.error(msg);
	}
}

export default snackbar;
