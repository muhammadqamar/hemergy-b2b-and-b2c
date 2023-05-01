import Image from "next/image";
import Link from "next/link";

const pages = [
  {
    name: "How it works",
    path: "/how-it-work",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "For Businesses",
    path: "/for-business",
  },

  {
    name: "Get in touch",
    path: "/contact-us",
  },
];

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="flex items-center justify-center gap-6">
        <Image src="/images/f-twitter.svg" alt="icon" width={44} height={44} />
        <Image src="/images/f-medium.svg" alt="icon" width={44} height={44} />
        <div className="hidden sm:block">
          <Image src="/images/f-in.svg" alt="icon" width={44} height={44} />
        </div>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-6 sm:gap-8 text-textcolor my-8">
        {pages.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className="p-sm text-weight-medium text-textcolor"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <p className="footer-text mb-6">© Hemergy. All rights reserved.</p>
      <Link href="/" className="flex items-center justify-center">
        <Image src="/images/logo_cue.svg" alt="icon" width={32} height={32} />
      </Link>
    </div>
  );
};

export default Footer;
