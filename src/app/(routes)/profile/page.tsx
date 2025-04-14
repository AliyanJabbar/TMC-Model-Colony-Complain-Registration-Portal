"use client";

import Loading from "@/app/loading";
import Button from "@/components/myUi/button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { FaUserLock } from "react-icons/fa6";

import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "../../../context/translationContext";

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated } = useKindeAuth();
  const params = useSearchParams();
  const redirectUrl = params.get("reqUrl");
  const { translate: t } = useTranslation();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isLoading || !isClient) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <section className="min-h-[80vh] py-[30px] flex items-center justify-center px-4 bg-gray-50">
        <div className="max-w-2xl w-full">
          <div className="text-center space-y-6 text-gray-700 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <FaUserLock size={70} className="mx-auto my-5" />

            <h1 className="text-3xl font-bold text-txtBlack">
              {t("profilePage.authRequired")}
            </h1>

            <p className="text-gray-600 text-lg max-w-md mx-auto">
              {t("profilePage.authMessage")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
              <LoginLink
                postLoginRedirectURL={redirectUrl || "/"}
                // orgCode={process.env.NEXT_PUBLIC_KINDE_ORGANIZATION_CODE}
              >
                <Button text={t("profilePage.signIn")} />
              </LoginLink>

              <RegisterLink
                postLoginRedirectURL={redirectUrl || "/"}
                // orgCode={process.env.NEXT_PUBLIC_KINDE_ORGANIZATION_CODE}
              >
                <Button text={t("profilePage.createAccount")} />
              </RegisterLink>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              {t("profilePage.termsMessage")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative bg-gradient-to-r from-greenish to-green-700 px-6 py-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white/30 flex items-center justify-center">
                {user?.picture ? (
                  <Image
                    src={user.picture}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-4xl text-white">
                    {user?.given_name?.[0]?.toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {user?.given_name
                    ?.split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </h1>
                <p className="text-blue-100 mt-1">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-6">
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {t("profilePage.personalInfo")}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t("profilePage.firstName")}</span>
                    <span className="font-medium text-gray-900">
                      {user?.given_name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t("profilePage.lastName")}</span>
                    <span className="font-medium text-gray-900">
                      {user?.family_name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {t("profilePage.accountDetails")}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t("profilePage.email")}</span>
                    <span className="font-medium text-gray-900 break-all">
                      {user?.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t("profilePage.userId")}</span>
                    <span className="font-medium text-gray-900 break-all">
                      {user?.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <LogoutLink postLogoutRedirectURL="/">
                <Button text={t("profilePage.logOut")} />
              </LogoutLink>
              {/* <Button 
                text="Edit Profile"
              /> */}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
