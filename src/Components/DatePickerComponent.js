
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = ({ selectedDate, onChange, placeholder }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      showTimeSelect
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText={placeholder}
      className="datePicker"
    />
  );
};

export default DatePickerComponent;
