import Image from "next/image";
import PowerCarbon from "@/utils/powerCarbon";
import Link from "next/link";

const Tokens = ({ showTokenInfo }) => {
  return (
    <div className="tokens-wrapper">
      <div className="w-full pt-4 px-2 pb-2 rounded-xl bg-blue600 text-white ">
        <div className=" flex items-center justify-center gap-2 mb-4">
          <div className="w-fit h-auto rounded-full shadow-xsmshadow ">
            <Image src="/images/token.png" alt="token" width={32} height={32} />
          </div>
          <h6 className=" p-md  ">Equity tokens</h6>
        </div>

        <div className={`flex flex-col gap-2 items-center justify-between`}>
          <div
            className={
              "w-full flex items-center justify-between gap-1 flex-row px-4 py-[22px] bg-textcolor rounded-lg"
            }
          >
            <h5 className="p-xl">1,200</h5>
            <p className="p-sm-semi text-weight-medium">Issued</p>
          </div>
          <div
            className={
              "w-full flex items-center justify-between gap-1 flex-row px-4 py-[22px] bg-textcolor rounded-lg"
            }
          >
            <h5 className="p-xl">500</h5>
            <p className="p-sm-semi text-weight-medium">Sold</p>
          </div>
          <div
            className={
              "w-full flex items-center justify-between gap-1 flex-row px-4 py-[22px] bg-textcolor rounded-lg"
            }
          >
            <h5 className="p-xl">700</h5>
            <p className="p-sm-semi text-weight-medium">Left</p>
          </div>
        </div>
      </div>

      <div className="w-full mb-2 sm:mb-4 ">
        <PowerCarbon />
      </div>
      <div className=" w-full  flex items-center flex-col p-4 gap-2 bg-blue600 rounded-xl">
        <Image src="/images/attach_money.svg" alt="power" width={40} height={40} />
        <h4 className="text-white p-xl">2.3k</h4>
        <p className="font-medium text-white p-x-sm">Carbon avoided</p>
      </div>
      <div className=" w-full  flex items-center flex-col p-4 gap-2 bg-blue600 rounded-xl">
        <Image src="/images/trending_up_w.svg" alt="power" width={40} height={40} />
        <h4 className="text-white p-xl">2.3kW</h4>
        <p className="font-medium text-white p-x-sm">Carbon avoided</p>
      </div>
      <div className=" w-full  flex items-center flex-col p-4 gap-2 bg-blue600 rounded-xl">
        <Image src="/images/attach_money.svg" alt="power" width={40} height={40} />
        <h4 className="text-white p-xl">2.3k</h4>
        <p className="font-medium text-white p-x-sm">Carbon avoided</p>
      </div>
      <div className=" w-full  flex items-center flex-col p-4 gap-2 bg-blue600 rounded-xl">
        <Image src="/images/investors.svg" alt="power" width={40} height={40} />
        <h4 className="text-white p-xl">213</h4>
        <p className="font-medium text-white p-x-sm">Investors</p>
      </div>

      <Link href="/B2B-cap-table" className="p-sm text-white text-center p-2">
        View Cap table
      </Link>
    </div>
  );
};

export default Tokens;
