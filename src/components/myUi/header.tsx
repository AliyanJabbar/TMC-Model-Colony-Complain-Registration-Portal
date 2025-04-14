"use client";

import { useEffect, useState, useRef } from "react";
import {
  FaUserCircle,
  FaHome,
  FaClipboardList,
  FaSearch,
  FaSignOutAlt,
  FaUserAlt,
  FaClipboard,
  FaLanguage,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { HiMiniBars3 } from "react-icons/hi2";

import Image from "next/image";
import Link from "next/link";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useTranslation } from "../../context/translationContext";

// Define navigation items outside the component with correct translation keys
const navigationItems = [
  { name: "header.home", href: "/", icon: FaHome },
  {
    name: "header.registercomplaint",
    href: "/register-complain",
    icon: FaClipboardList,
  },
  { name: "header.trackcomplaint", href: "/track-complain", icon: FaSearch },
];

export default function Header() {
  // Auth hooks
  const { user, isLoading, isAuthenticated } = useKindeAuth();

  // Translation hooks - using custom context
  const { translate: t, currentLanguage, changeLanguage } = useTranslation();

  // State hooks
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ref hooks
  const dropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Effect for click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserOpen(false);
      }
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    };

    if (isUserOpen || isLanguageOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserOpen, isLanguageOpen]);

  // Effect for escape key handling
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsUserOpen(false);
        setIsLanguageOpen(false);
      }
    };

    if (isUserOpen || isLanguageOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isUserOpen, isLanguageOpen]);

  return (
    <header className="relative top-0 left-0 right-0 px-[5%] lg:px-[7%] select-none bg-gray-100/50 shadow-md z-40">
      <nav className="max-w-7xl mx-auto">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-auto w-32 -mr-10">
                <Image
                  alt="TMC Logo"
                  width={100}
                  height={80}
                  src="/assets/logo/Adobe Express - file.png"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800 hidden md:block">
                {t("header.portalTitle")}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden 2lg:flex items-center space-x-8">
            <div className="flex justify-center gap-2 bg-gray-100/50 rounded-xl p-4 font-semibold">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="p-2 px-4 group"
                >
                  <div className="flex items-center text-nowrap text-gray-600 group-hover:text-gray-900 transition-colors">
                    <item.icon className="mr-2" />
                    {t(item.name)}
                  </div>
                  <div className="bg-greenish h-[2px] w-0 group-hover:w-full transition-all duration-500" />
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu and Language Selector */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div
              ref={languageDropdownRef}
              className="relative"
              aria-expanded={isLanguageOpen}
              role="button"
              tabIndex={0}
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsLanguageOpen(!isLanguageOpen);
                }
              }}
            >
              <div className="cursor-pointer hover:-translate-y-1 transition-all duration-200 p-2 rounded-full hover:bg-gray-200/50">
                <FaLanguage size={30} className="text-gray-600" />
              </div>

              {/* Language dropdown */}
              <div
                className={`absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 z-50 transform origin-top-right transition-all duration-200 ease-in-out ${
                  isLanguageOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                {/* Only apply conditional styling on the client side */}
                <button
                  onClick={() => changeLanguage("en")}
                  className={`w-full text-left px-4 py-2 text-sm ${isClient && currentLanguage === "en" ? "text-greenish font-medium" : "text-gray-700"} hover:bg-gray-50 transition-colors flex items-center`}
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage("ur")}
                  className={`w-full text-left px-4 py-2 text-sm ${isClient && currentLanguage === "ur" ? "text-greenish font-medium" : "text-gray-700"} hover:bg-gray-50 transition-colors flex items-center`}
                >
                  اردو
                </button>
              </div>
            </div>

            {/* User Menu */}
            <div
              ref={dropdownRef}
              className="relative"
              aria-expanded={isUserOpen}
              role="button"
              tabIndex={0}
              onClick={() => setIsUserOpen(!isUserOpen)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsUserOpen(!isUserOpen);
                }
              }}
            >
              <div className="cursor-pointer hover:-translate-y-1 transition-all duration-200 p-2 rounded-full hover:bg-gray-200/50">
                {isAuthenticated && !isLoading && user?.picture ? (
                  <div className="relative w-[35px] h-[35px]">
                    <Image
                      src={user.picture}
                      alt="Profile"
                      width={35}
                      height={35}
                      className="rounded-full ring-2 ring-greenish/40"
                    />
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                  </div>
                ) : (
                  <FaUserCircle size={30} className="text-gray-600" />
                )}
              </div>

              {/* Improved dropdown with animation */}
              <div
                className={`absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 transform origin-top-right transition-all duration-200 ease-in-out ${
                  isUserOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                {isAuthenticated ? (
                  <>
                    {/* User info section */}
                    <Link href="/profile">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user?.given_name} {user?.family_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {user?.email}
                        </p>
                      </div>
                    </Link>

                    {/* Menu items */}
                    <Link
                      href="/profile"
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                    >
                      <FaUserAlt className="mr-2 text-greenish" />
                      {t("header.profile")}
                    </Link>
                    <Link
                      href="/track-complain"
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                    >
                      <FaClipboard className="mr-2 text-greenish" />
                      {t("header.mycomplaints")}
                    </Link>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-1"></div>

                    {/* Logout button */}
                    <LogoutLink postLogoutRedirectURL="/">
                      <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        <FaSignOutAlt className="mr-2" color="red" />
                        {t("header.signout")}
                      </div>
                    </LogoutLink>
                  </>
                ) : (
                  <Link
                    href="/profile"
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <FaUserAlt className="mr-2 text-greenish" />
                    {t("header.profile")}
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="ml-4 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <RxCross2 size={25} className="text-gray-600" />
              ) : (
                <HiMiniBars3 size={25} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Improved with animation */}
        <div
          className={`2lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="inline mr-2" />
                {t(item.name)}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
