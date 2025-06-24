import { type ReactNode } from "react";

interface ProvidersProps {
	readonly children: ReactNode;
}

export function Providers(props: ProvidersProps) {
	const { children } = props;

	return <>{children}</>;
}
