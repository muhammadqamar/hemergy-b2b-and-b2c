
import TabInfo from "../tabinfo";
import Slider from "react-slick";

const CardDetail = ({bgimg, trending, stock, stockdirection}) => {
    return (<div className="h-[320px]">
        <div style={{background:`url('${bgimg}')`}} className="relative w-full h-full bg-no-repeat bg-cover bg-position-center" >
            {trending &&
            <div className="absolute top-[32px] left-[32px]">
                <TabInfo icon="/images/trending_up.svg" text="Trending" color="text-textcolor" w="16" h="10" bg="bg-green500" bold="font-semibold" />
            </div>
}
            <div className="absolute top-[32px] right-[32px]">
                <TabInfo icon={stockdirection ?"/images/Polygon 1.svg":"/images/Polygon 1.svg"}  text={stock} color="text-white" w="10" h="10" bg="bg-textcolor" bold="font-semibold" />
            </div>
        </div>

    </div>)
}
const ProjectGallerSlider = () => {
    const settings = {
        arrows: true,
        dots: false,
        className: "slider variable-width",
        infinite: true,

        slidesToShow: 1,
        slidesToScroll: 1,

    };

    return (

        <div className="w-full hemergy-project-gallery-slider">

            <Slider {...settings}>
                <CardDetail bgimg={'/images/image 1.png'} trending stock="657.5" stockdirection="up"/>
                <CardDetail bgimg={'/images/image 1.png'} trending stock="657.5" stockdirection="up"/>
                <CardDetail bgimg={'/images/image 1.png'} trending stock="657.5" stockdirection="up"/>
                <CardDetail bgimg={'/images/image 1.png'} trending stock="657.5" stockdirection="up"/>
            </Slider>
        </div>

    );
};

export default ProjectGallerSlider;
