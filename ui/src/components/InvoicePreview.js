import React, { Component } from "react";
import invoiceTemplate from "../invoiceTemplate";

class InvoicePreview extends Component {
  render() {
    const html = invoiceTemplate(this.props.data);

    return (
      <div className="preview-panel">
        <div className="preview-label">Live Preview</div>
        <div className="preview-frame-wrap">
          <iframe
            title="Invoice preview"
            className="preview-frame"
            srcDoc={html}
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    );
  }
}

export default InvoicePreview;
