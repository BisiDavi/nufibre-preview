import Layout from "@/layout";
import LogoIcon from "@/public/icons/LogoIcon";
import React from "react";

export default function ComingSoon() {
	return (
		<Layout>
			<section className="container mx-auto py-52">
				<h1 className="text-6xl flex items-center font-bold text-center ">
					Feature coming
					<div className="mx-3 h-[22px]">
						<LogoIcon />
					</div>
					soon
				</h1>
			</section>
		</Layout>
	);
}
