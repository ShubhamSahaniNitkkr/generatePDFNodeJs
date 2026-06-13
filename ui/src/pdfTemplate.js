const pdfTemplate = ({ name, recieptId, price1, price2 }) => {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const p1 = parseFloat(price1) || 0;
  const p2 = parseFloat(price2) || 0;
  const total = (p1 + p2).toFixed(2);
  const fmt = n => `$${Number(n).toFixed(2)}`;
  const invoiceId = recieptId || "000123";

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Generated PDF Invoice</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font: 14px/1.4 Georgia, serif; }
        #page-wrap { width: 800px; margin: 0 auto; }
        textarea { border: 0; font: 14px Georgia, Serif; overflow: hidden; resize: none; }
        table { border-collapse: collapse; width: 100%; }
        table td, table th { border: 1px solid black; padding: 5px; }
        #header {
          height: 15px; width: 100%; margin: 20px 0; background: #222;
          text-align: center; color: white; font: bold 15px Helvetica, Sans-Serif;
          text-transform: uppercase; letter-spacing: 20px; padding: 8px 0;
        }
        #address { width: 250px; height: 150px; float: left; }
        #customer { overflow: hidden; }
        #customer-title { font-size: 20px; font-weight: bold; float: left; }
        #meta { margin-top: 1px; width: 300px; float: right; }
        #meta td { text-align: right; }
        #meta td.meta-head { text-align: left; background: #eee; }
        #items { clear: both; width: 100%; margin: 30px 0 0; border: 1px solid black; }
        #items th { background: #eee; }
        #items tr.item-row td { border: 0; vertical-align: top; }
        #items td.description { width: 300px; }
        #items td.item-name { width: 175px; }
        #items td.total-line { border-right: 0; text-align: right; }
        #items td.total-value { border-left: 0; padding: 10px; }
        #items td.balance { background: #eee; }
        #items td.blank { border: 0; }
        #terms { text-align: center; margin: 20px 0 0; }
        #terms h5 {
          text-transform: uppercase; font: 13px Helvetica, Sans-Serif;
          letter-spacing: 10px; border-bottom: 1px solid black;
          padding: 0 0 8px; margin: 0 0 8px;
        }
      </style>
    </head>
    <body>
      <div id="page-wrap">
        <textarea id="header">INVOICE</textarea>
        <div id="identity">
          <textarea id="address">${name}
123 Appleseed Street
Appleville, WI 53719
Phone: (555) 555-5555</textarea>
        </div>
        <div style="clear:both"></div>
        <div id="customer">
          <textarea id="customer-title">Widget Corp.
c/o Steve Widget</textarea>
          <table id="meta">
            <tr><td class="meta-head">Invoice #</td><td><textarea>${invoiceId}</textarea></td></tr>
            <tr><td class="meta-head">Date</td><td><textarea>${dateStr}</textarea></td></tr>
            <tr><td class="meta-head">Amount Due</td><td><div class="due">${fmt(total)}</div></td></tr>
          </table>
        </div>
        <table id="items">
          <tr><th>Item</th><th>Description</th><th>Unit Cost</th><th>Quantity</th><th>Price</th></tr>
          <tr class="item-row">
            <td class="item-name"><textarea>Web Updates</textarea></td>
            <td class="description"><textarea>Monthly web updates</textarea></td>
            <td><textarea class="cost">${fmt(p1)}</textarea></td>
            <td><textarea class="qty">1</textarea></td>
            <td><span class="price">${fmt(p1)}</span></td>
          </tr>
          <tr class="item-row">
            <td class="item-name"><textarea>SSL Renewals</textarea></td>
            <td class="description"><textarea>Yearly SSL certificate renewals</textarea></td>
            <td><textarea class="cost">${fmt(p2)}</textarea></td>
            <td><textarea class="qty">1</textarea></td>
            <td><span class="price">${fmt(p2)}</span></td>
          </tr>
          <tr>
            <td colspan="2" class="blank"></td>
            <td colspan="2" class="total-line">Subtotal</td>
            <td class="total-value"><div>${fmt(total)}</div></td>
          </tr>
          <tr>
            <td colspan="2" class="blank"></td>
            <td colspan="2" class="total-line">Total</td>
            <td class="total-value"><div>${fmt(total)}</div></td>
          </tr>
          <tr>
            <td colspan="2" class="blank"></td>
            <td colspan="2" class="total-line">Amount Paid</td>
            <td class="total-value"><textarea>$0.00</textarea></td>
          </tr>
          <tr>
            <td colspan="2" class="blank"></td>
            <td colspan="2" class="total-line balance">Balance Due</td>
            <td class="total-value balance"><div class="due">${fmt(total)}</div></td>
          </tr>
        </table>
        <div id="terms">
          <h5>Terms</h5>
          <textarea>NET 30 Days. Finance Charge of 1.5% will be made on unpaid balances after 30 days.</textarea>
        </div>
      </div>
    </body>
  </html>`;
};

export default pdfTemplate;
