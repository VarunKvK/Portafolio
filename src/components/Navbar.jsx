"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/Images/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRightFromBracket,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { Dropdown } from "./smallerComponents/ProfileDropDown";
import { ModeToggle } from "./darkmodeUi";
import { useTheme } from "next-themes";

import { Sun, Moon, Laptop } from "lucide-react";
export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const { setTheme } = useTheme();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/usersData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const userData = await response.json();
      setUser(userData);
    };
    
    fetchUserData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".sidebar")) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="relative w-full flex items-center justify-between px-[24px] py-[20px]">
      {/* Creating a NavBar */}
      <nav className="max-w-8xl flex items-center justify-between w-full">
        <div className="w-[50%]">
          <Link
            className="md:block hidden font-semibold text-[#282F30] dark:text-[#f1f1f1] text-[18px]"
            href={"/"}
          >
            Portafolio
          </Link>
          <Link href={"/"} className="md:hidden block">
            <Image src={Logo} alt="PortafolioLogo" width={30} />
          </Link>
        </div>
        {!isSignedIn ? (
          <div className="md:flex hidden justify-between items-center gap-4">
            <Link
              href={"/sign-in"}
              className="text-sm border border-[#282F30] px-6 py-2 rounded-[15px] text-[#282F30] dark:text-[#f1f1f1] dark:border-[#f1f1f1] font-bold"
            >
              Login
            </Link>
            <Link
              href={"/sign-up"}
              className="text-sm bg-[#282F30] px-6 py-2 rounded-[15px] text-[#f1f1f1] dark:bg-[#f1f1f1] dark:text-[#282F30] font-bold"
            >
              Create Account
            </Link>
          </div>
        ) : (
          <div className="flex w-full justify-between items-center">
            <div className="md:block hidden">
              <ul className="flex items-center gap-12">
                <li className="">
                  <Link
                    className="font-semibold text-[16px] text-[#4D5657] dark:text-[#f1f1f1]"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="font-semibold text-[16px] text-[#4D5657] dark:text-[#f1f1f1]"
                    href="/create"
                  >
                    Create
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="font-semibold text-[16px] text-[#4D5657] dark:text-[#f1f1f1]"
                    href="/templates"
                  >
                    Templates
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="font-semibold text-[16px] text-[#4D5657] dark:text-[#f1f1f1]"
                    href="/pricing"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="">
                  <Link
                    className="font-semibold text-[16px] text-[#4D5657] dark:text-[#f1f1f1]"
                    href="/feedback"
                  >
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:flex hidden items-center gap-4">
              <Dropdown />
              <ModeToggle />
            </div>
          </div>
        )}
      </nav>
      {/* Hamburger Icon for mobile */}
      <div
        className="md:hidden flex items-center cursor-pointer"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon
          icon={faBars}
          className="text-[22px] text-[#282F30] dark:text-[#f1f1f1]"
        />
      </div>
      {/* Sidebar for mobile */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full bg-[#282F30] dark:bg-[#f1f1f1] w-[250px] z-50 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sidebar`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <Link href={"/"} className="block">
            <Image src={Logo} alt="PortafolioLogo" width={30} />
          </Link>
          <div className="cursor-pointer" onClick={toggleSidebar}>
            <FontAwesomeIcon
              icon={faTimes}
              className="text-[22px] text-[#f1f1f1] dark:text-[#282F30]"
            />
          </div>
        </div>
        <div className="">
          <p className="px-4 pt-1 text-gray-500">Theme</p>
          <div className="flex items-center justify-between text-[#f1f1f1] dark:text-[#282F30] px-4 py-2 border-b">
            <div className="flex items-center gap-1 pr-1.5 border-r border-gray-400">
              <Sun className="w-[1.2rem]" />
              <p className="cursor-pointer" onClick={() => setTheme("light")}>
                Light
              </p>
            </div>
            <div className="flex items-center gap-1 pr-1.5 border-r border-gray-400">
              <Moon className="w-[1.2rem]" />
              <p className="cursor-pointer" onClick={() => setTheme("dark")}>
                Dark
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Laptop className="w-[1.2rem]" />
              <p className="cursor-pointer" onClick={() => setTheme("system")}>
                System
              </p>
            </div>
          </div>
        </div>
        <ul className="flex flex-col mt-4">
          {!isSignedIn && (
            <div className="flex items-center justify-center gap-4 px-4 py-3">
              <Link
                href={"/sign-in"}
                className=" w-full text-sm text-center bg-[#f1f1f1] dark:bg-[#282F30] px-6 py-2 rounded-xl text-[#282F30] dark:text-[#f1f1f1] font-bold"
              >
                Create your account
              </Link>
            </div>
          )}
          <li className="px-4 py-2">
            <Link
              href={`/dashboard/${user._id}`}
              className="text-[#f1f1f1] dark:text-[#282F30] font-semibold text-[16px]"
              onClick={toggleSidebar}
            >
              Dashboard
            </Link>
          </li>
          <li className="px-4 py-2">
            <Link
              className="font-semibold text-[16px] text-[#f1f1f1] dark:text-[#282F30]"
              href="/create"
              onClick={toggleSidebar}
            >
              Create
            </Link>
          </li>
          <li className="px-4 py-2">
            <Link
              className="font-semibold text-[16px] text-[#f1f1f1] dark:text-[#282F30]"
              href="/templates"
              onClick={toggleSidebar}
            >
              Templates
            </Link>
          </li>
          <li className="px-4 py-2">
            <Link
              className="font-semibold text-[16px] text-[#f1f1f1] dark:text-[#282F30]"
              href="/pricing"
              onClick={toggleSidebar}
            >
              Pricing
            </Link>
          </li>
          <li className="px-4 py-2">
            <Link
              className="font-semibold text-[16px] text-[#f1f1f1] dark:text-[#282F30]"
              href="/feedback"
              onClick={toggleSidebar}
            >
              Feedback
            </Link>
          </li>
        </ul>
        {isSignedIn && (
          <div className="px-4 py-3 absolute bottom-4 w-full">
            <div className=" w-full text-sm justify-center border border-[#f1f1f1] dark:border-[#282F30] px-4 py-2 text-[#f1f1f1] dark:text-[#282F30] rounded-xl flex items-center gap-1">
              <FontAwesomeIcon icon={faRightFromBracket} />
              <SignOutButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
