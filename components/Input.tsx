import type { ChangeEvent } from "react";

interface Props {
	input: {
		label: string;
		name: string;
		type: "text" | "email" | "password" | string;
	};
	className?: string;
	width?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	readOnly?: boolean;
	value?: string | number;
	required?: boolean;
	onClick?: () => void;
}

export default function Input({ input, width, className, onChange, ...othersProps }: Props) {
	const { label, name, type } = input;

	return (
		<>
			<div className={`${width} site_input flex flex-col text-[#263320] items-start h-[58px] relative`}>
				<input
					{...othersProps}
					type={type}
					id={name}
					name={name}
					placeholder={label}
					className={`peer m-0 block h-[58px] w-full   bg-white bg-clip-padding  rounded-[6px] bg-white bg-clip-padding py-4 px-4  text-base focus:ring-0 leading-tight ease-in-out placeholder:text-transparent  focus:bg-white focus:pt-[1.625rem] focus:pb-[0.625rem] focus:text-[#263320]  focus:outline-none  [&:not(:placeholder-shown)]:pt-[1.625rem] [&:not(:placeholder-shown)]:pb-[0.625rem] ${className}`}
					onChange={onChange}
				/>
				<label
					htmlFor={name}
					className="pointer-events-none absolute top-0 left-0 origin-[0_0] text-[#263320] py-4 px-4 transition-[opacity,_transform] duration-100 ease-in-out peer-focus:translate-x-[0.15rem] peer-focus:-translate-y-2 peer-focus:scale-[0.85] peer-focus:opacity-[1] peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:opacity-[1] motion-reduce:transition-none">
					{label}
				</label>
			</div>
			<style jsx>
				{`
					.site_input input:-webkit-autofill:hover + label {
						margin-top: -2px;
					}
				`}
			</style>
		</>
	);
}
