import Map from "./Map";
import { positions } from "./positionData";
import Image from "next/image";
import { useEffect, useState } from "react";

const MainMap = ({ mapHeading, b2bHeading }) => {
  const [upDate, setUpDate] = useState("");
  const [positionData, setPositionData] = useState([]);

  useEffect(() => {
    const intervil = setInterval(() => {
      const data = ["wind", "sun", "bio"];
      // i = (i + 1) % data.length;

      setUpDate(data);
    }, 2000);
    return () => clearInterval(intervil);
  }, [upDate]);

  useEffect(() => {
    setPositionData(positions);
  }, []);

  const mapCoordFilter = (type) => {
    setPositionData(positions.filter((data) => data.type === type));
  };

  return (
    <div className="map-box w-full">
      <div
        className={`max-w-[1005px] mx-auto ${mapHeading ? "hidden md:block" : "hidden lg:block"}`}
      >
        <Map positionCoords={positionData} zoomControl={false} />
      </div>

      {mapHeading && (
        <div className="investor-project-heading">
          <h2 className="browse-projects">Browse projects</h2>
        </div>
      )}

      {b2bHeading && (
        <h3 className="p-xl-semi text-textcolor text-center lg:hidden block pb-6">
          Browse projects
        </h3>
      )}

      <div className="map-opction justify_content ">
        <div className="flex items-center gap-2">
          <div className="input-field">
            <input className="input p-sm" placeholder="Search..." />
            <div className="pointer"></div>
            <Image src="/images/map/search.svg" alt="visibility" width={20} height={20} />
          </div>
          <div className="input-field">
            <select className="p-sm">
              <option value="">Location</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="map-field">
            <Image
              src="/images/map/clear_day.svg"
              alt="visibility"
              width={20}
              height={20}
              onClick={() => {
                mapCoordFilter("sun");
              }}
            />
          </div>
          <div className="map-field">
            <Image
              src="/images/map/air.svg"
              alt="visibility"
              width={20}
              height={20}
              onClick={() => {
                mapCoordFilter("wind");
              }}
            />
          </div>
          <div className="map-field">
            <Image
              src="/images/map/humidity_low.svg"
              alt="visibility"
              width={20}
              height={20}
              onClick={() => {
                mapCoordFilter("bio");
              }}
            />
          </div>
          <div className="map-field">
            <Image
              src="/images/map/local_fire_department.svg"
              alt="visibility"
              width={20}
              height={20}
              onClick={() => {
                mapCoordFilter("sun_fire");
              }}
            />
          </div>
          <div className="map-field">
            <Image
              src="/images/map/trending.svg"
              alt="visibility"
              width={20}
              height={20}
              onClick={() => {
                // mapCoordFilter('trending');
                setPositionData(positions);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMap;
