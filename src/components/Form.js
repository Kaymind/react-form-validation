import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css';
import { addData, clearCurrent, updateData } from "../actions/form.action";
import { setAlert } from "../actions/alert.action";
import PropTypes from "prop-types";
import axios from "axios";

const Form = ({ formReducer, addData, clearCurrent, updateData, setAlert }) => {
  useEffect(() => {
    if (formReducer.edit !== null) {
      setFormDataLocal(formReducer.edit);
    } else {
      setFormDataLocal({
        title: "",
        fname: "",
        lname: "",
        birthday: "",
        nationality: "",
        citizenId: {
          citizenFieldOne: "",
          citizenFieldTwo: "",
          citizenFieldThree: "",
          citizenFieldFour: "",
          citizenFieldFive: ""
        },
        gender: "",
        phone: {
          countrycode: "+66",
          phonenumber: ""
        },
        passport: "",
        salary: ""
      });
    }
  }, [formReducer.edit]);

  useEffect(() => {
    axios.get("cc_data.json").then(res => {
      setCCData(res.data);
    });
  }, []);

  let [ccData, setCCData] = useState(null);

  const [formDataLocal, setFormDataLocal] = useState({
    title: "",
    fname: "",
    lname: "",
    birthday: "",
    nationality: "",
    citizenId: {
      citizenFieldOne: "",
      citizenFieldTwo: "",
      citizenFieldThree: "",
      citizenFieldFour: "",
      citizenFieldFive: ""
    },
    gender: "",
    phone: {
      countrycode: "+66",
      phonenumber: ""
    },
    passport: "",
    salary: ""
  });

  const {
    title,
    fname,
    lname,
    birthday,
    nationality,
    citizenId,
    gender,
    phone,
    passport,
    salary
  } = formDataLocal;

  const onChange = e => {
    setFormDataLocal({
      ...formDataLocal,
      [e.target.name]: e.target.value
    });
  };

  const phoneCountryOnChange = (value, data) => {
    const phoneCountryCode = { ...phone };
    phoneCountryCode.countrycode = "+" + data.dialCode;
    setFormDataLocal({
      ...formDataLocal,
      phone: phoneCountryCode
    });
  };

  const phoneNumOnChange = e => {
    const phoneNumber = { ...phone };
    phoneNumber.phonenumber = e.target.value;
    setFormDataLocal({
      ...formDataLocal,
      phone: phoneNumber
    });
  };

  const citizenFieldOne = e => {
    citizenId.citizenFieldOne = e.target.value;
    setFormDataLocal({
      ...formDataLocal,
      citizenId: citizenId
    });
  };

  const citizenFieldTwo = e => {
    citizenId.citizenFieldTwo = e.target.value;
    setFormDataLocal({
      ...formDataLocal,
      citizenId: citizenId
    });
  };

  const citizenFieldThree = e => {
    citizenId.citizenFieldThree = e.target.value;
    setFormDataLocal({
      ...formDataLocal,
      citizenId: citizenId
    });
  };

  const citizenFieldFour = e => {
    citizenId.citizenFieldFour = e.target.value;
    setFormDataLocal({
      ...formDataLocal,
      citizenId: citizenId
    });
  };

  const citizenFieldFive = e => {
    citizenId.citizenFieldFive = e.target.value;
    setFormDataLocal({
      ...formDataLocal,
      citizenId: citizenId
    });
  };

  const validate = () => {
    let errors = false;
    const {
      title,
      fname,
      lname,
      birthday,
      citizenId,
      phone,
      passport,
      salary
    } = formDataLocal;
    if (title === "") {
      errors = true;
      setAlert("Title is required", "danger");
    }
    if (fname === "") {
      errors = true;
      setAlert("First name is required", "danger");
    }
    if (fname !== "") {
      if (Number(fname) || fname.length < 3) {
        errors = true;
        setAlert("First name must be a letter and at least 3 words", "danger");
      }
    }
    if (lname === "") {
      errors = true;
      setAlert("Last name is required", "danger");
    }
    if (lname !== "") {
      if (Number(lname) || lname.length < 3) {
        errors = true;
        setAlert("Last name must be a letter and at least 3 words", "danger");
      }
    }
    if (birthday === "") {
      errors = true;
      setAlert("Birthday is required", "danger");
    }
    if (phone.phonenumber === "") {
      errors = true;
      setAlert("Phone number is required", "danger");
    }
    if (salary === "") {
      errors = true;
      setAlert("Salary is required", "danger");
    }
    if (
      citizenId.citizenFieldOne.length +
        citizenId.citizenFieldTwo.length +
        citizenId.citizenFieldThree.length +
        citizenId.citizenFieldFour.length +
        citizenId.citizenFieldFive.length >
        0 &&
      citizenId.citizenFieldOne.length +
        citizenId.citizenFieldTwo.length +
        citizenId.citizenFieldThree.length +
        citizenId.citizenFieldFour.length +
        citizenId.citizenFieldFive.length <
        13
    ) {
      errors = true;
      setAlert("CitizenID must be 13 digits", "danger");
    } else if (
      citizenId.citizenFieldOne.length +
        citizenId.citizenFieldTwo.length +
        citizenId.citizenFieldThree.length +
        citizenId.citizenFieldFour.length +
        citizenId.citizenFieldFive.length ===
      13
    ) {
      if (
        !Number(citizenId.citizenFieldOne) ||
        !Number(citizenId.citizenFieldTwo) ||
        !Number(citizenId.citizenFieldThree) ||
        !Number(citizenId.citizenFieldFour) ||
        !Number(citizenId.citizenFieldFive)
      ) {
        errors = true;
        setAlert("CitizenID must be a number", "danger");
      }
    }
    if (phone.phonenumber !== "") {
      let re = /^[+][0-9]{1,4}[-]?[0-9]{3}[-]?[0-9]{4,6}$/;
      const phoneFull = phone.countrycode + phone.phonenumber;
      let localError = re.test(phoneFull);
      if (!localError) {
        errors = true;
        setAlert("Incorrect phone number format", "danger");
      }
    }
    if (salary !== "" && !Number(salary)) {
      errors = true;
      setAlert("Salary must be a number", "danger");
    }
    if (passport !== "" && !Number(passport)) {
      errors = true;
      setAlert("Passport must be a number", "danger");
    }
    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const res = validate();
    if (!res) {
      if (formReducer.edit !== null) {
        updateData(formDataLocal);
        clearCurrent();
        setAlert("Record updated", "success");
      } else {
        addData(formDataLocal);
        setAlert("Record added", "success");
      }
      clearForm();
    } else {
      setFormDataLocal(formDataLocal);
    }
  };

  const clearForm = () => {
    clearCurrent();
    setFormDataLocal({
      title: "",
      fname: "",
      lname: "",
      birthday: "",
      nationality: "",
      citizenId: {
        citizenFieldOne: "",
        citizenFieldTwo: "",
        citizenFieldThree: "",
        citizenFieldFour: "",
        citizenFieldFive: ""
      },
      gender: "",
      phone: {
        countrycode: "+66",
        phonenumber: ""
      },
      passport: "",
      salary: ""
    });
  };

  return (
    <form className="card border-secondary p-4 my-3" onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group mr-3">
          <label htmlFor="title">Title:</label>
          <select
            id="title"
            className="mx-1"
            value={title}
            name="title"
            onChange={e => onChange(e)}
          >
            <option value="">-- Please select --</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
          </select>
        </div>
        <div className="form-group mr-3">
          <label htmlFor="first-name">First name:</label>
          <input
            type="text"
            className="mx-1"
            value={fname}
            name="fname"
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group mr-3">
          <label htmlFor="last-name">Last name:</label>
          <input
            type="text"
            className="mx-1"
            value={lname}
            name="lname"
            onChange={e => onChange(e)}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group mr-3">
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            name="birthday"
            className="mx-1"
            value={birthday}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nationality">Nationality:</label>
          <select
            id="nationality"
            className="mx-1"
            value={nationality}
            name="nationality"
            onChange={onChange}
          >
            <option value="">-- Please select --</option>
            {ccData !== null &&
              ccData.map(data => (
                <option key={data.code} value={data.name}>
                  {data.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="citizenId" className="mx-1">
            CitizenID:
          </label>
          <input
            type="text"
            maxLength="1"
            className="m-1"
            style={{ width: "50px" }}
            value={citizenId.citizenFieldOne}
            onChange={citizenFieldOne}
          />
          -
          <input
            type="text"
            maxLength="4"
            className="m-1"
            style={{ width: "100px" }}
            value={citizenId.citizenFieldTwo}
            onChange={citizenFieldTwo}
          />
          -
          <input
            type="text"
            maxLength="3"
            className="m-1"
            style={{ width: "100px" }}
            value={citizenId.citizenFieldThree}
            onChange={citizenFieldThree}
          />
          -
          <input
            type="text"
            maxLength="4"
            className="m-1"
            style={{ width: "100px" }}
            value={citizenId.citizenFieldFour}
            onChange={citizenFieldFour}
          />
          -
          <input
            type="text"
            maxLength="1"
            className="m-1"
            style={{ width: "50px" }}
            value={citizenId.citizenFieldFive}
            onChange={citizenFieldFive}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input
            type="radio"
            name="gender"
            value="male"
            className="mx-3"
            checked={gender === "male"}
            onChange={onChange}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            className="mx-3"
            checked={gender === "female"}
            onChange={onChange}
          />{" "}
          Female
          <input
            type="radio"
            name="gender"
            value="unisex"
            className="mx-3"
            checked={gender === "unisex"}
            onChange={onChange}
          />{" "}
          Unisex
        </div>
      </div>
      <div className="row">
        <div className="form-group d-flex justify-content-start">
          <label htmlFor="phone" className="w-50 text-left">
            Mobile Phone:
          </label>
          <div style={{margin: '5px'}}>
            <PhoneInput 
                  value={phone.countrycode} 
                  onChange = {phoneCountryOnChange} 
                  disableAreaCodes={true}
                  enableSearchField={true}
                  defaultCountry={'th'}
                  inputStyle={{width: '105px'}}
            />
            </div>
          </div>
          <div className="form-group d-flex align-items-center">
            {"-"}
            <input
              type="text"
              className="w-100 ml-1 form-control"
              name="phoneNumber"
              value={phone.phonenumber}
              onChange={phoneNumOnChange}
              style={{ width: "200px", height: "30px", fontSize: "0.8rem" }}
            />
          </div>
        </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="passport">Passport No:</label>
          <input
            type="text"
            id="passport"
            className="mx-1"
            value={passport}
            name="passport"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="row d-flex justify-content-between">
        <div className="form-group">
          <label htmlFor="salary">Expected Salary:</label>
          <input
            type="text"
            className="mx-1"
            value={salary}
            name="salary"
            onChange={onChange}
          />{" "}
          THB
        </div>
        <div className="form-group">
          <button className="btn btn-lg btn-secondary">
            {formReducer.edit !== null ? "Edit" : "Submit"}
          </button>
        </div>
      </div>
      {formReducer.edit !== null && (
        <div className="row">
          <div className="form-group">
            <button className="btn btn-lg btn-warning" onClick={clearForm}>
              Clear
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

const mapStateToProps = ({ formReducer }) => ({
  formReducer
});

const mapDispatchToProps = {
  addData,
  updateData,
  clearCurrent,
  setAlert
};

Form.proptyps = {
  formReducer: PropTypes.object.isRequired,
  addData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
