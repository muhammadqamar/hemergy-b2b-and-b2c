import Image from 'next/image';
import PowerCarbon from '@/utils/powerCarbon';

const Tokens = ({ showTokenInfo, onClick, isLoading, projectData }) => {
  return (
    <div className="tokens-wrapper">
      {showTokenInfo && (
        <h6 className="text-center mb-6 sm:mb-[57px] p-md ">
          {projectData?.tokens?.numberOfTokens} issued
        </h6>
      )}
      <div className="available-token mb-6 sm:mb-[57px]">
        <Image src="/images/token.png" alt="token" width={32} height={32} />
        <div className="text-center">
          <h1 className="mb-1 p-2xl"> {projectData?.tokens?.tokenPrice}</h1>
          <p className="text-white p-sm-semi">Equity tokens available</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className="w-full md:w-[280px] mx-auto mb-4 sm:mb-6 btn secondary"
      >
        {isLoading ? <img src="/images/loader.svg" /> : 'Invest now'}
      </button>

      <div className="mb-2 sm:mb-4">
        <PowerCarbon />
      </div>

      <div className=" year-box">
        <div className="mb-4 flex-box">
          <div>
            <h5 className="mb-1 text-white p-xl">15</h5>
            <p className="font-medium text-white p-x-sm">Year</p>
          </div>
          <div>
            <h5 className="mb-1 text-white p-xl">35,553</h5>
            <p className="font-medium text-right text-white p-x-sm">USDC</p>
          </div>
        </div>
        <div className="year-range">
          <input
            type="range"
            min="10"
            max="300"
            step="5"
            defaultValue={10}
            style={{
              backgroundSize: `40% , 100% `,
            }}
          />
        </div>
      </div>
      {showTokenInfo && (
        <div className="mt-4 what-token sm:mt-6">
          <div className="justify-start gap-2 mb-2 flex-box">
            <Image src="/images/info.svg" alt="info" width={24} height={24} />
            <h5 className="font-semibold text-white p-sm">What are tokens?</h5>
          </div>

          <p className="font-normal p-sm-semi text-blue200">
            Tokens represent part of the physical asset asset name. When you buy
            tokens, you are investing in these.
          </p>
        </div>
      )}
    </div>
  );
};

export default Tokens;
