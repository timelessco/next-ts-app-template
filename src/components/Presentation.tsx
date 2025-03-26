import { type ComponentProps } from "react";

export type PresentationProps = ComponentProps<"div">;

export function Presentation(props: PresentationProps) {
	const { role = "presentation", ...rest } = props;

	return <div role={role} {...rest} />;
}
