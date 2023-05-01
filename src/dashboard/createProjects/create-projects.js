import Image from "next/image";
import Link from "next/link";
import NavUserNewProject from "@/utils/navUserNewProject";
import Button from "@/utils/buttons";

const CreateProjects = () => {
  return (
    <div className="dashboard-container padding-left min-h-[960px]">
      <div className="create-project-box">
        <NavUserNewProject user="Hi Ahmed" newProject para />
        <div className="cards-boxes">
          <div className="cards-details-api">
            <div className="card">
              <div className="card-logo">
                <Link href="" className="project-card-btn">
                  <Image src="/images/details-logo.svg" alt="logo" width={64} height={64} />
                </Link>
              </div>
              <div className="project-card-details">
                <h3 className="card-heading">Complete your details</h3>
                <p className="card-text">Add your profile and financials to start free trial</p>
                <Button bg="bg-white" border borderColor="border-textcolor" text="Finish now" hover />
              </div>
            </div>
            <div className="card">
              <div className="card-logo">
                <Link href="" className="project-card-btn">
                  <Image src="/images/cloud-api.svg" alt="logo" width={64} height={64} />
                </Link>
              </div>
              <div className="project-card-details">
                <h3 className="card-heading">Use our API</h3>
                <p className="card-text">Use our token-based API connection method</p>
                <Button bg="bg-white" border borderColor="border-textcolor" text="Check it out" hover />
              </div>
            </div>
          </div>
          <div className="cards-details-api">
            <div className="card card-get-started">
              <div className="card-logo">
                <Link href="" className="project-card-btn">
                  <Image src="/images/create-project.svg" alt="logo" width={64} height={64} />
                </Link>
              </div>
              <div className="project-card-details details-get-started">
                <h3 className="card-heading">Create projects</h3>
                <p className="card-text create-project-text">Configure your projects and invite investors onboard</p>
                <Link href="/new-project">
                  <Button bg="bg-white" border borderColor="border-textcolor" text="Get started" hover m />
                </Link>
              </div>
            </div>
            <div className="card card-token">
              <div className="products-box">
                <h3 className="card-heading products-heading">Tokenized products</h3>
                <p className="coming-soon-text">Coming soon</p>
              </div>
              <div className="token-box">
                <div className="token-flx">
                  <Image src="/images/check.svg" alt="logo" width={24} height={24} />
                  <p className="token-text">Token issuing for different kinds of real assets</p>
                </div>
                <div className="token-flx">
                  <Image src="/images/check.svg" alt="logo" width={24} height={24} />
                  <p className="token-text">Token connection to get value generation data from oracles</p>
                </div>
                <div className="token-flx">
                  <Image src="/images/check.svg" alt="logo" width={24} height={24} />
                  <p className="token-text">Token distribution through different channels</p>
                </div>
                <div className="token-flx">
                  <Image src="/images/check.svg" alt="logo" width={24} height={24} />
                  <p className="token-text">Investor onboarding</p>
                </div>
              </div>
              <Button bg="bg-white" border borderColor="border-textcolor" text="Find out more" hover />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjects;
