'use client';

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/ui/Preloader";
import { BackgroundGeometry } from "@/components/ui/BackgroundGeometry";
import { DigitalDust } from "@/components/ui/DigitalDust";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SmoothScroll>
        <DigitalDust />
        <BackgroundGeometry />
        <FloatingWhatsApp />
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen relative z-10 flex flex-col">
          {children}
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
