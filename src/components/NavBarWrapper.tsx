import { usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

interface NavBarWrapperProps {
  children: ReactNode;
}

export default function NavBarWrapper({ children }: NavBarWrapperProps) {
  const currPath = usePathname();

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const isAbout = currPath === "/about" ? true : false;

  return (
    <div
      className={`top-0 fixed min-w-[100%] z-20 transition-all duration-300 ease-in-out  text-lg leading-[1.5] ${
        scrolled ? "py-[5px] shadow-md" : "py-[15px]"
      } ${isAbout ? "bg-[#0E0E0F] text-white" : "bg-white text-black"}`}
    >
      {children}
    </div>
  );
}
