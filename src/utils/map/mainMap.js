import Map from './Map';
import { positions } from './positionData';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';

const getImage = (type) => {
  let imgtype = '';
  console.log(type);
  switch (type) {
    case 'Solar':
      imgtype = '/images/map/marker_1.svg';
      break;
    case 'Wind':
      imgtype = '/images/map/marker_2.svg';
      break;
    case 'Gas':
      imgtype = '/images/map/marker_3.svg';
      break;
    case 'Water':
      imgtype = '/images/map/marker_3.svg';
      break;
    default:
      imgtype = '/images/map/marker_3.svg';
  }
  return imgtype;
};
const MainMap = ({ mapHeading, b2bHeading, userProject, setSearchData }) => {
  const [upDate, setUpDate] = useState('');
  const [positionData, setPositionData] = useState([]);

  // console.log(upDate);

  // useEffect(() => {
  //   const intervil = setInterval(() => {
  //     const data = ['wind', 'sun', 'bio'];
  //     // i = (i + 1) % data.length;

  //     setUpDate(data);
  //   }, 2000);
  //   return () => clearInterval(intervil);
  // }, [upDate]);

  useEffect(() => {
    // const lat = userProject?.map((item) => item?.details?.information?.lat);
    // const lang = userProject?.map((item) => item?.details?.information?.lang);

    const data = userProject?.map((item) => {
      return {
        coords: {
          lat: item?.details?.information?.lat,
          lng: item?.details?.information?.lang,
        },
        icon: getImage(item?.details?.linkAssets?.assetType),
        type: item?.details?.linkAssets?.assetType,
      };
    });

    setPositionData(data);
  }, [userProject]);

  const mapCoordFilter = (type) => {
    setPositionData(positions.filter((data) => data.type === type));
  };

  return (
    <div className="w-full map-box">
      <div
        className={`max-w-[1005px] mx-auto ${
          mapHeading ? 'hidden md:block' : 'hidden lg:block'
        }`}
      >
        {/* <Map positionCoords={positionData} /> */}
      </div>

      {mapHeading && (
        <div className="investor-project-heading">
          <h2 className="browse-projects">Browse projects</h2>
        </div>
      )}

      {b2bHeading && (
        <h3 className="block pb-6 text-center p-xl-semi text-textcolor lg:hidden">
          Browse projects
        </h3>
      )}

      <div className="map-opction justify_content ">
        <div className="flex items-center gap-2">
          <div className="input-field">
            <input
              className="input p-sm"
              placeholder="Search..."
              onChange={(event) => setSearchData(event.target.value)}
            />
            <div className="pointer"></div>
            <Image
              src="/images/map/search.svg"
              alt="visibility"
              width={20}
              height={20}
            />
          </div>
          <div className="input-field">
            <div class="relative inline-block text-left"></div>
            <select className="p-sm">
              <option value="">Location</option>
              {userProject?.map((item, i) => (
                <option key={i} value={item?.details?.information?.country}>
                  <div>
                    <ReactCountryFlag
                      countryCode={item?.details?.information?.country}
                      svg
                      cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                      cdnSuffix="svg"
                      title={item?.details?.information?.country}
                    />

                    {item?.details?.information?.country}
                  </div>
                </option>
              ))}
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
                mapCoordFilter('sun');
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
                mapCoordFilter('wind');
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
                mapCoordFilter('bio');
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
                mapCoordFilter('sun_fire');
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
