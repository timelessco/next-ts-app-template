"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import Image from "next/image";
import { PageScrollEmblaPlugin } from "./PageScrollEmblaPlugin";

const images = [
  "/carousel-images/pantry-couch.png",
  "/carousel-images/standing-desk.png",
  "/carousel-images/table-tennis.png",
  "/carousel-images/work-area.png",
  "/carousel-images/standing-desk.png", //placeholder image 1
  "/carousel-images/table-tennis.png", //placeholder image 2
];

export default function ImageCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: "trimSnaps",
      dragFree: false,
      breakpoints: {
        "(min-width: 1024px)": { align: "end" },
      },
    },
    [ClassNames(), PageScrollEmblaPlugin()]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div
      className="relative overflow-hidden pt-7 pb-8 md:pb-20 touch-pan-y cursor-grab active:cursor-grabbing"
      ref={emblaRef}
    >
      <div className="flex">
        {images.map((src, index) => (
          <div
            className="rounded-[5px] mr-4 shrink-0 max-w-[430px] sm:max-w-full md:w-[600px] sm:h-[311px] md:h-[435px]"
            key={index}
          >
            <Image
              src={src}
              alt={`Slide ${index}`}
              className="rounded-md object-cover w-full h-full"
              height={435}
              width={600}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
