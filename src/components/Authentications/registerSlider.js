import Slider from "react-slick";

const data = [
  {
    img: "/images/register.png",
    heading: "Register with Hemergy",
    para: "Create an account and answer a few brief questions to get ready to invest in the future! We store all your data securely, so you can safely invest",
  },
  {
    img: "/images/register.png",
    heading: "Register with Hemergy",
    para: "Create an account and answer a few brief questions to get ready to invest in the future! We store all your data securely, so you can safely invest",
  },
  {
    img: "/images/register.png",
    heading: "Register with Hemergy",
    para: "Create an account and answer a few brief questions to get ready to invest in the future! We store all your data securely, so you can safely invest",
  },
  {
    img: "/images/register.png",
    heading: "Register with Hemergy",
    para: "Create an account and answer a few brief questions to get ready to invest in the future! We store all your data securely, so you can safely invest",
  },
];

const RegisterSlider = () => {
  const settings = {
    arrows: false,
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
  };
  return (
    <div className="register-slider">
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index} className="register-slider-card">
            <div className="r-card-img">
              <img src={item.img} alt="register" />
            </div>
            <h5 className="slider-step">Step {index + 1}</h5>
            <h3 className="slider-heading">{item.heading}</h3>
            <p className="slider-para">{item.para}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RegisterSlider;
