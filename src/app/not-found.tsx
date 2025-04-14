"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHome, FaSearch, FaClipboardList } from "react-icons/fa";
import Button from "@/components/myUi/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-gradient-to-b from-gray-50 to-green-50">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl text-center">
        <div className="mb-8">
          <Image
            width={150}
            height={150}
            alt="TMC Logo"
            src="/assets/logo/tmc_model_colony_logo.png"
            className="mx-auto"
            priority
          />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 pb-[7px] text-gray-800 bg-gradient-to-r from-greenish to-green-500 bg-clip-text text-transparent ">
          Page Not Found
        </h1>

        <p className="mb-8 leading-relaxed font-merri text-gray-800 text-lg">
          We couldn't find the page you were looking for in the
          <span className="text-greenish font-semibold">
            {" "}
            TMC Model Colony Complaint Portal
          </span>
          .
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-8">
          <Link
            href="/"
            className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaHome className="mr-2" />
            Home
          </Link>
          <Link
            href="/register-complain"
            className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaClipboardList className="mr-2" />
            Register Complaint
          </Link>
          <Link
            href="/track-complain"
            className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaSearch className="mr-2" />
            Track Complaint
          </Link>
        </div>
      </div>
    </div>
  );
}
