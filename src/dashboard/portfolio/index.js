import CardArea from "../common/cardArea";
import Insights from "./insights";
import Wallet from "./wallet";

const Index = () => {
  return (
    <div className="flex flex-col laptop:flex-row">
      <CardArea
        areaHeading="Your portfolio"
        areaDesc="These are the projects you’ve invested in"
        btn1="Sell"
        btn2="Buy more"
        bgGreen
        token="200"
        tokenLabel="Available"
        usdc="745"
        usdcDate="Since 13 Jan 2023"
        browBtn
      />

      <Insights />
      <Wallet />
    </div>
  );
};

export default Index;
