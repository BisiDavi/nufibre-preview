/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
import type { ChangeEvent, ReactNode } from "react";

import Input from "@/components/Input";
import useClickOutside from "@/hooks/useClickOutside";

interface Props {
	input: {
		name: string;
		label: string;
	};
	children: ReactNode;
	className: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	closeDropdown: () => void;
	openDropdown: () => void;
	dropdown: boolean;
}

export default function SelectDropdown({ input, children, className, onChange, closeDropdown, openDropdown, dropdown, value }: Props) {
	const ref = useRef(null);
	useClickOutside(ref, closeDropdown);
	const inputValue = { ...input, type: "text" };
	return (
		<div ref={ref} className="form-floating mb-6 w-full">
			<Input value={value} input={inputValue} onClick={openDropdown} onChange={onChange} className={className} />
			{dropdown && (
				<div className="text-[#00] mt-4 max-h-64 py-3 overflow-y-auto rounded-[6px]  bg-white">
					{children}
				</div>
			)}
		</div>
	);
}
