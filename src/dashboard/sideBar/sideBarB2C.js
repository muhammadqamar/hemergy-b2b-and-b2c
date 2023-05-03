import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const SideBar = () => {
  const { user } = useSelector((state) => state);
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className="flex-row flex-box laptop:flex-col side-nav-bar">
      <Link href="/">
        <Image src="/images/logo_cue.svg" alt="logo" width={32} height={32} />
      </Link>
      <div className="flex-row gap-4 flex-box laptop:flex-col ">
        <Link
          href="/portfolio"
          className={
            currentRoute === '/projects' ? 'menu-item active' : 'menu-item'
          }
        >
          <Image
            src="/images/monitoring.svg"
            alt="logo"
            width={20}
            height={20}
          />
        </Link>
        <Link
          href="/checkout"
          className={
            currentRoute === '/checkout' ? 'menu-item active' : 'menu-item'
          }
        >
          <Image src="/images/apps.svg" alt="logo" width={20} height={20} />
        </Link>
        <Link
          href={`/about-hemergy`}
          className={
            currentRoute === '/about-hemergy' ? 'menu-item active' : 'menu-item'
          }
        >
          <Image src="/images/hemergy.svg" alt="logo" width={20} height={20} />
        </Link>
      </div>
      <div className="flex-row gap-4 flex-box laptop:flex-col">
        <a
          target="_blank"
          href="https://twitter.com/HemergyTech"
          className="menu-item hide-links"
        >
          <Image src="/images/twitter.svg" alt="logo" width={20} height={20} />
        </a>
        <a
          target="_blank"
          href="https://medium.com/hemergy"
          className="menu-item hide-links"
        >
          <Image src="/images/medium.svg" alt="logo" width={20} height={20} />
        </a>
        <Link
          href="/contact"
          className={
            currentRoute === '/contact'
              ? 'menu-item hide-links active'
              : 'menu-item hide-links'
          }
        >
          <Image src="/images/help.svg" alt="logo" width={20} height={20} />
        </Link>
        <Link
          href="/profile"
          className={
            currentRoute === '/profile'
              ? 'dash-user-img insite-border '
              : 'dash-user-img '
          }
        >
          <img
            src={user?.user?.detail?.profileImage}
            alt="logo"
            width={20}
            height={20}
          />
        </Link>
        <a
          onClick={async () => {
            localStorage.removeItem('hemergy-token');
            localStorage.removeItem('hemergy-email');
            await user?.web3auth?.logout();
            router.push('/login');
          }}
          className="menu-item hide-links"
        >
          <Image src="/images/logout.svg" alt="logo" width={20} height={20} />
        </a>
        <button
          onClick={() => {
            if (menu === false) {
              setMenu(true);
            } else {
              setMenu(false);
            }
          }}
          className="block laptop:hidden"
        >
          <Image
            src={menu === true ? '/images/close.svg' : '/images/menu.svg'}
            alt=""
            width={20}
            height={20}
          />
        </button>
      </div>
      <div
        className={`mobile-side-box  ${menu === true ? `block` : ` hidden`}`}
      >
        <a
          target="_blank"
          href="https://twitter.com/HemergyTech"
          className="mobile-dash-links"
        >
          <Image src="/images/twitter.svg" alt="logo" width={20} height={20} />
          <span className="text-white p-sm text-weight-medium">Twitter</span>
        </a>
        <a
          target="_blank"
          href="https://medium.com/hemergy"
          className="mobile-dash-links"
        >
          <Image src="/images/medium.svg" alt="logo" width={20} height={20} />
          <span className="text-white p-sm text-weight-medium">Medium</span>
        </a>
        <Link href="/contact" className="mobile-dash-links">
          <Image src="/images/help.svg" alt="logo" width={20} height={20} />
          <span className="text-white p-sm text-weight-medium">Help</span>
        </Link>
        <a
          onClick={async () => {
            localStorage.removeItem('hemergy-token');
            localStorage.removeItem('hemergy-email');

            await user?.web3auth?.logout();
            router.push('/login');
          }}
          className="mobile-dash-links"
        >
          <img
            src={user?.user?.detail?.profileImage}
            alt="logo"
            width={20}
            height={20}
          />
          <span className="text-white p-sm text-weight-medium">Sign out</span>
        </a>
      </div>
    </div>
  );
};

export default SideBar;
