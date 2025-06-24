import { NextImage } from "@/components/image/NextImage";

import pantryCouchImage from "../../images/about-page/pantry-couch.png";
import standingDeskImage from "../../images/about-page/standing-desk.png";
import tableTennisImage from "../../images/about-page/table-tennis.png";
import workAreaImage from "../../images/about-page/work-area.png";
import { EmblaCarouselWrapper } from "./ImageCarouselClient";

const images = [
	{
		alt: "Office pantry area with yellow tufted sofa, white round coffee table, and refrigerator against dark wall",
		id: "pantry",
		src: pantryCouchImage,
	},
	{
		alt: "Employee working at standing desk bar with modern wooden high chairs and Timeless logo on glass wall",
		id: "standing",
		src: standingDeskImage,
	},
	{
		alt: "Team member playing table tennis in office recreation area wearing Batman t-shirt",
		id: "table",
		src: tableTennisImage,
	},
	{
		alt: "Open office workspace with multiple workstations, iMac computers, and modern ergonomic chairs in bright interior",
		id: "work",
		src: workAreaImage,
	},
	{
		alt: "Office pantry area with yellow tufted sofa, white round coffee table, and refrigerator against dark wall",
		id: "pantry-2",
		src: pantryCouchImage,
	},
	{
		alt: "Employee working at standing desk bar with modern wooden high chairs and Timeless logo on glass wall",
		id: "standing-2",
		src: standingDeskImage,
	},
	{
		alt: "Team member playing table tennis in office recreation area wearing Batman t-shirt",
		id: "table-2",
		src: tableTennisImage,
	},
	{
		alt: "Open office workspace with multiple workstations, iMac computers, and modern ergonomic chairs in bright interior",
		id: "work-2",
		src: workAreaImage,
	},
	{
		alt: "Office pantry area with yellow tufted sofa, white round coffee table, and refrigerator against dark wall",
		id: "pantry-3",
		src: pantryCouchImage,
	},
	{
		alt: "Employee working at standing desk bar with modern wooden high chairs and Timeless logo on glass wall",
		id: "standing-3",
		src: standingDeskImage,
	},
	{
		alt: "Team member playing table tennis in office recreation area wearing Batman t-shirt",
		id: "table-3",
		src: tableTennisImage,
	},
	{
		alt: "Open office workspace with multiple workstations, iMac computers, and modern ergonomic chairs in bright interior",
		id: "work-3",
		src: workAreaImage,
	},
];

// Initial jittering will be fixed in v9 of embla-carousel-react - https://github.com/davidjerleke/embla-carousel/issues/202
export function ImageCarousel() {
	return (
		<section
			aria-label="About us image carousel"
			className="pt-7 pb-8 md:pb-20"
		>
			<EmblaCarouselWrapper className="cursor-grab touch-pan-y overflow-hidden [&.is-draggable]:cursor-grab [&.is-dragging]:cursor-grabbing">
				<div className="flex w-full touch-pan-y touch-pinch-zoom ease-out-quad will-change-transform [-webkit-tap-highlight-color:transparent] [backface-visibility:hidden]">
					{images.map((image) => (
						<NextImage
							alt={image.alt}
							className="w-[450px] shrink-0 pr-5 md:w-155"
							key={image.id}
							src={image.src}
						/>
					))}
				</div>
			</EmblaCarouselWrapper>
		</section>
	);
}
