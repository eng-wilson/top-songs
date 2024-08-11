"use client";

import React, { ReactNode } from "react";
import "../locales";
import { LocaleProvider } from "@/contexts/LocaleContext";
// import { Container } from './styles';

const ParentProvider = ({ children }: { children: ReactNode }) => {
  return <LocaleProvider>{children}</LocaleProvider>;
};

export default ParentProvider;
