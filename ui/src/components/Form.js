import React, { Component } from "react";
import Axios from "axios";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import pdfTemplate from "../pdfTemplate";

async function downloadClientPdf(formData) {
  const html = pdfTemplate(formData);
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-9999px";
  iframe.style.width = "800px";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();

  await new Promise(resolve => setTimeout(resolve, 300));

  const canvas = await html2canvas(doc.body, {
    scale: 2,
    useCORS: true,
    logging: false
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = (canvas.height * pageWidth) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
  pdf.save("newPDFInvoice.pdf");

  document.body.removeChild(iframe);
}

async function downloadServerPdf(formData) {
  await Axios.post("/create-pdf", formData);
  const res = await Axios.get("/fetch-pdf", { responseType: "blob" });

  const header = await res.data.slice(0, 4).text();
  if (header !== "%PDF") {
    throw new Error("Server returned invalid PDF data");
  }

  const pdfBlob = new Blob([res.data], { type: "application/pdf" });
  saveAs(pdfBlob, "newPDFInvoice.pdf");
}

async function hasPdfServer() {
  try {
    const res = await Axios.get("/api/status", { timeout: 3000 });
    return res.data && res.data.pdfEngine === true;
  } catch {
    return false;
  }
}

export class Form extends Component {
  state = {
    name: "",
    recieptId: "",
    price1: "",
    price2: "",
    loading: false,
    error: ""
  };

  onChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, error: "" });

    const formData = {
      name: this.state.name,
      recieptId: this.state.recieptId,
      price1: this.state.price1,
      price2: this.state.price2
    };

    try {
      if (await hasPdfServer()) {
        await downloadServerPdf(formData);
      } else {
        await downloadClientPdf(formData);
      }
    } catch (err) {
      console.error("PDF generation failed", err);
      this.setState({
        error: "PDF generation failed. Please try again."
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { name, recieptId, price1, price2, loading, error } = this.state;

    return (
      <div className="container-fluid mt-5 pdf-form-container">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-sm p-1 mb-5 bg-white rounded">
            <div className="card-body">
              <h5 className="card-title text-danger">
                Dynamic PDF using NodeJS
              </h5>

              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={this.onSubmit}>
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-success"
                  disabled={loading}
                >
                  <i className="fas fa-file-pdf"></i>
                  &nbsp; {loading ? "Generating..." : "Generate PDF"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
