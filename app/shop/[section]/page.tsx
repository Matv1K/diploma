"use client";

import React from "react";

import { useParams } from "next/navigation";

const Section: React.FC = () => {
  const { section } = useParams();

  return (
    <main>
      <h2>{section}</h2>
    </main>
  );
};

export default Section;
