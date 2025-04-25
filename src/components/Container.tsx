import type { ComponentProps } from "react";

import { cn } from "../utils";

type ContainerProps = ComponentProps<"div">;

export function Container(props: ContainerProps) {
	const { className, ...rest } = props;

	return (
		<div
			className={cn(
				"container mx-auto max-w-[1224px] px-4 sm:px-6 lg:px-8",
				className,
			)}
			{...rest}
		/>
	);
}
