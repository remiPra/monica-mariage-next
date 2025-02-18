"use client";
import ComponentPagePromo from "@/app/components/ComponenentPagePromo";
import Loader from "@/app/components/LoaderMonicaMariage";
import React from "react";

function Page() {
  return (
    <>
      <Loader text="robes de mariées promotion" />
      <ComponentPagePromo json="/robes-de-mariee-promotion.json" />;
    </>
  );
}

export default Page;
