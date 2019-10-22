import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addData, clearCurrent, updateData } from "../actions/form.action";
import { setAlert } from "../actions/alert.action";
import PropTypes from "prop-types";

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
          countrycode: "",
          phonenumber: ""
        },
        passport: "",
        salary: ""
      });
    }
  }, [formReducer.edit]);

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
      countrycode: "",
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

  const phoneCountryOnChange = e => {
    const phoneCountryCode = { ...phone };
    phoneCountryCode.countrycode = e.target.value;
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
    const citizenFieldOne = { ...citizenId };
    citizenId.citizenFieldOne = e.target.value;
    setFormDataLocal({
      ...formDataLocal,
      citizenId: citizenId
    });
  };

  const citizenFieldTwo = e => {
    const citizenFieldTwo = { ...citizenId };
    citizenId.citizenFieldTwo = e.target.value;
    setFormDataLocal({
      ...formDataLocal,
      citizenId: citizenId
    });
  };

  const citizenFieldThree = e => {
    const citizenFieldThree = { ...citizenId };
    citizenId.citizenFieldThree = e.target.value;
    setFormDataLocal({
      ...formDataLocal,
      citizenId: citizenId
    });
  };

  const citizenFieldFour = e => {
    const citizenFieldFour = { ...citizenId };
    citizenId.citizenFieldFour = e.target.value;
    setFormDataLocal({
      ...formDataLocal,
      citizenId: citizenId
    });
  };

  const citizenFieldFive = e => {
    const citizenFieldFive = { ...citizenId };
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
      nationality,
      citizenId,
      gender,
      phone,
      passport,
      salary
    } = formDataLocal;
    if (title === "") {
      errors = true;
      setAlert("title is required", "danger");
    }
    if (fname === "") {
      errors = true;
      setAlert("first name is required", "danger");
    }
    if (lname === "") {
      errors = true;
      setAlert("last name is required", "danger");
    }
    if (birthday === "") {
      errors = true;
      setAlert("birthday is required", "danger");
    }
    if (phone.phonenumber === "") {
      errors = true;
      setAlert("phone number is required", "danger");
    }
    if (salary === "") {
      errors = true;
      setAlert("salary is required", "danger");
    }
    if (phone.phonenumber !== "") {
      errors = phone.phonenumber.match(/([0-9]{3})([ -]?)([0-9]{4})/);
      if (errors) {
        setAlert("phone number format is xxx-xxxx ", "danger");
      }
    }
    if (!Number(salary)) {
      errors = true;
      setAlert("salary must be a number", "danger");
    }
    if (!Number(passport)) {
      errors = true;
      setAlert("passport must be a number", "danger");
    }
    // if (!Number(phone.phonenumber)) {
    //   errors = true;
    //   setAlert("phone must be a number", "danger");
    // }
    if (
      !Number(citizenId.citizenFieldOne) ||
      !Number(citizenId.citizenFieldTwo) ||
      !Number(citizenId.citizenFieldThree) ||
      !Number(citizenId.citizenFieldFour) ||
      !Number(citizenId.citizenFieldFive)
    ) {
      errors = true;
      setAlert("citicenId must be a number", "danger");
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
      } else {
        addData(formDataLocal);
      }
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
          countrycode: "",
          phonenumber: ""
        },
        passport: "",
        salary: ""
      });
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
        countrycode: "",
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
            required
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
            required
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
            required
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
            required
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
            <option value="0">-- Please select --</option>
            <option value="Thai">Thai</option>
            <option value="American">American</option>
            <option value="Laos">Laos</option>
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
          <select
            id="phonePrefix"
            className="mx-1 w-25"
            value={phone.countrycode}
            name="phone"
            onChange={phoneCountryOnChange}
          >
            <option value="+66" checked>
              +66
            </option>
            <option value="+856">+856</option>
            <option value="+1">+1</option>
          </select>{" "}
          -
          <input
            type="text"
            className="w-75 ml-1"
            name="phoneNumber"
            value={phone.phonenumber}
            onChange={phoneNumOnChange}
            required
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
