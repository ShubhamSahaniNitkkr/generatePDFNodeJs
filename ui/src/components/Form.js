import React, { Component } from "react";
import InvoicePreview from "./InvoicePreview";
import { generateInvoicePdf } from "../utils/pdfDownload";
import { calcTotal } from "../invoiceTemplate";

const today = () => new Date().toISOString().slice(0, 10);

const defaultState = {
  logo: "",
  invoiceNumber: "0002457",
  invoiceDate: today(),
  billedCompany: "Blue AI LABS",
  billedName: "Asheesh Mangla",
  billedEmail: "asheesh@smartblue.ai",
  fromName: "Shubham Sunny",
  fromAddress: "New Manichak, Masaurhi, Patna",
  fromEmail: "Shubhamsahaninitkkr@gmail.com",
  itemName: "Software Development",
  quantity: "1",
  price: "414",
  totalHours: "69",
  hourlyRate: "6",
  paymentMethod: "Online",
  note: "Thank you for choosing us!",
  loading: false,
  error: ""
};

export class Form extends Component {
  state = { ...defaultState };

  onChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  onLogoChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      this.setState({ error: "Please upload an image file for the logo." });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => this.setState({ logo: reader.result, error: "" });
    reader.readAsDataURL(file);
  };

  removeLogo = () => this.setState({ logo: "" });

  getFormData = () => {
    const {
      logo,
      invoiceNumber,
      invoiceDate,
      billedCompany,
      billedName,
      billedEmail,
      fromName,
      fromAddress,
      fromEmail,
      itemName,
      quantity,
      price,
      totalHours,
      hourlyRate,
      paymentMethod,
      note
    } = this.state;

    return {
      logo,
      invoiceNumber,
      invoiceDate,
      billedCompany,
      billedName,
      billedEmail,
      fromName,
      fromAddress,
      fromEmail,
      itemName,
      quantity,
      price,
      totalHours,
      hourlyRate,
      paymentMethod,
      note
    };
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, error: "" });

    try {
      await generateInvoicePdf(this.getFormData());
    } catch (err) {
      console.error("PDF generation failed", err);
      this.setState({ error: "PDF generation failed. Please try again." });
    } finally {
      this.setState({ loading: false });
    }
  };

  renderField = (label, name, opts = {}) => (
    <div className="field" key={name}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={opts.type || "text"}
        className="field-input"
        value={this.state[name]}
        onChange={this.onChange}
        placeholder={opts.placeholder || ""}
        required={opts.required}
        disabled={this.state.loading}
        min={opts.min}
        step={opts.step}
      />
    </div>
  );

  render() {
    const { logo, loading, error, quantity, price } = this.state;
    const total = calcTotal(quantity, price);

    return (
      <div className="bill-app">
        <div className="bill-layout">
          <section className="form-panel">
            <div className="panel-header">
              <h1>Bill Generator</h1>
              <p>Fill in the details and download a professional invoice PDF.</p>
            </div>

            {error && <div className="alert-error">{error}</div>}

            <form onSubmit={this.onSubmit} className="bill-form">
              <fieldset className="form-section">
                <legend>Logo &amp; Invoice Info</legend>
                <div className="logo-upload">
                  <div className="logo-preview">
                    {logo ? (
                      <img src={logo} alt="Your logo" />
                    ) : (
                      <span className="logo-placeholder">
                        <i className="fas fa-image" /> No logo
                      </span>
                    )}
                  </div>
                  <div className="logo-actions">
                    <label className="btn btn-secondary">
                      <i className="fas fa-upload" /> Upload Logo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={this.onLogoChange}
                        hidden
                        disabled={loading}
                      />
                    </label>
                    {logo && (
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={this.removeLogo}
                        disabled={loading}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                <div className="field-row">
                  {this.renderField("Invoice No.", "invoiceNumber", {
                    required: true,
                    placeholder: "0002457"
                  })}
                  {this.renderField("Date", "invoiceDate", {
                    type: "date",
                    required: true
                  })}
                </div>
              </fieldset>

              <fieldset className="form-section">
                <legend>Billed To</legend>
                <div className="field-row">
                  {this.renderField("Company", "billedCompany", {
                    placeholder: "Blue AI LABS"
                  })}
                  {this.renderField("Contact Name", "billedName", {
                    placeholder: "Asheesh Mangla"
                  })}
                </div>
                {this.renderField("Email", "billedEmail", {
                  type: "email",
                  placeholder: "client@company.com"
                })}
              </fieldset>

              <fieldset className="form-section">
                <legend>From</legend>
                <div className="field-row">
                  {this.renderField("Your Name", "fromName", {
                    required: true,
                    placeholder: "Shubham Sunny"
                  })}
                  {this.renderField("Email", "fromEmail", {
                    type: "email",
                    placeholder: "you@email.com"
                  })}
                </div>
                {this.renderField("Address", "fromAddress", {
                  placeholder: "City, State"
                })}
              </fieldset>

              <fieldset className="form-section">
                <legend>Item Details</legend>
                {this.renderField("Service / Item", "itemName", {
                  required: true,
                  placeholder: "Software Development"
                })}
                <div className="field-row field-row-3">
                  {this.renderField("Quantity", "quantity", {
                    type: "number",
                    min: "0",
                    step: "1",
                    required: true
                  })}
                  {this.renderField("Price", "price", {
                    type: "number",
                    min: "0",
                    step: "1",
                    required: true
                  })}
                  <div className="field">
                    <label>Total</label>
                    <div className="total-display">${total}</div>
                  </div>
                </div>
                <div className="field-row">
                  {this.renderField("Total Hours", "totalHours", {
                    type: "number",
                    min: "0",
                    placeholder: "69"
                  })}
                  {this.renderField("Hourly Rate ($)", "hourlyRate", {
                    type: "number",
                    min: "0",
                    step: "0.01",
                    placeholder: "6"
                  })}
                </div>
              </fieldset>

              <fieldset className="form-section">
                <legend>Footer</legend>
                <div className="field-row">
                  {this.renderField("Payment Method", "paymentMethod", {
                    placeholder: "Online"
                  })}
                  {this.renderField("Note", "note", {
                    placeholder: "Thank you for choosing us!"
                  })}
                </div>
              </fieldset>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                <i className="fas fa-file-pdf" />
                {loading ? "Generating PDF..." : "Download Invoice PDF"}
              </button>
            </form>
          </section>

          <InvoicePreview data={this.getFormData()} />
        </div>
      </div>
    );
  }
}

export default Form;
