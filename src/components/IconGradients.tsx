import { Icon } from "@/components/Icon";

// This component is used to create the gradients for the process card icons.
// This is a workaround to avoid the gradient not being applied to the icons on Safari.

// Shared gradients used by both ProcessPage and AboutPage
function SharedGradients() {
	return (
		<>
			{/* strategy */}
			<linearGradient
				gradientUnits="userSpaceOnUse"
				id="strategy-a"
				x1="50%"
				x2="50%"
				y1="1.17%"
				y2="99.02%"
			>
				<stop offset="0" stopColor="#ffdcd5" />
				<stop offset="1" stopColor="#ffc4b9" />
			</linearGradient>
			<linearGradient
				gradientUnits="userSpaceOnUse"
				id="strategy-b"
				x1="50%"
				x2="50%"
				y1="95.21%"
				y2="3.13%"
			>
				<stop offset="0" stopColor="#ffac9d" />
				<stop offset="1" stopColor="#ffc1b6" />
			</linearGradient>
			<linearGradient id="strategy-c" x1="50%" x2="50%" y1="100%" y2="0%">
				<stop offset="0" stopColor="#5b6aff" />
				<stop offset="1" stopColor="#919aff" />
			</linearGradient>
			{/* what-we-do-design */}
			<linearGradient
				id="what-we-do-design-a"
				x1="0%"
				x2="88.546%"
				y1="100%"
				y2="0%"
			>
				<stop offset="0%" stopColor="#FFAC9D" />
				<stop offset="100%" stopColor="#FFC6BD" />
			</linearGradient>
			<linearGradient
				id="what-we-do-design-b"
				x1="50%"
				x2="50%"
				y1="100%"
				y2="0%"
			>
				<stop offset="0%" stopColor="#5B6AFF" />
				<stop offset="100%" stopColor="#919AFF" />
			</linearGradient>
			<linearGradient
				id="what-we-do-design-c"
				x1="100%"
				x2="0%"
				y1="100%"
				y2="0%"
			>
				<stop offset="0%" stopColor="#96D7F3" />
				<stop offset="100%" stopColor="#C2E8F8" />
			</linearGradient>
			{/* execute */}
			<linearGradient id="execute-a" x1="100%" x2="0%" y1="86.49%" y2="35.82%">
				<stop offset="0" stopColor="#9fdaf3" />
				<stop offset="1" stopColor="#c2e8f8" />
			</linearGradient>
			<linearGradient id="execute-b" x1="50%" x2="50%" y1="89.79%" y2=".83%">
				<stop offset="0" stopColor="#b0a2fa" />
				<stop offset="1" stopColor="#cbc0fc" />
			</linearGradient>
			<linearGradient id="execute-c" x1="100%" x2="0%" y1="78.85%" y2="26.36%">
				<stop offset="0" stopColor="#82d1ef" />
				<stop offset="1" stopColor="#7fd0ef" />
			</linearGradient>
			<linearGradient id="execute-d" x1="50%" x2="50%" y1="99.02%" y2="0%">
				<stop offset="0" stopColor="#7056f5" />
				<stop offset="1" stopColor="#afa1fa" />
			</linearGradient>
		</>
	);
}

