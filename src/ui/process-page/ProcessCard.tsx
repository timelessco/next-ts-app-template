import { Icon } from "@/components/Icon";
import type { IconName } from "@/icons/icon-name";

import { ProcessCardClient } from "./ProcessCardClient";

interface ProcessBoxProps {
	iconName: IconName;
	title: string;
}

export function ProcessCard(props: ProcessBoxProps) {
	const { iconName, title } = props;

	return (
		<div className="relative z-1 transition-all duration-300 ease-in-out hover:scale-110">
			<ProcessCardClient className="mx-auto my-[25px] flex size-[165px] cursor-pointer flex-col items-center justify-center rounded-[9px] bg-white shadow-[0_0_1px_0_rgba(0,0,0,0.20),0_1px_2px_0_rgba(0,0,0,0.07)] transition-shadow duration-300 ease-in-out select-none hover:shadow-[3px_5px_40px_-2px_rgba(0,0,0,0.10),0px_1px_7px_0px_rgba(0,0,0,0.07)] sm:m-[15px] sm:size-50 lg:m-0">
				<Icon
					className="mb-2.5 translate-z-[30px] text-[64px] sm:mb-7.5"
					name={iconName}
				/>
				<p className="translate-z-[25px] text-2xl leading-normal text-[#07122C]/65">
					{title}
				</p>
			</ProcessCardClient>
		</div>
	);
}
