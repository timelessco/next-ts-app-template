import Arrow from "@/components/arrow";
import ProcessBox from "@/components/Processbox";
import Image from "next/image";
import WhyTimeless from "@/components/whytimeless";
import Whatwedo from "@/components/whatwedo";
import Footer from "@/components/footer";
import BigTextBox from "@/components/bigtextbox";
export default function Page() {
  return (
    <>
      <div>
        <section className="canister lg:pt-[85px] pb-8">
          <BigTextBox text="Data driven design decisions" />
        </section>
      </div>
      <section className="pt-14">
        <div className="w-full h-auto">
          <Image
            src={"/cover.png"}
            alt={"cover"}
            height={4000}
            width={2048}
            className="w-full h-auto"
          ></Image>
        </div>
      </section>
      <section>
        <div className="flex flex-col bg-gray-100 pb-12 sm:pb-[112px] lg:pb-[226px] pt-12 md:pt-14 lg:pt-[170px] px-[15px] text-center">
          <div className="canister">
            <h2 className="font-bold text-[rgba(7,18,44,0.55)] uppercase text-light tracking-[1.97px] text-[13px] md:text-[15px] mb-[29px] lg:mb-[33px]">
              our process
            </h2>
            <div className="min-[320px]:max-w-[287px] min-[400px]:max-w-[380px] mx-auto sm:max-w-[640px] mb-4 lg:mb-[30px]">
              <h3 className="max-w-full text-[1.5rem] md:text-[1.875rem] font-light leading-[1.33] tracking-[0.5px] font-lyondisplayweb text-black text-center pb-8 lg:pb-[35px]">
                We believe the key to a delightful user experience is an
                incremental process of measuring business success and aligning
                them with user goals.
              </h3>
            </div>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-[440px] lg:max-w-[920px] py-4 lg:py-10 mx-auto gap-10 sm:gap-[110px] lg:gap-10 justify-items-center">
              <ProcessBox image="/svgs/research.svg" title="Research" />
              <ProcessBox image="/svgs/strategy-1.svg" title="Strategy" />
              <ProcessBox image="/svgs/design-1.svg" title="Design" />
              <ProcessBox image="/svgs/tech-1.svg" title="Execute" />

              <div className="absolute pointer-events-none top-[590px] left-[calc(50%-169px)] -translate-x-[calc(252px/4)] -rotate-90 sm:rotate-0 lg:-top-4 lg:left-[630px] lg:-translate-x-[calc(252px/4)] lg:bottom-0 md:top-[270px] sm:top-[235px] sm:left-[calc(50%-65px)] sm:-translate-x-[calc(252px/4)]">
                <Image
                  alt="arrow-top"
                  src={"/path-copy.png"}
                  height={55}
                  width={252}
                  className="relative"
                  priority
                />
                <span className="absolute -translate-x-[55px] -translate-y-[65px] lg:top-1 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 text-[rgba(7,18,44,0.65)] w-[110px] bg-gray-100 font-[400] text-[20px]">
                  Evolve
                </span>
              </div>

              <div className="absolute pointer-events-none top-[590px] md:top-[530px] sm:top-[455px] right-[calc(50%-295px)] -translate-x-[calc(252px/4)] -rotate-90 sm:rotate-0 sm:right-0 sm:bottom-[-40px] sm:left-[150px] sm:-translate-x-[calc(252px/4)] lg:top-60 lg:left-[630px] lg:-translate-x-[calc(252px/4)]">
                <Image
                  alt="arrow-bottom"
                  src={"/path-2.png"}
                  height={55}
                  width={252}
                  className="relative"
                  priority
                />
                <span className="absolute top-[35px] sm:top-[50px] left-[70px]  sm:right-0 sm:left-[125px] sm:-translate-x-1/2 sm:-translate-y-1/2 text-[rgba(7,18,44,0.65)] w-[110px] bg-gray-100 font-[400] text-[20px]">
                  Measure
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="canister lg:pt-[160px] lg:pb-[104px] pt-16 pb-8">
        <div className="flex flex-wrap lg:justify-between justify-center text-center lg:text-left">
          <div className="flex flex-col lg:max-w-[440px] max-w-[495px] mb-12 lg:mb-0">
            <h2 className="font-bold text-[rgba(7,18,44,0.55)] uppercase text-light tracking-[1.97px] text-[13px] md:text-[15px]">
              Why Timeless
            </h2>
            <h3 className="mt-6 font-lyondisplayweb md:text-[2.5rem] text-[2rem] text-black tracking-[0.4px] leading-[1.08] font-light">
              Premium design and engineering, always on time and on budget.
            </h3>
            <div className="flex items-center gap-2 hover:gap-4 transition-all mt-6 text-[1.75rem] md:text-[2rem] text-[#007bff] tracking-[0]  mb-0 font-light duration-300 ease-in-out justify-center lg:justify-start">
              <p className="text-[1.75rem] md:text-[2rem] leading-[1.5]">
                Get in touch with us
              </p>
              <Arrow />
            </div>
          </div>
          <div className="flex flex-col lg:mt-10 lg:max-w-[440px] max-w-[495px] relative">
            <WhyTimeless
              desc="We believe that a lot of digital products could use some much-needed polish and attention to detail. We achieve that with our refined design process that continuously measures & evolves to meet business and user goals."
              title="Premium Design"
              image="/svgs/premium.svg"
            />
            <WhyTimeless
              desc="We respect your time and strive to meet realistic deadlines. We believe that when work gets done on time, you get more time to think about your vision of the future you."
              title="Always on Time"
              image="/svgs/swedish.svg"
            />
            <WhyTimeless
              title="Affordable Pricing"
              desc="From our experience with 200+ clients in the last decade, we learnt that pricing is based on the value rendered to the client and not on the number of hours spent. So our pricing reflects exactly that."
              image="/svgs/wallet.svg"
            />
          </div>
        </div>
      </section>
      <section className="canister pt-12 pb-8 md:py-20 lg:py-28">
        <div className="text-center">
          <h2 className="font-bold text-[rgba(7,18,44,0.55)] uppercase text-light tracking-[1.97px] text-[13px] md:text-[15px] leading-1 text-center">
            What we do
          </h2>
          <h3 className="max-w-[675px] mx-auto mt-[23px] mb-4 lg:text-[2.875rem] md:text-[2.5rem] text-[2rem] text-black tracking-[0.4px] leading-[1.08] font-light font-lyondisplayweb">
            We are commited to create digital products that people love to use.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 md:pt-[90px] pt-8 place-items-center gap-12 md:gap-0">
            <Whatwedo
              imageSrc="/svgs/strategy-1.svg"
              listItems={[
                "UI Research / Analysis",
                "UX Consultancy",
                "Information Architecture",
                "User Testing",
              ]}
              title="Strategy"
            />
            <Whatwedo
              imageSrc="/svgs/design-1.svg"
              listItems={[
                "User Experience",
                "Interface Design",
                "Illustration / Animation",
                "Brand Development",
              ]}
              title="Design"
            />
            <Whatwedo
              imageSrc="/svgs/tech-1.svg"
              title="Technology"
              listItems={[
                "HTML / CSS / Javascript",
                "React / Vue",
                "PHP / NodeJS",
                "DevOps",
              ]}
            />
          </div>
        </div>
      </section>
      <Footer
        desc="Get in touch with us"
        title="We would love to work with you on your next big idea."
        href="/contact"
      />
    </>
  );
}
