import React from "react";
import { Toaster } from "react-hot-toast";

import PreviousAddressForm from "@/components/form/PreviousAddressForm";
import accessHoc from "@/hocs/accessHoc";
import SignupLayout from "@/layout/SignupLayout";

function PreviousAddressPage() {
	return (
		<SignupLayout>
			<section className="w-full lg:w-3/5 py-10 mx-auto">
				<h1 className="mb-4 text-[#fff] justify-center text-center md:mb-4 md:mt-0 mt-3 flex items-center mx-auto md:gap-3 section_title lg:text-[2.25rem] lg:leading-[60px] md:text-3xl text-[2rem] leading-[2.5rem] text-center items-star text-2xl font-bold ">
					Please tell us your previous address
				</h1>
				<p className="text-center text-white mb-3 md:mb-7 md:w-[70%] w-full mx-auto">
					We need at least 3 years of your address history to check your identity and credit report otherwise your broadband order may be
					rejected.
				</p>
				<div className="md:w-[511px] w-full flex flex-col md:mt-0 mt-3 mx-auto items-center justify-center">
					<PreviousAddressForm />
				</div>
			</section>
			<Toaster />
		</SignupLayout>
	);
}

export default accessHoc(PreviousAddressPage);
