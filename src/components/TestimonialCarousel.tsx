"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [ClassNames()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setTimeout(() => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-gray-100 flex justify-center pt-[64px] md:pt-[96px] pb-[43px] md:pb-[53px] lg:pt-[12.25rem] lg:pb-[153px]">
      <div className="canister">
        <div className="max-w-3xl w-full text-center mx-auto">
          <h3 className="font-bold text-[rgba(7,18,44,0.55)] uppercase text-light tracking-[1.97px] text-[13px] md:text-[15px]">
            What Our Client Says
          </h3>
          <div
            className={
              "overflow-hidden flex justify-center cursor-grab active:cursor-grabbing"
            }
            ref={emblaRef}
          >
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full flex flex-col items-center text-center transition-opacity duration-700 ease-in-out opacity-100 [&:not(.is-snapped)]:opacity-0"
                >
                  {/* Testimonial Text */}
                  <div className="min-[320px]:max-w-[287px] min-[400px]:max-w-[380px] relative md:max-w-[560px] my-[25px] md:mb-[30px] flex">
                    <p className="max-w-full text-[1.5rem] md:text-[1.875rem] font-light leading-[1.33] tracking-[0.56px] font-lyondisplayweb  text-black text-center">
                      {testimonial.text}
                    </p>
                  </div>
                  {/* Profile Section */}
                  <div className="flex flex-col items-center mt-6 text-center tracking-[0.3px]">
                    <div className="relative w-[60px] h-[60px] mb-5">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="rounded-full object-cover"
                        fill
                        sizes="60px"
                      />
                    </div>
                    <p className="font-normal text-black text-[20px] leading-[1.2] tracking-[0]">
                      {testimonial.name}
                    </p>
                    <p className="font-normal text-lg text-[rgba(7,18,44,0.65)]  tracking-[0.3] leading-[1.5]">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Dots Indicator */}
          <div className="mt-[40px] flex justify-center space-x-[10px]">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-[6px] h-[6px] rounded-full ${
                  selectedIndex === index ? "bg-gray-900" : "bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
