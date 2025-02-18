"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import ComponentMainPage from "@/app/components/ComponentPageMain";

function Page() {
  return (
    <>
      <Loader text="Collection robe Princesse" />
      <ComponentMainPage json="/forme-princesse" />
    </>
  );
}

export default Page;
