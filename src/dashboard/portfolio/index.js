import CardArea from '../common/cardArea';
import Insights from './insights';
import Wallet from './wallet';

const Index = ({ userProject }) => {
  return (
    <div className="flex flex-col laptop:flex-row">
      <CardArea
        userProject={userProject}
        areaHeading="Your portfolio"
        areaDesc="These are the projects you’ve invested in"
        btn1="Sell"
        btn2="Buy more"
        bgGreen
        token="200"
        tokenLabel="Available"
        usdcDate="Since 13 Jan 2023"
        browBtn
      />

      <Insights />
      <Wallet />
    </div>
  );
};

export default Index;
