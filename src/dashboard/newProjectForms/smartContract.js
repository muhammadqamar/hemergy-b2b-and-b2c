import { useState } from 'react';
import Image from 'next/image';
import Button from '@/utils/buttons';
import { createProjectonDetail } from '@/services/coreProject';
import { useSelector } from 'react-redux';
import { getSigner } from '@/components/helpers/signer';
import { updateProjectasDaft } from '@/services/coreProject';
import { updateuserprojects } from '@/services/user';

const SmartContract = () => {
  const { addProject, user } = useSelector((state) => state);
  const [liveloader, setliveLoader] = useState();
  return (
    <div className="white-frame h-full-screen">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 md:gap-0 md:flex-nowrap">
        <h1 className="p-xl-semi text-textblack">Smart Contract</h1>
        <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
          <Button bg="bg-white" border text="Keep editing" />
          <Button bg="bg-textcolor" color text="Create as draft" />
          <Button
            bg="bg-green500"
            color
            text={
              liveloader === 'loading'
                ? 'Updating'
                : liveloader
                ? 'Project is Live'
                : 'Go live now'
            }
            onClick={async () => {
              setliveLoader('loading');
              const result = await createProjectonDetail({
                endUserAddress: user?.user?.endUserAddress,
                projectHolder: user?.user?.accountAddress,
                beneficiaries: addProject.beneficiaries?.users?.map(
                  (data) => data.address
                ),
              });
              if (result.status === 200) {
                const reprojectAddresss = await getSigner(
                  user.web3auth,
                  result.data?.domain,
                  {
                    ForwardRequest: result.data?.ForwardRequest,
                  },
                  result.data?.request,
                  'project'
                );
                const project = await updateProjectasDaft({
                  status: 'complete',
                  projectAddress: reprojectAddresss,
                  draftId: addProject?.draft?._id,
                });
                if (user.user?.projectsasDevloper) {
                  await updateuserprojects('projectsasDevloper', {
                    email: user?.user?.email,
                    endUserAddress: user?.user?.endUserAddress,
                    projectAddress: [
                      ...user.user?.projectsasDevloper,
                      reprojectAddresss,
                    ],
                  });
                } else {
                  await updateuserprojects('projectsasDevloper', {
                    email: user?.user?.email,
                    endUserAddress: user?.user?.endUserAddress,
                    projectAddress: [reprojectAddresss],
                  });
                }

                setliveLoader(true);
              } else {
                setliveLoader(false);
              }
            }}
          />
        </div>
      </div>
      <h3 className="mb-6 text-xl font-semibold leading-7 text-textblack font-Poppins">
        Solar Panels in Tahiti
      </h3>
      <div className="flex gap-2 items-start mb-6 bg-[#FFF8DF] p-6 rounded-xl">
        <Image src="/images/warning.svg" alt="warning" width={24} height={24} />
        <div className="flex flex-col gap-2">
          <h4 className="text-base font-semibold leading-6 font-Inter text-textblack ">
            Please review carefully
          </h4>
          <p className="text-sm font-normal leading-5 font-Inter text-textblack ">
            This contract cannot be changed once the project is created.
          </p>
        </div>
      </div>
      <div className="w-full bg-garbg h-full md:h-[530px] rounded-xl flex items-center justify-center">
        <p className="text-xl font-semibold leading-7 text-textblack font-Poppins">
          Preview here
        </p>
      </div>
    </div>
  );
};

export default SmartContract;
