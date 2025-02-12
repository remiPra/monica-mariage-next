"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/app/components/Header";
import ComponentPageMainDress from "@/app/components/ComponentPageMainDress";

export default function Page() {
  return (
    <>
      <ComponentPageMainDress json="/forme-princesse" />
    </>
  );
}
