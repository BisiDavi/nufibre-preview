//@ts-check
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import parseJson from "parse-json";
import { APIAddressResponse, IAddress } from '@earthbroadband_team/shared-types'
import { isValid } from "postcode";

import customToast from "@/utils/customToast";
import { getItem, setItem } from "@/utils/sessionStore";
import { useFetchAddress } from "@/hooks/useFetchAddress";
import Spinner from "@/components/Spinner";
import { sessionStoreKeys } from "@/utils/constants";
import { useToastQueue } from "@/hooks/useToastQueue";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { formatAddress } from "@/utils/address";

const inputDetails = {
	type: "text",
	label: "Enter your postcode",
	name: "postCode",
};

export type ISelectedAddress = APIAddressResponse['address'] & Pick<APIAddressResponse, 'uprn'>


export default function PreviousAddressForm() {
	const router = useRouter();
	const postcode = `${router.query.postcode}`;
	const [postCode, setPostCode] = useState("");
	const { data, isLoading } = useFetchAddress(postCode);
	const { addToastToQueue } = useToastQueue();

	useEffect(() => {
		if (postcode && router.query?.postcode) {
			setPostCode(postcode);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const initalAddressState = {
		addressId: "",
		buildingName: "",
		buildingNumber: "",
		county: "",
		dependentLocality: "",
		organizationName: "",
		postCode: "",
		postTown: "",
		street: "",
		subBuilding: "",
		thoroughfareName: "",
		uprn: "",
	} as IAddress


	//Address selection state
	const [selectedAddress, setSelectedAddress] = useState<IAddress>(initalAddressState);
	const [selectedLongAddress, setSelectedLongAddress] = useState('')
	const [selectedShortAddress, setSelectedShortAddress] = useState('')
	const [isSelectedAddress, setIsSelectedAddress] = useState(false);

	/**
	 * @description handle select address function
	 * @param {ISelectedAddress} selected_address
	 */
	function handleSelectAddress(selected_address: IAddress, longAddress: string, shortAddress: string) {
		const addressIdArr = selected_address?.addressId?.split('|')


		// check for addressId validity
		if (!Array.isArray(addressIdArr) || addressIdArr?.length === 0) {
			router.push("/address-not-available");
			return
		}

		// check qualifier
		if (addressIdArr[0] !== 'Gold') {
			router.push("/address-not-available");
			return
		}

		// check address id
		if (!addressIdArr[1]) {
			router.push("/address-not-available");
			return
		}


		// update state
		setSelectedAddress(selected_address);
		setSelectedLongAddress(longAddress)
		setSelectedShortAddress(shortAddress)
		setIsSelectedAddress(true);

	}

	/**
		 * @description handle change address
		 */
	function changeSelectedAddress() {
		setSelectedAddress(initalAddressState);
		setSelectedLongAddress('')
		setSelectedShortAddress('')
		setIsSelectedAddress(false);
		return
	}




	//init handleNext function
	async function handleNext() {
		try {
			const __selectedAddress = selectedAddress

			// check if isSelectedAddress
			if (!isSelectedAddress) {
				customToast.error("Please select your address to continue");
				return
			}

			if (!__selectedAddress || Object?.keys(__selectedAddress)?.length === 0) {
				customToast.error("Please select your address to continue");
				return
			}



			// save prev address state
			const previousAddressSessionData = getItem(sessionStoreKeys.previousAddress);
			const parseAllPreviousAddress: any = previousAddressSessionData ? parseJson(previousAddressSessionData) : null;
			const previousAddress = Array.isArray(parseAllPreviousAddress) && parseAllPreviousAddress?.length > 0 ? [...parseAllPreviousAddress, __selectedAddress] : [__selectedAddress];
			setItem(sessionStoreKeys.previousAddress, JSON.stringify(previousAddress));

			return
		} catch (error) {
			console.log(error);
			customToast.error("Error, Failed to get address");
			return
		}
	}

	const btnClassname = isLoading && postCode ? "mt-0" : "mt-8";


	/**
	 * @description Continue to next section
	 * @returns 
	 */
	function continueHandler() {

		const __postcode = postCode && typeof postCode === 'string' ? postCode?.trim() : ""

		if (!__postcode) {
			addToastToQueue("Please enter your postcode", "error");
			return
		}
		if (!isValid(__postcode)) {
			addToastToQueue("Please enter a correct postcode", "error");
			return
		}

		if (!isSelectedAddress) {
			addToastToQueue("Please select your address to continue", "error");
			return
		}


		handleNext();

		router.push(`/signup/current-address?location=${selectedShortAddress}`);

		return
	}

	const disableContinueButtonStyle = isSelectedAddress
		? "bg-MainGreen !w-[200px] hover:bg-[#000] search-btn btn btn-square px-4 py-3 btn-primary text-md font-bold  text-white transition-colors duration-200 transform rounded-[6px] focus:outline-none"
		: "bg-MainGreen hover:bg-[#000] !w-[200px] py-3 px-4 text-md font-bold text-white transition-colors duration-200 transform rounded-[6px] focus:outline-none disabled:text-white";

	return (
		<div className="w-full">
			{!isSelectedAddress ? (
				<>
					<Input input={inputDetails} onChange={(event) => setPostCode(event.target.value)} value={postCode} />

					{/* Address List container */}
					<div className="mx-0">
						{!postCode ? (
							<span className=""></span>
						) : (
							<>
								{isLoading ? (
									<div className="flex items-center justify-center align-center py-8">
										<Spinner />
									</div>
								) : (
									<>
										{!data ? (
											<span className="block text-left">
												<h3 className="text-md text-gray-500 px-6"></h3>
											</span>
										) : (
											<>
												{data && Array.isArray(data) ? (
													<div className="border-2 border-[#000] text-[#263320] mt-4 max-h-64 py-3 overflow-y-auto rounded-[6px]  bg-white">
														{data?.length > 0 ? (
															data?.map((d, index) => {
																const __address = { ...d?.address ?? {}, uprn: d?.uprn ?? '' } as ISelectedAddress
																const { longAddress, shortAddress, address: formattedAddress } = formatAddress(__address)
																return (
																	<div key={index}>
																		<a
																			className="block py-4 text-left cursor-pointer"
																			onClick={() => handleSelectAddress(formattedAddress, longAddress, shortAddress)}>
																			<h3 className="text-md text-[#263320] px-4">{longAddress}</h3>
																		</a>
																	</div>
																);
															})
														) : (
															<p className="px-3">No available address for this postcode</p>
														)}
													</div>
												) : (
													<>
														<span className="block text-left">
															<h3 className="text-md text-gray-500 px-6"></h3>
														</span>
													</>
												)}
											</>
										)}
									</>
								)}
							</>
						)}
					</div>
				</>
			) : (
				<>
					<div className="mx-0">
						<div className=" w-full py-4 pl-[12px] pr-4 border border-2 border-[#000]  text-[#263320] bg-white rounded-[6px] focus:focus:border-green-200 focus:ring-green-200 focus:outline-none">
							<button className="flex text-left items-center justify-between w-full">
								<h1 className="text-md md:text-md text-[#263320]">
									{selectedLongAddress || "Null"}
								</h1>
								<h3 className="text-md font-bold text-MainGreen primary-colo cursor-pointer" onClick={changeSelectedAddress}>
									Change
								</h3>
							</button>
						</div>
					</div>
				</>
			)}

			{/* Continue button */}
			<div className={` flex ${btnClassname} justify-center`}>
				<Button type="button" aria-label="continue" onClick={continueHandler} text="Continue to next step" />
			</div>
		</div>
	);
}
