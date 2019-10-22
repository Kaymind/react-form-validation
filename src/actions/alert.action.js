import uuid from "uuid";

export const setAlert = (msg, alertType) => {
  return dispatch => {
    const id = uuid.v4();
    dispatch({ type: "SET_ALERT", payload: { msg, alertType, id } });

    setTimeout(() => {
      dispatch({ type: "CLEAR_ALERT", payload: id });
    }, 5000);
  };
};
