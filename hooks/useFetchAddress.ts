// @ts-check
// swr
import useSWR from "swr";

//postcode
import { isValid } from "postcode";

// axios
import axios from "@/utils/axios.config";
import { APIAddressResponse } from "@earthbroadband_team/shared-types";

/**
 * @description init Fetcher function
 * @param {string} url
 * @returns
 */
export const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

export const useFetchAddress = (__postcode: string | null) => {
	//invoke useSwr
	const postcode = __postcode && typeof __postcode === "string" ? __postcode?.trim() : "";
	const isValidPostCode = isValid(postcode);

	const { data, error } = useSWR(() => {
		return postcode && isValidPostCode ? `${process.env.NEXT_PUBLIC_API_ROOT}/search/address/${postcode?.trim()}` : null;
	}, fetcher);

	// return
	return {
		data: data as APIAddressResponse[],
		isLoading: !error && !data && isValidPostCode,
		isError: error,
	};
};
