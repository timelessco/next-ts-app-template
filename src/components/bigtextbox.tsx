import React from "react";

interface BigTextBoxProps {
  text: string;
}

export default function BigTextBox({ text }: BigTextBoxProps) {
  return (
    <h2 className="max-w-[480px] font-light text-[2.25rem] md:text-5xl lg:text-[3.625rem] leading-[1.05] text-black tracking-[-0.6px] pt-[152px] md:pt-[176px] lg:pt-[107px] text-center md:text-left">
      {text}
    </h2>
  );
}
