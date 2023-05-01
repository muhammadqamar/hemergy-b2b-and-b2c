import TabInfo from "./tabInfo";
import FundingDate from "./fundingDate";
import UserCard from "./userCard";
import InvestmentCalculator from "@/dashboard/projectDetails/tokens";
import ProjectGallerySlider from "./gallerSlider";
import Link from "next/link";
import ProjectCard from "@/utils/projectCard";
import Slider from "react-slick";

export default function ProjectDetailSection() {
  const settings = {
    arrows: false,
    dots: false,
    className: "slider variable-width",
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  const user = {
    name: "John Wick",
    designation: "Project Manager",
    bio: "",
    avatar: "/images/user.png",
  };

  return (
    <>
      <div className="project-detail-page hero-container  h-screen px-4 pt-[152px] sm:pt-[185px]">
        <Link
          href=""
          className="flex items-center w-[174px] mx-auto justify-center gap-2 mb-[30px]"
        >
          <img
            src="/images/keyboard_arrow_right.svg"
            alt="arrow"
            className="w-5 h-5 object-scale-down rotate-180"
          />
          <h6 className="p-sm font-medium text-white">Back to all projects</h6>
        </Link>
        <div className="bg-white rounded-3xl md:rounded-[40px] shadow-mdshadow overflow-hidden max-w-[880px] relative z-[1] m-auto ">
          <div className="project-detail-page">
            <div className="slider">
              <ProjectGallerySlider />
            </div>
          </div>
          <div className="flex flex-col md:flex-row p-4 md:p-8 gap-8 ">
            <div className="meta max-w-full md:max-w-[60%]">
              <div className="flex justify-between w-full">
                <TabInfo
                  icon="/images/clear_day.svg"
                  text="Solar Asset Name"
                  color="text-textcolor"
                  w="17"
                  h="17"
                  bg="bg-cardbg"
                  bold="font-semibold"
                />
                <TabInfo
                  icon="/images/location_on.svg"
                  text="Location name"
                  color="text-textcolor"
                  bold="font-medium"
                />
              </div>
              <h1 className="pt-[24px] pb-[17px] text-[32px] leading-[40px] font-semibold ">
                Project name
              </h1>
              <div className="pb-[17px]">
                <FundingDate to="1 Sep 2023" from="1 Sep 2024" />
              </div>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English.
              </p>
              <p className="pt-[30px]">
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
              <div className="pt-[32px]">
                <UserCard
                  avatar="/images/user.png"
                  name="Bradley Grahams"
                  designation="Project owner"
                  bio="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. "
                />
              </div>
            </div>

            <div className="calculator">
              <InvestmentCalculator showTokenInfo={false} />
            </div>
          </div>
        </div>
        <div className="wather-haf-white-bg" />
      </div>
      {/** project section */}
      <div className="w-full relative pt-[1236px] md:pt-[533px] pb-[235px] md:pb-[250px]  bg-blue100">
        <div className="popular-about text-center mx-auto mb-12 max-w-full sm:max-w-[442px] px-6 sm:px-0">
          <h1 className="popular-heading">Popular projects</h1>
          <p className="popular-para">
            A selection of the types of projects you can get involved in today!
            <strong className="popular_strong">
              <Link href="/for-investors-projects"> See all</Link>
            </strong>
          </p>
        </div>
        <div className="popular-project-slider ">
          <Slider {...settings}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((team, i) => {
              return (
                <div key={i} className="px-[12px]">
                  <ProjectCard
                    hemergyIcon="/images/air.svg"
                    bio="It is a long established fact that a reader will be distracted."
                    user={user}
                    viewDetailbtn
                    trending
                    stockdirection="up"
                    stock="675.5"
                    hemergyType="Solar asset name"
                    name="Project Name"
                    hideThumbnail
                    bg="bg-textcolor"
                    Shadow="37px 49px 0px rgba(0, 17, 141, 0.1)"
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="white-wather-bg" />
      </div>
    </>
  );
}
