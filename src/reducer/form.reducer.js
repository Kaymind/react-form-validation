const initialState = {
  formData: [],
  edit: null
};

const formReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOAD_DATA":
      let data = JSON.parse(localStorage.getItem("formData"));
      if (data === null) data = [];
      return {
        ...state,
        formData: [...state.formData, ...data]
      };
    case "ADD":
      let arrData = [];
      if (localStorage.getItem("formData")) {
        arrData = JSON.parse(localStorage.getItem("formData"));
      }

      arrData.push(payload);
      localStorage.setItem("formData", JSON.stringify(arrData));
      return {
        ...state,
        formData: [payload, ...state.formData]
      };
    case "UPDATE":
      let updateData = JSON.parse(localStorage.getItem("formData")).map(data =>
        data.id === payload.id ? payload : data
      );
      localStorage.setItem("formData", JSON.stringify(updateData));
      return {
        ...state,
        formData: updateData
      };
    case "EDIT":
      let editData = JSON.parse(localStorage.getItem("formData")).filter(
        data => data.id === payload
      )[0];
      return {
        ...state,
        edit: editData
      };
    case "CLEAR_CURRENT":
      return {
        ...state,
        edit: null
      };
    case "DELETE":
      let deletedData = JSON.parse(localStorage.getItem("formData")).filter(
        data => data.id !== payload
      );
      localStorage.setItem("formData", JSON.stringify(deletedData));
      return {
        ...state,
        formData: [...deletedData],
        edit: null
      };
    case "DELETE_ALL":
      localStorage.removeItem("formData");
      return {
        formData: [],
        edit: null
      };
    default:
      return state;
  }
};

export default formReducer;
