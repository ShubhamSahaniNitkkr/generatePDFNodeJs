module.exports = ({ name, recieptId, price1, price2 }) => {
  const today = new Date();
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  
      <title>Generated PDF Invoice</title>
      <style>
        * {
          margin: 0;
          padding: 0;
        }
        body {
          font: 14px/1.4 Georgia, serif;
        }
        #page-wrap {
          width: 800px;
          margin: 0 auto;
        }
  
        textarea {
          border: 0;
          font: 14px Georgia, Serif;
          overflow: hidden;
          resize: none;
        }
        table {
          border-collapse: collapse;
        }
        table td,
        table th {
          border: 1px solid black;
          padding: 5px;
        }
  
        #header {
          height: 15px;
          width: 100%;
          margin: 20px 0;
          background: #222;
          text-align: center;
          color: white;
          font: bold 15px Helvetica, Sans-Serif;
          text-decoration: uppercase;
          letter-spacing: 20px;
          padding: 8px 0px;
        }
  
        #address {
          width: 250px;
          height: 150px;
          float: left;
        }
        #customer {
          overflow: hidden;
        }
  
        #logo {
          text-align: right;
          float: right;
          position: relative;
          margin-top: 25px;
          border: 1px solid #fff;
          max-width: 540px;
          max-height: 100px;
          overflow: hidden;
        }
        #logo.edit {
          border: 1px solid #000;
          margin-top: 0px;
          max-height: 125px;
        }
        #logoctr {
          display: none;
        }
        #logo.edit #logoctr {
          display: block;
          text-align: right;
          line-height: 25px;
          background: #eee;
          padding: 0 5px;
        }
        #logohelp {
          text-align: left;
          display: none;
          font-style: italic;
          padding: 10px 5px;
        }
        #logohelp input {
          margin-bottom: 5px;
        }
        .edit #logohelp {
          display: block;
        }
        .edit #save-logo,
        .edit #cancel-logo {
          display: inline;
        }
        .edit #image,
        #save-logo,
        #cancel-logo,
        .edit #change-logo,
        .edit #delete-logo {
          display: none;
        }
        #customer-title {
          font-size: 20px;
          font-weight: bold;
          float: left;
        }
  
        #meta {
          margin-top: 1px;
          width: 300px;
          float: right;
        }
        #meta td {
          text-align: right;
        }
        #meta td.meta-head {
          text-align: left;
          background: #eee;
        }
        #meta td textarea {
          width: 100%;
          height: 20px;
          text-align: right;
        }
  
        #items {
          clear: both;
          width: 100%;
          margin: 30px 0 0 0;
          border: 1px solid black;
        }
        #items th {
          background: #eee;
        }
        #items textarea {
          width: 80px;
          height: 50px;
        }
        #items tr.item-row td {
          border: 0;
          vertical-align: top;
        }
        #items td.description {
          width: 300px;
        }
        #items td.item-name {
          width: 175px;
        }
        #items td.description textarea,
        #items td.item-name textarea {
          width: 100%;
        }
        #items td.total-line {
          border-right: 0;
          text-align: right;
        }
        #items td.total-value {
          border-left: 0;
          padding: 10px;
        }
        #items td.total-value textarea {
          height: 20px;
          background: none;
        }
        #items td.balance {
          background: #eee;
        }
        #items td.blank {
          border: 0;
        }
  
        #terms {
          text-align: center;
          margin: 20px 0 0 0;
        }
        #terms h5 {
          text-transform: uppercase;
          font: 13px Helvetica, Sans-Serif;
          letter-spacing: 10px;
          border-bottom: 1px solid black;
          padding: 0 0 8px 0;
          margin: 0 0 8px 0;
        }
        #terms textarea {
          width: 100%;
          text-align: center;
        }
  
        .delete-wpr {
          position: relative;
        }
        .delete {
          display: block;
          color: #000;
          text-decoration: none;
          position: absolute;
          background: #eeeeee;
          font-weight: bold;
          padding: 0px 3px;
          border: 1px solid;
          top: -6px;
          left: -22px;
          font-family: Verdana;
          font-size: 12px;
        }
      </style>
    </head>
  
    <body>
      <div id="page-wrap">
        <textarea id="header">INVOICE</textarea>
  
        <div id="identity">
          <a href="#">
            <textarea id="address">
                     ${name}
          123 Appleseed Street
          Appleville, WI 53719
          Phone: (555) 555-5555
    </textarea
            >
          </a>
          <div id="logo">
            <div id="logoctr">
              <a href="javascript:;" id="change-logo" title="Change logo"
                >Change Logo</a
              >
              <a href="javascript:;" id="save-logo" title="Save changes">Save</a>
              |
              <a href="javascript:;" id="delete-logo" title="Delete logo"
                >Delete Logo</a
              >
              <a href="javascript:;" id="cancel-logo" title="Cancel changes"
                >Cancel</a
              >
            </div>
  
            <div id="logohelp">
              <input id="imageloc" type="text" size="50" value="" /><br />
              (max width: 540px, max height: 100px)
            </div>
            <img id="image" src="images/logo.png" alt="logo" />
          </div>
        </div>
  
        <div style="clear:both"></div>
  
        <div id="customer">
          <textarea id="customer-title">
  Widget Corp.
    c/o Steve Widget</textarea
          >
  
          <table id="meta">
            <tr>
              <td class="meta-head">Invoice #</td>
              <td><textarea>000123</textarea></td>
            </tr>
            <tr>
              <td class="meta-head">Date</td>
              <td>
                <textarea id="date">
  ${(today.getDate(), today.getDay(), today.getFullYear())}</textarea
                >
              </td>
            </tr>
            <tr>
              <td class="meta-head">Amount Due</td>
              <td><div class="due">$875.00</div></td>
            </tr>
          </table>
        </div>
  
        <table id="items">
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>Unit Cost</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
  
          <tr class="item-row">
            <td class="item-name">
              <div class="delete-wpr">
                <textarea>Web Updates</textarea>
              </div>
            </td>
            <td class="description">
              <textarea>
  Monthly web updates for http://widgetcorp.com (Nov. 1 - Nov. 30, 2009)</textarea
              >
            </td>
            <td><textarea class="cost">$650.00</textarea></td>
            <td><textarea class="qty">1</textarea></td>
            <td><span class="price">$650.00</span></td>
          </tr>
  
          <tr class="item-row">
            <td class="item-name">
              <div class="delete-wpr">
                <textarea>SSL Renewals</textarea>
              </div>
            </td>
  
            <td class="description">
              <textarea>
  Yearly renewals of SSL certificates on main domain and several subdomains</textarea
              >
            </td>
            <td><textarea class="cost">$75.00</textarea></td>
            <td><textarea class="qty">3</textarea></td>
            <td><span class="price">$225.00</span></td>
          </tr>
  
          <tr id="hiderow">
            <td colspan="5">
              <a id="addrow" href="javascript:;" title="Add a row">Add a row</a>
            </td>
          </tr>
  
          <tr>
            <td colspan="2" class="blank"></td>
            <td colspan="2" class="total-line">Subtotal</td>
            <td class="total-value"><div id="subtotal">$875.00</div></td>
          </tr>
          <tr>
            <td colspan="2" class="blank"></td>
            <td colspan="2" class="total-line">Total</td>
            <td class="total-value"><div id="total">$875.00</div></td>
          </tr>
          <tr>
            <td colspan="2" class="blank"></td>
            <td colspan="2" class="total-line">Amount Paid</td>
  
            <td class="total-value"><textarea id="paid">$0.00</textarea></td>
          </tr>
          <tr>
            <td colspan="2" class="blank"></td>
            <td colspan="2" class="total-line balance">Balance Due</td>
            <td class="total-value balance"><div class="due">$875.00</div></td>
          </tr>
        </table>
  
        <div id="terms">
          <h5>Terms</h5>
          <textarea>
              NET 30 Days. Finance Charge of 1.5% will be made on unpaid balances after 30 days.</textarea
          >
        </div>
      </div>
    </body>
  </html>
  `;
};
