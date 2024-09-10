"use client";

import React from "react";

import { useParams } from "next/navigation";

import styles from "./page.module.scss";

const Instrument: React.FC = () => {
  const { instrument } = useParams();

  return (
    <main>
      <h2>{instrument}</h2>
    </main>
  );
};

export default Instrument;
