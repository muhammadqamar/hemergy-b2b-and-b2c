
import Image from "next/image";

export default function TabInfo({ text, icon, bg, bold, color, w=12, h=13 }) {

    return (
        <div className={`hamergy-tabinfo flex gap-[8px]  ${bg} items-center px-[8px] py-[6px] rounded-[8px] w-fit `}>
            {icon && <Image src={icon} alt="icon" width={w} height={h} />}
            <h4 className={`${color} ${bold} text-[14px] leading-[20px] `}>{text}</h4>
         </div>
    );
}
