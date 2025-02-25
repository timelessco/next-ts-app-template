"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import NavBarWrapper from "./NavBarWrapper";

export function NavBar() {
  const currPath = usePathname();
  const isActive = (path: string) =>
    currPath === path ? "text-customHoverGray" : "text-customGray";
  const [isOpen, setIsOpen] = useState(false);
  const isAbout = currPath === "/about" ? true : false;

  return (
    <NavBarWrapper>
      <div className="canister">
        <nav className="relative">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="flex items-center justify-between">
              <h1 className="flex items-center py-[5px] z-10">
                <Link href={"/"}>
                  <Logo />
                </Link>
              </h1>

              <button
                className="lg:hidden relative w-6 h-0.5 flex items-center justify-center focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
                aria-expanded={isOpen}
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <span
                    className={`absolute h-0.5 w-6 ${
                      isAbout ? "bg-white" : "bg-gray-600"
                    }  transform transition duration-300 ease-in-out origin-center ${
                      isOpen ? "rotate-45" : "-translate-y-1.5"
                    }`}
                  />
                  <span
                    className={`absolute h-0.5 w-6 ${
                      isAbout ? "bg-white" : "bg-gray-600"
                    } transition duration-300 ease-in-out ${
                      isOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute h-0.5 w-6 ${
                      isAbout ? "bg-white" : "bg-gray-600"
                    } transform transition duration-300 ease-in-out origin-center ${
                      isOpen ? "-rotate-45" : "translate-y-1.5"
                    }`}
                  />
                </div>
              </button>
            </div>

            <div
              className={`flex flex-col lg:flex-row items-center w-full lg:absolute lg:left-0 space-y-3 lg:space-y-0 space-x-0 lg:space-x-6 transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[300px]" : "max-h-0"
              } lg:max-h-none lg:opacity-100 lg:flex-row lg:space-y-0 lg:items-center lg:mt-0`}
            >
              <div className="flex flex-col lg:flex-row items-center lg:mx-auto space-y-3 lg:space-y-0 lg:space-x-6">
                <Link
                  onClick={() => setIsOpen(false)}
                  href={"/"}
                  className={`${
                    isAbout
                      ? "text-white"
                      : "text-customGray hover:text-customHoverGray"
                  } ${isActive("/")} p-[8px]`}
                >
                  Work
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  href={"/about"}
                  className={`${
                    isAbout
                      ? "text-white"
                      : "text-customGray hover:text-customHoverGray"
                  }${isActive("/about")} p-[8px]`}
                >
                  About
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  href={"/process"}
                  className={`${
                    isAbout
                      ? "text-white"
                      : "text-customGray hover:text-customHoverGray"
                  } ${isActive("/process")} p-[8px]`}
                >
                  Process
                </Link>
              </div>
              <Link
                onClick={() => setIsOpen(false)}
                href={"/contact"}
                className={`${
                  isAbout
                    ? `text-black ${isOpen ? "text-white" : ""}`
                    : "text-customGray hover:text-customHoverGray"
                }   lg:hover:text-white lg:bg-[#F2F3F5] lg:hover:bg-black rounded-[7px] px-2 py-[15px] lg:py-1 lg:absolute lg:right-0`}
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </NavBarWrapper>
  );
}
