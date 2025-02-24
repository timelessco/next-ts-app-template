import TestimonialCarousel from "@/components/TestimonialCarousel";
import Image from "next/image";
import Footer from "@/components/footer";
import BigTextBox from "@/components/bigtextbox";
import AnimatedSection from "@/components/AnimatedSection";

export default function Home() {
  return (
    <>
      <div className="canister lg:pt-[85px]">
        <AnimatedSection>
          <section>
            <BigTextBox text="We build brands, products and apps." />
          </section>
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <section>
            <a
              className="rounded justify-center lg:justify-start bg-[linear-gradient(45deg,#34B1E0_0%,#A7E0F5_100%)] flex flex-row  hover:drop-shadow-xl transition duration-500 mt-[92px] lg:mt-[72px] hover:-translate-y-[3px] flex-wrap lg:flex-nowrap items-center lg:items-left cursor-pointer"
              href="https://atlanticpayroll.tmls.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-col lg:pl-24 xl:pl-[120px] max-w-[370px] lg:max-w-[480px]  text-center lg:text-left mt-[30px] md:mt-[52px] lg:mt-[0px]">
                <h2 className="font-light text-xl lg:text-[23px] text-white tracking-[0] mb-[15px] lg:mb-2 leading-[1.2]">
                  Atlantic payroll
                </h2>
                <h3 className="font-lyondisplayweb lg:text-[3.125rem] md:text-4xl text-[2rem] text-white  font-bold  mb-2 leading-[1.1] lg:leading-none">
                  Rethinking the online payroll experience
                </h3>
              </div>
              <div className="lg:w-[469px] md:w-[400px]  relative   items-center">
                <Image
                  src={"/mobile-view.png"}
                  alt={"mobile-view"}
                  height={972}
                  width={1024}
                  className="lg:pt-14"
                ></Image>
              </div>
            </a>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section>
            <a
              className="rounded justify-center bg-[linear-gradient(45deg,#19C391_0%,#49C07D_100%)] flex flex-row  hover:drop-shadow-xl transition duration-500 mt-14 lg:mt-[72px] hover:-translate-y-[3px] flex-wrap lg:flex-nowrap items-center lg:items-left lg:justify-between cursor-pointer"
              href="https://atlanticpayroll.tmls.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-col lg:pl-24 xl:pl-[120px] max-w-[360px] lg:max-w-[480px]  text-center lg:text-left mt-[30px] md:mt-[52px] lg:mt-[0px]">
                <h2 className="font-light text-xl lg:text-[23px] text-white tracking-[0] mb-[15px] lg:mb-2 leading-[1.2]">
                  Smallcase
                </h2>
                <h3 className="font-lyondisplayweb lg:text-[3.125rem] md:text-4xl text-[2rem] text-white  font-bold  mb-2 leading-[1.1] lg:leading-none">
                  Stock investing for everyone
                </h3>
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
            </a>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section>
            <a
              className="rounded bg-[url(/bluematter.jpg)] flex flex-row  hover:drop-shadow-lg mt-14 lg:mt-[72px] py-[216px] transition duration-500 hover:-translate-y-[3px] bg-right-top lg:bg-center justify-center lg:justify-start cursor-pointer"
              href="https://atlanticpayroll.tmls.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-col justify-center lg:leading-none leading-[1.1] max-w-[380] lg:max-w-[600px] lg:pl-24 xl:pl-[120px] text-center lg:text-left lg:mb-2">
                <h2 className="font-light text-[23px] text-white tracking-[0] mb-[0.5rem] lg:leading-[1.2]">
                  Bluematter
                </h2>
                <h3 className="font-lyondisplayweb text-[2rem] md:text-4xl lg:text-[3.125rem] text-white leading-none font-bold">
                  Solving America&apos;s marketing woes
                </h3>
              </div>
            </a>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section>
            <a
              className="justify-center rounded bg-[linear-gradient(45deg,#5B6AFF_0%,#919AFF_100%)] flex flex-row  hover:drop-shadow-lg  lg:justify-between transition duration-500 mt-14 lg:mt-[72px] hover:-translate-y-[3px] flex-wrap lg:flex-nowrap mb-[72px] cursor-pointer"
              href="https://atlanticpayroll.tmls.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-col justify-center text-center lg:text-left max-w-[360px] lg:max-w-[450px] xl:max-w-[480px] lg:pl-24 xl:pl-[120px] xl:pl-30">
                <h2 className="mt-8 md:mt-[52px] lg:mt-[0px] font-light text-xl lg:text-[23px] text-white tracking-[0] mb-[15px] lg:mb-2 leading-[1.2]">
                  Photon
                </h2>
                <h3 className="font-lyondisplayweb lg:text-[3.125rem] md:text-4xl text-[2rem] text-white  font-bold  mb-[8px] leading-[1.1] lg:leading-none">
                  Disrupting the cloud infrastructure
                </h3>
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
            </a>
          </section>
        </AnimatedSection>
      </div>
      <TestimonialCarousel />
      <Footer
        desc="Learn more about us"
        href="/about"
        title="Solving business problems with user-centric design"
      />
    </>
  );
}
