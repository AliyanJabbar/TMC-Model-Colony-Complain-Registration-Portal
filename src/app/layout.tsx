import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./AuthProvider";
import { Toaster } from "react-hot-toast";
import ClientLayout from "./clientLayout";
import { TranslationProvider } from "../context/translationContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["400", "700", "900"],
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Complain Portal",
  description: "TMC Model Colony Complain Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`font-merri text-gray-700 bg-main antialiased scroll-smooth`}
        >
          <TranslationProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <ClientLayout>{children}</ClientLayout>
          </TranslationProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
