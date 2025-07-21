import { useRouter } from "next/router";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

import Button from "@/components/Button";
import SelectDropdown from "@/components/SelectDropdown";
import useDropdown from "@/hooks/useDropdown";
import { useToastQueue } from "@/hooks/useToastQueue";
import SignupLayout from "@/layout/SignupLayout";
import { sessionStoreKeys } from "@/utils/constants";
import { getItem } from "@/utils/sessionStore";
import accessHoc from "@/hocs/accessHoc";

type addressDurationType = "LESS_THAN_3_YEARS" | "MORE_THAN_3_YEARS" | null;
const addressDetails = { name: "addressDuration", label: "Select duration" };

function CurrentAddressPage() {
	const [addressDurationLabel, setAddressDurationLabel] = useState("");
	const [addressDuration, setAddressDuration] = useState<addressDurationType>(null);
	const router = useRouter();
	const currentAddress = `${router.query["location"]}`.replace(",", "");
	const { openDropdown, closeDropdown, dropdown } = useDropdown();
	const { addToastToQueue } = useToastQueue();

	function selectAddressDuration(duration: addressDurationType, durationLabel: string) {
		setAddressDuration(duration);
		setAddressDurationLabel(durationLabel);
		closeDropdown();
	}

	function continueHandler() {
		if (!addressDuration) {
			return addToastToQueue("Please select duration", "error");
		}
		const _previousAddress = getItem(sessionStoreKeys.previousAddress);
		const previousAddress = _previousAddress ? JSON.parse(_previousAddress) : "";
		if (addressDuration === "LESS_THAN_3_YEARS" && (previousAddress?.length < 3 || previousAddress === null)) {
			return router.push("/signup/previous-address");
		}

		if (previousAddress?.length >= 3) {
			return router.push(`/signup/current-provider`);
		}

		return router.push(`/signup/current-provider`);
	}

	return (
		<SignupLayout>
			<section className="w-full lg:w-3/5 py-10 mx-auto">
				<h1 className="mb-4 text-[#fff] justify-center text-center md:mb-4 md:mt-0 mt-3 flex items-center mx-auto md:gap-3 section_title lg:text-[2.25rem] lg:leading-[60px] md:text-3xl text-[2rem] leading-[2.5rem] text-center items-star text-2xl font-bold ">
					Duration at {currentAddress} ?
				</h1>
				<div className="md:w-[511px] w-full flex flex-col md:mt-0 mt-2 mx-auto items-center justify-center">
					<SelectDropdown
						input={addressDetails}
						closeDropdown={closeDropdown}
						openDropdown={openDropdown}
						dropdown={dropdown}
						className="w-full !px-4"
						value={addressDurationLabel}>
						<div
							className="py-[16px] text-md cursor-pointer text-[#263320] text-left px-[16px]"
							onClick={() => selectAddressDuration("LESS_THAN_3_YEARS", "Less than 3 years")}>
							Less than 3 years
						</div>
						<div
							className="py-[16px] text-md cursor-pointer text-[#263320] text-left px-[16px]"
							onClick={() => selectAddressDuration("MORE_THAN_3_YEARS", "More than 3 years")}>
							More than 3 years
						</div>
					</SelectDropdown>
					<Button
						type="button"
						aria-label="continue"
						className="mt-2"
						onClick={continueHandler}
						// disabled={!addressDuration}
						text="Continue to next step"
					/>
				</div>
			</section>
			<Toaster />
		</SignupLayout>
	);
}

export default accessHoc(CurrentAddressPage);