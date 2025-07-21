/**
 * @description Set data to session storage
 */
export function setItem(key: string, value: string) {
	try {
		// save to session storage
		sessionStorage.setItem(key, value);
	} catch (error: any) {
		console.log(error);
		throw new Error(error.message);
	}
}

/**
 * @description get data from session storage
 */
export function getItem(key: string) {
	try {
		// get data
		const data = sessionStorage.getItem(key);

		// return
		return data as string;
	} catch (error: any) {
		console.log(error);
		throw new Error(error.message);
	}
}

/**
 * @description delete data from session storage
 */
export function deleteItem(key: string) {
	try {
		// delete item
		sessionStorage.removeItem(key);
	} catch (error: any) {
		console.log(error);
		throw new Error(error.message);
	}
}

/**
 * @description clear all items from session storage
 */
export function clearItems() {
	try {
		// clear all items from session storage
		sessionStorage.clear();
	} catch (error: any) {
		console.log(error);
		throw new Error(error.message);
	}
}
