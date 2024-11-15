import React from 'react';

const InputField = ({ name, value, onChange, placeholder, onRemove, showCancel }) => {
  return (
    <div className="inputWrapper">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="InputText"
      />
      {showCancel && (
        <button className="clearButton" onClick={onRemove}>
          ✖
        </button>
      )}
    </div>
  );
};

export default InputField;
