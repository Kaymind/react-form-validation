import uuid from "uuid";
import {
  ADD,
  DELETE,
  DELETE_ALL,
  UPDATE,
  EDIT,
  LOAD_DATA,
  CLEAR_CURRENT
} from "./types";

export const addData = data => {
  return dispatch => {
    const id = uuid.v4();
    data.id = id;
    dispatch({ type: ADD, payload: data });
  };
};

export const deleteData = id => {
  return dispatch => {
    dispatch({ type: DELETE, payload: id });
  };
};

export const updateData = data => {
  return dispatch => {
    dispatch({ type: UPDATE, payload: data });
  };
};

export const editData = data => {
  return dispatch => {
    dispatch({ type: EDIT, payload: data });
  };
};

export const clearCurrent = () => {
  return dispatch => {
    dispatch({ type: CLEAR_CURRENT });
  };
};

export const loadData = () => {
  return dispatch => {
    dispatch({ type: LOAD_DATA });
  };
};

export const deleteAll = () => {
  return dispatch => {
    dispatch({ type: DELETE_ALL });
  };
};
