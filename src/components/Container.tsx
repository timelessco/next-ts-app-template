import { clsx } from "clsx";

import { Presentation, type PresentationProps } from "./Presentation";

type ContainerProps = PresentationProps;

export function Container(props: ContainerProps) {
	const { className, ...rest } = props;

	return (
		<Presentation
			className={clsx(
				"relative mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-(--breakpoint-xl)",
				className,
			)}
			{...rest}
		/>
	);
}
