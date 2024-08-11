"use client";

import React, { ReactNode } from "react";
import "../locales";
// import { Container } from './styles';

const ParentProvider = ({ children }: { children: ReactNode }) => {
  return children;
};

export default ParentProvider;
