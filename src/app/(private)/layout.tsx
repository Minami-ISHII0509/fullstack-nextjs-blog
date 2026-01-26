import PrivateHeader from "@/components/layouts/PrivateHeader";
import React from "react";

export default function PrivateLayput({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PrivateHeader />
      {children}
    </>
  );
}
