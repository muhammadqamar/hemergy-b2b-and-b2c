import TabInfo from "../tabInfo";

const ProjectCardThumbnail = ({
  h,
  detail,
  bgimg,
  trending,
  stock,
  stockdirection,
  hemergyType,
  hemergyIcon,
  hot,
}) => {
  return (
    <div className={h ? "h-[162px]" : "h-[280px]"}>
      <div
        style={{
          background: `url('${bgimg}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative w-full h-full "
      >
        {trending && (
          <div
            className={`absolute ${detail ? "top-[32px] left-[32px]" : "top-[16px] left-[16px]"}`}
          >
            <TabInfo
              icon="/images/trending_up.svg"
              text="Trending"
              color="text-textcolor"
              w="16"
              h="10"
              bg="bg-green500"
              bold="font-semibold"
            />
          </div>
        )}

        {hot && (
          <div
            className={`absolute ${detail ? "top-[32px] left-[32px]" : "top-[16px] left-[16px]"}`}
          >
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
        )}

        {stock && (
          <div
            className={`absolute ${detail ? "top-[32px] right-[32px]" : "top-[16px] right-[16px]"}`}
          >
            <TabInfo
              icon={stockdirection ? "/images/Polygon 1.svg" : "/images/Polygon 1.svg"}
              text={stock}
              color="text-white"
              w="10"
              h="10"
              bg="bg-textcolor"
              bold="font-semibold"
            />
          </div>
        )}
        {hemergyType && (
          <div
            className={`absolute ${
              detail ? "bottom-[32px] left-[32px]" : "bottom-[16px] left-[16px]"
            }`}
          >
            <TabInfo
              icon={hemergyIcon}
              text={hemergyType}
              color="text-white"
              w="20"
              h="20"
              bg="bg-textblack"
              bold="font-semibold"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCardThumbnail;
