"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import { ReactNode } from "react";
export default function AnimatedSection({
  children,
  animateOnScrollUp = false,
  delay = 0,
}: {
  children: ReactNode;
  animateOnScrollUp?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const hasAnimated = useRef(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const checkIfInView = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setShouldAnimate(true);
          hasAnimated.current = true;
        }
      }
    };

    checkIfInView();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setShouldAnimate(true);
          hasAnimated.current = true;
        } else if (!entry.isIntersecting && animateOnScrollUp) {
          hasAnimated.current = false;
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [animateOnScrollUp]);

  useEffect(() => {
    if (shouldAnimate) {
      setTimeout(() => {
        controls.start({ opacity: 1, y: 0 });
      }, delay * 1000);
    }
  }, [shouldAnimate, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{
        opacity: { duration: 0.75, ease: [0.4, 0, 0.3, 1] },
        y: { duration: 0.75, ease: [0.4, 0, 0.3, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}
