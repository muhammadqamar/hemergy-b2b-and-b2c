import SideBar from "./sideBar";

const Index = ({ children }) => {
  return (
    <>
      <SideBar />
      <main>{children}</main>
    </>
  );
};

export default Index;
