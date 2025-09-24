"use client";

import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 z-1 sm:p-0">
      <ThemeProvider>
        <div
          className="relative flex lg:flex-row w-full h-screen justify-center flex-col sm:p-0"
          style={{
            backgroundImage: "linear-gradient(to top right, #000000, #2b2b2b)",
          }}
        >
          {/* Formulário */}
          {children}

          {/* Lado da logo */}
          <div className="lg:w-1/2 w-full h-full bg-transparent lg:grid items-center hidden">
            <div className="relative items-center justify-center flex z-1">
              <GridShape />
              <div className="flex flex-col items-center max-w-full px-4">
                <Image
                  width={500}
                  height={100}
                  src="/images/logo/logo.png"
                  alt="Logo"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
