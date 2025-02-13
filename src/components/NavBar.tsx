"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
    <>
      <div
        className={`top-0 block lg:hidden fixed min-w-[100%] z-10 transition-all duration-300 ease-in-out bg-white ${
          scrolled ? "py-[5px] shadow-md" : "py-[15px]"
        }`}
      >
        <div className="canister">
          <div className="flex items-center justify-between">
            <h1 className="flex items-center py-[5px]">
              <svg
                width="38"
                height="29"
                viewBox="0 0 38 29"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="timeless-index"
                    transform="translate(-420.000000, -32.000000)"
                  >
                    <rect
                      fill="#FFFFFF"
                      x="0"
                      y="0"
                      width="2000"
                      height="5317"
                    ></rect>
                    <g
                      id="header"
                      transform="translate(420.000000, 26.000000)"
                      fill="#000000"
                      fillRule="nonzero"
                    >
                      <g
                        id="icons/logo"
                        transform="translate(0.000000, 6.000000)"
                      >
                        <path
                          d="M30.4751576,0.895763114 C28.7159889,-0.548886669 9.06727348,-0.0192818628 7.52000461,0.895763114 C5.97273574,1.81080809 -0.246325563,11.8182365 0.00755447063,12.8384015 C0.717219133,15.6956645 16.1629206,29 19.0005797,29 C21.5933545,29 37.1010267,15.9479526 37.9876078,12.8384015 C38.3104552,11.7071096 32.2333268,2.3404129 30.4751576,0.895763114 Z M25.9882778,11.9774183 L23.9892224,11.9774183 L23.9892224,8.9739884 L19.9911116,8.9739884 L19.9911116,16.9831348 L22.9896947,16.9831348 L22.9896947,18.9854214 L14.9934732,18.9854214 L14.9934732,16.9831348 L17.9920563,16.9831348 L17.9920563,8.9739884 L13.9939455,8.9739884 L13.9939455,11.9774183 L11.9948901,11.9774183 L11.9948901,6.9717018 L25.9882778,6.9717018 L25.9882778,11.9774183 Z"
                          id="Shape"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </h1>
            {/* Hamburger Button */}
            <button
              className="relative w-[24px] h-[2px] flex items-center justify-center focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              <div className="relative w-6 h-6 flex items-center justify-center ">
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
        </div>

        <div
          className={`absolute left-0 right-0 bg-white overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-64" : "max-h-0"
          }`}
        >
          <div className=" font-light text-[18px] py-4 flex flex-col items-center space-y-3">
            <Link
              href={"/"}
              className={`py-2 px-6 text-center transition duration-300  ${isActive(
                "/"
              )} `}
            >
              Work
            </Link>
            <Link
              href={"/about"}
              className={`py-2 px-6 text-center transition duration-300 ${isActive(
                "/about"
              )} `}
            >
              About
            </Link>
            <Link
              href={"/process"}
              className={`py-2 px-6 text-center transition duration-300 ${isActive(
                "/process"
              )} `}
            >
              Process
            </Link>
            <Link
              href={"/contact"}
              className={`py-2 px-6 text-center transition duration-300  ${isActive(
                "/contact"
              )} `}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`hidden lg:block xl:block 2xl:block fixed min-w-[100%] z-10 transition-all duration-300 ease-in-out bg-white ${
          scrolled ? "py-[5px]  shadow-md" : "py-[15px]"
        }`}
      >
        <div className="canister">
          <div id="navbar" className={`flex flex-row justify-between text-xl`}>
            <div className="self-center py-[5px] translate-x-0 translate-y-[6]">
              <svg
                width="38px"
                height="29px"
                viewBox="0 0 38 29"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="timeless-index"
                    transform="translate(-420.000000, -32.000000)"
                  >
                    <rect
                      fill="#FFFFFF"
                      x="0"
                      y="0"
                      width="2000"
                      height="5317"
                    ></rect>
                    <g
                      id="header"
                      transform="translate(420.000000, 26.000000)"
                      fill="#000000"
                      fillRule="nonzero"
                    >
                      <g
                        id="icons/logo"
                        transform="translate(0.000000, 6.000000)"
                      >
                        <path
                          d="M30.4751576,0.895763114 C28.7159889,-0.548886669 9.06727348,-0.0192818628 7.52000461,0.895763114 C5.97273574,1.81080809 -0.246325563,11.8182365 0.00755447063,12.8384015 C0.717219133,15.6956645 16.1629206,29 19.0005797,29 C21.5933545,29 37.1010267,15.9479526 37.9876078,12.8384015 C38.3104552,11.7071096 32.2333268,2.3404129 30.4751576,0.895763114 Z M25.9882778,11.9774183 L23.9892224,11.9774183 L23.9892224,8.9739884 L19.9911116,8.9739884 L19.9911116,16.9831348 L22.9896947,16.9831348 L22.9896947,18.9854214 L14.9934732,18.9854214 L14.9934732,16.9831348 L17.9920563,16.9831348 L17.9920563,8.9739884 L13.9939455,8.9739884 L13.9939455,11.9774183 L11.9948901,11.9774183 L11.9948901,6.9717018 L25.9882778,6.9717018 L25.9882778,11.9774183 Z"
                          id="Shape"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <ul className="flex flex-row text-lg text-customGray font-light  pl-[66px]">
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
              className="text-lg text-customGray hover:text-white bg-[#F2F3F5] hover:bg-black rounded-[7px] block px-[8px] py-[2px] top-[5px]  self-center"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
