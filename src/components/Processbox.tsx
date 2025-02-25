"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

function round(num: number, fix = 2) {
  return parseFloat(num.toFixed(fix));
}

function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

type ProcessBoxProps = {
  title: string;
  image: string;
  depth?: number;
};

export default function ProcessBox({
  title,
  image,
  depth = 7,
}: ProcessBoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>("");

  const [supportsHover, setSupportsHover] = useState<boolean>(true);

  useEffect(() => {
    const hasTouchEvent =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setSupportsHover(!hasTouchEvent);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current || !supportsHover) return;

    const rect = ref.current.getBoundingClientRect();
    const absolute = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    const percent = {
      x: round((100 / rect.width) * absolute.x),
      y: round((100 / rect.height) * absolute.y),
    };
    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    };

    const rX = round(-center.y / depth);
    const rY = round(center.x / depth);

    const dist = distance(percent.x, percent.y, 50, 50);
    const z = round(dist / 25);

    setTransformStyle(
      `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale(${
        1 + z / 50
      })`
    );
  };

  const handleMouseLeave = () => {
    if (!supportsHover) return;
    setTransformStyle("rotateX(0deg) rotateY(0deg) scale(1)");
  };

  useEffect(() => {
    if (!supportsHover) {
      const interval = setInterval(() => {
        const angle = (Date.now() / 2000) % (2 * Math.PI);
        const rX = Math.sin(angle) * 2;
        const rY = Math.cos(angle) * 2;

        setTransformStyle(
          `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale(1.02)`
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [supportsHover]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transformStyle: "preserve-3d",
        transition: "transform 100ms",
        position: "relative",
        zIndex: 10,
      }}
      className="cursor-pointer w-[165px] md:w-[200px] h-[165px] md:h-[200px] pt-[35px] pb-[38px] md:py-[38px] px-[10px] bg-white flex flex-col items-center justify-center font-normal text-2xl text-[rgba(7,18,44,0.65)] rounded-[9px] shadow-[0_0_1px_0_rgba(0,0,0,0.20),0_1px_2px_0_rgba(0,0,0,0.07)] hover:shadow-2xl transition-shadow duration-300"
    >
      <div
        style={{
          transform: "translateZ(20px)",
          transition: "transform 100ms",
        }}
      >
        <Image
          alt={title}
          src={image}
          width={60}
          height={64}
          className="md:mb-[30px] mb-[15px] pointer-events-none w-auto h-auto"
        />
      </div>
      <div
        style={{
          transform: "translateZ(15px)",
          transition: "transform 100ms",
        }}
      >
        {title}
      </div>
    </div>
  );
}
