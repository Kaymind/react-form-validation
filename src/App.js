import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Form from "./components/Form";
import Results from "./components/Results";
import Alert from "./components/Alert";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App container p-4">
          <Alert />
          <Form />
          <Results />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
