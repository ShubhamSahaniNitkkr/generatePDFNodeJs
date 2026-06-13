import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top">
            <i className="fas fa-file-invoice" />
            <span>Bill Generator</span>
          </a>
          <span className="header-tag">Invoice PDF Tool</span>
        </div>
      </header>
    );
  }
}

export default Navbar;
