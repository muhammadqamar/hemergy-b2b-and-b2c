import Image from "next/image";
import Link from "next/link";

const NoTransaction = ({ heading }) => {
  return (
    <div className="no-tran-box">
      <Image src="/images/info.svg" alt="icon" width={24} height={24} />
      <div className="flex flex-col gap-2">
        <h4 className="p-sm text-weight-semibold text-white">{heading}</h4>
        <p className="p-sm-semi text-weight-normal text-blue100">
          Once you’ve started investing, the transaction history data will appear here
        </p>
        <Link href="" className="p-sm-semi text-weight-medium text-white">
          Tell me more
        </Link>
      </div>
    </div>
  );
};

export default NoTransaction;
