import { ChangeEvent, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

import { BroadbandPath, sessionStoreKeys } from "@/utils/constants";
import SelectDropdown from "@/components/SelectDropdown";
import useDropdown from "@/hooks/useDropdown";
import { getItem, setItem } from "@/utils/sessionStore";
import { useToastQueue } from "@/hooks/useToastQueue";
import Button from "@/components/Button";
import SignupLayout from "@/layout/SignupLayout";
import accessHoc from "@/hocs/accessHoc";
import { useGetOTSProviders } from "@/hooks/useGetOTSProviders";

const addressDetails = { name: "currentProvider", label: "Enter or select provider" };
const options = ["Other", "I don't have one"];

type OTSProvidersType = Array<{ name: string; rcpid: string }>;

function ProviderCurrentPage() {
	const [currentProvider, setCurrentProvider] = useState("");
	const router = useRouter();
	const { data, isLoading } = useGetOTSProviders();
	const [OTSProviders, setOTSProviders] = useState<OTSProvidersType | []>([]);
	const { openDropdown, closeDropdown, dropdown } = useDropdown();
	const { addToastToQueue } = useToastQueue();

	useEffect(() => {
		const getProvidersList = getItem(sessionStoreKeys.getProvidersList);
		if (getProvidersList) {
			const providerList = JSON.parse(getProvidersList);
			setOTSProviders(providerList);
		}
	}, []);

	useEffect(() => {
		if (OTSProviders.length === 0 && data?.data?.length > 1) {
			const sortedProviders = data?.data?.sort((a, b) => a.name.localeCompare(b.name));
			const providers = sortedProviders.filter((item) => !item.name.toLowerCase().includes("earth broadband ltd"));
			setOTSProviders(providers);
		}
	}, [data]);

	function selectcurrentProvider(option: string) {
		setItem(sessionStoreKeys.currentProvider, option);
		setCurrentProvider(option);
		closeDropdown();
	}

	function continueHandler() {
		const currentProviderCheck = OTSProviders.filter((item) => item.name === currentProvider)[0];
		const optionCheck = options.filter((item) => item === currentProvider)[0];

		if (!(currentProviderCheck || optionCheck)) {
			return addToastToQueue("Please select your current provider from the list", "error");
		}

		return router.push(`/signup/provider-contract`);
	}

	function onChange(event: ChangeEvent<HTMLInputElement>) {
		setCurrentProvider(event.target.value);
	}

	const listOfProviders = currentProvider
		? OTSProviders.filter((item) => item.name.toLowerCase().includes(currentProvider.toLowerCase()))
		: OTSProviders;

	return (
		<SignupLayout>
			<Toaster />
			<div className="flex items-center h-full py-4  md:mx-auto flex-col w-full">
				<div className="flex flex-col mb-10 mt-1.5 w-full lg:w-3/5  md:items-center ">
					<div className="flex flex-col form-control text-center w-full lg:w-full">
						<h1 className="md:mt-0  text-white section_title mt-3 lg:text-[2.25rem] mb-4 md:mb-3 lg:leading-[60px] md:text-3xl text-[2rem] leading-[2.5rem] text-center items-start text-2xl font-bold ">
							Enter or select your current provider
						</h1>
						<p className="text-center text-white mb-3 md:mb-7 md:w-[70%] w-full mx-auto">
							We ask for your current provider because we will notify them after you place an order with us. If you don’t have a
							provider, please scroll to the bottom and select ‘I don’t have one’.
						</p>
						<div className="md:w-[511px] w-full flex flex-col md:mt-0 mt-3 mx-auto items-center justify-center">
							<SelectDropdown
								input={addressDetails}
								closeDropdown={closeDropdown}
								openDropdown={openDropdown}
								dropdown={dropdown}
								onChange={onChange}
								className="w-full !px-4"
								value={currentProvider}>
								{listOfProviders?.map((option, index) => (
									<div
										key={index}
										className="py-[16px] text-md cursor-pointer text-[#263320] text-left px-[16px]"
										onClick={() => selectcurrentProvider(option.name)}>
										{option.name}
									</div>
								))}
								{options.map((option, index) => (
									<div
										key={index}
										className="py-[16px] text-md cursor-pointer text-[#263320] text-left px-[16px]"
										onClick={() => selectcurrentProvider(option)}>
										{option}
									</div>
								))}
							</SelectDropdown>
						</div>

						<Button
							type="button"
							aria-label="continue"
							className="mt-2 mx-auto"
							onClick={continueHandler}
							// disabled={!currentProvider}
							text="Continue to next step"
						/>
					</div>
				</div>
			</div>
		</SignupLayout>
	);
}

export default accessHoc(ProviderCurrentPage);
