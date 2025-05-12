import { Icon } from "@/components/Icon";
import type { WhyTimelessContentType } from "@/app/process/page";

type WhyTimelessContentProps = WhyTimelessContentType;

export function WhyTimelessContent(props: WhyTimelessContentProps) {
	const { desc, iconName, sectionTitle } = props;

	return (
		<div className="relative">
			<Icon
				className="mb-[10px] text-[36px] lg:absolute lg:top-[5px] lg:-left-[70px]"
				name={iconName}
			/>
			<h3 className="mb-[15px] text-[1.625rem] leading-[1.2] font-semibold">
				{sectionTitle}
			</h3>
			<p className="mb-4 text-xl leading-[29px] font-light tracking-[0.19px] text-[#07122C]/65">
				{desc}
			</p>
		</div>
	);
}
