import Image from "next/image";
import { useState } from "react";

const Index = ({ partners }) => {
  const [openTab, setOpenTab] = useState(0);

  return (
    <div className="investing-tab-section">
      <div className="user-tabs">
        {partners &&
          partners?.map((item, index) => (
            <div
              key={index}
              onClick={() => setOpenTab(index)}
              className={openTab === index ? "user-tab-card active" : "user-tab-card"}
            >
              <img src={item.fields.logo[0].fields.file.url} alt="user" className="user-img" />
              <div className="user-detail">
                <h4 className="user-tab-name">{item.fields.userName}</h4>
                <h5 className="user-tab-cate">{item.fields.userCate}</h5>
              </div>
            </div>
          ))}
      </div>
      {partners &&
        partners?.map((item, index) => {
          return (
            openTab === index && (
              <div key={index} className="user-tab-about">
                <h2 className="tab-about-heading">{item.fields.aboutHeading}</h2>
                <Image src="/images/star.svg" alt="star" width={80} height={16} />
                <p className="user-tab-about-para">
                  {/* {item.aboutPara1} <br /> <br /> {item.aboutPara2} */}
                  {item.fields.aboutText.slice(0, 124)}
                </p>
                <p className="user-tab-about-para">{item.fields.aboutText.slice(124)}</p>
              </div>
            )
          );
        })}
    </div>
  );
};

export default Index;
