"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./button";
import { useSearchParams } from "next/navigation";
import Dialog from "./dialog";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTranslation } from "../../context/translationContext";

const Hero = () => {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id");
  const { translate: t } = useTranslation();

  const [showOrderDialog, setShowOrderDialog] = useState(false); //for showing id to user

  useEffect(() => {
    if (id) {
      setShowOrderDialog(true);
    }
  }, [id]);

  return (
    <section className=" text-gray-600 body-font py-[10px] px-[5%] lg:px-[7%]">
      {/* showing complain id */}
      {showOrderDialog && (
        <Dialog
          orderId={id!}
          handleFunction={() => {
            navigator.clipboard.writeText(id!);
            setShowOrderDialog(false);
            toast.success(t("hero.idCopied"), { duration: 7000 });
            setTimeout(() => {
              // clean search params by changing route
              router.push("/");
            }, 500);
          }}
        />
      )}

      <div className="container select-none mx-auto flex flex-col-reverse py-10 md:flex-row gap-10 items-center">
        <div className={`lg:flex-grow md:w-[55%] lg:pr-24 md:pr-16 flex flex-col ${t("hero.subtitle").split(" ")[0] === "Complain" ? "md:text-left md:items-start" : "md:text-right md:items-end"} mb-16 md:mb-0 items-center text-center`}>
          <h1
            className="font-bold sm:text-4xl text-3xl 
          lg:text-5xl md:leading-snug lg:leading-snug
          xl:leading-snug xl:text-6xl mb-4 text-gray-900 leading-tight "
          >
            <span className="text-nowrap">{t("hero.title")}</span>
            <br className="hidden lg:inline-block" />
            <span className="md:gap-5 text-greenish">
              {" "}
              <span className="text-center mx-auto w-fit">
                {t("hero.subtitle").split(" ")[0]}{" "}
              </span>{" "}
              <span className="text-nowrap">
                {t("hero.subtitle").split(" ").slice(1).join(" ")}
              </span>
            </span>
          </h1>
          <p className="mb-8 leading-relaxed font-merri text-gray-800 text-wrap max-w-[300px]: sm:max-w-[600px]">
            {t("hero.description")}
          </p>
          <div className="flex flex-col xs:flex-row justify-center gap-3 xs:gap-10">
            <Button text={t("hero.registerButton")} link="/register-complain" />
            <Button text={t("hero.trackButton")} link="/track-complain" />
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image
            width={500}
            height={525}
            className="object-cover object-center rounded"
            alt="hero"
            src="/assets/logo/tmc_model_colony_logo.png"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
