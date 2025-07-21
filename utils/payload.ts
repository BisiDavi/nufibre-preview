//@ts-check
// session storage
import { getItem } from "@/utils/sessionStore";

// constants
import { FTTCPlan, sessionStoreKeys, contractTypes } from "@/utils/constants";

// normalize
import { normalizeName, normalizeWhiteSpaces, normalizeDiacritics } from "normalize-text";

import emojiStrip from "emoji-strip";

// parse json
import parseJson from "parse-json";

import {
	Payload,
	PersonalDetailsType,
	BankDetailsType,
	BroadbandPackagesType,
	IServiceTypes,
	IFormattedAddress,
	LeadPayload,
} from "@/types/types";

import { IAddress } from "@earthbroadband_team/shared-types";

// date fns
import { addHours } from "date-fns";

/**
 * @description Generate required data (payload) to submit via POST request at end of journey
 */
export async function generatePayload() {
	try {
		// get required data
		const accessId = getItem(sessionStoreKeys.accessId); //
		const planReferenceCode = getItem(sessionStoreKeys.planReferenceCode);
		const postcode = getItem(sessionStoreKeys.postcode); //
		const longAddress = getItem(sessionStoreKeys.longAddress); //
		const shortAddress = getItem(sessionStoreKeys.shortAddress); //
		const _address = getItem(sessionStoreKeys.address); //  need parsing
		const addressId = getItem(sessionStoreKeys.addressId); //
		const _selectedPlanType = getItem(sessionStoreKeys.selectedPlanType); // need parsing

		const _selectPlanSpeeds = getItem(sessionStoreKeys.selectedPlanSpeeds); // need parsing

		const selectedPlanName = getItem(sessionStoreKeys.selectedPlanName); //
		const selectedPlanPrice = getItem(sessionStoreKeys.selectedPlanPrice) || FTTCPlan.price; //
		const selectedDiscountPrice = getItem(sessionStoreKeys.selectedDiscountPrice) || FTTCPlan.discountPrice; //
		const serviceName = getItem(sessionStoreKeys.serviceName); //
		const servicePrice = getItem(sessionStoreKeys.servicePrice); //
		const contractType = getItem(sessionStoreKeys.contractType); //
		const existingLandlineNumber = getItem(sessionStoreKeys.existingLandLineNumber);

		const _personalDetails = getItem(sessionStoreKeys.personalDetails);

		// get date of birth
		const dateOfBirth = getItem(sessionStoreKeys.dateOfBirth);

		const _bankDetails = getItem(sessionStoreKeys.bankDetails);
		// const existingLandlineNumber = getItem(sessionStoreKeys.landLineNumber);
		const partner = getItem(sessionStoreKeys.partner);

		const directDebitDate = getItem(sessionStoreKeys.directDebitDate);

		const accessLineId = getItem(sessionStoreKeys.accessLineId);

		const _charges = getItem(sessionStoreKeys.charges); // need parsing

		// packages
		const _packages = getItem(sessionStoreKeys.packages); // need parsing

		//  managed install + connection charge
		// REASON FOR COMMENT:: Talk Talk handles managed install charge for free, hence no need to charge customers
		// const _managedInstallCharge =
		//   !isNaN(Number(workingLineQty)) && Number(workingLineQty) === 0
		//     ? Number(managedInstallCharge / 24).toFixed(2)
		//     : 0;

		// parse direct debit date
		const parsedDirectDebitDate = JSON.parse(directDebitDate);

		// format direct debit date
		const _directDebitDate = new Date(parsedDirectDebitDate);

		// set hours
		_directDebitDate.setHours(17);

		// ====== PARSE ADDRESS ========
		const $address = parseJson(_address);
		const address = { ...$address } as unknown as IAddress;

		// ===== PARSE PERSONAL DETAILS ========
		const $personalDetails = parseJson(_personalDetails);
		const personalDetails = {
			...$personalDetails,
		} as unknown as PersonalDetailsType & { companyName: string };

		// ===== PARSE BANK DETAILS ========
		const $bankDetails = parseJson(_bankDetails);
		const bankDetails = { ...$bankDetails } as unknown as BankDetailsType;

		// ==== PARSE SELECTED PLAN =======
		const $selectedPlanType = parseJson(_selectedPlanType);
		const $selectedPlanSpeed = parseJson(_selectPlanSpeeds);

		let planMetaData = { };

		if($selectedPlanSpeed && $selectedPlanType) {
			planMetaData = {...$selectedPlanType, ...$selectedPlanSpeed}
		}
	

		// ==== PARSE PACKAGES ======
		const $packages = parseJson(_packages);
		const packages =  Array.isArray($packages) ? [...($packages as unknown as Array<BroadbandPackagesType & { quantity: number }>)]: [];
		const selectedPackages = [] as Array<
			Pick<BroadbandPackagesType, "id" | "amount" | "title" | "type"> & {
				quantity: number;
			}
		>;
		packages.map((p) => {
			if (p.quantity && p.quantity > 0) {
				selectedPackages.push({
					id: p.id,
					amount: p.amount,
					title: emojiStrip(p.title),
					type: p.type,
					quantity: p.quantity,
				});
			}
		});

		// ===== PARSE CHARGES =========
		const $charges = parseJson(_charges);
		const charges =  Array.isArray($charges) ? [...($charges as unknown as IServiceTypes["charges"])] : [];
		const formattedCharges = [] as IServiceTypes["charges"];
		if (charges.length > 0) {
			charges.forEach((c) => {
				formattedCharges.push({
					amount: c.amount,
					description: normalizeWhiteSpaces(emojiStrip(c.description)),
					quantity: c.quantity,
					type: c.type,
					freeInterval: c.freeInterval ? c.freeInterval : 0
				});
			});
		}

		// ===== FORMAT DATE OF BIRTH TO ISOSTRING =========
		const userDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;

		// ===== FORMAT PREVIOUS ADDRESSES =========
		const _previousAddress = getItem(sessionStoreKeys.previousAddress);
		const $previousAddress = parseJson(_previousAddress) as unknown;
		const previousAddressArray = $previousAddress as Array<IAddress>|null;

		const __previousAddress = previousAddressArray


		const planCycle = getItem(sessionStoreKeys.planCycle)

		const userPhoneNumber = personalDetails.mobileNumber ? personalDetails.mobileNumber.replace(/\s+/g, "") : "";

		/**
		 * @type {Payload}
		 */
		const payload: Payload = {
			referenceId: accessId,
			firstName: personalDetails.firstName
				? normalizeDiacritics(normalizeName(personalDetails?.firstName ? personalDetails.firstName : ""))
				: "",
			lastName: personalDetails.lastName ? normalizeDiacritics(normalizeName(personalDetails.lastName)) : "",
			companyName: personalDetails.companyName ? normalizeName(personalDetails.companyName) : "",
			email: personalDetails.email ? personalDetails.email.toLowerCase() : "",
			mobileNumber: userPhoneNumber || "",
			existingLandlineNumber: existingLandlineNumber ?? "",
			accountName: `${personalDetails.firstName} ${personalDetails.lastName}`,
			accountNumber: bankDetails.accountNumber || "",
			sortCode: bankDetails.sortCode || "",
			planName: normalizeWhiteSpaces(emojiStrip(selectedPlanName)),
			planPrice: selectedPlanPrice,
			// discountPrice: selectedDiscountPrice,
			discountPrice: 0,
			serviceName: normalizeWhiteSpaces(emojiStrip(serviceName)),
			servicePrice: servicePrice,
			setupFee: "0",
			contractType: contractType,
			addressId: addressId,
			longAddress: normalizeDiacritics(normalizeWhiteSpaces(longAddress)),
			shortAddress: normalizeDiacritics(normalizeWhiteSpaces(shortAddress)),
			postcode: postcode,
			address: address,
			planMetaData: planMetaData,
			packages: selectedPackages,
			dateOfBirth: userDateOfBirth ? addHours(userDateOfBirth, 4).toISOString() : null,
			directDebitDate: _directDebitDate?.toISOString(),
			managedInstallCharge: 0, // TalkTalk handles managed install charge for free hence no need to charge customers
			accessLineId: accessLineId,
			charges: formattedCharges,
			planCycle: planCycle || "yearly",
			partnerSlug: partner ? partner : "Nufibre",
			previousAddress: Array.isArray(__previousAddress) && __previousAddress?.length > 0 ? __previousAddress : [],
			channel: "online",
			planReferenceCode: planReferenceCode || null,
		};

		return payload;
	} catch (error: any) {
		console.log(error);
		throw error.message;
	}
}

