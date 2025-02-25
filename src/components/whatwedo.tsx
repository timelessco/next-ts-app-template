import Image from "next/image";

interface WhatwedoProps {
  title: string;
  imageSrc: string;
  listItems: string[];
}

export default function Whatwedo({
  title,
  imageSrc,
  listItems,
}: WhatwedoProps) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <Image
        alt="arrow"
        src={imageSrc}
        width={56}
        height={56}
        className="w-[37px] h-[37px]"
      ></Image>
      <h4 className="md:mt-[25px] md:mb-5 my-[15px] text-start font-[600] text-xl md:text-[1.625rem] tracking-0 leading-1.2">
        {title}
      </h4>
      <ul className="font-normal text-xl leading-[1.85] text-[rgba(7,18,44,0.65)] text-center md:text-start">
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
