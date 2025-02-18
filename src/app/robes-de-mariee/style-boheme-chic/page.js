"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";

import ComponentMainPage from "@/app/components/ComponentPageMain";
import Loader from "@/app/components/LoaderMonicaMariage";

function Page() {
  return (
    <>
      <Loader text="Collection robe Bohème chic" />
      <ComponentMainPage json="/style-boheme-chic" />
    </>
  );
}

export default Page;
