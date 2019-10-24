import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { setAlert } from "../actions/alert.action";
import { connect } from "react-redux";
import {
  loadData,
  editData,
  deleteData,
  deleteAll,
  deleteSome,
  clearCurrent
} from "../actions/form.action";
import PropTypes from "prop-types";
import Pagination from "./Pagination";

import Swal from "sweetalert2";

const Results = ({
  formReducer,
  loadData,
  editData,
  deleteData,
  deleteAll,
  deleteSome,
  setAlert,
  clearCurrent
}) => {
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  // Set default checkbox
  useEffect(() => {
    formReducer.formData.forEach(item => {
      checkboxList.push({ id: item.id, isChecked: false });
    });
    setCheckboxItem(checkboxList);
    // eslint-disable-next-line
  }, [formReducer.formData]);

  const checkboxList = [];

  const [selectAll, setSelectAll] = useState(false);
  const [checkboxItem, setCheckboxItem] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  // Get current records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = formReducer.formData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const changedPage = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const prevPage = pageNumber => {
    if (pageNumber - 1 > 0) {
      setCurrentPage(pageNumber - 1);
    }
  };

  const nextPage = (pageNumber, numOfPages) => {
    if (pageNumber + 1 <= numOfPages) {
      setCurrentPage(pageNumber + 1);
    }
  };

  const handleSelectAll = () => {
    let checkboxes = [...checkboxItem];
    setSelectAll(!selectAll);
    if (selectAll === true) {
      checkboxes.forEach(item => (item.isChecked = false));
      setCheckboxItem(checkboxes);
    } else {
      checkboxes.forEach(item => (item.isChecked = true));
      setCheckboxItem(checkboxes);
    }
  };

  const handleDeleteAll = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        setSelectAll(false);
        let deletedData = [];
        if (selectAll === true) {
          deleteAll();
          setAlert("Records deleted", "success");
        } else {
          deletedData = checkboxItem.filter(item =>
            item.isChecked === true ? item : ""
          );
          deleteSome(deletedData);
          setAlert(`${deletedData.length > 1 ? 'Records' : 'Record'} deleted`, "success");
        }
      }
    });
  };

  const handleDeleteByItem = (data) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        setAlert("Record deleted", "success")
        deleteData(data.id);
        clearCurrent();
      }
    });
  };
  // value={selectAll === false ? false : true}
  return (
    <Fragment>
      <div className="form-group d-flex justify-content-between">
        <div>
          <input
            type="checkbox"
            id="selectAll"
            name="selectAll"
            className="mx-1"
            checked={selectAll === false ? false : true}
            disabled={formReducer.formData.length > 0 ? false : true}
            onClick={handleSelectAll}
          />
          <label htmlFor="selectAll">Select All</label>
          <button
            className="mx-2 btn btn-danger"
            onClick={() => {
              handleDeleteAll();
              setCurrentPage(1);
            }}
            disabled={
              !checkboxItem
                .map(item => (item.isChecked === true ? true : false))
                .some(item => item === true)
            }
          >
            Delete
          </button>
        </div>
        <div>
          <Pagination
            recordsPerpage={recordsPerPage}
            totalRecords={formReducer.formData.length}
            changedPage={changedPage}
            currentPage={currentPage}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </div>
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col"></th>
            <th scope="col">NAME</th>
            <th scope="col">GENDER</th>
            <th scope="col">MOBILE PHONE</th>
            <th scope="col">NATIONALITY</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map(data => (
            <tr key={data.id}>
              <th scope="row">
                <input
                  type="checkbox"
                  checked={
                    selectAll === true
                      ? true
                      : checkboxItem.find(
                          item => item.id === data.id && item.isChecked
                        )
                  }
                  onChange={() => {
                    setSelectAll(false);
                    const checkboxes = [...checkboxItem];
                    checkboxes.forEach(item =>
                      item.id === data.id
                        ? (item.isChecked = !item.isChecked)
                        : item
                    );
                    setCheckboxItem(checkboxes);
                  }}
                />
              </th>
              <td>{`${data.fname.charAt(0).toUpperCase() +
                data.fname.slice(1).toLowerCase()} ${data.lname
                .charAt(0)
                .toUpperCase() + data.lname.slice(1).toLowerCase()}`}</td>
              <td>{`${
                data.gender === "" ? "-" : data.gender.toUpperCase()
              }`}</td>
              <td>{`${data.phone.countrycode} ${data.phone.phonenumber}`}</td>
              <td>{`${
                data.nationality === "" ? "-" : data.nationality.toUpperCase()
              }`}</td>
              <td>
                <Link to="!#" onClick={() => editData(data)}>
                  Edit
                </Link>{" "}
                /{" "}
                <Link
                  to="!#"
                  onClick={() => handleDeleteByItem(data)}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

const mapStateToProps = ({ formReducer }) => {
  return {
    formReducer
  };
};

const mapDispatchToProps = {
  loadData,
  editData,
  deleteData,
  deleteAll,
  deleteSome,
  setAlert,
  clearCurrent
};

Results.proptyps = {
  formReducer: PropTypes.object.isRequired,
  loadData: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired,
  deleteData: PropTypes.object.isRequired,
  deleteAll: PropTypes.func.isRequire,
  clearCurrent: PropTypes.func.isRequired,
  deleteSome: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
