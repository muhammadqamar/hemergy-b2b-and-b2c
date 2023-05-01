import Image from "next/image";
import Detail from "./detail";
import CreditCard from "./creditCard";
import { useState } from "react";

const data = [
  {
    icon: "/images/token.png",
    title: "These are equity tokens",
    desc: "You will get your capital back when you sell your tokens. You will be able to sell them through the platform.",
  },
  {
    icon: "/images/currency_exchange.svg",
    title: "Returns calculated every 15 minutes",
    desc: "Something about returns blahblah is that it has a more-or-less normal distribution of letters",
  },
  {
    icon: "/images/w-search.svg",
    title: "Your investment is transparent",
    desc: "Because you purchase is tokenised using blockchain technology, you will be able to see exactly where the money is going",
  },
  {
    icon: "/images/w-search.svg",
    title: "Withdraw returns whenever",
    desc: "Your returns will be held in our cryptowallet, and you can withdraw to your account at any time. Alternatively you can link your own cryptowallet and returns will be deposited there directly as they become available. ",
  },
];

const Index = () => {
  const [active, setActive] = useState("card");
  return (
    <section className="dashboard-container">
      <div className="project-detail bg-blue700">
        <Detail />
        <div className="w-full flex flex-col md:flex-row justify-between gap-6 p-6 laptop:p-8">
          <div className="flex flex-col gap-6 max-w-[617px]">
            <h2 className="p-md">What you need to know</h2>

            {data.map((item, index) => (
              <div key={index}>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-textcolor rounded-[50%]">
                    <img src={item.icon} alt="logo" className="w-auto h-auto" />
                  </div>
                  <h4 className="p-sm text-weight-semibold text-white">
                    {item.title}
                  </h4>
                </div>
                <p className="p-sm text-blue100">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="w-full md:w-[538px] p-6 bg-blue600 rounded-xl">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Image
                src="/images/token.png"
                className="shadow-xsmshadow rounded-[50%]"
                alt="token"
                width={32}
                height={32}
              />
              <h3 className="p-md text-white ">1 token = 1 USDC</h3>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-full p-4 rounded-lg bg-textcolor">
                <h1 className="font-Poppins text-[64px] leading-[64px] font-semibold text-white mb-1">
                  150
                </h1>
                <p className="p-sm-semi text-weight-medium text-blue100">
                  Tokens to buy
                </p>
              </div>
              <div className="w-full p-4 rounded-lg text-right bg-textcolor">
                <h1 className="font-Poppins text-[64px] leading-[64px] font-semibold text-blue300 mb-1">
                  200
                </h1>
                <p className="p-sm-semi text-weight-medium text-blue100">
                  Equity tokens available
                </p>
              </div>
            </div>
            <div className="mb-8">
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                defaultValue={10}
                // onChange={(e) => setmoco(e.target.value)}
                style={{
                  // backgroundSize: `  ${(moco / 300) * 100}%   , ${((300 - moco) / 300) * 100}% `,
                  backgroundSize: "80%,100%",
                }}
              />
            </div>
            <div>
              <h3 className="p-md text-white text-center mb-6">
                Total to pay &nbsp; € 143.56
              </h3>

              <div className="flex items-center flex-wrap justify-center gap-2 mb-6">
                <button
                  onClick={() => setActive("card")}
                  className={`secondary flex items-center justify-center rounded-xl text-white ${
                    active === "card" ? "bg-textcolor" : "bg-blue700"
                  }`}
                >
                  Credit card
                </button>
                <button
                  onClick={() => setActive("back")}
                  className={`secondary flex items-center justify-center rounded-xl text-white ${
                    active === "back" ? "bg-textcolor" : "bg-blue700"
                  }`}
                >
                  Bank transfer
                </button>
                <button
                  onClick={() => setActive("crypto")}
                  className={`secondary flex items-center justify-center rounded-xl text-white ${
                    active === "crypto" ? "bg-textcolor" : "bg-blue700"
                  }`}
                >
                  Cryptowallet
                </button>
              </div>
              {active === "card" && (
                <div>
                  <CreditCard />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
