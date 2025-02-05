"use client";
import Arrow from "@/components/arrow";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

import { ReactNode } from "react";

const AnimatedSection = ({
  children,
  animateOnScrollUp = false,
  delay = 0,
}: {
  children: ReactNode;
  animateOnScrollUp?: boolean;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasAnimated.current) {
            setTimeout(() => {
              controls.start({ opacity: 1, y: 0 });
            }, delay * 1000);
            hasAnimated.current = true;
          }
        } else if (!entry.isIntersecting && animateOnScrollUp) {
          hasAnimated.current = false;
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);

      if (ref.current.getBoundingClientRect().top < window.innerHeight) {
        controls.start({ opacity: 1, y: 0 });
        hasAnimated.current = true;
      }
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [controls, delay, animateOnScrollUp]);

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
};

export default function Home() {
  return (
    <>
      <div className="canister pt-[85px]">
        <AnimatedSection>
          <div className="font-light text-[2.25rem] md:text-[3rem] lg:text-[3.625rem] leading-[1.05] text-black tracking-[-0.6px]  pt-[60px] md:pt-[90px] lg:pt-[107px] text-center md:text-left">
            We build brands, <br />
            products and apps.
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <div
            className="rounded justify-center lg:justify-start bg-[linear-gradient(45deg,#34B1E0_0%,#A7E0F5_100%)] flex flex-row  hover:drop-shadow-xl transition duration-500 mt-[92px] lg:mt-[72px] hover:-translate-y-[3px] flex-wrap lg:flex-nowrap items-center lg:items-left cursor-pointer"
            onClick={() => {
              window.open("https://atlanticpayroll.tmls.dev/", "_blank");
            }}
          >
            <div className="flex flex-col lg:pl-[96px] xl:pl-[120px] max-w-[370px] lg:max-w-[480px]  text-center lg:text-left mt-[30px] md:mt-[52px] lg:mt-[0px]">
              <div className="font-light text-[20px] lg:text-[23px] text-white tracking-[0] mb-[15px] lg:mb-2 leading-[1.2]">
                Atlantic payroll
              </div>
              <div className="font-lyondisplayweb lg:text-[3.125rem] md:text-[2.25rem] text-[2rem] text-white  font-bold  mb-[8px] leading-[1.1] lg:leading-none">
                Rethinking the online payroll experience
              </div>
            </div>
            <div className="lg:w-[469px] md:w-[400px]  relative   items-center">
              <Image
                src={"/mobile-view.png"}
                alt={"mobile-view"}
                height={972}
                width={1024}
                className="lg:pt-[3.5rem]"
              ></Image>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <div
            className="rounded justify-center bg-[linear-gradient(45deg,#19C391_0%,#49C07D_100%)] flex flex-row  hover:drop-shadow-xl transition duration-500 mt-[56px] lg:mt-[72px] hover:-translate-y-[3px] flex-wrap lg:flex-nowrap items-center lg:items-left lg:justify-between cursor-pointer"
            onClick={() => {
              window.open("https://smallcase.tmls.dev/", "_blank");
            }}
          >
            <div className="flex flex-col lg:pl-[96px] xl:pl-[120px] max-w-[360px] lg:max-w-[480px]  text-center lg:text-left mt-[30px] md:mt-[52px] lg:mt-[0px]">
              <div className="font-light text-[20px] lg:text-[23px] text-white tracking-[0] mb-[15px] lg:mb-2 leading-[1.2]">
                Smallcase
              </div>
              <div className="font-lyondisplayweb lg:text-[3.125rem] md:text-[2.25rem] text-[2rem] text-white  font-bold  mb-[8px] leading-[1.1] lg:leading-none">
                Stock investing for everyone
              </div>
            </div>
            <div className="lg:w-[595px] xl:w-[640px] md:w-[738px] xl:ml-[45px] relative items-center">
              <Image
                src={"/smallcase.png"}
                alt={"smallcase"}
                height={1278}
                width={1130}
                className="lg:pt-[15px]"
              ></Image>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <div
            className="rounded bg-[url(/bluematter.jpg)] flex flex-row  hover:drop-shadow-lg mt-[56px] lg:mt-[72px] py-[216px] transition duration-500 hover:-translate-y-[3px] bg-right-top lg:bg-center justify-center lg:justify-start cursor-pointer"
            onClick={() => {
              window.open("https://bluematter.tmls.dev/", "_blank");
            }}
          >
            <div className="flex flex-col justify-center lg:leading-none leading-[1.1] max-w-[380] lg:max-w-[600px] lg:pl-[96px] xl:pl-[120px] text-center lg:text-left lg:mb-2">
              <div className="font-light text-[23px] text-white tracking-[0] mb-[0.5rem] lg:leading-[1.2]">
                Bluematter
              </div>
              <div className="font-lyondisplayweb text-[2rem] md:text-[2.25rem] lg:text-[3.125rem] text-white leading-none font-bold">
                Solving America&apos;s marketing woes
              </div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection>
          <div
            className="justify-center rounded bg-[linear-gradient(45deg,#5B6AFF_0%,#919AFF_100%)] flex flex-row  hover:drop-shadow-lg  lg:justify-between transition duration-500 mt-[56px] lg:mt-[72px] hover:-translate-y-[3px] flex-wrap lg:flex-nowrap mb-[72px] cursor-pointer"
            onClick={() => {
              window.open("https://photon.tmls.dev/", "_blank");
            }}
          >
            <div className="flex flex-col justify-center text-center lg:text-left max-w-[360px] lg:max-w-[450px] xl:max-w-[480px] lg:pl-[96px] xl:pl-[120px]">
              <div className="mt-[32px] md:mt-[52px] lg:mt-[0px] font-light text-[20px] lg:text-[23px] text-white tracking-[0] mb-[15px] lg:mb-2 leading-[1.2]">
                Photon
              </div>
              <div className="font-lyondisplayweb lg:text-[3.125rem] md:text-[2.25rem] text-[2rem] text-white  font-bold  mb-[8px] leading-[1.1] lg:leading-none">
                Disrupting the cloud infrastructure
              </div>
            </div>
            <div className="lg:w-[543px] xl:w-[635px] md:w-[738px]  relative items-center">
              <Image
                src={"/photon-1.png"}
                alt={"photon-1"}
                height={1260}
                width={1032}
                className="lg:pt-[8px] pb-[48px]"
              ></Image>
            </div>
          </div>
        </AnimatedSection>
      </div>
      <TestimonialCarousel />
      <div
        className="bg-black hover:bg-blue-500 flex flex-col items-center justify-center relative leading-[1.1] group transition-colors duration-300 py-[80px] md:py-[122px]  lg:py-[160px] cursor-pointer"
        onClick={() => (window.location.href = "/about")}
      >
        <div className="canister">
          <div className="mx-auto  text-white lg:text-[2.875rem] text-[2rem] md:text-[2.5rem] text-center tracking-[0.4px]  font-lyondisplayweb font-light mb-[25px] leading-[1.08] max-w-[720px]">
            <p>Solving business problems with user-centric design</p>
          </div>
          <div className="justify-center flex items-center gap-2 text-xl text-[2rem] text-[#2D82E4] tracking-[0] relative mb-0 group-hover:text-white  font-light transition-colors duration-300">
            <p className="text-[1.75rem] md:text-[2rem] leading-[1.5]">
              Learn more about us
            </p>
            <Arrow />
          </div>
        </div>
      </div>
    </>
  );
}
