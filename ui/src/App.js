import React, { Component } from "react";
import Axios from "axios";
import { saveAs } from "file-saver";

class App extends Component {
  state = {
    name: "",
    recieptId: "",
    price1: "",
    price2: ""
  };

  onChange = ({ target: { value, name } }) => this.setState({ [name]: value });
  onSubmit = () => {
    Axios.post("/create-pdf", this.state);
  };
  render() {
    const { name, recieptId, price1, price2 } = this.state;

    return (
      <div className="App">
        <div className="card shadow-sm p-1 mb-5 bg-white rounded">
          <div className="card-body">
            <h5 className="card-title"></h5>

            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="nameField">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="nameField"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="recieptField">Reciept id</label>
                <input
                  type="number"
                  className="form-control"
                  id="recieptField"
                  name="recieptId"
                  value={recieptId}
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price1Field">Price 1</label>
                <input
                  type="number"
                  className="form-control"
                  id="price1Field"
                  name="price1"
                  value={price1}
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price2Field">Price 2</label>
                <input
                  type="number"
                  className="form-control"
                  id="price2Field"
                  name="price2"
                  value={price2}
                  onChange={this.onChange}
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
