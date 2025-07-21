import { APIAddressResponse, IAddress } from "@earthbroadband_team/shared-types";

type ISelectedAddress = APIAddressResponse["address"] & Pick<APIAddressResponse, "uprn">;

/**
 * @description Formats Address from Address API Response
 * @param address
 * @returns
 */
export function formatAddress(address: ISelectedAddress) {
	const postCode = address?.postCode ? address?.postCode : "";
	const qualifier = address?.qualifier ?? "";
	const id = address?.alk ? address?.alk : "";
	const districtCode = address?.districtCode ? address?.districtCode : "";

	// init addressId
	const addressId = `${qualifier}|${id}|${districtCode}`;

	const __address = {
		addressId: addressId,
		buildingName: address?.buildingName ? address?.buildingName : "",
		buildingNumber: address?.buildingNumber ? address?.buildingNumber : "",
		county: address?.county ? address?.county : "",
		dependentLocality: address?.locality ? address?.locality : "",
		organizationName: address?.organisationName ? address?.organisationName : "",
		postCode: address?.postCode ? address?.postCode : "",
		postTown: address?.postTown ? address?.postTown : "",
		street: address?.street ? address?.street : "",
		subBuilding: address?.subBuilding ? address?.subBuilding : "",
		thoroughfareName: address?.dependentThoroughFare ? address?.dependentThoroughFare : "",
		uprn: address?.uprn ? address?.uprn : "",
	} as IAddress;

	let longAddress = "";
	let shortAddress = "";

	if (__address?.organizationName) {
		longAddress = `${longAddress} ${__address?.organizationName},`;
	}

	if (__address?.subBuilding) {
		longAddress = `${longAddress} ${__address?.subBuilding},`;
		shortAddress = `${shortAddress} ${__address?.subBuilding},`;
	}

	if (__address?.buildingName) {
		longAddress = `${longAddress} ${__address?.buildingName},`;
		shortAddress = `${shortAddress} ${__address?.buildingName},`;
	}

	if (__address?.buildingNumber) {
		longAddress = `${longAddress} ${__address?.buildingNumber},`;
		shortAddress = `${shortAddress} ${__address?.buildingNumber},`;
	}

	if (__address?.thoroughfareName) {
		longAddress = `${longAddress} ${__address?.thoroughfareName},`;
		shortAddress = `${shortAddress} ${__address?.thoroughfareName},`;
	}

	if (__address?.street) {
		longAddress = `${longAddress} ${__address?.street},`;
		shortAddress = `${shortAddress} ${__address?.street}`;
	}

	if (__address?.dependentLocality) {
		longAddress = `${longAddress} ${__address?.dependentLocality},`;
	}

	if (__address?.postTown) {
		longAddress = `${longAddress} ${__address?.postTown},`;
	}

	if (__address?.county) {
		longAddress = `${longAddress} ${__address?.county},`;
	}

	if (__address?.postCode) {
		longAddress = `${longAddress} ${__address?.postCode}`;
	}

	return {
		longAddress,
		shortAddress,
		addressId,
		postcode: postCode,
		address: __address,
	};
}
