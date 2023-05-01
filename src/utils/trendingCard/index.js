import Image from "next/image";
import Link from "next/link";
import React from "react";

const Index = ({ icon, capTable, heading, ratio, ratioName, wFit }) => {
  return (
    <div
      className={`${
        wFit ? "w-fit" : "w-full"
      } h-auto p-4 flex items-center gap-4 bg-white rounded-xl shadow-mdshadow2  `}
    >
      <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-lg bg-garbg">
        <Image src={icon} alt="icon" width={32} height={32} />
      </div>
      <div className="w-full">
        <div className="w-full flex items-center gap-2 justify-between">
          <h6 className="p-lg text-textblack">{heading}</h6>
          {capTable && (
            <Link href="" className="p-sm-semi text-textcolor">
              Cap table
            </Link>
          )}
        </div>
        <div className="">
          <h5 className="p-xl-semi text-textblack">
            {ratio}
            <sub className="p-sm text-weight-semibold ml-1">{ratioName}</sub>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Index;
