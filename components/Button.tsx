import React, { PropsWithChildren } from "react";

interface Props {
	text: string;
	className?: string;
	onClick?: () => void;
	textClassName?: string;
	type?: "button" | "submit" | "reset";
}

export default function Button({ type = "button", text, className, onClick, textClassName, children }: PropsWithChildren<Props>) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`bg-[#00E3EC] button cursor-pointer text-[16px] flex items-center justify-center font-[600] text-[#0f0f0f] rounded-[8px] h-[48px] px-4 ${className}`}>
			{text && <span className={textClassName}>{text}</span>}
			<span>{children}</span>
		</button>
	);
}
