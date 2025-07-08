import Logo from "@/public/icons/Logo";
import React from "react";
import Button from "./Button";
import Facebook from "@/public/icons/Facebook";
import Linkedin from "@/public/icons/Linkedin";
import XIcon from "@/public/icons/XIcon";

const footerMenuItems = [
	{ name: "Features", href: "/coming-soon" },
	{ name: "Why Nu?", href: "/coming-soon" },
	{ name: "Pricing", href: "/coming-soon" },
	{ name: "Blog", href: "/coming-soon" },
	{ name: "FAQ", href: "/coming-soon" },
];

const footerItems = [
	{ name: "Terms of Use", href: "/coming-soon" },
	{ name: "Style Guide?", href: "/coming-soon" },
	{ name: "License", href: "/coming-soon" },
	{ name: "Instructions", href: "/coming-soon" },
];

export default function Footer() {
	return (
		<footer className="bg-[#0f0f0f] border-t-[#0e2223] border-t-[1px] text-[#fff] py-8">
			<div className="container mx-auto">
				<div className="top_row flex justify-between items-center">
					<Logo />
					<nav className="footer_nav">
						<ul className="flex space-x-12 text-[14px] font-[500] text-[#fff]">
							{footerMenuItems.map((item) => (
								<li key={item.name}>
									<a href={item.href} className="text-[600] font-[#fff] text-[14px]">
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<div className="mid_row flex justify-between items-start mt-8">
					<div className="mt-6">
						<h5 className="text-[20px] mb-6 font-[600] text-[#fff]">
							Help us build the kind of broadband <br /> provider you’ve always wanted
						</h5>
						<Button text="Join the nu wave" className="w-fit" />
					</div>
					<div>
						<a className="text-[20px] mb-6 font-[600] text-[#fff]">hello@nufibre.co.uk</a>
						<div className="socials flex justify-end space-x-8 mt-6">
							<XIcon />
							<Facebook />
							<Linkedin />
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<p className="text-[12px] mt-12 text-[#fff] font-[400]">
						© NUFIBRE LTD (16463711) <br />
						Our registered office is at 167-169 Great Portland Street 5th Floor, London, W1W 5PF <br />
						NUFIBRE is regulated by OFCOM
					</p>
					<ul className="flex space-x-6 text-[14px] font-[500] text-[#fff]">
						{footerItems.map((item) => (
							<li key={item.name}>
								<a href={item.href} className="font-[400] text-[#fff] text-[12px]">
									{item.name}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</footer>
	);
}
