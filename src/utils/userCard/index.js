export default function UserCard({ bg, normal, detail, avatar, name, designation, bio, company }) {
  return (
    <div className="hemergy-user-card flex gap-[12px] font-Inter">
      <div
        style={{ backgroundImage: `url('${avatar}')` }}
        alt="user"
        className={`${
          detail ? "w-[54px] h-[54px]" : "w-[40px] h-[40px]"
        }  bg-no-repeat bg-cover bg-center shrink-0`}
      />
      <div>
        <div className="flex items-center justify-between gap-1">
          <div>
            <h5
              className={`font-semibold ${bg && "text-white"} ${
                detail ? "text-[20px] leading-[28px] pb-[4px]" : "text-[14px] leading-[20px]"
              } ${normal && "text-base pb-1"} `}
            >
              {name}
            </h5>
            <h6
              className={`${
                bg ? "text-white500" : "text-gray800"
              } font-medium text-[12px] leading-[14px]  pb-[8px] `}
            >
              {designation}
            </h6>
          </div>
          {company && (
            <div className="user-company">
              <img src="/images/kg-logo.svg" alt="company" />
            </div>
          )}
        </div>
        {bio && <p className="font-normal text-[14px] leading-[20px]  text-gray800">{bio}</p>}
      </div>
    </div>
  );
}
