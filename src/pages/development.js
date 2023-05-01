import SideBar from "@/dashboard/sideBar";
import Button from "@/utils/buttons";
import LiveForm from "@/components/developerForm/liveForm";
import TestForm from "@/components/developerForm/testForm";

const Development = () => {
  return (
    <>
      <SideBar />
      <div className="info-bg padding-left ">
        <div className="contact-card-box flex-collom px-6 md:px-8 py-8 relative">
          <h1 className="p-xl-semi text-black ">Developer guidance</h1>
          <p className="p-sm text-gray800">To integrate with hemergy API, you need these keys</p>
          <div className="w-full flex gap-8 flex-col sm:flex-row justify-between">
            <LiveForm />
            <TestForm />
          </div>
          <p className="p-sm text-left text-gray800">
            You can also categorize Secret keys for test and live and Publishable keys for test and
            live To have live keys, account must be activated. If it is activated, the user can
            regenerate keys. Automatic copy activated when keys are selected.
          </p>

          <div className="">
            <h4 className="p-lg text-black mb-6">Developer guidelines</h4>
            <Button color bg="bg-textcolor" text="Get documentation" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Development;
