import LocationCard from '@/utils/projectCard';
import CardArea from '../common/cardArea';
import MainMap from '@/utils/map/mainMap';
import { projectDetail } from '@/services/project';
import { useEffect, useState } from 'react';
import React from 'react';

const Index = () => {
  const [userProject, setUserProject] = useState([]);
  const [searchData, setSearchData] = useState('');

  console.log('userProject', userProject);

  //  search project
  const filteredItems = userProject?.filter((item) =>
    item?.details?.information?.projectName
      ?.toLowerCase()
      .includes(searchData.toLowerCase())
  );

  useEffect(() => {
    (async () => {
      const project = await projectDetail();
      setUserProject(project?.data?.projectDetail);
    })();
  }, []);

  const user = {
    name: 'John Wick',
    designation: 'Project Manager',
    bio: '',
    avatar: '/images/user.png',
  };
  return (
    <div className="main-loaction bg-[#4e62ee]">
      <CardArea
        userProject={userProject}
        h
        areaHeading="Featured projects"
        areaDesc="These are hot projects lorem ipsum etc"
        btn1="Details"
        btn2="Invest"
        token="200"
        tokenLabel="Available"
        hot
        usdc={undefined}
        usdcDate={undefined}
        bgGreen={undefined}
        browBtn={undefined}
        noproject={undefined}
      />
      <div className="map-location-box">
        <MainMap
          b2bHeading
          userProject={userProject}
          setSearchData={setSearchData}
          mapHeading={undefined}
        />
        <div className="map-cards">
          {filteredItems?.map((item, index) => (
            <LocationCard
              index={index}
              btnLink={`./projects/${item._id}`}
              w
              projectImage={
                item?.details?.information?.image || './images/bgslider.png'
              }
              hemergyIcon="/images/air.svg"
              user={{
                name: item?.details?.beneficiaries?.users?.[0]?.firstName,
                designation: 'Project Manager',
                bio: '',
                avatar: '/images/user.png',
              }}
              viewDetailbtn
              location={item?.details?.information?.addressLine1}
              trending
              stockdirection="up"
              stock="675.5"
              hemergyType={item?.details?.linkAssets?.assetType}
              name={item?.details?.information?.projectName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
