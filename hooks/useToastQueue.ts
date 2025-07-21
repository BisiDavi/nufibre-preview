import { useEffect, useState } from "react";
import { ValueOrFunction, Renderable, Toast, useToasterStore } from "react-hot-toast";
import customToast from "@/utils/customToast";

type ToastArgs = { message: ValueOrFunction<Renderable, Toast> };

export const useToastQueue = () => {
	const MAX_CONCURRENT_TOASTS = 1;
	const DURATION = 1000;
	const [queue, setQueue] = useState<ToastArgs[]>([]);
	const [type, setType] = useState<"error" | "success" | "info">("success");
	const { toasts } = useToasterStore();

	const addToastToQueue = (message: ValueOrFunction<Renderable, Toast>, toastType: "success" | "info" | "error") => {
		setType(toastType);
		setQueue((prevQueue) => [...prevQueue, { message }]);
	};

	useEffect(() => {
		const availableSlots = MAX_CONCURRENT_TOASTS - toasts.length;
		if (availableSlots > 0 && queue.length >= 1) {
			const toastsToShow = queue.slice(0, availableSlots);

			setTimeout(() => {
				toastsToShow.forEach((toastItem) => {
					const toastMessage = toastItem.message as string;
					customToast[type](toastMessage, { duration: DURATION });
				});
				setQueue([]);
			}, 1); // break the race condition of useEffect
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queue, type]);

	return { addToastToQueue };
};
