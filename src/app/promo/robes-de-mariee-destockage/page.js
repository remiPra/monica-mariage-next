"use client";
import ComponentPagePromo from "@/app/components/ComponenentPagePromo";
import Loader from "@/app/components/LoaderMonicaMariage";
import React from "react";

function Page() {
  return (
    <>
      <Loader text="robes de mariées destockage" />
      <ComponentPagePromo json="/robes-de-mariees-destockage.json" />;
    </>
  );
}

export default Page;
