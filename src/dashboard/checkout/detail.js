import ProjectCardThumbnail from "@/utils/projectCardThumbnail";
import TabInfo from "@/utils/tabInfo";
import UserCard from "@/utils/userCard";

const Detail = () => {
  return (
    <div className="w-full laptop:w-[369px] flex-shrink-0 bg-white">
      <ProjectCardThumbnail
        h="198px"
        bgimg={"/images/image 1.png"}
        hot
        stock="435"
        stockdirection
        hemergyType="Solar asset name"
        hemergyIcon="/images/clear_day_w.svg"
      />
      <div className="p-6 flex flex-col items-start gap-6">
        <div>
          <TabInfo
            icon="/images/location_on.svg"
            text="Location name"
            color="text-textcolor"
            w="20"
            h="20"
            bold="font-semibold"
          />
        </div>
        <div>
          <h1 className="mb-4 p-xl-semi text-textblack">Project name</h1>
          <p className="text-gray800 p-sm">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum i...
          </p>
        </div>
        <div>
          <UserCard
            normal
            avatar="/images/user.png"
            name="Bradley Grahams"
            designation="Project owner"
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
