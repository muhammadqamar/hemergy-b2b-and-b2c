import Link from "next/link";

const MobileNav = ({ currentRoute, menu }) => {
  return (
    <section
      className={`w-full bg-textcolor rounded-br-3xl shadow-mdshadow rounded-bl-3xl px-12 py-6 absolute top-[80px] left-0 z-[5] ${
        menu === true ? `block` : ` hidden`
      }`}
    >
      <div className="flex flex-col gap-2 items-start pb-6">
        <Link
          href="/how-it-work"
          className={
            currentRoute === `/how-it-work`
              ? `p-sm mobile-tab active-mobile-tab`
              : `p-sm mobile-tab`
          }
        >
          How it works
        </Link>
        <Link
          href="/about"
          className={
            currentRoute === `/about`
              ? `p-sm text-white font-medium px-4 py-2 bg-blue600 rounded-xl`
              : `p-sm text-white font-medium px-4 py-2`
          }
        >
          About
        </Link>
        <Link
          href="/for-investors-projects"
          className={
            currentRoute === `/for-investors-projects`
              ? `p-sm text-white font-medium px-4 py-2 bg-blue600 rounded-xl`
              : `p-sm text-white font-medium px-4 py-2`
          }
        >
          Projects
        </Link>
        <Link
          href="/for-business"
          className={
            currentRoute === `/for-business`
              ? `p-sm text-white font-medium px-4 py-2 bg-blue600 rounded-xl`
              : `p-sm text-white font-medium px-4 py-2`
          }
        >
          For Businesses
        </Link>
        <Link
          href="/contact-us"
          className={
            currentRoute === `/contact-us`
              ? `p-sm text-white font-medium px-4 py-2 bg-blue600 rounded-xl`
              : `p-sm text-white font-medium px-4 py-2`
          }
        >
          Get in touch
        </Link>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <Link
          href="/login"
          className={
            currentRoute === `/login`
              ? `p-sm text-white font-medium px-4 py-2 bg-blue600 rounded-xl`
              : `p-sm text-white font-medium px-4 py-2`
          }
        >
          Sign in
        </Link>

        <Link href="/register" className="btn secondary">
          Get started
        </Link>
      </div>
    </section>
  );
};

export default MobileNav;
