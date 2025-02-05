import Arrow from "@/components/arrow";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="canister pt-[85px]">
        <div className="font-light text-[2.25rem] md:text-[3rem] lg:text-[3.625rem] leading-[1.05] text-black tracking-[-0.6px]  pt-[60px] md:pt-[90px] lg:pt-[109px] text-center md:text-left">
          We build brands, <br />
          products and apps.
        </div>
        <div className="rounded justify-center lg:justify-start bg-[linear-gradient(45deg,#34B1E0_0%,#A7E0F5_100%)] flex flex-row  hover:drop-shadow-xl transition duration-500 md:mt-[72px] mt-[92px] hover:-translate-y-[3px] flex-wrap lg:flex-nowrap items-center lg:items-left">
          <div className="flex flex-col lg:pl-[96px] xl:pl-[120px] max-w-[360px] lg:max-w-[480px]  text-center lg:text-left mt-[30px] md:mt-[52px] lg:mt-[0px]">
            <div className="font-light text-[20px] lg:text-[23px] text-white tracking-[0] mb-[15px] lg:mb-[5px]  ">
              Atlantic payroll
            </div>
            <div className="font-lyondisplayweb lg:text-[3.125rem] md:text-[2.25rem] text-[2rem] text-white  font-bold  mb-[8px] leading-[1.1] lg:leading-none">
              Rethinking the online payroll experience
            </div>
          </div>
          <div className="lg:w-[469px] xl:w-[580px] md:w-[400px]  relative lg:ml-[45px]  items-center">
            <Image
              src={"/mobile-view.png"}
              alt={"mobile-view"}
              height={972}
              width={1024}
              className="lg:pt-[3.5rem]"
            ></Image>
          </div>
        </div>
        <div className="rounded justify-center bg-[linear-gradient(45deg,#19C391_0%,#49C07D_100%)] flex flex-row  hover:drop-shadow-xl transition duration-500 md:mt-[72px] mt-[92px] hover:-translate-y-[3px] flex-wrap lg:flex-nowrap items-center lg:items-left lg:justify-between">
          <div className="flex flex-col lg:pl-[96px] xl:pl-[120px] max-w-[360px] lg:max-w-[480px]  text-center lg:text-left mt-[30px] md:mt-[52px] lg:mt-[0px]">
            <div className="font-light text-[20px] lg:text-[23px] text-white tracking-[0] mb-[15px] lg:mb-[5px]  ">
              Smallcase
            </div>
            <div className="font-lyondisplayweb lg:text-[3.125rem] md:text-[2.25rem] text-[2rem] text-white  font-bold  mb-[8px] leading-[1.1] lg:leading-none">
              Stock investing for everyone
            </div>
          </div>
          <div className="lg:w-[595px] xl:w-[640px] md:w-[738px]  relative items-center">
            <Image
              src={"/smallcase.png"}
              alt={"smallcase"}
              height={1278}
              width={1130}
              className="lg:pt-[15px]"
            ></Image>
          </div>
        </div>
        <div className="rounded bg-[url(/bluematter.jpg)] flex flex-row  hover:drop-shadow-lg mt-[72px] h-[580px] transition duration-500 hover:-translate-y-[3px] bg-right-top   justify-center lg:justify-start">
          <div className="flex flex-col justify-center lg:leading-none leading-[1.1] max-w-[380] lg:max-w-[600px] lg:pl-[96px] xl:pl-[120px] text-center lg:text-left">
            <div className="font-light text-[23px] text-white tracking-[0] mb-[0.5rem]  ">
              Bluematter
            </div>
            <div className="font-lyondisplayweb text-[2rem] md:text-[2.25rem] lg:text-[3.125rem] text-white leading-none font-bold">
              Solving America&apos;s marketing woes
            </div>
          </div>
        </div>
        <div className="justify-center rounded bg-[linear-gradient(45deg,#5B6AFF_0%,#919AFF_100%)] flex flex-row  hover:drop-shadow-lg  lg:justify-between transition duration-500 mt-[72px] hover:-translate-y-[3px] flex-wrap lg:flex-nowrap mb-[72px]">
          <div className="flex flex-col justify-center text-center lg:text-left max-w-[360px] lg:max-w-[450px] xl:max-w-[480px] lg:pl-[96px]">
            <div className="mt-[32px] md:mt-[52pxx] lg:mt-[0px] font-light text-[20px] lg:text-[23px] text-white tracking-[0] mb-[15px] lg:mb-[5px]  ">
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
      </div>
      <TestimonialCarousel />
      <div className="bg-black hover:bg-blue-500 flex flex-col items-center justify-center relative leading-[1.1] group transition-colors duration-300 pb-[122px] pt-[112px] md:pb-[122px] md:pt-[112px] lg:pb-[160px] lg:pt-[170px] xl:pb-[160px] xl:pt-[170px] 2xl:pb-[160px] 2xl:pt-[170px]">
        <div className="canister">
          <div className="mx-auto max-w-[560px] text-white lg:text-[2.875rem] text-[2rem] md:text-[2.5rem] text-center tracking-[0.4px]  font-lyondisplayweb font-light mb-[33px]">
            <p>Solving business problems with user-centric design</p>
          </div>
          <div className="justify-center flex items-center gap-2 text-xl text-[2rem] text-[#2D82E4] tracking-[0] relative mb-0 group-hover:text-white  font-light transition-colors duration-300">
            <p className="text-[2rem]">Learn more about us</p>
            <Arrow />
          </div>
        </div>
      </div>
    </>
  );
}
