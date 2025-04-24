import * as motion from "motion/react-client";

import { Container } from "@/components/Container";
import { cn, FADE_IN_WHEN_VISIBLE_MOTION_PROPS } from "@/utils/index";

const HERO_SECTION_ID = "homepage__section--hero-heading";
const {
	className: fadeInWhenVisibleClassName,
	...fadeInWhenVisibleMotionProps
} = FADE_IN_WHEN_VISIBLE_MOTION_PROPS;

export default function Home() {
	return (
		<main>
			<section
				aria-labelledby={HERO_SECTION_ID}
				className="pt-12 md:pt-20 lg:pt-40"
			>
				<Container>
					<motion.h1
						className={cn(
							"max-w-[480px] pt-24 pb-16 text-center text-4xl leading-[1.05] font-light tracking-[-0.6px] text-black sm:text-left sm:text-5xl lg:py-8 lg:text-[3.625rem]",
							fadeInWhenVisibleClassName,
						)}
						id={HERO_SECTION_ID}
						{...fadeInWhenVisibleMotionProps}
					>
						We build brands, products and apps.
					</motion.h1>
				</Container>
			</section>
		</main>
	);
}
