import SideBar from "@/dashboard/sideBar";
import Image from "next/image";

const capData = [
  {
    name: "Aaron DuBois",
    tokens: "234",
    invested: "1,234",
    earned: "34",
  },
  {
    name: "Aaron DuBois",
    tokens: "234",
    invested: "1,234",
    earned: "34",
  },
  {
    name: "Aaron DuBois",
    tokens: "234",
    invested: "1,234",
    earned: "34",
  },
  {
    name: "Aaron DuBois",
    tokens: "234",
    invested: "1,234",
    earned: "34",
  },
  {
    name: "Aaron DuBois",
    tokens: "234",
    invested: "1,234",
    earned: "34",
  },
  {
    name: "Aaron DuBois",
    tokens: "234",
    invested: "1,234",
    earned: "34",
  },
  {
    name: "Aaron DuBois",
    tokens: "234",
    invested: "1,234",
    earned: "34",
  },
  {
    name: "Aaron DuBois",
    tokens: "234",
    invested: "1,234",
    earned: "34",
  },
  {
    name: "Aaron DuBois",
    tokens: "234",
    invested: "1,234",
    earned: "34",
  },
  {
    name: "Aaron DuBois",
    tokens: "234",
    invested: "1,234",
    earned: "34",
  },
];

const B2BCapTable = () => {
  return (
    <div>
      <SideBar />

      <div className="dashboard-container padding-left  min-h-[960px]">
        <div className="flex items-center gap-[18px] mb-8">
          <div className="p-[10px] cursor-pointer">
            <Image src="/images/sidebar-arrow-left.svg" alt="arrow" width={20} height={20} />
          </div>
          <h1 className="p-md text-textblack">Cap table Project name</h1>
        </div>

        <div className="w-full bg-white rounded-[20px] shadow-mdshadow2 overflow-x-scroll md:overflow-x-visible">
          <table className="cap-table">
            <tr>
              <th className="text-left table-th p-sm-semi">Name</th>
              <th className="text-right table-th p-sm-semi">Tokens bought</th>
              <th className="text-right table-th p-sm-semi">USDC Invested</th>
              <th className="text-right table-th p-sm-semi">USDC Earned</th>
            </tr>

            {capData?.map((item, index) => (
              <tr key={index}>
                <td className="text-left table-th p-sm-semi text-weight-normal">{item.name}</td>
                <td className="text-right table-th p-sm-semi text-weight-normal">{item.tokens}</td>
                <td className="text-right table-th p-sm-semi text-weight-normal">{item.invested}</td>
                <td className="text-right table-th p-sm-semi text-weight-normal">{item.earned}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default B2BCapTable;
