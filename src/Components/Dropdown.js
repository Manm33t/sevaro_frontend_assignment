import React from "react";

const Dropdown = ({ name, value, options, onChange }) => {
  return (
    <select name={name} value={value} onChange={onChange} className="InputText">
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.key} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
