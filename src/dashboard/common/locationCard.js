import Image from "next/image";

const LocationCard = () => {
  return (
    <div className="loaction-card">
      <div className="card-head-img h-[162px] ">
        <img src="/images/card.png" alt="img" className="card-bg-img" />
        <div className="w-full flex-box">
          <div className="labels-frame trending-labels">
            <Image src="/images/trending_up.svg" alt="logo" width={20} height={20} />
            <p className="p-sm-semi text-textcolor">Trending</p>
          </div>

          <div className="labels-frame ratio-labels">
            <Image src="/images/Polygon.svg" alt="logo" width={10} height={10} />
            <p className="p-sm-semi  text-white">657.4</p>
          </div>
        </div>
        <div className="labels-frame asset-lable">
          <Image src="/images/clear_day_w.svg" alt="logo" width={20} height={20} />
          <p className="p-sm-semi  text-white">Solar asset name</p>
        </div>
      </div>
      <div className="loaction-card-about">
        <div className="location-label w-fit">
          <Image src="/images/location_on.svg" alt="logo" width={16} height={16} />
          <p className="p-sm-semi font-medium text-textcolor">Location name</p>
        </div>
        <p className="p-sm font-semibold">Project name</p>
        <div className="loaction-user">
          <img src="/images/user.png" alt="user" className="loaction-user-img" />
          <div>
            <h6 className="p-sm-semi">Bradley Grahams</h6>
            <p className="p-x-sm font-medium text-gray800">Project owner</p>
          </div>
        </div>

        <button className="btn secondary w-full bg-cardbg text-textcolor">View details</button>
      </div>
    </div>
  );
};

export default LocationCard;
