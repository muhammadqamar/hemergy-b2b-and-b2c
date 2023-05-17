import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SideBar = () => {
  const { user } = useSelector((state) => state);
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;
  const [expendable, setExpendable] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    s;
  }, []);

  return (
    <div
      onMouseEnter={() => {
        screenWidth >= '1190' ? setExpendable(true) : setExpendable(true);
      }}
      onMouseLeave={() => setExpendable(true)}
      className={`flex-row flex-box laptop:flex-col side-nav-bar ${
        expendable && 'expand-flex-box'
      }`}
    >
      <Link
        href="https://hemergy-seven.vercel.app/"
        className="hemergy-logo-link"
      >
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
          href="/development"
          className={
            expendable
              ? currentRoute === '/development'
                ? 'expand-menu-item active hide-links'
                : 'expand-menu-item hide-links'
              : currentRoute === '/development'
              ? 'menu-item active'
              : 'menu-item'
          }
        >
          <Image
            src="/images/code-sidebar.svg"
            alt="logo"
            width={20}
            height={20}
          />
          {expendable && <h3 className="expand-side-bar-text">Developer</h3>}
        </Link>
        <Link
          href="/project-zero-state"
          className={
            expendable
              ? currentRoute === '/project-zero-state'
                ? 'expand-menu-item active hide-links'
                : 'expand-menu-item hide-links'
              : currentRoute === '/project-zero-state'
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
        <Link
          href="https://twitter.com/HemergyTech"
          className={
            expendable ? 'expand-menu-item hide-links' : 'menu-item hide-links'
          }
        >
          <Image src="/images/twitter.svg" alt="logo" width={20} height={20} />
          {expendable && <h3 className="expand-side-bar-text">Twitter</h3>}
        </Link>
        <Link
          href="https://medium.com/hemergy"
          className={
            expendable ? 'expand-menu-item hide-links' : 'menu-item hide-links'
          }
        >
          <Image src="/images/medium.svg" alt="logo" width={20} height={20} />
          {expendable && <h3 className="expand-side-bar-text">Medium</h3>}
        </Link>
        <Link
          href="/contact"
          className={
            expendable ? 'expand-menu-item hide-links' : 'menu-item hide-links'
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
