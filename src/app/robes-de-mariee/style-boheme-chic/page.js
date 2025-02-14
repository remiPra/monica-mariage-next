"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";

import ComponentMainPage from "@/app/components/ComponentPageMain";

function Page() {
  return (
    <>
      <ComponentMainPage json="/style-boheme-chic" />
    </>
  );
}

export default Page;
