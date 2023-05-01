import Image from 'next/image';

const Index = ({ img, upload }) => {

  return (
    upload && (
      <div>
        {upload && <Image src={upload} alt="upload file" width={200} height={200} /> }
      <div className="flex items-center justify-between gap-2">

        <p className="p-sm-semi text-weight-normal text-textblack">
          {img?.name || ''}
        </p>
        <div className="flex items-center gap-2">
          <p className="p-sm-semi text-weight-normal text-[#9A9DB8]">
            {`${Math.floor(img?.size / 1024)} kb` || ''}
          </p>
          <Image
            src="/images/check.svg"
            alt="upload file"
            width={20}
            height={20}
          />

          <div className="p-[6px]">
            <Image
              src="/images/delete.svg"
              alt="upload file"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
      </div>
    )
  );
};

export default Index;
