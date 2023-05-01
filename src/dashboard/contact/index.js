import Image from "next/image";
import ContactForm from "./contactForm";

const Index = () => {
  return (
    <div className="contact-card-box px-6 md:px-8 py-8">
      <div className="contact-left-content">
        <div className="help-box">
          <h2 className="help-heading">How can we help?</h2>
          <p className="help-para">Get in touch to ask any questions of report issues</p>
        </div>
        <ContactForm />
      </div>
      <div className="contact-right-content">
        <h3 className="whitespace-pre find-heading">Or find us here:</h3>
        <div className="find-flx-bx">
          <Image src="/images/wtsup-logo.png" alt="" width={40} height={40} />
          <p className="find-sub-heading">+12 3456 7890</p>
        </div>
        <div className="find-flx-bx">
          <Image src="/images/telegram-logo.png" alt="" width={40} height={40} />
          <p className="find-sub-heading">telegram@something</p>
        </div>
        <div className="find-flx-bx">
          <Image src="/images/email-logo.png" alt="" width={40} height={40} />
          <p className="find-sub-heading">info@hemergy.co</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
