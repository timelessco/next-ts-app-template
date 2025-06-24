"use client";

import { type ReactElement } from "react";
import { Role, type RoleProps } from "@ariakit/react";

export type SlotProps = RoleProps;

export function Slot(props: SlotProps) {
	const { children, ...rest } = props;

	return <Role {...rest} render={children as ReactElement} />;
}
