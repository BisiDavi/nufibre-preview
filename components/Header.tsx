import Logo from "@/public/icons/Logo";
import React from "react";
import Button from "@/components/Button";
import Link from "next/link";

const menuItems = [
	{ name: "Services", href: "/coming-soon" },
	{ name: "About", href: "/coming-soon" },
	{ name: "Pricing", href: "/coming-soon" },
	{ name: "FAQ", href: "/coming-soon" },
	{ name: "Blog", href: "/coming-soon" },
];

export default function Header() {
	return (
		<div className="border-b-[#0e2223] border-b-[1px] text-[#fff] px-0 m-0 ">
			<header className="container flex mx-auto justify-between items-center py-4">
				<Link href="/">
					<Logo />
				</Link>
				<div className="flex items-center justify-between space-x-10">
					<nav>
						<ul className="flex space-x-10 text-[14px] font-[500] text-[#fff]">
							{menuItems.map((item) => (
								<li key={item.name}>
									<a href={item.href} className="menu_link pb-2 relative text-[600] font-[#fff] text-[14px]">
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</nav>
					<Button text="Sign up" />
				</div>
			</header>
		</div>
	);
}
