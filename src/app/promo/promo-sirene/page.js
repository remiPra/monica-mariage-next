"use client";
import ComponentPagePromo from "@/app/components/ComponenentPagePromo";
import Loader from "@/app/components/LoaderMonicaMariage";
import React from "react";

function Page() {
  return (
    <>
      <Loader text="promotion robes de mariées Sirene" />
      <ComponentPagePromo json="/promo-sirene.json" />;
    </>
  );
}

export default Page;
