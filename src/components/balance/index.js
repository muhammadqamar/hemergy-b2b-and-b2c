import { useSelector } from "react-redux";

const BalanceCom = () => {
    const {balance}  = useSelector(state=>state.user)
  return (
    <div className=" bg-[#fff] p-[10px] rounded-[10px] fixed top-[8px] right-[8px] z-[10px] px-[20px] shadow-mainshadow flex items-center gap-[10px]">
      <img src="/images/token.png" alt="" />Available Balance : <strong>{balance || 0}  USDC</strong>
    </div>
  );
};

export default BalanceCom;
