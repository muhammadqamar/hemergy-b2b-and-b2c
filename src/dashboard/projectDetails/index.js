import Tokens from './tokens';
import TabInfo from '@/utils/tabInfo';
import UserCard from '@/utils/userCard';
import { investProject, requestMint } from '@/services/transaction';
import { useSelector } from 'react-redux';
import { getSigner } from '@/components/helpers/signer';
import { useState } from 'react';
import Hemergy from '@hemergy/core-sdk';
import { useEffect } from 'react';
import { ethers } from 'ethers';

const Index = ({ projectData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state);

 ;

  useEffect(async () => {
    if (state.user.web3auth) {
    }
  }, [state.user.web3auth]);
  return (
    <div className="dashboard-container">
      <div className="bg-white project-detail">
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

          {projectData?.details?.beneficiaries?.users?.map((item, index) => (
            <UserCard
              key={index}
              company
              avatar="/images/user.png"
              detail
              name={item.firstName}
              designation="Beneficiaries"
            />
          ))}
        </div>
        <Tokens
          showTokenInfo
          isLoading={isLoading}
          projectData={projectData?.details}
          onClick={async () => {
            setIsLoading(true);
            const e = await state.user.web3auth.connect();

            const ethersProvider = new ethers.providers.Web3Provider(e);
            const signer =await  ethersProvider.getSigner();
            console.log('signer address', await signer.getAddress())
            const hemergy = new Hemergy({
              baseURL: 'https://dev-core.hemergy.com',
              signer,
            });

            const isKYCed = await hemergy.isKYCed(state.user.user?.accountAddress);
            await hemergy.mint(state.user.user?.accountAddress);

            console.log(projectData?.projectAddress,state.user.user?.accountAddress);
            await hemergy.investInProject(projectData?.projectAddress,state.user.user?.accountAddress, 1000)
            // try {
            // const getMint = await requestMint();
            // const signerInformation = await investProject({
            //   endUserAddress: state.user.user?.endUserAddress,
            //   projectAddress: projectData?.projectAddress,
            //   amount: 10000,
            //   investorAccountAddress: state.user.user?.accountAddress,
            // });

            // const investaddress = await getSigner(
            //   state.user.web3auth,
            //   signerInformation.data?.domain,
            //   {
            //     ForwardRequest: signerInformation.data?.ForwardRequest,
            //   },
            //   signerInformation.data?.request,
            //   'project'
            // );
            // console.log('investaddress,', investaddress);
            // } catch (error) {
            //   console.error('error', error);
            // } finally {
            //   setIsLoading(false);
            // }
          }}
        />
      </div>
    </div>
  );
};

export default Index;
