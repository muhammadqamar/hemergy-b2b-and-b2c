import { useState, useEffect } from 'react';
import TabInfo from '@/utils/tabInfo';
import UserCard from '@/utils/userCard';
import ProjectCardThumbnail from '@/utils/projectCardThumbnail';
import Link from 'next/link';
import Image from 'next/image';
import {getBalance} from "@/components/helpers/balance"

export default function ProjectCard(props) {
  const {
    stock,
    w,
    bio,
    user,
    viewDetailbtn,
    trending,
    stockdirection,
    hemergyType,
    hemergyIcon,
    name,
    hideThumbnail,
    bg,
    Shadow,
    location,
    projectImage,
    btnLink = '',
    item
  } = props;

  const [money, setMoney] = useState()
  useEffect(() => {
    (async () => {
      const result = await getBalance(item.projectAddress);
      setMoney(result);
    })();
  }, [item]);
  return (
    <div
      className={`hemergy-project-card rounded-[20px] h-max overflow-hidden text-left ${
        w && 'w-[266px]'
      } `}
      style={{ boxShadow: Shadow }}
    >
      {!hideThumbnail && (
        <ProjectCardThumbnail
          h="280px"
          bgimg={projectImage}
          trending={trending}
          stock={stock}
          stockdirection={stockdirection}
          hemergyType={hemergyType}
          hemergyIcon={hemergyIcon}
        />
      )}
      <div className={`${bg ? bg : 'bg-white'} p-[18px]`}>
        {bg ? (
          <div className="flex justify-between w-full">
            <TabInfo
              icon="/images/clear_day.svg"
              text="Sun"
              color="text-white"
              w="17"
              h="17"
              bg="bg-blue600"
              bold="font-semibold"
            />
            <TabInfo
              icon={
                stockdirection
                  ? '/images/Polygon 1.svg'
                  : '/images/Polygon 1.svg'
              }
              text={stock}
              color="text-white"
              w="10"
              h="10"
              bg="bg-textcolor"
              bold="font-semibold"
            />
          </div>
        ) : (
          <div className="">
            <TabInfo
              icon="/images/location_on.svg"
              text={location}
              color="text-textcolor"
              bold="font-medium"
              textEllipsis
            />
          </div>
        )}
        {name && (
          <h1
            className={`pt-[16px] pb-[8px] ${
              bg && 'text-white'
            } text-[16px] leading-[24px] font-semibold `}
          >
            {name}
          </h1>
        )}

        {bio && (
          <p
            className={` ${
              bg ? 'text-white500' : 'text-gray800'
            } 0 pb-[16px] text-[14px] leading-[20px] font-normal max-w-[240px]`}
          >
            {bio}
          </p>
        )}
        {true && (
              <div className="flex gap-[10px] mb-[15px] items-center">
                <img
                  src="/images/token.png"
                  alt="token"
                  className="w-[32px] h-[32px]"

                />
                <div>
                  <h5 className="p-sm text-textcolor mb-1">{money}</h5>
                  <p className="p-x-sm font-medium text-gray900">
                    USDC available
                  </p>
                </div>
              </div>
            )}
        {user && (
          <div className="mb-[16px]">
            <UserCard
              bg={bg}
              avatar={user.avatar}
              name={user.name}
              designation={user.designation}
              bio={user.bio}
            />
          </div>
        )}

        {viewDetailbtn && (
          <Link href={btnLink}>
            <button
              className={`w-full rounded-xl secondary ${
                bg ? 'bg-blue400 text-white' : 'bg-cardbg text-textcolor'
              } `}
            >
              View details
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
