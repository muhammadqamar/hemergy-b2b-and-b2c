import { useEffect, useState } from 'react';
import SideBar from '@/dashboard/sideBar';
import Info from '@/utils/info';
import NavUserNewProject from '@/utils/navUserNewProject';
import Billing from '@/dashboard/billing';
import Button from '@/utils/buttons';
import Image from 'next/image';
import ProjectDetailForm from '@/dashboard/newProjectForms/projectDetails';
import CreateToken from '@/dashboard/newProjectForms/createToken';
import LinkAssets from '@/dashboard/newProjectForms/linkAssets';
import LinkInvestmentVehicle from '@/dashboard/newProjectForms/linkInvestmentVehicle';
import Beneficiaries from '@/dashboard/newProjectForms/beneficiaries';
import SmartContract from '@/dashboard/newProjectForms/smartContract';
import { useSelector } from 'react-redux';
import {
  getProjectasDraft,
  deleteProjectasDaft,
  createProjectonDetail,
} from '@/services/coreProject';
import { useDispatch } from 'react-redux';
import {
  applyDraftInformation,
  setDraftInformation,
} from '@/store/reducer/newProject';

const tabs = [
  {
    name: '1. Billing',
    icon: '/images/check.svg',
  },
  {
    name: '2. Project details',
    icon: '/images/check.svg',
  },
  {
    name: '3. Create token',
    icon: '/images/check.svg',
  },
  {
    name: '4. Link assets',
    icon: '/images/check.svg',
  },
  // {
  //   name: '04 Link investment vehicle',
  //   icon: '/images/check.svg',
  // },
  {
    name: '5. Beneficiaries',
    icon: '/images/check.svg',
  },
];

const NewProject = () => {
  const [active, setActive] = useState(0);
  const [foundDraft, setFoundDraft] = useState();
  const [useDraftProject, setUseDraftProject] = useState(false);
  const dispatch = useDispatch();
  const newProject = useSelector((state) => state.addProject);
  const { user } = useSelector((state) => state.user);
  const {
    billing,
    beneficiaries,
    createToken,
    linkAssets,
    linkInvestments,
    projectDetails,
    draft,
  } = newProject;

  useEffect(() => {
    (async () => {
      const projectDraft = await getProjectasDraft();
      if (projectDraft.status === 200) {
        dispatch(setDraftInformation(projectDraft?.data?.projectDetail));
        setFoundDraft(true);
      }
    })();
  }, []);

  return localStorage.getItem('user-type') === 'developer' ? (
    <div>
      <SideBar />
      <div className="dashboard-container padding-left min-h-[960px] pb-[72px]">
        <NavUserNewProject
          icon
          user={`Hi ${user?.detail?.name}`}
          newProject
          para
        />
        {foundDraft && active === 0 && (
          <div className="bg-white flex justify-between rounded-[10px] p-[15px] mb-[20px]">
            <p className="bold">
              We found an uncomplete project, do you want to continue ?
            </p>
            <div className="flex gap-[10px]">
              <button
                onClick={() => {
                  dispatch(applyDraftInformation(draft));
                  setFoundDraft(false);
                  setUseDraftProject(true);
                }}
                className="bg-textcolor rounded-[5px] py-[5px] px-[15px] text-white bold  "
              >
                Yes
              </button>
              <button
                onClick={() => {
                  deleteProjectasDaft(draft?._id);
                  setFoundDraft(false);
                }}
                className="bg-[red] rounded-[5px] py-[5px] px-[15px] text-white bold  "
              >
                No
              </button>
            </div>
          </div>
        )}
        {active !== 6 && (
          <div className="white-frame h-full-screen">
            <div className="flex items-center justify-between mb-8">
              <h1 className="p-xl-semi text-textblack">Create new project</h1>
              <Button bg="bg-white" border text="Cancel" />
            </div>
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row ">
              <div className=" w-full md:w-[276px] flex flex-row flex-shrink-0 flex-wrap md:flex-col gap-2 ">
                {tabs.map((item, i) => (
                  <button
                    key={i}
                    className={`tab-btn  p-sm text-weight-medium ${
                      active === i
                        ? 'text-textcolor bg-cardbg'
                        : 'text-textblack bg-white'
                    } `}
                    onClick={()=>{
                      setActive(i)
                    }}
                  >
                    {item.name}
                    <span>
                      {billing !== null && i === 0 ? (
                        <Image
                          src={item.icon}
                          alt="check"
                          width={20}
                          height={20}
                        />
                      ) : (
                        ''
                      )}
                      {projectDetails !== null && i === 1 ? (
                        <Image
                          src={item.icon}
                          alt="check"
                          width={20}
                          height={20}
                        />
                      ) : (
                        ''
                      )}
                      {createToken !== null && i === 2 ? (
                        <Image
                          src={item.icon}
                          alt="check"
                          width={20}
                          height={20}
                        />
                      ) : (
                        ''
                      )}
                      {linkAssets !== null && i === 3 ? (
                        <Image
                          src={item.icon}
                          alt="check"
                          width={20}
                          height={20}
                        />
                      ) : (
                        ''
                      )}
                      {/* {linkInvestments !== null && i === 4 ? (
                        <Image
                          src={item.icon}
                          alt="check"
                          width={20}
                          height={20}
                        />
                      ) : (
                        ''
                      )} */}
                      {beneficiaries !== null && i === 4 ? (
                        <Image
                          src={item.icon}
                          alt="check"
                          width={20}
                          height={20}
                        />
                      ) : (
                        ''
                      )}
                    </span>
                  </button>
                ))}
              </div>

              {active === 0 && (
                <div className="w-full">
                  <Billing
                    setActive={setActive}
                    useDraftProject={useDraftProject}
                  />
                </div>
              )}

              {active === 1 && (
                <div className="w-full">
                  <ProjectDetailForm
                    setActive={setActive}
                    useDraftProject={useDraftProject}
                  />
                </div>
              )}

              {active === 2 && (
                <div className="w-full">
                  <CreateToken
                    setActive={setActive}
                    useDraftProject={useDraftProject}
                  />
                </div>
              )}

              {active === 3 && (
                <div className="w-full">
                  <LinkAssets
                    setActive={setActive}
                    useDraftProject={useDraftProject}
                  />
                </div>
              )}

              {/* {active === 4 && (
                <div className="w-full">
                  <LinkInvestmentVehicle setActive={setActive} useDraftProject={useDraftProject} />
                </div>
              )} */}
              {active === 4 && (
                <div className="w-full">
                  <Beneficiaries
                    setActive={setActive}
                    useDraftProject={useDraftProject}
                  />
                </div>
              )}

              <div className="w-[236px] flex-shrink-0">
                <Info />
              </div>
            </div>
          </div>
        )}
        {active === 6 && (
          <div className="w-full">
            <SmartContract />
          </div>
        )}
      </div>
    </div>
  ) : (
    ''
  );
};

export default NewProject;
