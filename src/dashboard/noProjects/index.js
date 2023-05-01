import LocationCard from "@/utils/projectCard";
import CardArea from "../common/cardArea";
import MainMap from "@/utils/map/mainMap";

const Index = () => {
  const user = {
    name: "John Wick",
    designation: "Project Manager",
    bio: "",
    avatar: "/images/user.png",
  };
  return (
    <div className="main-loaction laptop:pl-16 xl:pl-[250px]">
      <CardArea h areaHeading="Featured projects" areaDesc="These are hot projects lorem ipsum etc" btn1="Details" btn2="Invest" token="200" tokenLabel="Available" hot />
      <div className="map-location-box">
        <MainMap b2bHeading />
        <div className="map-cards">
          <LocationCard w hemergyIcon="/images/air.svg" user={user} viewDetailbtn trending stockdirection="up" stock="675.5" hemergyType="Solar asset name" name="Project Name" />
          <LocationCard w hemergyIcon="/images/air.svg" user={user} viewDetailbtn trending stockdirection="up" stock="675.5" hemergyType="Solar asset name" name="Project Name" />
          <LocationCard w hemergyIcon="/images/air.svg" user={user} viewDetailbtn trending stockdirection="up" stock="675.5" hemergyType="Solar asset name" name="Project Name" />
          <LocationCard w hemergyIcon="/images/air.svg" user={user} viewDetailbtn trending stockdirection="up" stock="675.5" hemergyType="Solar asset name" name="Project Name" />
        </div>
      </div>
    </div>
  );
};

export default Index;
