import Slider from "react-slick";
import PortfolioCard from "@/utils/portfolioCard";
import Image from "next/image";
import Link from "next/link";

const CardArea = ({ usdc, usdcDate, areaHeading, areaDesc, h, bgGreen, btn1, btn2, tokenLabel, token, browBtn, hot, noproject }) => {
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
      <div className="mb-8 text-center lg:text-left text-sm">
        <Link href="/projects/create-projects" className="flex items-center gap-1 mb-5">
          <Image src="/images/sidebar-arrow-left.svg" alt="logo" width={20} height={20} />
          <p className="p-sm text-textcolor">Back to my Projects</p>
        </Link>
        <h2 className="p-xl-semi lg:p-xl mb-3">{areaHeading}</h2>
        <p className="p-sm text-gray900">{areaDesc}</p>
      </div>

      <div className="project-slider">
        <Slider {...settings}>
          {[1, 2, 3, 4].map((item, index) => (
            <div className="w-full" key={index}>
              <PortfolioCard
                h={h}
                banner="/images/card.png"
                projectName="Project name"
                projectDetail="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                token={token}
                tokenLabel={tokenLabel}
                btn1={btn1}
                btn2={btn2}
                bgGreen={bgGreen}
                usdc={usdc}
                usdcDate={usdcDate}
                hot={hot}
              />
            </div>
          ))}
        </Slider>
      </div>
      {browBtn && (
        <div className="flex-box mt-11">
          <button className="btn-border fit-width bg-white secondary">Browse all projects</button>
        </div>
      )}

      {noproject && (
        <div className="flex flex-col items-center justify-center gap-6 text-center mt-[145px]">
          <Image src="/images/no-project.svg" alt="no project" width={240} height={264} />
          <div className="">
            <h3 className="p-xl-semi text-textblack mb-2">You have no projects</h3>
            <p className="p-sm text-gray900">Check out the projects section to </p>
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
