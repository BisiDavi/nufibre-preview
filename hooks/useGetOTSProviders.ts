import useSWR from "swr";
import axios from "@/utils/axios.config";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

/**
 * Fetch OTS Providers
 * @returns
 */
export function useGetOTSProviders() {
	//invoke useSwr
	const { data, error } = useSWR(() => `${process.env.NEXT_PUBLIC_API_ROOT}/ots/providers`, fetcher);
	// return
	const result: { data: { data: Array<{ name: string; rcpid: string }> }; isLoading: boolean; isError: boolean } = {
		data: data,
		isLoading: !error && !data,
		isError: !!error,
	};
	return result;
}
