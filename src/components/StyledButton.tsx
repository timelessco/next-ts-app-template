import { Button, type ButtonProps } from "@ariakit/react";

import { cn } from "@/utils/index";

export type StyledButtonProps = ButtonProps;

export function StyledButton(props: StyledButtonProps) {
	const { className, ...rest } = props;

	return (
		<Button
			className={cn(
				"cursor-pointer appearance-none align-middle whitespace-nowrap outline-hidden transition-all select-none disabled:cursor-not-allowed data-focus-visible:ring-2 data-focus-visible:ring-[#171717]",
				className,
			)}
			{...rest}
		/>
	);
}
