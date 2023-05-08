import Image from "next/image";
import SideBar from "@/dashboard/sideBar";
import NavUserNewProject from "@/utils/navUserNewProject";
import Button from "@/utils/buttons";
import TrendingCard from "@/utils/trendingCard";
// import Map from "@/utils/map/Map";
import { useEffect, useState } from "react";
import positions from "@/utils/map/positionData";
// import BarChart from "react-bar-chart";

export default function SmartContract() {
  const [positionData, setPositionData] = useState([]);
  useEffect(() => {
    setPositionData(positions);
  }, []);

  const mapCoordFilter = (type) => {
    setPositionData(positions.filter((data) => data.type === type));
  };

  const data = [
    { text: "9/2", value: 200 },
    { text: "10/2", value: 500 },
    { text: "11/2", value: 200 },
    { text: "12/2", value: 300 },
    { text: "13/2", value: 340 },
    { text: "14/2", value: 200 },
    { text: "15/2", value: 500 },
    { text: "16/2", value: 200 },
    { text: "17/2", value: 300 },
    { text: "18/2", value: 340 },
  ];

  const margin = { top: 22, right: 20, bottom: 30, left: 40 };
  const background = { background: "#6B7EFD" };
  const borderWidth = { borderWidth: 8.69 };
  const handleBarClick = (element, id) => {
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  };
  return (
    <>
      <SideBar />
      <div className="dashboard-container padding-left">
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 mb-8 bg-btncolor rounded-xl">
          <div className="flex items-start gap-2 pl-0 laptop:pl-[106px]">
            <Image src="/images/verification-warning.svg" alt="warning" width={20} height={20} />
            <p className="text-sm font-normal leading-5 text-white font-Inter ">
              Your projects are not public. Your projects will remain in draft until you complete your verification
            </p>
          </div>
          <Button bg="bg-textcolor" color text="Complete verification" />
        </div>
        <NavUserNewProject icon user="Project dashboard" />

        <div className="flex flex-wrap items-center justify-between gap-4 my-8">
          <div className="flex items-center gap-3">
            <label className="p-sm text-weight-semibold text-textblack">View period:</label>
            <div className="dashboard-select">
              <select className="p-sm-semi text-weight-normal" name="cars" id="cars">
                <option value="All Time">All Time </option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>
          </div>
          <Button color bg="bg-btncolor" icon="/images/add.svg" text="New project" shadow />
        </div>
        <div className="w-full h-[260px] rounded-[20px] bg-blue100 relative  overflow-hidden">
          {/* <Map positionCoords={positionData} smallH /> */}

          <div className="absolute left-4 bottom-4">
            <TrendingCard wFit heading="Produced" ratio="0" ratioName="dREC" icon="/images/trending_up.svg" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-8 my-8 laptop:flex-nowrap">
          <div className="bar-chart w-full p-6  bg-white h-[420px] rounded-xl shadow-mdshadow2 hidden lg:block">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h4 className="p-lg ">Tot. Produced 4,567 kWh</h4>
              <div className="flex items-center gap-2">
                <div className="graph-select">
                  <select className="p-sm-semi text-weight-normal" name="cars" id="cars">
                    <option value="All Time">All projects </option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
                <div className="graph-select">
                  <select className="p-sm-semi text-weight-normal" name="cars" id="cars">
                    <option value="All Time">Power </option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>
              </div>
            </div>
            {/* <BarChart ylabel="Quantity" borderWidth={borderWidth} background={background} width={600} height={316} margin={margin} data={data} onBarClick={handleBarClick} />
          */}
          </div>

          <div className=" flex flex-col gap-8 w-full md:w-[46%]">
            <div className="w-full p-4 bg-white rounded-xl shadow-mdshadow2 text-textblack">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Image src="/images/token.png" alt="token" width={23} height={23} />
                <h6 className="p-lg ">Tokens</h6>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="w-full p-2 text-center rounded-lg bg-garbg">
                  <h6 className="p-xl-semi ">1,234</h6>
                  <p className="p-sm-semi text-weight-medium">Issued</p>
                </div>
                <div className="w-full p-2 text-center rounded-lg bg-garbg">
                  <h6 className="p-xl-semi ">234</h6>
                  <p className="p-sm-semi text-weight-medium">Sold</p>
                </div>
              </div>
            </div>

            <TrendingCard heading="Amount raised" ratio="0" ratioName="USDC" icon="/images/trending_up.svg" />

            <TrendingCard heading="Investors" capTable ratio="0" icon="/images/bounding.svg" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 mb-8">
          <h6 className="p-lg ">Your projects</h6>

          <div className="flex items-center gap-1 p-1 bg-white rounded-2xl">
            <button className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue100">
              <Image src="/images/table_rows.svg" alt="table_rows" width={20} height={20} />
              {/*  <Image src='/images/table_rows_black.svg' alt='table_rows' width={20} height={20} />*/}
            </button>
            <button className="flex items-center justify-center w-8 h-8 bg-white rounded-xl">
              <Image src="/images/grid_view.svg" alt="grid_view" width={20} height={20} />
              {/*  <Image src='/images/grid_view_blue.svg' alt='grid_view_blue' width={20} height={20} />*/}
            </button>
          </div>
        </div>

        <div className="w-full bg-white rounded-[20px] shadow-mdshadow2 overflow-x-scroll md:overflow-x-visible">
          <table className="cap-table">
            <tr>
              <th className="text-left table-th p-sm-semi">Name</th>
              <th className="text-left table-th p-sm-semi">Asset name</th>
              <th className="text-right table-th p-sm-semi">Asset type</th>
              <th className="text-left table-th p-sm-semi">Location</th>
              <th className="text-left table-th p-sm-semi">Status</th>
              <th className="text-left table-th p-sm-semi">Midcap?</th>
              <th className="text-right table-th p-sm-semi">Tokens produced</th>
              <th className="text-right table-th p-sm-semi">Tokens sold</th>
            </tr>

            <tr>
              <td className="text-left table-th p-sm-semi text-textcolor">Something entered</td>
              <td className="text-left table-th p-sm-semi text-weight-normal">Something entered</td>
              <td className="text-left table-th p-sm-semi text-weight-normal">
                <Image src={"/images/sun-b.svg"} alt="icon" width={16} height={16} />
              </td>
              <td className="text-left table-th p-sm-semi text-weight-normal">Something entered</td>
              <td className="text-left table-th p-sm-semi text-weight-normal">
                <p className=" w-fit px-2 py-[2px] rounded-3xl bg-[#E0FBEB] text-[#19814F]">Fundraising</p>
              </td>
              <td className="text-left table-th p-sm-semi text-weight-normal"></td>
              <td className="text-right table-th p-sm-semi text-weight-normal">0</td>
              <td className="text-right table-th p-sm-semi text-weight-normal">0</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}
