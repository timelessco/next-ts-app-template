"use client";
import Arrow from "./arrow";

interface FooterProps {
  title: string;
  desc: string;
  href: string;
}

export default function Footer({ title, desc, href }: FooterProps) {
  return (
    <footer
      className="bg-black hover:bg-blue-500 flex flex-col items-center justify-center relative group transition-colors duration-300 py-20 md:py-[122px] lg:py-40 cursor-pointer"
      onClick={() => (window.location.href = href)}
    >
      <div className="canister">
        <div className="mx-auto text-white lg:text-[2.875rem] text-[2rem] md:text-[2.5rem] text-center tracking-[0.4px] font-lyondisplayweb font-light mb-[25px] leading-[1.08] max-w-[720px]">
          <p className="text-balance">{title}</p>
        </div>
        <div className="justify-center flex items-center gap-2 text-xl text-[2rem] text-[#2D82E4] tracking-[0] relative mb-0 group-hover:text-white font-light transition-colors duration-300">
          <p className="text-[1.75rem] md:text-[2rem] leading-[1.5]">{desc}</p>
          <Arrow />
        </div>
      </div>
    </footer>
  );
}
