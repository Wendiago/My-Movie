import CustomImage from "@/components/ui/custom-image";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-6 border-t">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3 text-2xl">
            <CustomImage
              src={"/logo.png"}
              alt="logo"
              width={24}
              height={24}
              className="w-6 h-6"
              usePlaceholder={false}
            />
          </div>
          <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#209dc2] via-[#b05f99] to-[#e85a75]">
            WENDIAGO MOVIE
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-bold mb-1">About us</p>
          <p>Introduction</p>
          <p>Services</p>
          <p>Contact</p>
          <p>Help center</p>
          <p>Information</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-bold mb-1">About us</p>
          <p>Introduction</p>
          <p>Services</p>
          <p>Contact</p>
          <p>Help center</p>
          <p>Information</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-bold mb-1">About us</p>
          <p>Introduction</p>
          <p>Services</p>
          <p>Contact</p>
          <p>Help center</p>
          <p>Information</p>
        </div>
      </div>
    </footer>
  );
}
