"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export function NavBar() {
  const currPath = usePathname();
  const isActive = (path: unknown) =>
    currPath === path ? "text-customHoverGray" : "text-customGray";
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div
      className={`top-0 fixed min-w-[100%] z-10 transition-all duration-300 ease-in-out bg-white ${
        scrolled ? "py-[5px] shadow-md" : "py-[15px]"
      }`}
    >
      <div className="canister">
        <div className="lg:hidden">
          <div className="flex items-center justify-between">
            <h1 className="flex items-center py-[5px]">
              <Logo />
            </h1>
            <button
              className="relative w-[24px] h-[2px] flex items-center justify-center focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span
                  className={`absolute h-0.5 w-6 bg-gray-600 transform transition duration-300 ease-in-out origin-center ${
                    isOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-gray-600 transition duration-300 ease-in-out ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-gray-600 transform transition duration-300 ease-in-out origin-center ${
                    isOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                />
              </div>
            </button>
          </div>

          <div
            className={`absolute left-0 right-0 bg-white overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? "max-h-64" : "max-h-0"
            }`}
          >
            <div className="font-light text-[18px] py-4 flex flex-col items-center space-y-3">
              <Link
                href={"/"}
                className={`py-2 px-6 text-center transition duration-300 ${isActive(
                  "/"
                )}`}
              >
                Work
              </Link>
              <Link
                href={"/about"}
                className={`py-2 px-6 text-center transition duration-300 ${isActive(
                  "/about"
                )}`}
              >
                About
              </Link>
              <Link
                href={"/process"}
                className={`py-2 px-6 text-center transition duration-300 ${isActive(
                  "/process"
                )}`}
              >
                Process
              </Link>
              <Link
                href={"/contact"}
                className={`py-2 px-6 text-center transition duration-300 ${isActive(
                  "/contact"
                )}`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div id="navbar" className="flex flex-row justify-between text-xl">
            <div className="self-center py-[5px] translate-x-0 translate-y-[6]">
              <Logo />
            </div>
            <ul className="flex flex-row text-lg text-customGray font-light pl-[66px]">
              <Link
                href={"/"}
                className={`hover:text-customHoverGray ${isActive(
                  "/"
                )} p-[8px] pr-[24px]`}
              >
                Work
              </Link>
              <Link
                href={"/about"}
                className={`hover:text-customHoverGray ${isActive(
                  "/about"
                )} p-[8px] pr-[24px]`}
              >
                About
              </Link>
              <Link
                href={"/process"}
                className={`hover:text-customHoverGray ${isActive(
                  "/process"
                )} p-[8px] pr-[24px]`}
              >
                Process
              </Link>
            </ul>
            <Link
              href={"/contact"}
              className="text-lg text-customGray hover:text-white bg-[#F2F3F5] hover:bg-black rounded-[7px] block px-[8px] py-[2px] top-[5px] self-center"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
