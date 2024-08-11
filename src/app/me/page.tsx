"use client";

import React, { Suspense } from "react";

import Result from "./components/Result";

const Me = () => {
  return (
    <Suspense>
      <Result />
    </Suspense>
  );
};

export default Me;
