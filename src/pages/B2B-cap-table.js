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
          <h1 className="p-md  text-textblack">Cap table Project name</h1>
        </div>

        <div className="w-full bg-white rounded-[20px] shadow-mdshadow2 overflow-x-scroll md:overflow-x-visible">
          <table className="cap-table">
            <tr>
              <th className="table-th p-sm-semi text-left">Name</th>
              <th className="table-th p-sm-semi text-right">Tokens bought</th>
              <th className="table-th p-sm-semi text-right">USDC Invested</th>
              <th className="table-th p-sm-semi text-right">USDC Earned</th>
            </tr>

            {capData.map((item, index) => (
              <tr key={index}>
                <td className="table-th p-sm-semi text-weight-normal text-left">{item.name}</td>
                <td className="table-th p-sm-semi text-weight-normal text-right">{item.tokens}</td>
                <td className="table-th p-sm-semi text-weight-normal text-right">{item.invested}</td>
                <td className="table-th p-sm-semi text-weight-normal text-right">{item.earned}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default B2BCapTable;
