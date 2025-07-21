import type { IServiceTypes } from "@/types/types";

export const sessionStoreKeys = {
	getProvidersList: "getProvidersList",
	digiReachTransactionCode: "digiReachTransactionCode",
	cid: "cid",
	customerDetails: "customerDetails",
	convertUUID: "convert_uuid",
	planCycle: "planCycle",
	subscribeToNewsletter: "subscribeToNewsletter",
	zuruClickId: "zuruClickId",
	affiliateCustomerRefId: "affiliateCustomerRefId",
	previousAddress: "previousAddress",
	accessId: "accessId",
	postcode: "postcode",
	shortAddress: "shortAddress",
	longAddress: "longAddress",
	addressId: "addressId",
	address: "address",
	currentProvider: "currentProvider",
	currentProviderContract: "currentProviderContract",
	selectedPlan: "selectedPlan",
	selectedPlanSpeeds: "selectedPlanSpeeds",
	selectedPlanType: "selectedPlanType",
	selectedPlanName: "selectedPlanName",
	selectedPlanPrice: "selectedPlanPrice",
	selectedDiscountPrice: "selectedDiscountPrice",
	serviceName: "serviceName",
	servicePrice: "servicePrice",
	charges: "charges",
	contractType: "contractType",
	setupFee: "setupFee",
	estGoLiveDate: "estGoLiveDate",
	estRouterDeliveryDate: "estRouterDeliveryDate",
	goLiveLaterDate: "goLiveLaterDate",
	needRouter: "needRouter",
	routerDeliveryPostcode: "routerDeliveryPostcode",
	routerDeliveryAddress: "routerDeliveryAddress",
	routerWifiUserName: "routerWifiUserName",
	routerWifiPassword: "routerWifiPassword",
	personalDetails: "personalDetails",
	bankDetails: "bankDetails",
	landLineNumber: "landLineNumber",
	partner: "partner",
	directDebitDate: "directDebitDate",
	errorMessage: "errorMessage",
	accessToken: "accessToken",
	workingLineQty: "workingLineQty",
	stoppedLineQty: "stoppedLineQty",
	accessLineId: "accessLineId",
	listOfWorkingLine: "listOfWorkingLine",
	registerPageUserAddress: "registerPageUserAddress",
	awcKey: "awc-key",
	amazonStickExtrasCount: "amazonStickExtrasCount",
	amazonStickExtrasCharges: "amazonStickExtrasCharges",
	amazonStickExtrasServicePrice: "amazonStickExtrasServicePrice",
	landlineExtrasCount: "landlineExtrasCount",
	landlineExtrasCharges: "landlineExtrasCharges",
	landlineServicePrice: "landlineServicePrice",
	packages: "packages",
	selectedPackageIds: "selectedPackageIds",
	existingLandLineNumber: "existingLandLineNumber",
	selectedAddressYear: "selectedAddressYear",
	selectedAddressYearDiff: "selectedAddressYearDiff",
	allAddress: "allAddress",
	isBroadbandPage: "isBroadbandPage",
	dateOfBirth: "dateOfBirth",
	channel: "channel",
	// previousAddress: "previousAddress",
	isUserGPDRDetailsSaved: "isUserGPDRDetailsSaved",
	channelType: {
		lead: "lead",
		offline: "offline",
		online: "online",
	},
	incompleteSignupDetails: "incompleteSignupDetails",
	planCategory: "planCategory",
	campaignSelectedPlan: "campaignSelectedPlan",
	planReferenceCode: "planReferenceCode",
	source: "source",
	referralId: "referralId",
};

// init planType
export const planType = Object.freeze({ 
	FTTC: {
		name: "FTTC",
		codes: ["FTTC 80_20M", "FTTC 40_10M"],
	},
	FTTP: {
		name: "FTTP",
		codes: {
			lower: ["FTTP_DIA_80"],
			mid: ["FTTP_DIA_100"],
			high: ["FTTP_DIA_1000"],
		},
	},
});

// init fttc plan
export const FTTCPlan = {
	name: "Seedling 80MB",
	price: 29.99,
	discountPrice: 29.99,
	annualPrice: 29.99
};

export const FTTPMidPlan = {
	name: "Sapling 115MB",
	price: 33.99,
	discountPrice: 33.99,
	annualPrice: 33.99,
};

export const FTTPHighPlan = {
	name: "Forest 1GB",
	price: 46.99,
	discountPrice: 46.99,
	annualPrice: 46.99,
};

// init contractTypes
export const contractTypes = {
	TWELVE_MONTH: "TWELVE_MONTH",
	TWENTY_FOUR_MONTH: "TWENTY_FOUR_MONTH",
	EIGHTEEN_MONTHS: "EIGHTEEN_MONTHS",
};

