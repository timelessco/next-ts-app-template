"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const testimonials = [
  {
    text: "We've engaged Timeless many times over several years and I have never had anything but the highest quality work done by the most professional people, on time and with excellent communication.",
    name: "Ryan McInerney",
    position: "CEO, Bluematter",
    image: "/ryan-avatar.png",
  },
  {
    text: "We've engaged Timeless for our product design at smallcase, and have super delighted with the work done. Very smart, professional & flexible. Would love to collaborate again.",
    name: "Vasanth Kamath",
    position: "Founder & CEO, Smallcase",
    image: "/vasanth-avatar.png",
  },
  {
    text: "Timeless delivers the highest quality user experiences on time and on budget. Sandeep's team is second to none!",
    name: "Justin Young",
    position: "Marketing Director,Slavic401k",
    image: "/justin-avatar.png",
  },
  {
    text: "We have worked with Timeless multiple times over the years and they have always delivered exceptionally well with a keen eye for detail",
    name: "Mikael Uusitalo",
    position: "CEO, Thrillism",
    image: "/mikael-avatar.png",
  },
  {
    text: "We hired Timeless for helping with our product needs. The result was beyond good and exceeded my exceptions.",
    name: "Greg Osuri",
    position: "CEO, Overclock Labs",
    image: "/greg-avatar.png",
  },
];

const TestimonialCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-gray-100   flex justify-center px-4 mt-[72px] pt-[196px] pb-[150px]">
      <div className="max-w-3xl text-center px-[15px]">
        <h3 className="font-bold text-[15px] text-[rgba(7,18,44,0.55)] tracking-[1.97px]">
          WHAT OUR CLIENT SAYS
        </h3>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div className="flex-shrink-0 w-full justify-center" key={index}>
                <p className="font-light text-3xl text-black tracking-[0.56px] leading-[1.333] my-[25px] font-lyondisplayweb antialiased h-[199px] w-[560px] flex items-center justify-center text-center mx-auto">
                  {testimonial.text}
                </p>

                <div className="flex flex-col items-center pb-[25px]">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-full object-cover mt-[25px] mb-[20px]"
                    height={"60"}
                    width={"60"}
                  />
                  <p className="font-normal text-xl text-black tracking-[0] mb-0;">
                    {testimonial.name}
                  </p>
                  <p className="font-normal text-lg text-[rgba(7,18,44,0.65)] tracking-[0.3px] antialiased">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Dots Indicator */}
        <div className="mt-5 flex justify-center space-x-[10px]">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-[6px] h-[6px] rounded-full ${
                selectedIndex === index
                  ? "bg-gray-900"
                  : "bg-gray-400 font-light"
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
