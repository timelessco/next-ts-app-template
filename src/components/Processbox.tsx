import Image from "next/image";
type ProcessBoxProps = {
  title: string;
  image: string;
};
export default function ProcessBox(ProcessBoxProps: ProcessBoxProps) {
  return (
    <div className="hover:transition-all hover:shadow-2xl duration-300 w-[165px] md:w-[200px] shadow-[0_0_1px_0_rgba(0,0,0,0.20),0_1px_2px_0_rgba(0,0,0,0.07)] h-[165px] md:h-[200px] pt-[35px] pb-[38px] md:py-[38px] px-[10px] bg-white flex flex-col items-center justify-center font-normal text-2xl text-[rgba(7,18,44,0.65)] rounded-[9px]">
      <div>
        <Image
          alt="research"
          src={ProcessBoxProps.image}
          width={60}
          height={64}
          className="mb-[30px]"
        />
      </div>
      <div>{ProcessBoxProps.title}</div>
    </div>
  );
}