export const serviceTypes: Array<IServiceTypes & { buttonText: string }> = [
	{
		serviceName: "Broadband only",
		servicePrice: 0,
		charges: [],
		description: "Great for people who don't use their landline or need a TV package.",
		buttonText: "Choose broadband only",
	},
	{
		serviceName: "Broadband and TV",
		servicePrice: 0,
		charges: [
			{
				description: "Firestick charge",
				amount: 41.99,
				type: "one-off",
			},
		],
		description: "Get broadband without the landline and add an Amazon Firestick for a one-off charge of £41.99.",
		buttonText: "Choose broadband & TV",
	},
	{
		serviceName: "Broadband and phone",
		servicePrice: 5.99,
		charges: [],
		description: "Use your existing handset and get unlimited calls to UK landlines and mobiles for £5.99 extra per month.",
		buttonText: "Choose broadband & phone",
	},
	{
		serviceName: "Broadband, phone and TV",
		servicePrice: 5.99,
		charges: [
			{
				description: "Firestick charge",
				amount: 41.99,
				type: "one-off",
			},
		],
		description: "Perfect for people who use their landline and want a TV package.",
		buttonText: "Choose broadband, phone & TV",
	},
];

export const PACKAGE_IDS = {
	amazon_fire_stick: "amazon_fire_stick",
	landline: "landline",
	nufibre_hero: "nufibre_hero",
} as const;

export const SETUP_FEE = {
	description: "Setup Fee",
	amount: 0, // change the setup fee from 60 to 0
	type: "one-off",
} as IServiceTypes["charges"][0];

export const CONNECTION_FEE = {
	description: "postage and connection fee",
	amount: 19.99,
	type: "one-off",
} as IServiceTypes["charges"][0];

// managed install charge
export const managedInstallCharge = 71.75;

//init broadband path
export const BroadbandPath = "/signup/broadband";

export const toastOptions = {
	style: {
		marginTop: "5px",
		marginBottom: "5px",
		boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.1)",
	},
};

export const cardIcons = {
	first: { plan: "seedling_80mb", package: "landline" },
	second: { plan: "sapling_115mb", package: "amazon_fire_stick" },
	third: { plan: "forest_1gb", package: "climate_hero" },
	contract: "contract",
	tick: "tick",
};

export const postage_connection_description = "Postage and connection fee";

export const ADS_PARTNER = "Digi Reach";

export enum BroadbandPackageID {
	landline = "landline",
	amazon_fire_stick = "amazon_fire_stick",
	nufibre_hero = "nufibre_hero",
}

export enum PackagesServiceName {
	"Phone_and_TV" = "Phone and TV",
	"TV" = "TV",
	"Phone" = "Phone",
}

export type ICONTRACTTYPE = "TWELVE_MONTH" | "TWENTY_FOUR_MONTH" | "EIGHTEEN_MONTHS";
export type ICONTRACTVALUE = 12 | 18 | 24;

export type TCONTRACT_TYPE = Array<{ key: ICONTRACTTYPE; value: ICONTRACTVALUE }>;

export const CONTRACT_TYPE: TCONTRACT_TYPE = [
	{
		key: "TWELVE_MONTH",
		value: 12,
	},
	{
		key: "EIGHTEEN_MONTHS",
		value: 18,
	},
	{
		key: "TWENTY_FOUR_MONTH",
		value: 24,
	},
];

export const NufibreHeroDetails = { description: "Nufibre Hero", amount: 4.99, type: "month", quantity: 1, freeInterval: 1 };

export const RouterDeliveryChargeDetails = { description: "Router Delivery", amount: 4.99, type: "one-off", quantity: 1 };

export enum ChargesDescriptionType {
	"Nuifbire_Hero" = "Nufibre Hero",
	"Postage_and_connection_fee" = "Postage and connection fee",
}

export const products = [
	{
		old: {
			name: "Roarlly Fast 80Mb",
			reference: "roarlly_fast_80mb",
		},
		new: {
			name: "Seedling 80MB",
			reference: "seedling_80mb",
		},
	},
	{
		old: {
			name: "Sssuper Fast 115Mb",
			reference: "sssuper_fast_115mb",
		},
		new: {
			name: "Sapling 115MB",
			reference: "sapling_115mb",
		},
	},
	{
		old: {
			name: "Megorilla Fast 1GB",
			reference: "megorilla_fast_1gb",
		},
		new: {
			name: "Forest 1GB",
			reference: "forest_1gb",
		},
	},
];

export const FTTC_PLAN_DISCOUNT_PRICE = 27.99;