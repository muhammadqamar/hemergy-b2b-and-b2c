
import Image from "next/image";

export default function FundingDate({ to, from }) {

    return (
        <div className={`hamergy- flex text-[12px] leading-[14px] font-semibold`}>
            Funding:
            <Image className="ml-[10px] mr-[6px]" src={'/images/calendar_today.svg'} alt="icon" width={12} height={14} />
            <span className="font-normal mr-[10px]">{to}</span> -
            <Image className="ml-[10px] mr-[6px]"  src={'/images/calendar_today.svg'} alt="icon" width={12} height={14} />
            <span className="font-normal">{from}</span>
        </div>
    );
}
