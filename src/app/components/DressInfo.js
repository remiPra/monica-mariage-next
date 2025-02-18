// app/components/DressInfo.js
"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

export default function DressInfo({ robe }) {
  const [safeDescription, setSafeDescription] = useState("");

  useEffect(() => {
    if (robe) {
      setSafeDescription(DOMPurify.sanitize(robe.descriptionCourte));
    }
  }, [robe]);

  return (
    <>
      <h1 className="text-3xl font-bold text-[#af7749] mb-4">
        Robe de mariée {robe.dressName}
      </h1>
      <p
        className="text-gray-700 text-xl leading-relaxed"
        dangerouslySetInnerHTML={{ __html: safeDescription }}
      />

      <a
        href="#"
        className="mt-6 block w-full text-center bg-[#af7749] text-white py-3 rounded-lg font-medium hover:bg-[#925c36] transition-all duration-300"
      >
        PRENDRE RENDEZ-VOUS
      </a>
    </>
  );
}
