import SideBar from '@/dashboard/sideBar';
import Image from 'next/image';
import Button from '@/utils/buttons';

const aboutCard = [
  {
    heading: 'Investors and contributors',
    about:
      'Investors can choose from a selection of projects, and earn money while seeing your impact instantly. You create energy solutions for communities who benefit from clean energy at lower prices',
    btn: 'Go to projects',
    btnLink: '',
  },
  {
    heading: 'Project holders and energy communities',
    about:
      'We empower professionals & energy communities with safe tools that can enable easy connection with investors ready to help bring your projects to life.',
    btn: 'Create projects',
    btnLink: '',
  },
  {
    heading: 'Businesses and developers',
    about:
      'Businesses involved in sustainable finance looking for data-enhanced software to fight against greenwashing can use our Hemergy core API as a service—helping prove your positive impact, your reached ESG goals and more.',
    btn: 'Get in touch',
    btnLink: '',
  },
];

const AboutHemergy = () => {
  return (
    <>
      <SideBar />
      <div className="info-bg padding-left">
        <div className="flex gap-6 flex-col lg:flex-row relative min-h-[960px]">
          <div className="">
            <h1 className="text-[64px] font-semibold leading-[76px] text-white mb-8">
              About Hemergy
            </h1>

            <div className="flex gap-8 flex-col sm:flex-row ">
              <div className="flex flex-col gap-8 ">
                <p className="p-lg text-weight-normal  text-herotext">
                  Hemergy is a technology provider and a marketplace aiming to
                  create harmony and transparency between different actors
                  involved in the renewable energy transition.
                  <span className="text-weight-semibold"> Read more</span>
                </p>
                <div>
                  <h3 className="p-xl text-white mb-4">The Challenge</h3>
                  <p className="p-sm text-herotext">
                    Decentralization is a major force that energy transition
                    will fully rely on. Blockchain is gaining momentum and come
                    up with concrete solutions in the energy sector. But, a true
                    and seamless link between energy and financial models
                    doesn’t exist yet to accelerate the energy transition.
                  </p>
                </div>
                <div>
                  <h3 className="p-xl text-white mb-4">The Idea</h3>
                  <p className="p-sm text-herotext">
                    Hemergy’s ambition is to provide a fully compliant
                    crypto-solution that irrigates finance and energy value
                    chains, just like blood circulating between two organs in
                    one body. We want to open a new era of abundance by
                    reimagining links between financial and energy sectors.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-blue600 rounded-[20px] flex flex-col gap-6 ">
                <div>
                  <h4 className="p-md text-white mb-4">Use case </h4>
                  <p className="p-sm text-herotext">
                    A local renewable energy actor may propose to install PV
                    panels on a school rooftop. They are accredited to sign PPA
                    with the school, but both need funding to start the project
                    <br />
                    <br />
                    Hemergy can organise a crowdsale of “PV panels under
                    management”, making the project possible, and benefiting
                    everyone.
                  </p>
                </div>
                <div>
                  <h3 className="p-lg mb-2 flex items-center gap-2 text-white">
                    <span>
                      <Image
                        src="/images/check.svg"
                        alt="check"
                        width={24}
                        height={24}
                      />
                    </span>
                    Investors
                  </h3>
                  <p className="p-sm text-herotext">
                    Earns returns while reducing global carbon footprint.
                  </p>
                </div>
                <div>
                  <h3 className="p-lg mb-2 flex items-center gap-2 text-white">
                    <span>
                      <Image
                        src="/images/check.svg"
                        alt="check"
                        width={24}
                        height={24}
                      />
                    </span>
                    Schools
                  </h3>
                  <p className="p-sm text-herotext">
                    Reduce the cost of electricity and make the country’s air
                    cleaner
                  </p>
                </div>
                <div>
                  <h3 className="p-lg mb-2 flex items-center gap-2 text-white">
                    <span>
                      <Image
                        src="/images/check.svg"
                        alt="check"
                        width={24}
                        height={24}
                      />
                    </span>
                    Project holder
                  </h3>
                  <p className="p-sm text-herotext">
                    Generate a stable revenue and create jobs locally
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {aboutCard.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl flex flex-col gap-6 shadow-mdshadow"
              >
                <h2 className="p-md text-black">{item.heading}</h2>
                <p className="p-sm text-gray800">{item.about}</p>
                <Button color bg="bg-textcolor" text={item.btn} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutHemergy;
