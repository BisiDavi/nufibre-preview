import { useEffect } from "react";

export default function useClickOutside(ref: any, closeDropdown?: () => void) {
	useEffect(() => {
		function handleClickOutside(event: any) {
			if (ref.current && !ref.current?.contains(event.target) && closeDropdown) {
				closeDropdown();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, closeDropdown]);
}
