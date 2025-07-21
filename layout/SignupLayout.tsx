import Header from "@/components/Header";
import React, { PropsWithChildren } from "react";
import { Inter } from "next/font/google";

const interFont = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export default function SignupLayout({ children }: PropsWithChildren<{}>) {
	return (
		<div style={interFont.style} className="flex bg-[#0F0F0F] flex-col min-h-screen">
			<Header onlyLogo />
			<main>{children}</main>
		</div>
	);
}
