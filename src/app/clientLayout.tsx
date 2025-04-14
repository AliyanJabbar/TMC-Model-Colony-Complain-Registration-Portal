"use client";

import { usePathname } from "next/navigation";
import TopNews from "@/components/myUi/topNewsSlider";
import Header from "@/components/myUi/header";
import Footer from "@/components/myUi/footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.includes("/studio");

  return (
    <>
      {!isStudioRoute && <TopNews />}
      {!isStudioRoute && <Header />}
      {children}
      {!isStudioRoute && <Footer />}
    </>
  );
}
