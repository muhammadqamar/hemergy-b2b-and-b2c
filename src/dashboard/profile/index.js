
import { useState } from "react";
import AccountDetails from "./accountDetails";

const Index = () => {
  const [active, setActive] = useState("account");
  return (
    <div className="info-bg">
      <div className="white-frame h-[848px]">
        <h1 className="mb-8 p-xl-semi text-textblack">Hi, Steven!</h1>
        <div className="flex flex-col items-start gap-8 md:flex-row ">
          <div className=" w-full md:w-[276px] flex flex-row flex-wrap md:flex-col gap-2 ">
            <button
              onClick={() => setActive("account")}
              className={`tab-btn w-fit whitespace-nowrap md:w-full text-left px-3 py-[10px] rounded-xl p-sm text-weight-medium ${
                active === "account" ? "text-textcolor bg-cardbg" : "text-textblack bg-white"
              } `}
            >
              Account details
            </button>
            {/* <button
              onClick={() => setActive("profile")}
              className={`tab-btn w-fit md:w-full whitespace-nowrap text-left p- px-3 py-[10px] rounded-xl p-sm text-weight-medium ${
                active === "profile" ? "text-textcolor bg-cardbg" : "text-textblack bg-white"
              } `}
            >
              Investor profile
            </button>
            <button
              onClick={() => setActive("email&password")}
              className={`tab-btn w-fit md:w-full text-left whitespace-nowrap px-3 py-[10px] rounded-xl p-sm text-weight-medium ${
                active === "email&password" ? "text-textcolor bg-cardbg" : "text-textblack bg-white"
              } `}
            >
              Email & password
            </button> */}
          </div>

          <div className="">{active === "account" && <AccountDetails />}</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
