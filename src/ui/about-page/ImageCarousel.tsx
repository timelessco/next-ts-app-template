import { NextImage } from "@/components/image/NextImage";

import pantryCouchImage from "../../images/about-page/pantry-couch.png";
import standingDeskImage from "../../images/about-page/standing-desk.png";
import tableTennisImage from "../../images/about-page/table-tennis.png";
import workAreaImage from "../../images/about-page/work-area.png";
import { EmblaCarouselWrapper } from "./ImageCarouselClient";

const images = [
	{ id: "pantry", src: pantryCouchImage },
	{ id: "standing", src: standingDeskImage },
	{ id: "table", src: tableTennisImage },
	{ id: "work", src: workAreaImage },
	{ id: "pantry-2", src: pantryCouchImage },
	{ id: "standing-2", src: standingDeskImage },
	{ id: "table-2", src: tableTennisImage },
	{ id: "work-2", src: workAreaImage },
	{ id: "pantry-3", src: pantryCouchImage },
	{ id: "standing-3", src: standingDeskImage },
	{ id: "table-3", src: tableTennisImage },
	{ id: "work-3", src: workAreaImage },
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
							alt={`Slide ${image.id}`}
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
