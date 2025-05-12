import Image from "next/image";

import { Container } from "@/components/Container";

import gregAvatarImage from "../../images/home-page/greg-avatar.png";
import justinAvatarImage from "../../images/home-page/justin-avatar.png";
import mikaelAvatarImage from "../../images/home-page/mikael-avatar.png";
import ryanAvatarImage from "../../images/home-page/ryan-avatar.png";
import vasanthAvatarImage from "../../images/home-page/vasanth-avatar.png";
import {
	TestimonialEmblaCarouselDotButton,
	TestimonialEmblaCarouselSection,
	TestimonialEmblaCarouselWrapper,
} from "./TestimonialCarouselClient";

const TESTIMONIAL_SECTION_ID = "homepage__section--testimonial-carousel";

export function TestimonialCarousel() {
	return (
		<TestimonialEmblaCarouselSection
			aria-labelledby={TESTIMONIAL_SECTION_ID}
			className="flex overflow-hidden bg-[#F5F6F8] pt-16 pb-20 text-center md:py-24 lg:pt-49 lg:pb-50"
		>
			<Container className="relative">
				<h2
					className="text-[13px] leading-[1.2] font-bold tracking-[1.97px] text-[#07122C]/55 uppercase md:text-[0.9375rem]"
					id={TESTIMONIAL_SECTION_ID}
				>
					What Our Clients Say
				</h2>
				{/* Dots Indicator */}
				<ol className="absolute -bottom-10 left-2/4 flex -translate-x-2/4 space-x-2.5 md:-bottom-12.5 lg:-bottom-25">
					{TESTIMONIALS.map((testimonial, index) => {
						const { id } = testimonial;

						return (
							<li
								className="inline-flex"
								key={`testimonial-carousel-dot-button-${id}`}
							>
								<TestimonialEmblaCarouselDotButton
									aria-label={`Dot button ${id} of ${TESTIMONIALS.length}`}
									className="size-1.5 rounded-full bg-[#333] opacity-25 ease-in-out hover:scale-150 data-[selected=true]:opacity-100 md:size-2 lg:size-2.5"
									index={index}
								/>
							</li>
						);
					})}
				</ol>

				<TestimonialEmblaCarouselWrapper className="touch-pan-y touch-pinch-zoom ease-out-quad select-none [-webkit-tap-highlight-color:transparent] backface-hidden [&.is-draggable]:cursor-grab [&.is-dragging]:cursor-grabbing">
					<ol className="flex">
						{TESTIMONIALS.map((testimonial) => {
							const { id, image, name, position, text } = testimonial;

							return (
								<li
									className="min-w-0 shrink-0 grow-0 basis-full [transform:translate3d(0,0,0] opacity-100 transition-opacity duration-300 ease-in [&:not(.is-snapped)]:opacity-0 [&:not(.is-snapped)]:ease-out"
									key={`testimonial-embla-carousel-id-${id}`}
								>
									<div className="mx-auto flex max-w-140 flex-col">
										<p className="my-[25px] font-lyon text-2xl leading-[1.333] font-light tracking-[0.56px] text-black md:text-3xl">
											{text}
										</p>
										<div className="flex flex-col items-center">
											<Image
												alt={name}
												className="mt-2.5 mb-5 size-15 rounded-full md:mt-[25px]"
												src={image}
											/>
											<h3 className="text-xl leading-[1.2]">{name}</h3>
											<h4 className="text-lg leading-normal tracking-[0.3px] text-[#07122C]/65">
												{position}
											</h4>
										</div>
									</div>
								</li>
							);
						})}
					</ol>
				</TestimonialEmblaCarouselWrapper>
			</Container>
		</TestimonialEmblaCarouselSection>
	);
}

const TESTIMONIALS = [
	{
		id: 1,
		image: ryanAvatarImage,
		name: "Ryan McInerney",
		position: "CEO, Bluematter",
		text: "We've engaged Timeless many times over several years and I have never had anything but the highest quality work done by the most professional people, on time and with excellent communication.",
	},
	{
		id: 2,
		image: vasanthAvatarImage,
		name: "Vasanth Kamath",
		position: "Founder & CEO, Smallcase",
		text: "We've engaged Timeless for our product design at smallcase, and have super delighted with the work done. Very smart, professional & flexible. Would love to collaborate again.",
	},
	{
		id: 3,
		image: justinAvatarImage,
		name: "Justin Young",
		position: "Marketing Director, Slavic401k",
		text: "Timeless delivers the highest quality user experiences on time and on budget. Sandeep's team is second to none!",
	},
	{
		id: 4,
		image: mikaelAvatarImage,
		name: "Mikael Uusitalo",
		position: "CEO, Thrillism",
		text: "We have worked with Timeless multiple times over the years and they have always delivered exceptionally well with a keen eye for detail",
	},
	{
		id: 5,
		image: gregAvatarImage,
		name: "Greg Osuri",
		position: "CEO, Overclock Labs",
		text: "We hired Timeless for helping with our product needs. The result was beyond good and exceeded my exceptions.",
	},
];
