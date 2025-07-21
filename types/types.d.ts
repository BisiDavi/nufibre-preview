declare global {
	interface Window {
		AWIN: any;
	}
}

export type contractType = {
	title: string;
	type: ContractType;
	features: string[];
	price: string;
	amount: number;
	description: string;
	period: ChargesType;
	buttonText: string;
	active: boolean;
};

export type IFormattedAddress = {
	addressId?: string;
	subBuildingName?: string;
	buildingNumber?: string;
	buildingName?: string;
	county?: string;
	dependentLocality?: string;
	postTown?: string;
	postCode?: string;
	thoroughfareName?: string;
	uprn?: string;
};

// export type IAddress = {
// 	SubBuildingName?: string;
// 	BuildingNumber?: string;
// 	BuildingName?: string;
// 	County: string;
// 	DependentLocality: string;
// 	PostTown: string;
// 	Postalcode: string;
// 	ThoroughfareName: string;
// 	UPRN: string;
// };

// export type ISelectedAddress = {
// 	id: string;
// 	addressSource: string;
// 	districtCode: string;
// 	exchangeGroupCode: string;
// 	qualifier: string;
// 	uprn: string;
// 	streetNr: string;
// 	streetName: string;
// 	locality: string;
// 	postcode: string;
// 	city: string;
// 	country: string;
// 	county: string;
// 	geographicSubAddress: Array<{
// 		buildingName: string;
// 		subBuilding: string;
// 		subStreet: string;
// 		subLocality: string;
// 	}>;
// };

export type Payload = {
	planCycle: string;
	referenceId: string;
	firstName: string;
	lastName: string;
	companyName: string;
	email: string;
	mobileNumber: string;
	accountName?: string;
	accountNumber?: string;
	sortCode?: string;
	planName: string;
	planPrice: number | string;
	discountPrice: number | string;
	serviceName?: string;
	servicePrice?: string;
	setupFee?: string;
	contractType?: string;
	addressId: string;
	longAddress: string;
	shortAddress: string;
	postcode: string;
	dateOfBirth?: string|null;
	address: IFormattedAddress;
	planMetaData: Object;
	previousAddress?: Array<IFormattedAddress>;
	packages?: Array<
		Pick<BroadbandPackagesType, "id" | "amount" | "title" | "type"> & {
			quantity: number;
		}
	>;
	directDebitDate?: string;
	managedInstallCharge: string | number;
	// workingLineQty: string;
	// stoppedLineQty: string;
	accessLineId: string;
	// listOfWorkingLine: Array<object>|null;
	charges?: IServiceTypes["charges"];
	partnerSlug?: string|null;
	channel: "online" | "lead";
	existingLandlineNumber?: string;
	planReferenceCode?: string | null;
};

export type productSpeeds = {
	normUploadSpeedLower: number;
	normUploadSpeedUpper: number;
	normDownloadSpeedLower: number;
	normDownloadSpeedUpper: number;
};

export type LeadPayload = {
	planCycle?: string;
	referenceId: string;
	firstName: string;
	lastName: string;
	companyName?: string;
	email: string;
	mobileNumber: string;
	accountName?: string;
	accountNumber?: string;
	sortCode?: string;
	planName?: string;
	planPrice?: number | string;
	discountPrice?: number | string;
	serviceName?: string;
	servicePrice?: string;
	setupFee?: string;
	contractType?: string;
	addressId: string;
	longAddress: string;
	shortAddress: string;
	postcode: string;
	dateOfBirth?: string;
	address: IFormattedAddress;
	planMetaData: Object;
	currentProviderDetails?: {
		providerName: string;
		isContractStillActive: string;
	};

	previousAddress?: Array<IFormattedAddress>;
	packages?: Array<
		Pick<BroadbandPackagesType, "id" | "amount" | "title" | "type"> & {
			quantity: number;
		}
	>;
	directDebitDate?: string;
	managedInstallCharge: string | number;
	// workingLineQty: string;
	// stoppedLineQty: string;
	accessLineId: string;
	// listOfWorkingLine: Array<object>|null;
	charges?: IServiceTypes["charges"];
	partnerSlug?: string;
	channel: "online" | "lead";
	existingLandlineNumber?: string;
	planReferenceCode?: string | null;
};

export type ProductQualificationItemType = Array<{
	id: string;
	product: {
		place: Array<{
			id: string;
			role: string;
			"@referredType": string;
		}>;
		productCharacteristic: Array<{
			name: string;
			value: string;
		}>;
		productOffering: {
			id: string;
			name: string;
			accessLineId: string;
			metadata?: object;
		};
	};
	// "@type": string;
}>;

type ChargesType = "one-off" | "month";

// type PackageIDs = "landline" | "amazon_fire_stick" | "climate_hero";

type BackendPackageIDs = "Phone" | "TV";

type ContractType = "TWELVE_MONTH" | "TWENTY_FOUR_MONTH" | "EIGHTEEN_MONTHS";

export type BroadbandPackagesType = {
	id: string;
	title: string;
	features: string[];
	price: string;
	description: string;
	buttonText: string;
	amount: number;
	period: "upfront" | "month";
	active: boolean;
	isVisible: boolean;
	type?: ChargesType;
};

export type BroadbandPackagesType = {
	id: PackageIDs;
	title: string;
	features: string[];
	price: string;
	description: string;
	active: boolean;
	type?: ChargesType;
};

export type TContractType<T> = {
	period: T;
	type?: ContractType;
	amount?: number;
	buttonText?: string;
	id: PackageIDs;
	title: string;
	features: Array<{ description: string; rate: string }>;
	price: string;
	description: string;
	active: boolean;
	type?: ChargesType;
};

export type TPricingType<T> = {
	period: T;
	type?: ContractType;
	amount?: number;
	buttonText?: string;
	id: "forest_1gb" | "sapling_115mb" | "seedling_80mb";
	title: string;
	features: Array<{ description: string; rate: string }>;
	price: string;
	annum_price: string;
	description: string;
	active: boolean;
	type?: ChargesType;
};

export type IServiceTypes = {
	serviceName: string;
	servicePrice: number;
	// servicePrice: number;
	charges: Array<{
		description: string;
		amount: number;
		type: ChargesType;
		quantity?: number;
		freeInterval?: number;
	}>;
	description: string;
};

export type PersonalDetailsType = {
	firstName: string;
	lastName: string;
	mobileNumber: string;
	email: string;
	dateOfBirth: string;
};

export type BankDetailsType = {
	accountName: string;
	accountNumber: string;
	sortCode: string;
	// directDebitDate: string | Date;
};

export type blogPostType = {
	_id: string;
	title: string;
	slug: string;
	content: string;
	topic: string;
	category: string;
	featureImageUrl: string;
	createdAt: string;
	updatedAt: string;
	summary?: string;
	author: {
		firstName: string;
		lastName: string;
	};
};

export type SelectedPlanType = {
	id: string;
	name: string;
	accessLineId: string;
	metadata: {
		MPFAvailabilityDetails: {
			Status: {
				Errors: string;
				HasErrors: boolean;
			};
			AccessLineID: string;
			AccessLineStatus: string;
			ExchangeCapacity: string;
			LineTypeDetails: {
				WorkingLineDetails: {
					InstallationType: string;
					PartialDN: number;
					ProductType: string;
				};
			};
		};
	};
};

export type consentFormType = {
	firstName: "";
	lastName: "";
	mobileNumber: "";
	email: "";
};