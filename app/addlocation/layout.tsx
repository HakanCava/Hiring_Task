import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Location",
};

const AddLocationLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AddLocationLayout;