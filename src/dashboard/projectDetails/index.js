import Tokens from './tokens';
import TabInfo from '@/utils/tabInfo';
import UserCard from '@/utils/userCard';
import { investProject } from '@/services/transaction';
import { useSelector } from 'react-redux';
import { getSigner } from '@/components/helpers/signer';
import { useState } from 'react';

const Index = ({ projectData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state);
  return (
    <div className="dashboard-container">
      <div className="project-detail bg-white">
        <div className="detail-img">
          <div
            className="detail-banner-img "
            style={{
              background: `url(${projectData?.details?.information?.image})`,
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
          <div className="flex-box gap-2">
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
            <h3 className="p-xl-semi mb-4">
              {projectData?.details?.information?.projectName}
            </h3>
            <p className="p-sm text-gray800">
              {projectData?.details?.information?.projectDescription}
            </p>
          </div>
          {projectData?.details?.beneficiaries?.users?.map((item, index) => (
            <UserCard
              key={index}
              company
              avatar="/images/user.png"
              detail
              name={item.firstName}
              designation="Beneficiaries"
              bio="  It is a long established fact that a reader will be distracted by the readable
            content of a page when looking at its layout. The point of using Lorem Ipsum is that
            it has a more-or-less normal distribution of letters, as opposed to using 
            "
            />
          ))}
        </div>
        <Tokens
          showTokenInfo
          isLoading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            try {
              const signerInformation = await investProject({
                endUserAddress: state.user.user?.endUserAddress,
                projectAddress: projectData?.projectAddress,
                amount: 10000,
                investorAccountAddress: state.user.user?.accountAddress,
              });
              const investaddress = await getSigner(
                state.user.web3auth,
                signerInformation.data?.domain,
                {
                  ForwardRequest: signerInformation.data?.ForwardRequest,
                },
                signerInformation.data?.request,
                'project'
              );
              console.log('investaddress,', investaddress);
            } catch (error) {
              console.error('error', error);
            } finally {
              setIsLoading(false);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Index;
