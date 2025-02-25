import Image from "next/image";

type WhyTimelessProps = {
  image: string;
  title: string;
  desc: string;
};

export default function WhyTimeless({ image, title, desc }: WhyTimelessProps) {
  return (
    <div className="relative last:mb-0">
      <div className="mb-[10px] lg:mb-0 lg:absolute xl:-left-[70px] lg:-left-14 lg:-top-1 flex justify-center lg:justify-start h-[58px] w-auto relative">
        <Image
          alt={title}
          src={image}
          height={61}
          width={60}
          priority
          className="w-9"
        />
      </div>
      <h4 className="font-semibold text-[1.625rem] mb-[15px] leading-[1.2] tracking-normal">
        {title}
      </h4>
      <p className="text-[rgba(7,18,44,0.65)] text-xl leading-[29px] tracking-[0.19px] mb-4 pb-8 lg:pb-[88px] font-light">
        {desc}
      </p>
    </div>
  );
}
