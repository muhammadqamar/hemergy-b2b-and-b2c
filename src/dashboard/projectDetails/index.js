import Tokens from "./tokens";
import TabInfo from "@/utils/tabInfo";
import UserCard from "@/utils/userCard";
import Image from "next/image";
import Link from "next/link";
import Buttons from "@/utils/buttons";

const Index = () => {
  return (
    <div className="dashboard-container projects-details padding-left min-h-[960px]">
      <div className="project-detail bg-white min-h-[960px]">
        <div className="detail-img">
          <div
            className="detail-banner-img"
            style={{
              background: `url('/images/dummy.png')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="w-full flex-box">
            <div className="relative">
              <TabInfo icon="/images/hot.svg" text="Hot" color="text-white" w="20" h="20" bg="bg-red600" bold="font-semibold" />
            </div>
            <div className="relative">
              <TabInfo icon="/images/Polygon.svg" text="657.4" color="text-white" w="10" h="10" bg="bg-textcolor" bold="font-semibold" />
            </div>
          </div>

          <div className="w-8 h-8 relative ml-auto cursor-pointer flex items-center justify-center rounded-xl  bg-white">
            <Image src="/images/add_a_photo.svg" alt="add a photo" width={20} height={20} />
          </div>
        </div>

        <div className="project-detail-about">
          <div className="flex-box gap-2 flex-wrap">
            <TabInfo icon="/images/clear_day.svg" text="Solar Asset Name" color="text-textcolor" w="20" h="20" py bg="bg-cardbg" bold="font-semibold" />
            <TabInfo icon="/images/location_on.svg" text="Location name" color="text-textcolor" w="16" h="16" bold="font-semibold" />
          </div>
          <div>
            <h3 className="p-xl-semi mb-4">Project name</h3>

            <span className="w-fit  h-auto px-2 py-[2px] p-sm-semi text-weight-medium rounded-full text-green900 bg-green50">Fundraising</span>

            <div className="flex items-center gap-2 my-4">
              <Link href="" className="flex w-8 h-8 items-center justify-center ">
                <Image src="/images/f-twitter.svg" alt="add a photo" width={32} height={32} />
              </Link>
              <Link href="" className="flex w-8 h-8 items-center justify-center ">
                <Image src="/images/f-in.svg" alt="add a photo" width={32} height={32} />
              </Link>
            </div>

            <p className="p-sm text-gray800 ">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it
              has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. <br /> <br />
              Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites
              still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>

            {/** download  button */}
            <div className="my-4">
              <Buttons icon="/images/download_b.svg" text="Download documents" bg="bg-white" />
            </div>
            {/** Edit button */}
            <Buttons icon="/images/edit.svg" text="Edit description" bg="bg-white" border borderColor />
          </div>
          <div className=" h-[90px] scrollbar-hide overflow-y-scroll project-detail-about-card">
            <UserCard
              company
              avatar="/images/user.png"
              detail
              name="Bradley Grahams"
              designation="Project owner"
              bio="  It is a long established fact that a reader will be distracted by the readable
            content of a page when looking at its layout. The point of using Lorem Ipsum is that
            it has a more-or-less normal distribution of letters, as opposed to using 
            "
            />
            <UserCard
              avatar="/images/user.png"
              detail
              name="Bradley Grahams"
              designation="Project owner"
              bio="  It is a long established fact that a reader will be distracted by the readable
            content of a page when looking at its layout. The point of using Lorem Ipsum is that
            it has a more-or-less normal distribution of letters, as opposed to using 
            "
            />
            <UserCard
              avatar="/images/user.png"
              detail
              name="Bradley Grahams"
              designation="Project owner"
              bio="  It is a long established fact that a reader will be distracted by the readable
            content of a page when looking at its layout. The point of using Lorem Ipsum is that
            it has a more-or-less normal distribution of letters, as opposed to using 
            "
            />
          </div>
        </div>
        <Tokens showTokenInfo />
      </div>
    </div>
  );
};

export default Index;
