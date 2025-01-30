import Arrow from "@/components/arrow";
import TestimonialCarousel from "@/components/carousel";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <div className="max-w-[1190px] px-[15px] mx-auto pt-[85px]">
        <div className="font-light text-[3.625rem] leading-[1.05] text-black tracking-[-0.6px] antialiased pt-[32px]">
          We build brands, <br />
          products and apps.
        </div>
        <div className="rounded bg-[linear-gradient(45deg,#34B1E0_0%,#A7E0F5_100%)] flex flex-row  hover:drop-shadow-xl transition duration-500 mt-[72px] hover:-translate-y-[3px]">
          <div className="flex flex-col justify-center hd:pl-[120px]  max-w-[480px] pl-[96px]">
            <div className="font-light text-[23px] text-white tracking-[0] mb-[0.5rem] antialiased optimizeLegibility">
              Atlantic payroll
            </div>
            <div className="font-lyondisplayweb text-[3.125rem] text-white leading-none font-bold">
              Rethinking the online payroll experience
            </div>
          </div>
          <div className="h-[580px] min-w-[486px] relative ml-[45px] items-center">
            <Image
              src={"/mobile-view.png"}
              alt={"mobile-view"}
              fill
              className="pt-[3.5rem]"
              sizes="486px"
            ></Image>
          </div>
        </div>
        <div className="rounded bg-[linear-gradient(45deg,#19C391_0%,#49C07D_100%)] flex flex-row  hover:drop-shadow-lg  transition duration-500 mt-[72px] hover:-translate-y-[3px]">
          <div className="flex flex-col justify-center hd:pl-[120px]  max-w-[480px] pl-[96px]">
            <div className="font-light text-[23px] text-white tracking-[0] mb-[0.5rem] antialiased optimizeLegibility">
              Smallcase
            </div>
            <div className="font-lyondisplayweb text-[3.125rem] text-white leading-none font-bold">
              Stock investing for everyone
            </div>
          </div>
          <div className="h-[580px] min-w-[640px] relative ml-[45px] items-center">
            <Image
              src={"/smallcase.png"}
              alt={"smallcase"}
              fill
              className="pt-[15px]"
              sizes="640px"
            ></Image>
          </div>
        </div>
        <div className="rounded bg-[url(/bluematter.jpg)] flex flex-row  hover:drop-shadow-lg mt-[72px] h-[580px] min-w-[640px] transition duration-500 hover:-translate-y-[3px]">
          <div className="flex flex-col justify-center hd:pl-[120px]  max-w-[600px] pl-[96px]">
            <div className="font-light text-[23px] text-white tracking-[0] mb-[0.5rem] antialiased optimizeLegibility">
              Bluematter
            </div>
            <div className="font-lyondisplayweb text-[3.125rem] text-white leading-none font-bold">
              Solving America&apos;s marketing woes
            </div>
          </div>
        </div>
        <div className="rounded bg-[linear-gradient(45deg,#5B6AFF_0%,#919AFF_100%)] flex flex-row  hover:drop-shadow-lg  justify-between transition duration-500 mt-[72px] hover:-translate-y-[3px]">
          <div className="flex flex-col justify-center hd:pl-[120px]  max-w-[480px] pl-[96px]">
            <div className="font-light text-[23px] text-white tracking-[0] mb-[0.5rem] antialiased optimizeLegibility">
              Photon
            </div>
            <div className="font-lyondisplayweb text-[3.125rem] text-white leading-none font-bold">
              Disrupting the cloud infrastructure
            </div>
          </div>
          <div className="h-[576px] min-w-[635px] relative  items-center">
            <Image
              src={"/photon-1.png"}
              alt={"mobile-view"}
              sizes="635px"
              className="pb-[48px] pt-[8px]"
              fill
            ></Image>
          </div>
        </div>
      </div>
      <TestimonialCarousel />
      <div className="bg-black hover:bg-blue-500 flex flex-col items-center justify-center  relative leading-[1.1] group transition-colors duration-300 py-[160px]">
        <div className="text-white text-[2.875rem] text-center tracking-[0.4px] antialiased font-lyondisplayweb font-light mb-[33px]">
          <p>Solving business problems with</p>
          <p>user-centric design</p>
        </div>
        <div className="flex items-center gap-2 text-xl text-[2rem] text-[#2D82E4] tracking-[0] relative mb-0 group-hover:text-white antialiased font-light transition-colors duration-300">
          <p className="flex items-center gap-2 text-[2rem]">
            Learn more about us
          </p>
          <Arrow />
        </div>
      </div>
    </>
  );
}
