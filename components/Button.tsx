import React, { PropsWithChildren } from "react";

interface Props {
	text: string;
	className?: string;
	textClassName?: string;
}

export default function Button({ text, className, textClassName, children }: PropsWithChildren<Props>) {
	return (
		<button
			className={`bg-[#00E3EC] button cursor-pointer text-[16px] flex items-center justify-center font-[600] text-[#0f0f0f] rounded-[8px] h-[48px] px-4 ${className}`}>
			<span className={textClassName}>{text}</span>
			<span>{children}</span>
		</button>
	);
}
