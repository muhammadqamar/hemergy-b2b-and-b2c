import Image from "next/image";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progress = () => {
  return (
    <div className="wallet-progress">
      <div className="w-full h-full">
        <CircularProgressbarWithChildren
          styles={buildStyles({
            pathColor: "#92a0ff",
            trailColor: "#6b7efd",
          })}
          value={40}
        >
          <div className="progress-about">
            <Image src="/images/payments.svg" alt="USDC" width={32} height={32} />
            <h4 className="text-5xl text-white font-semibold font-Poppins">2,345</h4>
            <h5 className="p-x-sm font-semibold text-white">USDC Earned</h5>
            <p className="p-xs text-white opacity-60">Since 13 Jan 2023</p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export default Progress;
