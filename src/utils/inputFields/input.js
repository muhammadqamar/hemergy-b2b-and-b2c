import Image from 'next/image';

const Input = ({
  label,
  placeholder,
  name,
  inputType,
  value,
  onBlur,
  onChange,
  icon,
  errors,
  touched,
  textarea,
  inputName,
  inputAbout,
  disabled,

}) => {
  return (
    <div className="input-box">
      <label className="p-sm text-weight-medium">{label}</label>
      <div className="input-field">
        <div className="flex items-center gap-2">
          {icon && <Image src={icon} alt="google" width={20} height={20} />}
          {inputName && <p className="mr-2 p-sm text-textblack">{inputName}</p>}
        </div>
        {textarea ? (
          <textarea
            className="input min-h-[132px] p-sm"
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            rows="6"
            cols="50"
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : (
          <input
            className="input p-sm"
            placeholder={placeholder}
            type={inputType}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            disabled={disabled}
          />
        )}
      </div>
      {inputAbout && <p className="p-x-sm text-[#8A8DAB]">{inputAbout}</p>}
      <p className="error p-x-sm">{errors && touched && errors}</p>
    </div>
  );
};

export default Input;
