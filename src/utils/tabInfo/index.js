import Image from 'next/image';

export default function TabInfo({
  text,
  icon,
  py,
  bg,
  bold,
  color,
  textEllipsis,
  w = 12,
  h = 13,
}) {
  return (
    <div
      className={`hamergy-tabinfo font-Inter flex gap-[8px]  ${bg} items-center ${
        bg ? 'px-[8px]' : ''
      } ${py ? 'py-[6px]' : 'py-[4px]'} rounded-[8px] w-fit `}
    >
      {icon && <Image src={icon} alt="icon" width={w} height={h} />}
      <h4
        className={`${color} ${bold} text-[14px] leading-[20px] ${
          textEllipsis &&
          'overflow-hidden w-[205px] text-ellipsis whitespace-pre'
        }`}
      >
        {text}
      </h4>
    </div>
  );
}
