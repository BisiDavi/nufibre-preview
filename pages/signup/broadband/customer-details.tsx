import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import isEmail from "validator/lib/isEmail";

import Button from "@/components/Button";
import formContent from "@/json/eligibility-form.json";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import { setItem } from "@/utils/sessionStore";
import { sessionStoreKeys } from "@/utils/constants";
import axios from "@/utils/axios.config";
import Spinner from "@/components/Spinner";
import { generateCustomerLeadPayload } from "@/utils/payload";
import customToast from "@/utils/customToast";
import accessHoc from "@/hocs/accessHoc";
import SignupLayout from "@/layout/SignupLayout";

function CustomerDetailsPage() {
	const [subscribe, setSubscribe] = useState(true);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
	});

	function onSubscribeHandler() {
		setSubscribe((prev) => !prev);
	}

	async function continueHandler() {
		try {
			if (!form.firstName) {
				return customToast.error("Please enter your first name");
			}
			if (!form.lastName) {
				return customToast.error("Please enter your last name");
			}
			if (!form.email) {
				return customToast.error("Please enter your email address");
			}

			if (!isEmail(form.email)) {
				return customToast.error("Please enter a valid email");
			}

			if (!form.phoneNumber) {
				return customToast.error("Please enter your mobile number");
			}
			const userPhonenumber = form.phoneNumber.trim();
			if (!userPhonenumber.match(/^[0-9 ]*$/)) {
				return customToast.error("Please enter a valid mobile number");
			}

			const mobileNumber = userPhonenumber.replace(/\s/g, "");
			if (mobileNumber.length < 11 || mobileNumber.length > 11) {
				return customToast.error("Please enter a valid mobile number 11 digits long.");
			}

			if (userPhonenumber.slice(0, 2) !== "07") {
				return customToast.error("Please enter a valid mobile number starting with 07");
			}

			if (!subscribe) {
				return customToast.error("Please give your consent to hear from us");
			}
			setItem(sessionStoreKeys.customerDetails, JSON.stringify(form));

			if (subscribe) {
				setItem(sessionStoreKeys.subscribeToNewsletter, "true");
			}

			setLoading(true);

			const accountCheckRequest = await axios.post(`${process.env.NEXT_PUBLIC_API_ROOT}/account/check`, { email: form.email });

			if (!accountCheckRequest.data.success) {
				setLoading(false);
				return customToast.error("An account with these details already exists");
			}

			// generate payload
			const leadPayload = generateCustomerLeadPayload(form);

			console.log('leadPayload', leadPayload);

			// axios.post(`${process.env.NEXT_PUBLIC_API_ROOT}/create/customer`, leadPayload);

			setLoading(false);

			// if (!createLeadCustomerRequest.data.success) {
			// 	// customToast.error(createLeadCustomerRequest.data.message);
			// 	console.log("error", createLeadCustomerRequest.data.message);
			// 	customToast.error("Something has gone wrong please contact us");
			// 	return;
			// }
			// redirect user to plan page if unsuccessful
			router.push(`/signup/broadband/plan`);

			return;
		} catch (error) {
			console.error("Error in continueHandler:", error);
			setLoading(false);
			return customToast.error("Something has gone wrong please contact us");
		}
	}

	function inputChangeHandler(event: ChangeEvent<HTMLInputElement>) {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	}

	return (
		<SignupLayout>
			<Toaster />
			<section className="flex items-center py-4 h-full   md:mx-auto flex-col w-full">
				<div className="flex flex-col mb-10 mt-1.5 w-full lg:w-4/5  md:items-center ">
					<div className="flex flex-col form-control text-center w-full lg:w-full">
						<h1 className="md:mt-0 mt-3 text-white section_title lg:text-[2.25rem] lg:leading-[60px] lg:mb-0 md:mb-2 md:text-3xl text-[2rem] leading-[2.5rem] text-center items-start text-2xl font-bold ">
							Enter your details to check eligibility
						</h1>
						<div className="md:w-[511px] space-y-[1.3rem] w-full flex flex-col md:mt-4 mt-5 mx-auto items-center justify-center">
							{formContent.map((input) => {
								const inputName = input.name as keyof typeof form;
								const value = form[inputName]
								return (
									<Input
										input={input}
										key={input.name}
										value={value}
										width="w-full"
										className="w-full flex min-w-full"
										onChange={inputChangeHandler}
									/>
								);
							})}
							<div className="mt-5 mx-auto text-left">
								<Checkbox
									className=""
									name="subscribe"
									checked={subscribe}
									onClick={onSubscribeHandler}
									label="I’m happy to hear from Nufibre Broadband by email, SMS and phone about broadband packages and offers."
								/>
							</div>
						</div>
						<div className="mt-6">
							{loading ? (
								<Spinner />
							) : (
								<Button
									type="button"
									aria-label="continue"
									className="mx-auto"
									onClick={continueHandler}
									text="Continue to results"
								/>
							)}
						</div>
					</div>
				</div>
			</section>
		</SignupLayout>
	);
}

export default accessHoc(CustomerDetailsPage);
