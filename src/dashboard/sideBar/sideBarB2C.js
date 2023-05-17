import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
const SideBar = () => {
  const { user } = useSelector((state) => state);
  const [menu, setMenu] = useState(false);
  const [expendable, setExpendable] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      onMouseEnter={() => {
        screenWidth >= '1190' ? setExpendable(true) : setExpendable(false);
      }}
      onMouseLeave={() => setExpendable(false)}
      className={`flex-row flex-box laptop:flex-col side-nav-bar ${
        expendable && 'expand-flex-box'
      }`}
    >
      <Link href="https://hemergy-seven.vercel.app/">
        {expendable ? (
          <Image
            src="/images/hemergy_logo.svg"
            className=""
            alt="logo"
            width={187}
            height={40}
          />
        ) : (
          <Image src="/images/logo_cue.svg" alt="logo" width={32} height={32} />
        )}
      </Link>
      <div className="flex-row gap-4 flex-box laptop:flex-col ">
        <Link
          href="/portfolio"
          className={
            expendable
              ? currentRoute === '/portfolio'
                ? 'expand-menu-item active hide-links'
                : 'expand-menu-item hide-links'
              : currentRoute === '/portfolio'
              ? 'menu-item active'
              : 'menu-item'
          }
        >
          <Image
            src="/images/monitoring.svg"
            alt="logo"
            width={20}
            height={20}
          />
          {expendable && <h3 className="expand-side-bar-text">Portfolio</h3>}
        </Link>
        <Link
          href="/"
          className={
            expendable
              ? currentRoute === '/'
                ? 'expand-menu-item active hide-links'
                : 'expand-menu-item hide-links'
              : currentRoute === '/'
              ? 'menu-item active'
              : 'menu-item'
          }
        >
          <Image src="/images/apps.svg" alt="logo" width={20} height={20} />
          {expendable && <h3 className="expand-side-bar-text">Projects</h3>}
        </Link>
        <Link
          href="/about-hemergy"
          className={
            expendable
              ? currentRoute === '/about-hemergy'
                ? 'expand-menu-item active hide-links'
                : 'expand-menu-item hide-links'
              : currentRoute === '/about-hemergy'
              ? 'menu-item active'
              : 'menu-item'
          }
        >
          <Image src="/images/hemergy.svg" alt="logo" width={20} height={20} />
          {expendable && (
            <h3 className="expand-side-bar-text">About Hemergy</h3>
          )}
        </Link>
      </div>
      <div className="flex-row gap-4 flex-box laptop:flex-col">
        <a
          target="_blank"
          href="https://twitter.com/HemergyTech"
          className={
            expendable ? 'expand-menu-item hide-links' : 'menu-item hide-links'
          }
        >
          <Image src="/images/twitter.svg" alt="logo" width={20} height={20} />
          {expendable && <h3 className="expand-side-bar-text">Twitter</h3>}
        </a>
        <a
          target="_blank"
          href="https://medium.com/hemergy"
          className={
            expendable ? 'expand-menu-item hide-links' : 'menu-item hide-links'
          }
        >
          <Image src="/images/medium.svg" alt="logo" width={20} height={20} />
          {expendable && <h3 className="expand-side-bar-text">Medium</h3>}
        </a>
        <Link
          href="/contact"
          className={
            expendable
              ? currentRoute === '/contact'
                ? 'expand-menu-item active hide-links'
                : 'expand-menu-item hide-links'
              : currentRoute === '/contact'
              ? 'menu-item active hide-links'
              : 'menu-item hide-links'
          }
        >
          <Image src="/images/help.svg" alt="logo" width={20} height={20} />
          {expendable && <h3 className="expand-side-bar-text">Get in touch</h3>}
        </Link>
        {expendable ? (
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/profile"
              className={
                currentRoute === '/profile'
                  ? 'expand-menu-item small-link active hide-links'
                  : 'expand-menu-item small-link hide-links'
              }
            >
              <div className="flex items-center gap-3 ">
                <img
                  className="object-cover w-8 h-8 rounded-xl hide-links"
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
        ) : (
          <>
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
                className="object-cover w-8 h-8 rounded-full"
              />
            </Link>
            <a
              onClick={async () => {
                localStorage.removeItem('hemergy-token');
                localStorage.removeItem('hemergy-email');
                await user?.web3auth?.logout();
                router.push('/login');
              }}
              className={'menu-item hide-links'}
            >
              <Image
                src="/images/logout.svg"
                alt="logo"
                width={20}
                height={20}
              />
            </a>
          </>
        )}
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
            src="/images/logout.svg"
            alt="logo"
            width={20}
            height={20}
            className="object-cover w-5 h-5 rounded-full"
          />
          <span className="text-white p-sm text-weight-medium">Sign out</span>
        </a>
      </div>
    </div>
  );
};

export default SideBar;
