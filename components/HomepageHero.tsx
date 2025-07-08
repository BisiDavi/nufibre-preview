import React from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Button from "@/components/Button";
import GoCompare from "@/public/icons/GoCompareIcon";
import CompareTheMarketIcon from "@/public/icons/CompareTheMarketIcon";
import USwitchIcon from "@/public/icons/USwitchIcon";
import LogoIcon from "@/public/icons/LogoIcon";
import MoneySupermaketIcon from "@/public/icons/MoneySupermaketIcon";
import RightIcon from "@/public/icons/RightIcon";

gsap.registerPlugin(useGSAP);

export default function HomepageHero() {

	useGSAP(() => {
		const menuLinks = document.querySelectorAll(".menu_link");
		// Add the underline span to the menu item

		menuLinks.forEach((element) => {
			const underlineSpan = document.createElement("span");
			underlineSpan.style.position = "absolute";
			underlineSpan.style.bottom = "0";
			underlineSpan.style.left = "0";
			underlineSpan.style.width = "100%";
			underlineSpan.style.height = "2px";
			underlineSpan.style.backgroundColor = "#00E3EC";
			underlineSpan.style.transformOrigin = "left";

			// Start with the underline scaled to 0 width (invisible)
			underlineSpan.style.transform = "scaleX(0)";

			element.appendChild(underlineSpan);

			element.addEventListener("mouseenter", () => {
				gsap.to(underlineSpan, {
					scaleX: 1,
					duration: 0.4,
					ease: "power2.out",
				});
			});
			element.addEventListener("mouseleave", () => {
				gsap.to(underlineSpan, {
					scaleX: 0,
					duration: 0.4,
					ease: "power2.in",
				});
			});
		});
		gsap.from(".left_side", {
			opacity: 0,
			x: -50,
			duration: 1,
			ease: "power1.out",
		});
		gsap.from(".pill", {
			opacity: 0,
			y: -40,
			x: 0,
			duration: 1,
			ease: "power1.out",
		});
		gsap.from(".hero_text", {
			opacity: 0,
			y: -50,
			x: 0,
			duration: 1,
			ease: "power1.out",
		});
		gsap.from(".right_side", {
			opacity: 0,
			x: 50,
			duration: 1,
			ease: "power1.out",
		});
		gsap.to(".partner_icon", {
			y: 20,
			stagger: {
				ease: "power1.out",
				each: 0.1,
			},
		});
	}, []);

	return (
		<div>
			<div className="container flex pt-24 pb-32 items-center justify-between mx-auto">
				<div className="left_side">
					<div>
						<div className="pill bg-[#00E3EC] w-fit rounded-[500px] text-[#0F0F0F] font-[500] py-1.5 text-[14px] mb-4 px-4">
							10% off: NU1
						</div>
						<div className="hero_text text-white">
							<div className=" flex mb-2 text-white items-start">
								<h1 className="text-6xl flex items-center font-bold text-center ">
									Introducing a
									<div className="mx-3 h-[22px]">
										<LogoIcon />
									</div>
									way
								</h1>
							</div>
							<h1 className="text-6xl relative whitespace-nowrap flex font-bold text-center"> of doing broadband</h1>
						</div>
					</div>
					<div className="bg-white mt-10 w-[70%] flex rounded-[10px] h-[70px] justify-between items-center pr-3 pl-5 ">
						<input
							placeholder="Enter Postcode"
							className="focus:outline-none w-[75%] text-[#5E5E5E] placeholder-[#5E5E5E] py-4 text-[16px] font-[500] w-ful h-full"
						/>
						<Button text="Get started" className="whitespace-nowrap flex items-center gap-2">
							<RightIcon />
						</Button>
					</div>
					<div className="flex gap-10 mt-5 items-center">
						<div className="partner_icon">
							<GoCompare />
						</div>
						<div className="partner_icon">
							<CompareTheMarketIcon />
						</div>
						<div className="partner_icon">
							<USwitchIcon />
						</div>
						<div className="partner_icon">
							<MoneySupermaketIcon />
						</div>
					</div>
				</div>
				<div className="right_side bg-[#00E3EC] h-[430px] w-[350px] items-end justify-end pr-5 flex relative rounded-[8px]">
					<div className="wrapper w-[300px] h-[400px] relative flex">
						<Image fill src="/hero_img.webp" className="hero_img object-cover flex relative w-[250px]" alt="Looking into a VR headset" />
					</div>
				</div>
			</div>
		</div>
	);
}
