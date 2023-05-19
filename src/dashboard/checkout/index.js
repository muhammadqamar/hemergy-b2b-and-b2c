import Image from "next/image";
import Detail from "./detail";
import CreditCard from "./creditCard";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSigner } from "@/components/helpers/signer";

import Hemergy from "@hemergy/core-sdk";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { updateuserprojects } from "@/services/user";
import { meta } from "@/services/transaction";
import Input from "@/utils/inputFields/input";
import { setAccountBalance } from "@/store/reducer/user";
import { useDispatch } from "react-redux";
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

const Index = ({ projectData }) => {
  const [active, setActive] = useState("card");
  const [tokenInput, setTokenInput] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  // useEffect(async () => {
  //   const e = await state.user.web3auth.connect();

  //   const ethersProvider = new ethers.providers.Web3Provider(e);
  //   const signer = await ethersProvider.getSigner();
  //   const usdc = new ethers.Contract(
  //     'TestUSDC',
  //     '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  //     signer
  //   );

  //   totalInvestedInProject = await usdc.balanceOf(projectData.projectAddress);
  //   console.log(totalInvestedInProject);
  // }, [projectData]);

  return (
    <section className="dashboard-container">
      <div className="project-detail bg-blue700 min-h-[90vh]">
        <Detail projectData={projectData} />
        <div className="flex flex-col justify-between w-full gap-6 p-6 md:flex-row laptop:p-8">
          <div className="flex flex-col gap-6 max-w-[617px]">
            <h2 className="p-md">What you need to know</h2>

            {data?.map((item, index) => (
              <div key={index}>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-textcolor rounded-[50%]">
                    <img src={item.icon} alt="logo" className="w-auto h-auto" />
                  </div>
                  <h4 className="text-white p-sm text-weight-semibold">{item.title}</h4>
                </div>
                <p className="p-sm text-blue100">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="w-full md:w-[538px] p-6 bg-blue600 rounded-xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image src="/images/token.png" className="shadow-xsmshadow rounded-[50%]" alt="token" width={32} height={32} />
              <h3 className="text-white p-md ">1 token = {projectData?.details?.tokens?.tokenPrice} USDC</h3>
            </div>

            {/* <div className="flex items-center gap-2 mb-4">
              <div className="w-full p-4 rounded-lg bg-textcolor">
                <h1 className="font-Poppins text-[64px] leading-[64px] font-semibold text-white mb-1">
                  150
                </h1>
                <p className="p-sm-semi text-weight-medium text-blue100">
                  Tokens to buy
                </p>
              </div>
              <div className="w-full p-4 text-right rounded-lg bg-textcolor">
                <h1 className="font-Poppins text-[64px] leading-[64px] font-semibold text-blue300 mb-1">
                  200
                </h1>
                <p className="p-sm-semi text-weight-medium text-blue100">
                  Equity tokens available
                </p>
              </div>
            </div> */}
            {/* <div className="mb-8">
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                defaultValue={10}
                // onChange={(e) => setmoco(e.target.value)}
                style={{
                  // backgroundSize: `  ${(moco / 300) * 100}%   , ${((300 - moco) / 300) * 100}% `,
                  backgroundSize: '80%,100%',
                }}
              />
            </div> */}
            <div>
              <h3 className="mb-6 text-center text-white p-md">
                Total to pay &nbsp;
                {tokenInput * projectData?.details?.tokens?.tokenPrice || 0} USDC
              </h3>

              <div className="">
                <label className="text-[#fff] ">Enter Token Amount</label>
                <Input inputType="number" onChange={(e) => setTokenInput(e.target.value)} placeholder="Enter amount" value={tokenInput} />
              </div>
              <br />
              {/* <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <button
                  onClick={() => setActive('card')}
                  className={`secondary flex items-center justify-center rounded-xl text-white ${
                    active === 'card' ? 'bg-textcolor' : 'bg-blue700'
                  }`}
                >
                  Credit card
                </button>
                <button
                  onClick={() => setActive('back')}
                  className={`secondary flex items-center justify-center rounded-xl text-white ${
                    active === 'back' ? 'bg-textcolor' : 'bg-blue700'
                  }`}
                >
                  Bank transfer
                </button>
                <button
                  onClick={() => setActive('crypto')}
                  className={`secondary flex items-center justify-center rounded-xl text-white ${
                    active === 'crypto' ? 'bg-textcolor' : 'bg-blue700'
                  }`}
                >
                  Cryptowallet
                </button>
              </div> */}
              {/* {active === 'card' && (
                <div>
                  <CreditCard projectData={projectData} />
                </div>
              )}  */}
            </div>

            <button
              className="p-lg text-weight-medium text-white rounded-xl px-2 py-3 w-full bg-red600"
              onClick={async () => {
                setIsLoading(true);
                const e = await state.user.web3auth.connect();

                const ethersProvider = new ethers.providers.Web3Provider(e);
                const signer = await ethersProvider.getSigner();

                const hemergy = new Hemergy({
                  baseURL: "https://dev-core.hemergy.com",
                  signer,
                });

                try {
                  if (!state.user.balance) {
                    await hemergy.mint(state.user.user?.accountAddress);
                  }
                  const amountConvert = tokenInput * projectData?.details?.tokens?.tokenPrice;

                  console.log("amountConvert", amountConvert);
                  const metainfo = await meta();
                  console.log(metainfo);
                  await hemergy.approveAccountAmount(state.user.user?.accountAddress, projectData?.projectAddress, metainfo.data.usdcContractAddress, amountConvert);

                  const invest = await hemergy.investInProject(projectData?.projectAddress, state.user.user?.accountAddress, amountConvert);

                  const balance = await hemergy.getBalance(state.user.user?.accountAddress);
                  console.log("balance", balance);
                  let hexNumber = balance._hex;
                  const bigIntNumber = BigInt(hexNumber);
                  const number = Number(bigIntNumber);
                  console.log("number", number);

                  const balanceProject = await hemergy.getBalance(projectData?.projectAddress);
                  console.log("balanceProject", balanceProject);
                  let hexNumberProject = balanceProject._hex;
                  const bigIntNumberProject = BigInt(hexNumberProject);
                  const numberProject = Number(bigIntNumberProject);
                  console.log("numberProject", numberProject);

                  dispatch(setAccountBalance(number / Math.pow(10, 18)));
                  if (state.user.user?.projectsasInvestor) {
                    await updateuserprojects("projectsasInvestor", {
                      email: state.user?.user?.email,
                      endUserAddress: state.user?.user?.endUserAddress,
                      projectAddress: [
                        ...state.user.user?.projectsasInvestor,
                        {
                          projectAddress: projectData?.projectAddress,
                          amount: "123",
                          time: new Date(),
                        },
                      ],
                    });
                  } else {
                    await updateuserprojects("projectsasInvestor", {
                      email: state.user?.user?.email,
                      endUserAddress: state.user?.user?.endUserAddress,
                      projectAddress: [
                        {
                          projectAddress: projectData?.projectAddress,
                          amount: "123",
                          time: new Date(),
                        },
                      ],
                    });
                  }
                  setIsLoading(false);
                  toast.success("You have successfully Invested in this Project", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                } catch (e) {
                  setIsLoading(false);
                }
              }}
            >
              {isLoading ? <img src="/images/loader.svg" /> : "Buy now"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
