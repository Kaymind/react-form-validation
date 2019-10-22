import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Pagination = ({
  recordsPerpage,
  totalRecords,
  changedPage,
  currentPage,
  nextPage,
  prevPage
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerpage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="container">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <Link
            className="page-link text-dark border-0"
            to=""
            onClick={() => prevPage(currentPage)}
          >
            Previous
          </Link>
        </li>
        {pageNumbers.map(number => {
          return (
            <li
              key={number}
              className={
                (currentPage === number ? "active " : "") + "page-item"
              }
            >
              <Link
                to="/"
                className={`page-link border-0 ${
                  currentPage === number ? "text-white" : "text-dark"
                }`}
                onClick={() => {
                  changedPage(number);
                }}
              >
                {number}
              </Link>
            </li>
          );
        })}
        <li className="page-item">
          <Link
            className="page-link text-dark border-0"
            to=""
            onClick={() => nextPage(currentPage, pageNumbers.length)}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  recordsPerpage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  changedPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired
};

export default Pagination;