export function ProcessPageIconGradients() {
	return (
		<Icon
			className="sr-only"
			height="0"
			width="0"
			xmlns="http://www.w3.org/2000/svg"
		>
			<SharedGradients />
			{/* research */}
			<linearGradient
				gradientUnits="userSpaceOnUse"
				id="research-a"
				x1="33"
				x2="33"
				y1="59.67"
				y2=".33"
			>
				<stop offset="0" stopColor="#7ECDEF" />
				<stop offset="1" stopColor="#C2E8F8" />
			</linearGradient>
			<linearGradient
				gradientUnits="userSpaceOnUse"
				id="research-b"
				x1="32"
				x2="32"
				y1="42.57"
				y2="19.43"
			>
				<stop offset="0" stopColor="#FFC89D" />
				<stop offset="1" stopColor="#FFC6BD" />
			</linearGradient>
			<linearGradient
				gradientUnits="userSpaceOnUse"
				id="research-c"
				x1="33"
				x2="33"
				y1="59.67"
				y2=".33"
			>
				<stop offset="0" stopColor="#9EA5FF" />
				<stop offset="1" stopColor="#BCC2FF" />
			</linearGradient>
			<linearGradient
				gradientUnits="userSpaceOnUse"
				id="research-d"
				x1="32.83"
				x2="32.83"
				y1="33.83"
				y2="27.83"
			>
				<stop offset="0" stopColor="#5B6AFF" />
				<stop offset="1" stopColor="#919AFF" />
			</linearGradient>
			{/* process-design */}
			<linearGradient id="design-a" x1="100%" x2="0%" y1="86.49%" y2="35.82%">
				<stop offset="0" stopColor="#9fdaf3" />
				<stop offset="1" stopColor="#c2e8f8" />
			</linearGradient>
			<linearGradient id="design-b" x1="50%" x2="50%" y1="100%" y2="0%">
				<stop offset="0" stopColor="#5b6aff" />
				<stop offset="1" stopColor="#919aff" />
			</linearGradient>
			<linearGradient id="design-c" x1="50%" x2="50%" y1="1.17%" y2="99.02%">
				<stop offset="0" stopColor="#ffc7d1" />
				<stop offset="1" stopColor="#ffa3b4" />
			</linearGradient>
			{/* premium */}
			<linearGradient
				id="premium-a"
				x1="94.73%"
				x2="12.79%"
				y1="83.82%"
				y2="-10.08%"
			>
				<stop offset="0" stopColor="#2d82e4" />
				<stop offset="1" stopColor="#69afff" />
			</linearGradient>
			{/* on_time */}
			<linearGradient
				gradientTransform="matrix(-5 0 0 -5 -1705 1701)"
				gradientUnits="userSpaceOnUse"
				id="on_time-a"
				x1="-345.1"
				x2="-345.1"
				y1="337.71"
				y2="338.36"
			>
				<stop offset="0" stopColor="#2d82e4" />
				<stop offset="1" stopColor="#69afff" />
			</linearGradient>
			<linearGradient
				gradientTransform="matrix(1 0 0 -20 6 7914)"
				id="on_time-b"
				x1="0"
				x2="0"
				xlinkHref="#on_time-a"
				y1="394.41"
				y2="395.06"
			/>
			<linearGradient
				gradientTransform="matrix(1 0 0 -20 30 7914)"
				id="on_time-c"
				x1="0"
				x2="0"
				xlinkHref="#on_time-a"
				y1="394.41"
				y2="395.06"
			/>
			<linearGradient
				gradientTransform="matrix(33 0 0 -1 9217 69)"
				id="on_time-d"
				x1="-277.6"
				x2="-276.94"
				xlinkHref="#on_time-a"
				y1="36"
				y2="36"
			/>
			<linearGradient
				gradientTransform="matrix(24 0 0 -24 6630 9559)"
				id="on_time-e"
				x1="-275.5"
				x2="-275.5"
				xlinkHref="#on_time-a"
				y1="397.56"
				y2="398.21"
			/>
			{/* affordable */}
			<linearGradient
				id="affordable-a"
				x1="94.73%"
				x2="12.79%"
				y1="83.82%"
				y2="-10.08%"
			>
				<stop offset="0" stopColor="#2d82e4" />
				<stop offset="1" stopColor="#69afff" />
			</linearGradient>
		</Icon>
	);
}

export function AboutPageIconGradients() {
	return (
		<Icon
			className="sr-only"
			height="0"
			width="0"
			xmlns="http://www.w3.org/2000/svg"
		>
			<SharedGradients />
		</Icon>
	);
}
