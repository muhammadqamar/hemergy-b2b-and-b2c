
export default function UserCard({ avatar, name, designation, bio }) {

    return (
        <div className="hemergy-user-card flex gap-[12px]">
            <div style={{ backgroundImage: `url('${avatar}')` }} alt="user" className="w-[54px] h-[54px] bg-no-repeat bg-cover bg-center shrink-0" />
            <div>
                <h5 className="font-semibold text-[20px] leading-[28px]">{name}</h5>
                <h6 className="font-medium text-[12px] leading-[14px] pt-[4px] pb-[8px] text-gray800">{designation}</h6>
                {bio && <p className="font-normal text-[14px] leading-[20px]  text-gray800">
                    {bio}
                </p>
                }
            </div>
        </div>
    );
}
