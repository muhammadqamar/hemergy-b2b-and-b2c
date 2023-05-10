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
    <div
      className={`flex-row laptop:flex-col   side-nav-bar  expand-flex-box fixed h-full`}
    >
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
          className="block xl:hidden"
          alt="logo"
          width={32}
          height={32}
        />
      </Link>
      <div className="flex-row gap-4 flex-box laptop:flex-col ">
        <Link
          href="/"
          className={
            currentRoute === '/'
              ? 'expand-menu-item active'
              : 'expand-menu-item'
          }
        >
          <Image src="/images/apps.svg" alt="logo" width={20} height={20} />
          <h3 className="expand-side-bar-text">Projects</h3>
        </Link>
        <Link
          href="/development"
          className={
            currentRoute === '/development'
              ? 'expand-menu-item active hide-links'
              : 'expand-menu-item hide-links'
          }
        >
          <Image
            src="/images/code-sidebar.svg"
            alt="logo"
            width={20}
            height={20}
          />
          <h3 className="expand-side-bar-text">Developer</h3>
        </Link>
        <Link
          href="/project-zero-state"
          className={
            currentRoute === '/project-zero-state'
              ? 'expand-menu-item active'
              : 'expand-menu-item'
          }
        >
          <Image
            src="/images/monitoring.svg"
            alt="logo"
            width={20}
            height={20}
          />
          <h3 className="expand-side-bar-text">Portfolio</h3>
        </Link>
        <Link
          href="/about-hemergy"
          className={
            currentRoute === '/about-hemergy'
              ? 'expand-menu-item active'
              : 'expand-menu-item'
          }
        >
          <Image src="/images/hemergy.svg" alt="logo" width={20} height={20} />
          <h3 className="expand-side-bar-text">About Hemergy</h3>
        </Link>
      </div>
      <div className="flex-row gap-4 flex-box laptop:flex-col">
        <Link
          href="https://twitter.com/HemergyTech"
          className="expand-menu-item hide-links"
        >
          <Image src="/images/twitter.svg" alt="logo" width={20} height={20} />
          {<h3 className="expand-side-bar-text">Twitter</h3>}
        </Link>
        <Link
          href="https://medium.com/hemergy"
          className="expand-menu-item hide-links"
        >
          <Image src="/images/medium.svg" alt="logo" width={20} height={20} />
          <h3 className="expand-side-bar-text">Medium</h3>
        </Link>
        <Link href="/contact" className="expand-menu-item hide-links">
          <Image src="/images/help.svg" alt="logo" width={20} height={20} />
          <h3 className="expand-side-bar-text">Get in touch</h3>
        </Link>
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/profile"
            className={
              currentRoute === '/profile'
                ? 'expand-menu-item small-link active'
                : 'expand-menu-item small-link'
            }
          >
            <div className="flex items-center gap-3 ">
              <img
                className="object-cover w-8 h-8 rounded-xl"
                src={user?.user?.detail?.profileImage}
                alt="logo"
              />
              <h3 className="expand-side-bar-text w-[125px] text-ellipsis overflow-hidden whitespace-pre ">
                {user?.user?.detail?.name}
              </h3>
            </div>
          </Link>
          <div
            className="expand-menu-item log-out-icon"
            onClick={async () => {
              localStorage.removeItem('hemergy-token');
              localStorage.removeItem('hemergy-email');

              await user?.web3auth?.logout();
              router.push('/login');
            }}
          >
            <Image
              src="/images/logout.svg"
              className="hidden xl:block"
              alt="logo"
              width={20}
              height={20}
            />
          </div>
        </div>

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
        <Link
          href="https://twitter.com/HemergyTech"
          className="mobile-dash-links"
        >
          <Image src="/images/twitter.svg" alt="logo" width={20} height={20} />
          <span className="text-white p-sm text-weight-medium">Twitter</span>
        </Link>
        <Link href="https://medium.com/hemergy" className="mobile-dash-links">
          <Image src="/images/medium.svg" alt="logo" width={20} height={20} />
          <span className="text-white p-sm text-weight-medium">Medium</span>
        </Link>
        <Link href="/contact" className="mobile-dash-links">
          <Image src="/images/help.svg" alt="logo" width={20} height={20} />
          <span className="text-white p-sm text-weight-medium">Help</span>
        </Link>
        <Link
          href=""
          className="mobile-dash-links"
          onClick={async () => {
            localStorage.removeItem('hemergy-token');
            localStorage.removeItem('hemergy-email');

            await user?.web3auth?.logout();
            router.push('/login');
          }}
        >
          <Image src="/images/logout.svg" alt="logo" width={20} height={20} />
          <span className="text-white p-sm text-weight-medium">Sign out</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