export async function generateLeadPayload() {
	try {
		const accessId = getItem(sessionStoreKeys.accessId); //
		const postcode = getItem(sessionStoreKeys.postcode); //
		const longAddress = getItem(sessionStoreKeys.longAddress); //
		const shortAddress = getItem(sessionStoreKeys.shortAddress); //
		const _address = getItem(sessionStoreKeys.address); //  need parsing
		const addressId = getItem(sessionStoreKeys.addressId); //
		const _selectedPlanType = getItem(sessionStoreKeys.selectedPlanType); // need parsing

		const _selectPlanSpeeds = getItem(sessionStoreKeys.selectedPlanSpeeds); // need parsing

		// get date of birth
		const dateOfBirth = getItem(sessionStoreKeys.dateOfBirth);

		const partner = getItem(sessionStoreKeys.partner);
		const selectedPlanName = getItem(sessionStoreKeys.selectedPlanName); //
		const selectedPlanPrice = getItem(sessionStoreKeys.selectedPlanPrice) || FTTCPlan.price; //

		const selectedDiscountPrice = getItem(sessionStoreKeys.selectedDiscountPrice) || FTTCPlan.discountPrice; //
		const existingLandlineNumber = getItem(sessionStoreKeys.existingLandLineNumber);

		const _personalDetails = getItem(sessionStoreKeys.personalDetails);

		const accessLineId = getItem(sessionStoreKeys.accessLineId);

		// ====== PARSE ADDRESS ========
		const $address = parseJson(_address);
		const address = $address as unknown as IAddress;

		// ===== PARSE PERSONAL DETAILS ========
		const $personalDetails = parseJson(_personalDetails);
		const personalDetails = {
			...$personalDetails,
		} as unknown as PersonalDetailsType & { companyName: string };

		// ==== PARSE SELECTED PLAN =======
		const $selectedPlanType = parseJson(_selectedPlanType);
		const $selectedPlanSpeed = parseJson(_selectPlanSpeeds);
		
		let planMetaData = { };

		if($selectedPlanSpeed && $selectedPlanType) {
			planMetaData = {...$selectedPlanType, ...$selectedPlanSpeed}
		}

		// ===== FORMAT DATE OF BIRTH TO ISOSTRING =========
		const userDateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;

		// ===== FORMAT PREVIOUS ADDRESSES =========
		const _previousAddress = getItem(sessionStoreKeys.previousAddress);
		const $previousAddress = JSON.parse(_previousAddress) as unknown;
		const previousAddressArray = $previousAddress as [];

		const __previousAddress = previousAddressArray as Array<IFormattedAddress>;


		const planCycle = getItem(sessionStoreKeys.planCycle)
	
		const userPhoneNumber = personalDetails.mobileNumber ? personalDetails.mobileNumber.replace(/\s+/g, "") : "";

		/**
		 * @type {Payoad}
		 */
		const payload: Payload = {
			referenceId: accessId,
			firstName: personalDetails.firstName
				? normalizeDiacritics(normalizeName(personalDetails?.firstName ? personalDetails.firstName : ""))
				: "",
			lastName: personalDetails.lastName ? normalizeDiacritics(normalizeName(personalDetails.lastName)) : "",
			companyName: personalDetails.companyName ? normalizeName(personalDetails.companyName) : "",
			email: personalDetails?.email ? personalDetails.email.toLowerCase() : "",
			mobileNumber: userPhoneNumber || "",
			existingLandlineNumber: existingLandlineNumber ?? "",
			planName: normalizeWhiteSpaces(emojiStrip(selectedPlanName)),
			planPrice: selectedPlanPrice,
			discountPrice: 0,
			setupFee: "0",
			contractType: contractTypes.TWENTY_FOUR_MONTH,
			addressId: addressId,
			longAddress: longAddress,
			shortAddress: shortAddress,
			postcode: postcode,
			address: address,
			planMetaData: planMetaData,
			managedInstallCharge: 0, // TalkTalk handles managed install charge for free hence no need to charge customers
			accessLineId: accessLineId,
			channel: "lead",
			planCycle: planCycle ? planCycle : "yearly",
			dateOfBirth: userDateOfBirth ? addHours(userDateOfBirth, 4).toISOString() : null,
			previousAddress: __previousAddress.length > 0 ? __previousAddress : [],
			partnerSlug: partner ? partner : "Nufibre",
		};

		return payload;
	} catch (error: unknown) {
		const _error = error as { message: string };
		console.log(error);
		throw _error.message;
	}
}

