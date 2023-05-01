import Image from "next/image";
import React from "react";

const Index = ({ icon, txName, txDate, txFrom, txTo, txToken, txShort }) => {
  return (
    <div className="tran-card">
      <div className="tran-head">
        <div className="tran-image">
          {txShort && <h5 className="p-sm-semi text-white">{txShort}</h5>}
          {icon && <Image src={icon} alt="icon" width={20} height={20} />}
        </div>
        <div>
          <h5 className="p-sm-semi text-white mb-1 w-24 ellipsis ">{txName}</h5>
          <p className="p-xs text-white">{txDate}</p>
        </div>
      </div>

      <div>
        {txFrom && (
          <div className="tran-from-to">
            <span className="p-xs text-white w-[25px]">From</span>
            <h5 className="p-sm-semi text-white w-[91px] ellipsis">{txFrom}</h5>
          </div>
        )}
        {txTo && (
          <div className="tran-from-to">
            <span className="p-xs text-white w-[25px]">To</span>
            <h5 className="p-sm-semi text-white w-[91px] ellipsis">{txTo}</h5>
          </div>
        )}
      </div>

      <div>
        <h5 className="p-sm-semi text-right text-white">{txToken}</h5>
      </div>
    </div>
  );
};

export default Index;
