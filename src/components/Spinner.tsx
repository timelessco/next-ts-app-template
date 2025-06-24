import { type ComponentProps } from "react";

import { cn } from "../utils";

type SpinnerProps = ComponentProps<"div">;

export function Spinner(props: SpinnerProps) {
	const { className } = props;

	return (
		<div
			className={cn(
				"inline-block shrink-0 animate-spin rounded-full border-solid border-current border-b-transparent border-l-transparent",
				className,
			)}
		>
			<span className="sr-only">Loading...</span>
		</div>
	);
}
