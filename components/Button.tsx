import React, { PropsWithChildren } from "react";

interface Props {
	text: string;
	className?: string;
}

export default function Button({ text, className, children }: PropsWithChildren<Props>) {
	return (
		<button
			className={`bg-[#00E3EC] cursor-pointer text-[16px] flex items-center justify-center font-[600] text-[#0f0f0f] rounded-[8px] h-[48px] px-4 ${className}`}>
			{text}
			<span>{children}</span>
		</button>
	);
}
