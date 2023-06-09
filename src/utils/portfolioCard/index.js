import Image from 'next/image';
import TabInfo from '@/utils/tabInfo';
import UserCard from '@/utils/userCard';
import Link from 'next/link';
import { getBalance } from '@/components/helpers/balance';
import { useEffect, useState } from 'react';
const Index = ({
  usdc,
  usdcDate,
  projectName,
  projectDetail,
  h,
  token,
  tokenLabel,
  btn1,
  btn2,
  bgGreen,
  banner,
  hot,
  location,
  userName,
  assetsName,
  btnLink = '',
  userImage,
  item,
}) => {
  const [money, setMoney] = useState();
  useEffect(() => {
    (async () => {
      const result = await getBalance(item.projectAddress);
      setMoney(result);
    })();
  }, [item]);
  return (
    <div className="project-card-box">
      <Link href={btnLink} className="w-full">
        <div
          className={`card-head-img ${
            h ? 'h-[106px] md:h-[230px]' : 'h-[106px] md:h-[129px]'
          }`}
        >
          <img src={banner} alt="img" className="card-bg-img" />
          <div className="w-full flex-box">
            <div className="relative">
              <TabInfo
                icon={hot ? '/images/hot.svg' : 'images/download.svg'}
                text={hot ? 'Hot' : 'Terms sheet'}
                color="text-white"
                w="20"
                h="20"
                bg={hot ? 'bg-red600' : 'bg-textcolor'}
                bold="font-semibold"
              />
            </div>

            <div className="relative">
              <TabInfo
                icon="/images/Polygon.svg"
                text="657.4"
                color="text-white"
                w="10"
                h="10"
                bg="bg-textcolor"
                bold="font-semibold"
              />
            </div>
          </div>
          <div className="relative">
            <TabInfo
              icon="/images/clear_day_w.svg"
              text={assetsName}
              color="text-white"
              w="20"
              h="20"
              bg="bg-textblack"
              bold="font-semibold"
            />
          </div>
        </div>
        <div className="project-card-about">
          <div className="flex-box gap-2">
            <TabInfo
              icon="/images/location_on.svg"
              text={location}
              color="text-textcolor"
              w="16"
              h="16"
              bold="font-semibold"
            />
          </div>
          {projectDetail && (
            <div>
              <h4 className="p-lg mb-2">{projectName}</h4>
              <p className="p-sm-semi font-normal text-gray800">
                {projectDetail}
              </p>
            </div>
          )}
          <div className="project-user-details">
            <UserCard
              normal
              detail
              avatar={userImage}
              name={userName}
              designation="Project owner"
            />

            {token && (
              <div className="project-tokens">
                <Image
                  src="/images/token.png"
                  alt="token"
                  width={32}
                  height={32}
                />
                <div>
                  <h5 className="p-xl text-textcolor mb-1">{money}</h5>
                  <p className="p-x-sm font-medium text-gray900">
                    USDC available
                  </p>
                </div>
              </div>
            )}
          </div>
          {usdc && (
            <div className="usdc-earned-box">
              <Image
                src="/images/payments.svg"
                alt="USDC"
                width={32}
                height={32}
              />
              <div className="usdc-earnes">
                <h4 className="p-xl font-semibold text-textcolor ">{usdc}</h4>
                <h5 className="p-x-sm font-semibold text-textcolor">
                  USDC Earned
                </h5>
                <p className="p-xs text-gray900">{usdcDate}</p>
              </div>
            </div>
          )}

          <div className="flex-box gap-2">
            {btn1 && (
              <button className=" flex items-center justify-center rounded-xl secondary w-full text-textcolor bg-cardbg ">
                {btn1}
              </button>
            )}
            {btn2 && (
              <Link href={btnLink} className="w-full">
                <button
                  className={` flex items-center justify-center rounded-xl secondary w-full ${
                    bgGreen
                      ? 'text-white bg-green500'
                      : 'text-textcolor bg-cardbg'
                  } `}
                >
                  {btn2}
                </button>
              </Link>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Index;
