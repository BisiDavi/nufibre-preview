import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

import SelectDropdown from "@/components/SelectDropdown";
import useDropdown from "@/hooks/useDropdown";
import { setItem } from "@/utils/sessionStore";
import { useToastQueue } from "@/hooks/useToastQueue";
import Button from "@/components/Button";
import { sessionStoreKeys } from "@/utils/constants";
import accessHoc from "@/hocs/accessHoc";
import SignupLayout from "@/layout/SignupLayout";

const addressDetails = { name: "currentProviderContract", label: "Select your answer" };
const options = ["Yes, still in contract", "No, out of contract", "Not sure"];

function ProviderContractPage() {
	const [currentProviderContract, setCurrentProviderContract] = useState("");
	const { openDropdown, closeDropdown, dropdown } = useDropdown();
	const { addToastToQueue } = useToastQueue();
	const router = useRouter();

	function selectcurrentProvider(option: string) {
		setItem(sessionStoreKeys.currentProviderContract, option);
		setCurrentProviderContract(option);
		closeDropdown();
	}

	function continueHandler() {
		if (!currentProviderContract) {
			return addToastToQueue("Please select current provider contract status", "error");
		}
		router.push(`/signup/broadband/customer-details`);
	}

	return (
		<SignupLayout>
			<Toaster />
			<div className="flex items-center py-4 h-full  md:mx-auto flex-col w-full">
				<div className="flex flex-col mb-10 mt-1.5 w-full lg:w-4/5  md:items-center ">
					<div className="flex flex-col form-control text-center w-full lg:w-full">
						<h1 className="md:mt-0 text-white section_title mt-3 lg:text-[2.25rem] mb-3 lg:mb-4 md:mb-5 lg:leading-[60px] md:text-3xl text-[2rem] leading-[2.5rem] text-center items-start text-2xl font-bold ">
							Are you in contract?
						</h1>
						<div className="md:w-[511px] w-full flex flex-col md:mt-0  mt-3 mx-auto items-center justify-center">
							<SelectDropdown
								input={addressDetails}
								closeDropdown={closeDropdown}
								openDropdown={openDropdown}
								dropdown={dropdown}
								className="w-full !px-4"
								value={currentProviderContract}>
								{options.map((option, index) => (
									<div
										key={index}
										className="py-[16px] text-md cursor-pointer text-[#263320] text-left px-[16px]"
										onClick={() => selectcurrentProvider(option)}>
										{option}
									</div>
								))}
							</SelectDropdown>
							<Button
								type="button"
								aria-label="continue"
								className="mt-2"
								onClick={continueHandler}
								// disabled={!currentProviderContract}
								text="Continue to next step"
							/>
						</div>
					</div>
				</div>
			</div>
		</SignupLayout>
	);
}

export default accessHoc(ProviderContractPage);
