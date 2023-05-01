import Image from "next/image";
import Button from "@/utils/buttons";

const SmartContract = () => {
  return (
    <div className="white-frame h-full-screen">
      <div className="flex items-center gap-3 md:gap-0 flex-wrap md:flex-nowrap justify-between mb-6">
        <h1 className="p-xl-semi text-textblack">Smart Contract</h1>
        <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
          <Button bg="bg-white" border text="Keep editing" />
          <Button bg="bg-textcolor" color text="Create as draft" />
          <Button bg="bg-green500" color text="Go live now" />
        </div>
      </div>
      <h3 className="mb-6 text-xl font-semibold leading-7 text-textblack font-Poppins">Solar Panels in Tahiti</h3>
      <div className="flex gap-2 items-start mb-6 bg-[#FFF8DF] p-6 rounded-xl">
        <Image src="/images/warning.svg" alt="warning" width={24} height={24} />
        <div className="flex flex-col gap-2">
          <h4 className="text-base font-semibold leading-6 font-Inter text-textblack ">Please review carefully</h4>
          <p className="text-sm font-normal leading-5 font-Inter text-textblack ">This contract cannot be changed once the project is created.</p>
        </div>
      </div>
      <div className="w-full bg-garbg h-full md:h-[530px] rounded-xl flex items-center justify-center">
        <p className="text-xl font-semibold leading-7 text-textblack font-Poppins">Preview here</p>
      </div>
    </div>
  );
};

export default SmartContract;
