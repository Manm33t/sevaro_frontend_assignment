import React, { useEffect, useState } from "react";
import "./App.css";
import Dropdown from "./Components/Dropdown";
import InputField from "./Components/InputField";
import DatePickerComponent from "./Components/DatePickerComponent";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const initialState = {
  userID: "",
  userName: "",
  shiftID: "",
  shiftName: "",
  facilityID: "",
  facilityName: "",
  contract: "",
  startTime: null,
  endTime: null,
};

function App() {
  const fetchLists = async () => {
    const [userList, facilityList, shifts] = await Promise.all([
      axios.get("http://localhost:3000/users"),
      axios.get("http://localhost:3000/facility"),
      axios.get("http://localhost:3000/shifts"),
    ]);

    setUsers(
      userList?.data?.map((a) => ({
        key: a.id,
        value: `${a.firstName} ${a.lastName}`,
      }))
    );
    setFacility(
      facilityList?.data?.map((a) => ({
        key: a.facilityID,
        value: a.facilityName,
      }))
    );
    setShifts(shifts?.data?.map((a) => ({ key: a.id, value: a.name })));
  };

  useEffect(() => {
    fetchLists().then(console.log).catch(console.log);
  }, []);

  const [users, setUsers] = useState([]);
  const [facility, setFacility] = useState([]);
  const [shifts, setShifts] = useState([]);

  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (key, e) => {
    if (key === "user") {
      setFormData({
        ...formData,
        userName: e?.target?.value,
        userID: users.find((a) => a.value === e.target.value)?.key,
      });
    } else if (key === "facility") {
      setFormData({
        ...formData,
        facilityName: e?.target?.value,
        facilityID: facility.find((a) => a.value === e.target.value)?.key,
      });
    } else if (key === "shifts") {
      setFormData({
        ...formData,
        shiftName: e?.target?.value,
        shiftID: shifts.find((a) => a.value === e.target.value)?.key,
      });
    }
  };

  const handleDateChange = (date, name) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:3000/", {
      ...formData,
      startTime: dayjs(formData.startTime).format("DD/MM/YYYY HH:mm"),
      endTime: dayjs(formData.endTime).format("DD/MM/YYYY HH:mm"),
      facilities: [formData.facilityName],
    });
    const { error } = response.data;
    setFormData(initialState);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Schedule Created Successfully");
    }
  };

  return (
    <div className="App">
      <div className="InputBox">
        <span className="TitleText">User Data</span>
        <div className="Component">
          <span className="ComponentText">User</span>
          <Dropdown
            name="selectedOption1"
            value={formData.userName}
            options={users}
            onChange={(e) => handleSelectChange("user", e)}
          />
        </div>

        <div className="Component">
          <span className="ComponentText">Facility</span>
          <Dropdown
            name="selectedOption2"
            value={formData.facilityName}
            options={facility}
            onChange={(e) => handleSelectChange("facility", e)}
          />
        </div>
        <div className="Component">
          <span className="ComponentText">Shift</span>
          <Dropdown
            name="selectedOption3"
            value={formData.shiftName}
            options={shifts}
            onChange={(e) => handleSelectChange("shifts", e)}
          />
        </div>

        <InputField
          name="contract"
          value={formData.contract}
          onChange={handleChange}
          placeholder="Contract"
          showCancel={false}
        />

        <DatePickerComponent
          selectedDate={formData.startTime}
          onChange={(date) => handleDateChange(date, "startTime")}
          placeholder="Select Start Time"
        />
        <DatePickerComponent
          selectedDate={formData.endTime}
          onChange={(date) => handleDateChange(date, "endTime")}
          placeholder="Select End Time"
        />

        <button onClick={handleSubmit} className="submitButton">
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
