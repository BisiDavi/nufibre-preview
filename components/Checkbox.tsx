interface Props {
	label: string;
	name: string;
	checked: boolean;
	onClick?: () => void;
	noLabel?: boolean;
	className?: string;
}

export default function Checkbox({ label, name, checked, onClick, className = "", noLabel = false }: Props) {
	const checkboxClassname = checked ? "!border-[#fff]" : "border-[#fff]";

	return (
		<>
			<div className="flex checkbox_view items-center">
				<span
					className={`${checkboxClassname} ${className} min-h-[1.75rem] text-white border border-2  h-[1.75rem] min-w-[1.75rem] w-[1.75rem] justify-center rounded-[6px] flex items-center`}>
					{checked && (
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 27 21" fill="none">
							<path
								d="M25 2L12.0187 17.3518C11.3661 18.1235 11.0399 18.5094 10.6036 18.5292C10.1674 18.549 9.80746 18.1943 9.08764 17.4849L2 10.5"
								stroke="#fff"
								strokeWidth="4"
								strokeLinecap="round"
							/>
						</svg>
					)}
				</span>
				<input type="checkbox" checked={checked} id={name} className="checkbox " onChange={onClick} />
				{!noLabel && (
					<label htmlFor={name} className="text-white ml-3">
						{label}
					</label>
				)}
			</div>
			<style jsx>
				{`
					.checkbox_view {
						position: relative;
					}
					input.checkbox {
						appearance: none;
						position: absolute;
						cursor: pointer;
						border: none;
						overflow: hidden;
						appearance: none;
					}
					input.checkbox:focus-visible {
						box-shadow: none;
						outline: none;
					}
				`}
			</style>
		</>
	);
}
