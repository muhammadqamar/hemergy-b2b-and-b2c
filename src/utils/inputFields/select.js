import React from 'react';

const Select = (props) => {
  const { label, data, errors, touched, placeholder, name, onBlur, onChange } = props;
  return (
    <div className="input-box" {...props}>
      <label className="p-sm text-weight-medium">{label}</label>
      <div className="input-field">
        <select className=" input p-sm" name={name} onBlur={onBlur} onChange={onChange}>
          <option className="text-white500" value="">
            {placeholder}
          </option>
          {data?.map((item, index) => (
            <option key={index} value={item.value}>
              {item.option}
            </option>
          ))}
        </select>
      </div>
      <p className="error p-x-sm">{errors && touched && errors}</p>
    </div>
  );
};

export default Select;
