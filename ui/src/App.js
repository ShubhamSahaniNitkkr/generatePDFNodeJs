import React, { Component, Fragment } from "react";
import Navbar from "./components/Navbar";
import Form from "./components/Form";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Fragment>
          <Navbar />
          <Form />
        </Fragment>
      </div>
    );
  }
}

export default App;
