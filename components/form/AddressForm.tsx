import React, { useState } from "react";
import { useRouter } from "next/router";
import { APIAddressResponse, IAddress } from "@earthbroadband_team/shared-types";
import { XCircleIcon } from "lucide-react";
import { isValid } from "postcode";
import { nanoid } from "nanoid";

import RightIcon from "@/public/icons/RightIcon";
import Button from "@/components/Button";
import { useFetchAddress } from "@/hooks/useFetchAddress";
import { useToastQueue } from "@/hooks/useToastQueue";
import customToast from "@/utils/customToast";
import { setItem } from "@/utils/sessionStore";
import { sessionStoreKeys } from "@/utils/constants";
import axios from "@/utils/axios.config";
import Spinner from "@/components/Spinner";
import { formatAddress } from "@/utils/address";

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
} as IAddress;

type ISelectedAddress = APIAddressResponse["address"] & Pick<APIAddressResponse, "uprn">;

export default function AddressForm() {
	const [postCode, setPostCode] = useState("");
	const { data, isLoading } = useFetchAddress(postCode);
	const { addToastToQueue } = useToastQueue();
	const router = useRouter();

	const isValidPostCode = isValid(postCode.trim());

	// Address selection state
	const [selectedAddress, setSelectedAddress] = useState<IAddress>(initalAddressState);
	const [selectedLongAddress, setSelectedLongAddress] = useState("");
	const [selectedShortAddress, setSelectedShortAddress] = useState("");
	const [isSelectedAddress, setIsSelectedAddress] = useState(false);
	const [addressIdDetails, setAddressIdDetails] = useState({
		galk: "",
		districtCode: "",
		uprn: "",
	});

	/**
	 * @description handle select address function
	 */
	function handleSelectAddress(selected_address: IAddress, longAddress: string, shortAddress: string) {
		const addressIdArr = selected_address?.addressId?.split("|");

		// check for addressId validity
		if (!Array.isArray(addressIdArr) || addressIdArr?.length === 0) {
			router.push("/address-not-available");
			return;
		}

		// check qualifier
		if (addressIdArr[0] !== "Gold") {
			router.push("/address-not-available");
			return;
		}

		// check address id
		if (!addressIdArr[1]) {
			router.push("/address-not-available");
			return;
		}

		// update state
		setSelectedAddress(selected_address);
		setSelectedLongAddress(longAddress);
		setSelectedShortAddress(shortAddress);
		setIsSelectedAddress(true);
		setAddressIdDetails({
			galk: addressIdArr[1] || "",
			districtCode: addressIdArr[2] || "",
			uprn: selected_address?.uprn ?? "",
		});
	}

	/**
	 * @description handle change address
	 */
	function changeSelectedAddress() {
		setSelectedAddress(initalAddressState);
		setSelectedLongAddress("");
		setSelectedShortAddress("");
		setIsSelectedAddress(false);
		return;
	}

	//init handleNext function
	async function handleNext() {
		try {
			const __selectedAddress = selectedAddress;

			// check if isSelectedAddress
			if (!isSelectedAddress) {
				customToast.error("Please select your address to continue");
				return;
			}

			if (!__selectedAddress || Object?.keys(__selectedAddress)?.length === 0) {
				customToast.error("Please select your address to continue");
				return;
			}

			const __address = JSON.stringify(__selectedAddress);

			// save selected address in session store
			setItem(sessionStoreKeys.shortAddress, selectedShortAddress);
			setItem(sessionStoreKeys.longAddress, selectedLongAddress);
			setItem(sessionStoreKeys.addressId, __selectedAddress?.addressId ?? "");
			setItem(sessionStoreKeys.postcode, __selectedAddress?.postCode ?? "");
			setItem(sessionStoreKeys.address, __address);

			return;
		} catch (error) {
			console.error("Error fetching address:", error);
			customToast.error("Failed to get address information");
			window.location.replace("/address-not-available");
			return;
		}
	}

	// continue handler function
	function continueHandler() {
		const __postcode = postCode && typeof postCode === "string" ? postCode?.trim() : "";

		if (!__postcode) {
			addToastToQueue("Please enter your postcode", "error");
			return;
		}
		if (!isValid(__postcode)) {
			addToastToQueue("Please enter a correct postcode", "error");
			return;
		}

		if (!isSelectedAddress) {
			addToastToQueue("Please select your address to continue", "error");
			return;
		}

		const accessId = nanoid();

		setItem(sessionStoreKeys.accessId, accessId);

		handleNext();

		prefetchBroadbandAvailability();

		router.push(`/signup/current-address?location=${selectedShortAddress}`);
		return;
	}

	/**
	 * @description Prefetch broadband availabilty
	 * @returns
	 */
	const prefetchBroadbandAvailability = async () => {
		try {
			const { galk = "", uprn = "", districtCode = "" } = addressIdDetails;

			let APIEndpoint = `${process.env.NEXT_PUBLIC_API_ROOT}/broadband/availability/?districtCode=${districtCode}`;

			if (galk) {
				APIEndpoint = `${APIEndpoint}&addressId=${galk}`;
			}

			if (galk) {
				APIEndpoint = `${APIEndpoint}&uprn=${uprn}`;
			}

			// request
			await axios.get(APIEndpoint);

			return true;
		} catch (error) {
			console.log("ERROR", error);
			return false;
		}
	};

	function getStartedHandler() {
		if (!postCode) {
			return addToastToQueue("Please enter your postcode", "error");
		}

		const __postcode = postCode && typeof postCode === "string" ? postCode?.trim() : "";

		if (!isValid(__postcode)) {
			addToastToQueue("Please enter a correct postcode", "error");
		}
	}

	return (
		<div>
			{!isSelectedAddress ? (
				<>
					<div className="bg-white mt-10 w-full md:w-[85%] flex rounded-[10px] h-[70px] justify-between items-center pr-3 pl-5 ">
						<input
							placeholder="Enter Postcode"
							onChange={(e) => setPostCode(e.target.value)}
							value={postCode}
							className="focus:outline-none capitalize w-full md:w-[80%] text-[#5E5E5E] placeholder-[#5E5E5E] py-4 text-[16px] font-[500] w-ful h-full"
						/>

						{isLoading ? (
							<div className="bg-[#00E3EC] button cursor-pointer text-[16px] flex items-center justify-center font-[600] text-[#0f0f0f] rounded-[8px] h-[48px] px-4">
								<Spinner size={30} />
							</div>
						) : isValidPostCode ? (
							<></>
						) : (
							<Button
								onClick={getStartedHandler}
								textClassName="hidden md:block"
								text="Get started"
								className="whitespace-nowrap flex items-center gap-2">
								<RightIcon />
							</Button>
						)}
					</div>
					{!isSelectedAddress && (
						<div className="mx-0">
							{!postCode ? (
								<span className=""></span>
							) : (
								<>
									{!data ? (
										<span className="block text-left">
											<h3 className="text-md text-gray-500 px-6"></h3>
										</span>
									) : (
										<div className="-mt-4 pt-4 bg-white w-[85%] rounded-b-[10px]">
											{data && Array.isArray(data) ? (
												<div className="address_list w-[100%] flex flex-col space-y-4 max-h-64 pt-0 overflow-y-auto bg-white rounded-b-[10px]">
													{data?.length > 0 ? (
														data?.map((d, index) => {
															const __address = {
																...(d?.address ?? {}),
																uprn: d?.uprn ?? "",
															} as ISelectedAddress;
															const { longAddress, shortAddress, address: formattedAddress } = formatAddress(__address);
															return (
																<button
																	key={index}
																	type="button"
																	className="block  text-left cursor-pointer"
																	onClick={() => handleSelectAddress(formattedAddress, longAddress, shortAddress)}>
																	<h3 className="text-[16px] text-[#5E5E5E] px-4">{longAddress}</h3>
																</button>
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
										</div>
									)}
								</>
							)}
						</div>
					)}
				</>
			) : (
				<div className="bg-white mt-10 w-full md:w-[85%] flex rounded-[10px] h-[70px] justify-between items-center pr-3 pl-5 ">
					<div className="text-[#5E5E5E] text-[16px]">{selectedLongAddress}</div>
					<button onClick={changeSelectedAddress} className="flex items-center cursor-pointer">
						<XCircleIcon />
					</button>
					<Button onClick={continueHandler} textClassName="hidden md:block" text="" className="whitespace-nowrap flex items-center gap-2">
						<RightIcon />
					</Button>
				</div>
			)}
		</div>
	);
}
