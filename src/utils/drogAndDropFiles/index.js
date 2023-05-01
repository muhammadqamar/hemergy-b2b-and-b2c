import Image from 'next/image';
import Button from '../buttons';

const Index = ({ list, label, onClick }) => {
  return (
    <>
      <label className="p-sm text-weight-medium">{label}</label>
      {list && (
        <div className="ml-5">
          <ul className="flex flex-col gap-2 list-disc">
            <li>
              <p className="p-sm text-weight-medium">Company ID document</p>
            </li>
            <li>
              <p className="p-sm text-weight-medium">Company statutes</p>
            </li>
            <li>
              <p className="p-sm text-weight-medium">Terms sheet</p>
            </li>
          </ul>
        </div>
      )}
      <div className="drag-drop-files">
        {/* <div className="file-heading">
          <Image src="/images/upload_file.svg" alt="upload file" width={20} height={20} />
          <p className="p-sm text-weight-medium">Drag & Drop your files here</p>
        </div>
        <p className="p-sm-semi text-weight-normal">OR</p> */}
        <Button
          type="button"
          onClick={onClick}
          text="Browse..."
          bg="bg-white"
          border
          borderColor
          m
        />
      </div>
    </>
  );
};

export default Index;
