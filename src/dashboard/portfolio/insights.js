import PowerCarbon from "@/utils/powerCarbon";
import TrasactionCard from "@/utils/TransactionCard";
import NoTransaction from "../common/noTransaction";

const Insights = () => {
  return (
    <div className="insight-card w-full laptop:w-[38%] t-b-raidus bg-textcolor z-[1]">
      <div className="mb-8">
        <h2 className="p-xl text-white mb-3">Insights</h2>
        <p className="p-sm text-white">The impact of your investment</p>
      </div>
      <div className="mb-8">
        <PowerCarbon />
      </div>
      <div className="mb-6">
        <h3 className="p-lg text-white mb-2">Latest transactions</h3>
        <p className="p-sm-semi text-white text-weight-normal">
          See how your investment is being spent
        </p>
      </div>
      <div className="gradient-bg h-[530px] scrollbar-hide">
        <div className="transac-bg ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
            (item, index) => (
              <div key={index}>
                <TrasactionCard
                  txShort="Tx"
                  txName="7fjhf89fhjf989"
                  txDate="1 min ago"
                  txFrom="4fgf87bt7rrj9gj"
                  txTo="gvc56dff34634g78"
                  txToken="3.45"
                />
              </div>
            )
          )}
        </div>
      </div>
      {/* <NoTransaction heading='No transaction information' />*/}
    </div>
  );
};

export default Insights;
