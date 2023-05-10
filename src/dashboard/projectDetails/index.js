import Tokens from './tokens';
import TabInfo from '@/utils/tabInfo';
import UserCard from '@/utils/userCard';
import { useState } from 'react';
import CheckoutPage from '@/dashboard/checkout';

const Index = ({ projectData }) => {
  const [isChange, setIsChange] = useState(false);

  return (
    <>
      {isChange ? (
        <CheckoutPage projectData={projectData} />
      ) : (
        <div className="dashboard-container">
          <div className="bg-white project-detail">
            <div className="detail-img">
              <div
                className="detail-banner-img "
                style={{
                  background: `url(${
                    projectData?.details?.information?.image ||
                    '/images/not-img.png'
                  })`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="w-full flex-box">
                <div className="relative">
                  <TabInfo
                    icon="/images/hot.svg"
                    text="Hot"
                    color="text-white"
                    w="20"
                    h="20"
                    bg="bg-red600"
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
            </div>

            <div className="project-detail-about">
              <div className="gap-2 flex-box">
                <TabInfo
                  icon="/images/clear_day.svg"
                  text={projectData?.details?.linkAssets?.assetType}
                  color="text-textcolor"
                  w="20"
                  h="20"
                  py
                  bg="bg-cardbg"
                  bold="font-semibold"
                />
                <TabInfo
                  icon="/images/location_on.svg"
                  text={projectData?.details?.information.city}
                  color="text-textcolor"
                  w="16"
                  h="16"
                  bold="font-semibold"
                />
              </div>
              <div>
                <h3 className="mb-4 p-xl-semi">
                  {projectData?.details?.information?.projectName}
                </h3>
                <p className="p-sm text-gray800">
                  {projectData?.details?.information?.projectDescription}
                </p>
              </div>

              <UserCard
                company
                avatar={projectData?.user?.detail?.profileImage}
                detail
                name={projectData?.user?.detail?.name}
                designation="Project Owner"
              />

              {projectData?.details?.beneficiaries?.users?.map(
                (item, index) => (
                  <UserCard
                    key={index}
                    company
                    avatar="/images/user.png"
                    detail
                    name={item.firstName}
                    designation="Beneficiaries"
                  />
                )
              )}
            </div>
            <Tokens
              showTokenInfo
              projectData={projectData?.details}
              onClick={() => setIsChange(true)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
