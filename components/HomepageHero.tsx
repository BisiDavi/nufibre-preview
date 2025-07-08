import React from "react";
import LogoIcon from "../public/icons/LogoIcon";
import Image from "next/image";
import Button from "./Button";
import GoCompare from "@/public/icons/GoCompareIcon";
import CompareTheMarketIcon from "@/public/icons/CompareTheMarketIcon";
import USwitchIcon from "@/public/icons/USwitchIcon";
import MoneySupermaketIcon from "@/public/icons/MoneySupermaketIcon";

export default function HomepageHero() {
	return (
		<div>
			<div className="container flex pt-24 pb-32 items-center justify-between mx-auto">
				<div>
					<div>
						<div className="bg-[#00E3EC] w-fit rounded-[500px] text-[#0F0F0F] font-[500] py-1.5 text-[14px] mb-4 px-4">10% off: NU1</div>
						<div className="flex mb-2 items-start">
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
					<div className="bg-white mt-10 w-[70%] flex rounded-[10px] h-[70px] justify-between items-center pr-3 pl-5 ">
						<input
							placeholder="Enter Postcode"
							className="focus:outline-none w-[75%] text-[#5E5E5E] placeholder-[#5E5E5E] py-4 text-[16px] font-[500] w-ful h-full"
						/>
						<Button text="Get started" className="whitespace-nowrap " />
					</div>
					<div className="flex gap-10 mt-10 items-center">
						<GoCompare />
						<CompareTheMarketIcon />
						<USwitchIcon />
						<MoneySupermaketIcon />
					</div>
				</div>
				<div className="bg-[#00E3EC] h-[430px] w-[350px] items-end justify-end pr-5 flex relative rounded-[8px]">
					<div className="wrapper w-[300px] h-[400px] relative flex">
						<Image fill src="/hero_img.webp" className="hero_img object-cover flex relative w-[250px]" alt="Looking into a VR headset" />
					</div>
				</div>
			</div>
		</div>
	);
}
