import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const SideBar = () => {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className={`flex-row laptop:flex-col  side-nav-bar  expand-flex-box`}>
      <Link href="/" className="hemergy-logo-link">
        <Image
          src="/images/hemergy_logo.svg"
          className="hidden xl:block"
          alt="logo"
          width={187}
          height={40}
        />
        <Image
          src="/images/logo_cue.svg"
          className="xl:hidden block"
          alt="logo"
          width={32}
          height={32}
        />
      </Link>
      <div className="flex-box flex-row laptop:flex-col gap-4 ">
        <Link
          href="/projects/details"
          className={
            currentRoute === "/projects/details" ? "expand-menu-item active" : "expand-menu-item"
          }
        >
          <Image src="/images/apps.svg" alt="logo" width={20} height={20} />
          <h3 className="expand-side-bar-text">Projects</h3>
        </Link>
        <Link
          href="/development"
          className={
            currentRoute === "/development"
              ? "expand-menu-item active hide-links"
              : "expand-menu-item hide-links"
          }
        >
          <Image src="/images/code-sidebar.svg" alt="logo" width={20} height={20} />
          <h3 className="expand-side-bar-text">Developer</h3>
        </Link>
        <Link
          href="/new-project"
          className={
            currentRoute === "/new-project" ? "expand-menu-item active" : "expand-menu-item"
          }
        >
          <Image src="/images/monitoring.svg" alt="logo" width={20} height={20} />
          <h3 className="expand-side-bar-text">Portfolio</h3>
        </Link>
        <Link
          href="/about-hemergy"
          className={
            currentRoute === "/about-hemergy" ? "expand-menu-item active" : "expand-menu-item"
          }
        >
          <Image src="/images/hemergy.svg" alt="logo" width={20} height={20} />
          <h3 className="expand-side-bar-text">About Hemergy</h3>
        </Link>
      </div>
      <div className="flex-box flex-row laptop:flex-col gap-4">
        <Link href="https://twitter.com/HemergyTech" className="expand-menu-item hide-links">
          <Image src="/images/twitter.svg" alt="logo" width={20} height={20} />
          {<h3 className="expand-side-bar-text">Twitter</h3>}
        </Link>
        <Link href="https://medium.com/hemergy" className="expand-menu-item hide-links">
          <Image src="/images/medium.svg" alt="logo" width={20} height={20} />
          <h3 className="expand-side-bar-text">Medium</h3>
        </Link>
        <Link href="" className="expand-menu-item hide-links">
          <Image src="/images/help.svg" alt="logo" width={20} height={20} />
          <h3 className="expand-side-bar-text">Get in touch</h3>
        </Link>
        <Link href="" className={`  expand-menu-item`}>
          <img className="rounded-xl" src="/images/user.png" alt="logo" />
          {<h3 className="expand-side-bar-text">Graham Pollock</h3>}
          <Image
            src="/images/logout.svg"
            className="hidden xl:block"
            alt="logo"
            width={20}
            height={20}
          />
        </Link>

        <button
          onClick={() => {
            if (menu === false) {
              setMenu(true);
            } else {
              setMenu(false);
            }
          }}
          className=" laptop:hidden block"
        >
          <Image
            src={menu === true ? "/images/close.svg" : "/images/menu.svg"}
            alt=""
            width={20}
            height={20}
          />
        </button>
      </div>
      <div className={`mobile-side-box  ${menu === true ? `block` : ` hidden`}`}>
        <Link href="https://twitter.com/HemergyTech" className="mobile-dash-links">
          <Image src="/images/twitter.svg" alt="logo" width={20} height={20} />
          <span className="p-sm text-weight-medium text-white">Twitter</span>
        </Link>
        <Link href="" className="mobile-dash-links">
          <Image src="/images/medium.svg" alt="logo" width={20} height={20} />
          <span className="p-sm text-weight-medium text-white">Medium</span>
        </Link>
        <Link href="" className="mobile-dash-links">
          <Image src="/images/help.svg" alt="logo" width={20} height={20} />
          <span className="p-sm text-weight-medium text-white">Help</span>
        </Link>
        <Link href="" className="mobile-dash-links">
          <Image src="/images/logout.svg" alt="logo" width={20} height={20} />
          <span className="p-sm text-weight-medium text-white">Sign out</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
