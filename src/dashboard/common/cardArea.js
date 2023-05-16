import Slider from 'react-slick';
import PortfolioCard from '@/utils/portfolioCard';
import Image from 'next/image';
import Link from 'next/link';

const CardArea = ({
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
        <h2 className="mb-3 p-xl-semi lg:p-xl">{areaHeading}</h2>
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
                  item?.details?.information?.image || '/images/not-img.png'
                }
                projectName={item?.details?.information?.projectName}
                projectDetail={item?.details?.information?.projectDescription}
                location={item?.details?.information?.addressLine1}
                assetsName={item?.details?.linkAssets?.assetType}
                token={token}
                tokenLabel={tokenLabel}
                btn2={btn2}
                bgGreen={bgGreen}
                usdc={item?.amount}
                usdcDate={usdcDate}
                hot={hot}
                userName={item?.user?.detail?.name}
                userImage={item?.user?.detail?.profileImage}
              />
            </div>
          ))}
        </Slider>
      </div>
      {browBtn && (
        <div className="flex-box mt-11">
          <Link href="/" className="bg-white btn-border fit-width secondary">
            Browse all projects
          </Link>
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
            <h3 className="mb-2 p-xl-semi text-textblack">
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
