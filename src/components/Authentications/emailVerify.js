import { useState } from "react";
import Image from "next/image";

const EmailVerify = ({ loader }) => {
  return (
    <div className="flex justify-center item-center mt-[200px]">
      <div className="registration-box">
        <div className="flex-box d-column gap-x-sm">
          <h3 className="p-xl center-text">Verifying Email Link</h3>
        </div>

        <div className="gap-4 flex-box">
          <button
            className="btn secondary blue"
            type="submit"
            onClick={async () => {}}
          >
            {loader ? (
              <Image
                src="/images/loader.svg"
                width="20"
                height="10"
                alt="loader"
              />
            ) : (
              ""
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
