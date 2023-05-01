import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function index() {
  return (
    <div className="info-box">
      <Link href="" className="info-link">
        <Image src="/images/help-info.svg" alt="logo" width={32} height={32} />
      </Link>
      <h3 className="info-heading">How it works</h3>
      <p className="info-text">
        Complete steps 01 - 04 to create your new project. A&nbsp;
        <span className="select-info">Smart contract</span> will be generated
        per project by default
      </p>
    </div>
  );
}
