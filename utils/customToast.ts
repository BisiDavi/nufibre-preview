import { toast } from "react-hot-toast";

type toastOptionsType = {[key:string]: string| number}

function error(message: string, toastOptions?:toastOptionsType) {
    return toast(message, {
		style: {
			...toastOptions,
			maxWidth: "100%",
			fontWeight: 500,
			border: "none",
			backgroundColor: "#F29B9B",
			color: "#263320",
			padding: "10px 8px",
			boxShadow: "none",
		},
	});
}

function info(message: string, toastOptions?: toastOptionsType, config?: {duration: number}) {
    return toast(message, {
		...config,
		style: {
			maxWidth: "100%",
			...toastOptions,
			fontWeight: 500,
			backgroundColor: "#B5F29B",
			border: "none",
			color: "##263320",
			padding: "10px 8px",
			boxShadow: "none",
		},
	});
}

function success(message: string, toastOptions?:toastOptionsType) {
    return toast(message, {
		style: {
			...toastOptions,
			maxWidth: "100%",
			fontWeight: 500,
			backgroundColor: "#B5F29B",
			border: "none",
			color: "##263320",
			padding: "10px 8px",
			boxShadow: "none",
		},
	});
}

const customToast = { error, success, info };

export default customToast;
