import Whatwedo from "./whatwedo";

export default function WhatWeDoSection() {
  return (
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
  );
}
