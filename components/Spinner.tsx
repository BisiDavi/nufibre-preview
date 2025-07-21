// Spinner
import { SpinnerCircular } from "spinners-react";

// init Spinner Component
export default function Spinner({ color = "#00E3EC", size = 50, secondaryColor = "#ffffff", className = "mx-auto" }) {
	return (
		<>
			<SpinnerCircular color={color} secondaryColor={secondaryColor} size={size} className={className} />
		</>
	);
}
