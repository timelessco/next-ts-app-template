import Footer from "@/components/footer";
import ImageCarousel from "@/components/ImageCarousel";
import WhatWeDoSection from "@/components/whatwedosection";
import Image from "next/image";

export default function Page() {
  const teamMembers = [
    {
      id: 1,
      name: "Prasath Prabhakaran",
      designation: "Co-Founder",
      image: "/employees/prasath.png",
    },
    {
      id: 2,
      name: "Udhaya Chandran",
      designation: "Co-Founder",
      image: "/employees/uday.png",
    },
    {
      id: 3,
      name: "Sandeep Prabhakaran",
      designation: "CEO",
      image: "/employees/sandeep.png",
    },
    {
      id: 4,
      name: "Anantha Krishnan",
      designation: "UI Designer",
      image: "/employees/anand.png",
    },
    {
      id: 5,
      name: "Fazil Fahad",
      designation: "Frontend Engineer",
      image: "/employees/fazil.png",
    },
    {
      id: 6,
      name: "Prem Dayal",
      designation: "UI Designer",
      image: "/employees/prem.png",
    },
    {
      id: 7,
      name: "Vigneshwaran R.",
      designation: "UI Designer",
      image: "/employees/vignesh.png",
    },
    {
      id: 8,
      name: "Mohana Prabhu",
      designation: "Backend Engineer",
      image: "/employees/mohan.png",
    },
    {
      id: 9,
      name: "Khalid Zaid",
      designation: "Frontend Engineer",
      image: "/employees/zaid.png",
    },
    {
      id: 10,
      name: "Prasanth K.",
      designation: "Frontend Engineer",
      image: "/employees/prasanth.png",
    },
    {
      id: 11,
      name: "Srinivasan Rajan",
      designation: "UI Engineer",
      image: "/employees/srini.png",
    },
    {
      id: 12,
      name: "Karthik B.",
      designation: "Fullstack Engineer",
      image: "/employees/karthik.png",
    },
    {
      id: 13,
      name: "Riyaz Basher",
      designation: "Ecommerce Developer",
      image: "/employees/riyaz.png",
    },
    {
      id: 14,
      name: "Yuvaraj Elumalai",
      designation: "Office Admin",
      image: "/employees/yuvraj.png",
    },
  ];

  return (
    <>
      <section className="bg-[#0E0E0F] relative text-center lg:text-left">
        <div className="w-full h-auto pt-[120px] lg:pb-[180px] pb-[48px] px-[15px]">
          <Image
            alt="TIMELESS OFFICE"
            src={"/timeless-1.jpg"}
            height={2750}
            width={1564}
            className="w-full h-auto"
          ></Image>
          <div className="canister">
            <div className="flex lg:flex-row flex-wrap lg:flex-nowrap lg:justify-between text-[#FFFFFF] w-full mx-auto lg:mt-[-4rem] justify-center">
              <h2 className="text-[2.5rem] lg:text-[3.625rem] font-light tracking-[-0.6px] leading-[1.05] max-w-[480px] w-[480px] px-[15px] pb-8">
                Solving business problems with user-centric design
              </h2>
              <div className="max-w-[580px] w-full px-[15px] text-[22px] lg:text-[1.75rem] tracking-[0.27px] leading-[1.25] font-light text-[rgba(255,255,255,0.70)]">
                <h3 className="lg:pb-12 pb-4">
                  At Timeless, we believe that complex business problems have
                  simple, well-designed solutions. We focus on creating
                  tailor-made digital products that enrich user experience.
                </h3>
                <h3>
                  We are a close team that believes in constant communication
                  and prototyping over static screens. We look at business
                  strategy and measurable results as an essential part of the
                  design process and decisions.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <WhatWeDoSection />
      <ImageCarousel />
      <section className="canister py-10 text-center">
        <h2 className="uppercase tracking-[1.97] mb-[29.25px] lg:mb-[33.75px] text-[15px] text-[rgba(7,18,44,0.55)] font-bold leading-[1.2]">
          meet the team
        </h2>
        <h3 className="max-w-[675px] mx-auto lg:mb-16 mb-8  lg:text-[2.875rem] md:text-[2.5rem] text-[2rem] text-black tracking-[0.4px] leading-[1.08] font-light font-lyondisplayweb">
          We are problem-solvers at the core and obsess over every detail.
        </h3>
        <div className="sm:pt-8">
          <div className="flex flex-wrap">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center px-[10px] pb-16 w-1/2 md:w-1/3 lg:w-1/4"
              >
                <div className="sm:w-[74px] sm:h-[74px] w-[64px] h-[64px] my-[25px] mx-auto hover:scale-110 hover:shadow-2xl duration-300 ease-in-out  relative overflow-hidden rounded-full group">
                  <Image
                    alt={member.name}
                    src={member.image}
                    height={148}
                    width={148}
                    className="transition-transform  rounded-full"
                  />
                </div>

                <h2 className="text-xl font-normal tracking-[0] leading-[1.2]">
                  {member.name}
                </h2>
                <h3 className="text-[rgba(7,18,44,0.65)] font-normal text-lg tracking-[0.3px] relative">
                  {member.designation}
                </h3>
              </div>
            ))}
            <div className="flex flex-col items-center px-[10px] pb-16 w-1/2 md:w-1/3 lg:w-1/4">
              <div className="sm:w-[74px] sm:h-[74px] w-[64px] h-[64px] my-[25px] mx-auto">
                <Image
                  alt="You"
                  src="/employees/default.png"
                  height={148}
                  width={148}
                />
              </div>
              <h2 className="text-xl font-normal tracking-[0] leading-[1.2]">
                You
              </h2>
              <a
                href="https://wellfound.com/company/timelessco/jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-lg font-normal tracking-[0.3px] relative"
              >
                See Careers
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer
        desc="Look into our process"
        title="Premium design and engineering, always on time and on budget"
        href="/process"
      />
    </>
  );
}
