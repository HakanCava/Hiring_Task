import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Locations",
};

const GetLocationsLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default GetLocationsLayout;