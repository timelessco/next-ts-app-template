"use client";

import { useRef, type ComponentProps } from "react";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from "motion/react";

const ROTATION_RANGE = 20;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

type ProcessCardSectionProps = ComponentProps<typeof motion.div>;

export function ProcessCardClient(props: ProcessCardSectionProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const xSpring = useSpring(x, { damping: 20, stiffness: 150 });
	const ySpring = useSpring(y, { damping: 20, stiffness: 150 });

	const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return;

		const rect = ref.current.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;

		const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
		const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

		const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
		const rY = mouseX / width - HALF_ROTATION_RANGE;

		x.set(-rX);
		y.set(-rY);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			onPointerMove={handleMouseMove}
			onPointerUp={handleMouseLeave}
			ref={ref}
			style={{
				transform,
				transformStyle: "preserve-3d",
			}}
			{...props}
		/>
	);
}
