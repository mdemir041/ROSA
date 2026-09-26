"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 w-full flex flex-col">
      {children}
    </div>
  );
}