type formType = {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
};

export function generateCustomerLeadPayload(form: formType) {
	try {
		const accessId = getItem(sessionStoreKeys.accessId); //
		const postcode = getItem(sessionStoreKeys.postcode); //
		const longAddress = getItem(sessionStoreKeys.longAddress); //
		const shortAddress = getItem(sessionStoreKeys.shortAddress); //
		const _address = getItem(sessionStoreKeys.address); //  need parsing
		const addressId = getItem(sessionStoreKeys.addressId); //
		const currentProvider = getItem(sessionStoreKeys.currentProvider); // need parsing
		const currentProviderContract = getItem(sessionStoreKeys.currentProviderContract); // need parsing
		const _selectedPlanType = getItem(sessionStoreKeys.selectedPlanType); // need parsing
		const partner = sessionStoreKeys.partner ? getItem(sessionStoreKeys.partner) : ""; // need parsing
		const _selectPlanSpeeds = getItem(sessionStoreKeys.selectedPlanSpeeds); // need parsing

		// get access line
		const accessLineId = getItem(sessionStoreKeys.accessLineId);

		// ====== PARSE ADDRESS ========
		const $address = JSON.parse(_address);
		const address = $address as unknown as IAddress;

		// ==== PARSE SELECTED PLAN =======
		const $selectedPlanType = parseJson(_selectedPlanType);
		const $selectedPlanSpeed = parseJson(_selectPlanSpeeds);
		let planMetaData = { };

		if($selectedPlanSpeed && $selectedPlanType) {
			planMetaData = {...$selectedPlanType, ...$selectedPlanSpeed}
		}


		// ===== FORMAT PREVIOUS ADDRESSES =========
		const _previousAddress = getItem(sessionStoreKeys.previousAddress);
		const $previousAddress = parseJson(_previousAddress) as unknown;
		const previousAddressArray = $previousAddress  as [] || [];

		const __previousAddress = previousAddressArray as Array<IFormattedAddress>;

		const userPhoneNumber = form.phoneNumber ? form.phoneNumber.replace(/\s+/g, "") : ""
		
		/**
		 * @type {Payoad}
		 */
		const payload: LeadPayload = {
			referenceId: accessId,
			firstName: form.firstName ? normalizeDiacritics(normalizeName(form?.firstName ? form.firstName?.trim() : "")) : "",
			lastName: form.lastName ? normalizeDiacritics(normalizeName(form?.lastName ? form?.lastName?.trim() : "")) : "",
			email: form.email ? form.email.toLowerCase() : "",
			mobileNumber: userPhoneNumber || "",
			setupFee: "0",
			planName: "Seedling 80MB",
			planPrice: "29.99",
			planCycle: getItem(sessionStoreKeys.planCycle),
			contractType: contractTypes.TWENTY_FOUR_MONTH,
			addressId: addressId,
			longAddress: normalizeDiacritics(normalizeWhiteSpaces(longAddress)),
			shortAddress: normalizeDiacritics(normalizeWhiteSpaces(shortAddress)),
			postcode: postcode,
			address: address,
			currentProviderDetails: {
				providerName: currentProvider,
				isContractStillActive: currentProviderContract
					? currentProviderContract.includes("Yes")
						? "yes"
						: currentProviderContract.includes("No")
						? "no"
						: "maybe"
					: "",
			},
			planMetaData: planMetaData,
			managedInstallCharge: 0, // TalkTalk handles managed install charge for free hence no need to charge customers
			accessLineId: accessLineId,
			channel: "lead",
			partnerSlug: partner ? partner : "Nufibre",
			previousAddress: __previousAddress.length > 0 ? __previousAddress : [],
		};

		return payload;
	} catch (error: unknown) {
		const _error = error as { message: string };
		console.log(error);
		throw _error.message;
	}
}
