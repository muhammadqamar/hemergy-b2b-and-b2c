import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function index({
  icon,
  iconWidth,
  iconHeight,
  text,
  link,
  onClick,
  color,
  bg,
  border,
  borderColor,
  shadow,
  hover,
  m,
  disabled,
  type,
  btnText,
}) {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        className={`project-link ${bg}
           ${border && 'border'}
            ${borderColor && 'border-textcolor'}
           ${shadow && 'shadow-xsshadow'}
           ${color ? 'text-white' : 'text-textcolor'}
           ${hover && 'hover:bg-textcolor hover:text-white'}
           ${m && 'm-auto'}`}
        onClick={onClick}
      >
        {icon && <Image src={icon} alt="logo" width={iconWidth || 20} height={iconHeight || 20} />}
        {text && <p className={`link-name`}>{text}</p>}
      </button>
    </>
  );
}
