import SideBar from "@/dashboard/sideBar";
import ContactPage from "@/dashboard/contact";

const Contact = () => {
  return (
    <div>
      <SideBar />
      <div className="info-bg">
        <div className="w-full lg:w-[842px] relative">
          <ContactPage />
        </div>
      </div>
    </div>
  );
};

export default Contact;
