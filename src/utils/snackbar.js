import { useToast} from "vue-toastification"

const toast = useToast();

let snackbar ={
	msg:(msg="")=>{
		return toast(msg);
	},
	success:(msg="success")=>{
		return toast(msg);
	},
	error:(msg="error")=>{
		return toast.error(msg);
	}
}

export default snackbar;
