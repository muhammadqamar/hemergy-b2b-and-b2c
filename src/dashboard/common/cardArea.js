import Slider from 'react-slick';
import PortfolioCard from '@/utils/portfolioCard';
import Image from 'next/image';
import Link from 'next/link';

const CardArea = ({
  usdc,
  usdcDate,
  areaHeading,
  areaDesc,
  h,
  bgGreen,
  btn1,
  btn2,
  tokenLabel,
  token,
  browBtn,
  hot,
  noproject,
  userProject,
}) => {
  const settings = {
    arrows: false,
    dots: true,
    autoplay: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };

  return (
    <div className="card-area">
      <div className="mb-8 text-center lg:text-left">
        <h2 className="p-xl-semi lg:p-xl mb-3">{areaHeading}</h2>
        <p className="p-sm text-gray900">{areaDesc}</p>
      </div>

      <div className="project-slider">
        <Slider {...settings}>
          {userProject?.map((item, index) => (
            <div className="w-full" key={index}>
              <PortfolioCard
                h={h}
                btnLink={`./projects/${item._id}`}
                banner={
                  item?.details?.information?.image || './images/bgslider.png'
                }
                projectName={item?.details?.information?.projectName}
                projectDetail={item?.details?.information?.projectDescription}
                location={item?.details?.information?.addressLine1}
                assetsName={item?.details?.linkAssets?.assetType}
                token={token}
                tokenLabel={tokenLabel}
                btn2={btn2}
                bgGreen={bgGreen}
                usdc={usdc}
                usdcDate={usdcDate}
                hot={hot}
                // userName={item?.details?.beneficiaries?.users[0]?.firstName}
              />
            </div>
          ))}
        </Slider>
      </div>
      {browBtn && (
        <div className="flex-box mt-11">
          <button className="btn-border fit-width bg-white secondary">
            Browse all projects
          </button>
        </div>
      )}

      {noproject && (
        <div className="flex flex-col items-center justify-center gap-6 text-center mt-[145px]">
          <Image
            src="/images/no-project.svg"
            alt="no project"
            width={240}
            height={264}
          />
          <div className="">
            <h3 className="p-xl-semi text-textblack mb-2">
              You have no projects
            </h3>
            <p className="p-sm text-gray900">
              Check out the projects section to{' '}
            </p>
          </div>
          <Link href="" className="btn secondary">
            Browse projects
          </Link>
        </div>
      )}
    </div>
  );
};

export default CardArea;
