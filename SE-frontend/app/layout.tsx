"use client";

import React from "react";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

import { useRouter } from "next/navigation"; // Change this line
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { decryptValue } from "@/utils/encryption";

// Correct syntax for the Sarabun font
const noto = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "600", "700"],
  variable: "--font-noto",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter(); // Use the correct router hook
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const roleCookie = decryptValue(Cookies.get("role") || "");
    if (!roleCookie) {
      router.replace("https://clinic.se.cpe.eng.cmu.ac.th/");
      return;
    }

    const role = decryptValue(roleCookie);
    if (role !== "doctor") {
      router.replace("https://clinic.se.cpe.eng.cmu.ac.th/");
    } else if (isMounted) {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <html lang="en">
        <body className={`${noto.variable} antialiased`}>
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={noto.variable}>{children}</body>
    </html>
  );
}

