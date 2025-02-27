import AuthHeader from "@/app/components/AuthHeader";
// import Image from "next/image";
import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 
  return (
    <>
    <AuthHeader/>
    <div className="container lg:my-16 my-6">
      <div className="grid grid-cols-1 items-center">
      <div>{children}</div>
      </div>
    </div>
    </>
  );
};

export default AuthLayout;
