import Image from "next/image";

const Index = () => {
  return (
    <div className="w-full gap-2 flex ">
      <div className="power-box">
        <Image src="/images/bolt.svg" alt="power" width={40} height={40} />
        <h4 className="text-white p-xl">2.3kW</h4>
        <p className="font-medium text-white p-x-sm">Power generated</p>
      </div>
      <div className="power-box">
        <Image src="/images/cloud_off.svg" alt="power" width={40} height={40} />
        <h4 className="text-white p-xl">2.3kW</h4>
        <p className="font-medium text-white p-x-sm">Carbon avoided</p>
      </div>
    </div>
  );
};

export default Index;
