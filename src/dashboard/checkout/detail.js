import ProjectCardThumbnail from '@/utils/projectCardThumbnail';
import TabInfo from '@/utils/tabInfo';
import UserCard from '@/utils/userCard';

const Detail = ({ projectData }) => {
  return (
    <div className="w-full laptop:w-[369px] flex-shrink-0 bg-white">
      <ProjectCardThumbnail
        h="198px"
        bgimg={
          projectData?.details?.information?.image || '/images/not-img.png'
        }
        hot
        stock="435"
        stockdirection
        hemergyType={projectData?.details?.linkAssets?.assetType}
        hemergyIcon="/images/clear_day_w.svg"
      />
      <div className="p-6 flex flex-col items-start gap-6">
        <div>
          <TabInfo
            icon="/images/location_on.svg"
            text={projectData?.details?.information.city}
            color="text-textcolor"
            w="20"
            h="20"
            bold="font-semibold"
          />
        </div>
        <div>
          <h1 className="mb-4 p-xl-semi text-textblack">
            {projectData?.details?.information?.projectName}
          </h1>
          <p className="text-gray800 p-sm">
            {projectData?.details?.information?.projectDescription}
          </p>
        </div>
        <div>
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
      </div>
    </div>
  );
};

export default Detail;
