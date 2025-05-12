import { Icon, type IconProps } from "@/components/Icon";

type ArrowIconProps = IconProps;

export function ArrowIcon(props: ArrowIconProps) {
	return (
		<Icon viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M13.293.293a1 1 0 0 1 1.338-.068l.076.068 7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 1 1-1.414-1.414L18.586 9H1a1 1 0 1 1 0-2h17.586l-5.293-5.293-.068-.076a1 1 0 0 1 .068-1.338Z"
				fill="currentColor"
			/>
		</Icon>
	);
}
