"use client";
import ComponentPagePromo from "@/app/components/ComponenentPagePromo";
import Loader from "@/app/components/LoaderMonicaMariage";
import React from "react";

function Page() {
  return (
    <>
      <Loader text="promotions robes de mariées bohème chic" />
      <ComponentPagePromo json="/robes-de-mariee-boheme-chic.json" />;
    </>
  );
}

export default Page;
