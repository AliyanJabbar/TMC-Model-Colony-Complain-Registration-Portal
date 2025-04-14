import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "../../context/translationContext";

const Footer = () => {
  const { translate: t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bottom-0 left-0 bg-black/90 text-white/90 px-[5%] lg:px-[7%] z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-5">
            <div className="relative h-auto w-32 -mr-10">
              <Image
                alt="TMC Logo"
                width={100}
                height={80}
                src="/assets/logo/jammat logo.jpg"
                className="object-contain"
                priority
              />
            </div>
            <span className="ml-1 text-lg font-bold hidden md:block">
              {t("footer.title")}
            </span>
          </Link>

          <p className="text-sm hidden md:block">
            {t("footer.copyright").replace("year", currentYear.toString())}
          </p>

          <span className="inline-flex space-x-4">
            <Link
              href="https://www.facebook.com/JIPOfficial1/"
              target="_blank"
              className=" hover:text-greenish transition-colors"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </Link>
            <Link
              href="https://x.com/jipofficial?lang=en"
              target="_blank"
              className=" hover:text-greenish transition-colors"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/jipofficial/?hl=en"
              target="_blank"
              className=" hover:text-greenish transition-colors"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              </svg>
            </Link>
          </span>
        </div>

        {/* Mobile copyright - only shows on small screens */}
        <div className="md:hidden text-center pb-4 pt-2">
          <p className="text-xs">
            {t("footer.copyright").replace("year", currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
