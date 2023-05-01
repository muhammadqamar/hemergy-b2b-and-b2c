import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./mobileNav";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const currentRoute = router.pathname;

  return (
    <>
      <div className="nav-container">
        <div className="main-nav-wrapper">
          <Link href="/" className="nav-logo">
            <Image
              src="/images/hemergy-logo.svg"
              alt="hemergy logo"
              width={150}
              height={32}
            />
          </Link>
          <div className="nav-links-box">
            <Link
              href="/how-it-work"
              className={
                currentRoute === `/how-it-work`
                  ? `nav-link active-link`
                  : `nav-link`
              }
            >
              How it works
            </Link>
            <Link
              href="/about"
              className={
                currentRoute === `/about` ? `nav-link active-link` : `nav-link`
              }
            >
              About
            </Link>
            <Link
              href="/for-investors-projects"
              className={
                currentRoute === `/for-investors-projects`
                  ? `nav-link active-link`
                  : `nav-link`
              }
            >
              Projects
            </Link>
            <Link
              href="/for-business"
              className={
                currentRoute === `/for-business`
                  ? `nav-link active-link`
                  : `nav-link`
              }
            >
              For Businesses
            </Link>
            <Link
              href="/contact-us"
              className={
                currentRoute === `/contact-us`
                  ? `nav-link active-link`
                  : `nav-link`
              }
            >
              Get in touch
            </Link>
          </div>
          <div className="nav-reginter">
            <Link
              href="/login"
              className={
                currentRoute === `/login`
                  ? `nav-link hidden lg:block active-link`
                  : `nav-link hidden lg:block`
              }
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className={menu === true ? "hidden" : "btn secondary"}
            >
              Get started
            </Link>

            <button
              onClick={() => {
                if (menu === false) {
                  setMenu(true);
                } else {
                  setMenu(false);
                }
              }}
              className=" lg:hidden block"
            >
              <Image
                src={menu === true ? "/images/close.svg" : "/images/menu.svg"}
                alt="close"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
      <MobileNav menu={menu} currentRoute={currentRoute} />
    </>
  );
};

export default Navbar;
