export function formatInvoiceDate(dateStr) {
  const d = dateStr ? new Date(`${dateStr}T12:00:00`) : new Date();
  if (Number.isNaN(d.getTime())) return formatInvoiceDate(null);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "long" });
  return `${day} ${month}, ${d.getFullYear()}`;
}

export function calcTotal(quantity, price) {
  const q = parseFloat(quantity) || 0;
  const p = parseFloat(price) || 0;
  return (q * p).toFixed(0);
}

export function buildInvoiceData(raw) {
  const quantity = raw.quantity || "1";
  const price = raw.price || "0";
  const total = calcTotal(quantity, price);

  return {
    logo: raw.logo || "",
    invoiceNumber: raw.invoiceNumber || "0000001",
    dateStr: formatInvoiceDate(raw.invoiceDate),
    billedCompany: raw.billedCompany || "",
    billedName: raw.billedName || "",
    billedEmail: raw.billedEmail || "",
    fromName: raw.fromName || "",
    fromAddress: raw.fromAddress || "",
    fromEmail: raw.fromEmail || "",
    itemName: raw.itemName || "",
    quantity,
    price,
    total,
    totalHours: raw.totalHours || "",
    hourlyRate: raw.hourlyRate || "",
    paymentMethod: raw.paymentMethod || "Online",
    note: raw.note || "Thank you for choosing us!"
  };
}

const invoiceTemplate = raw => {
  const d = buildInvoiceData(raw);
  const logoBlock = d.logo
    ? `<div class="logo-wrap"><img class="logo" src="${d.logo}" alt="Logo" /></div>`
    : "";

  const hoursRow = d.totalHours
    ? `<tr class="detail-row"><td colspan="4">Total Hours: ${d.totalHours}</td></tr>`
    : "";

  const rateRow =
    d.hourlyRate !== ""
      ? `<tr class="detail-row"><td colspan="4">Hourly Rate: $${d.hourlyRate}/hr</td></tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Invoice ${d.invoiceNumber}</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        color: #111;
        background: #fff;
        line-height: 1.5;
      }
      .invoice {
        width: 720px;
        max-width: 100%;
        margin: 0 auto;
        padding: 48px 40px;
      }
      .logo-wrap { margin-bottom: 28px; }
      .logo {
        max-height: 64px;
        max-width: 200px;
        object-fit: contain;
        display: block;
      }
      .top-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 36px;
        font-size: 14px;
      }
      .invoice-no { font-weight: 400; }
      .parties {
        display: flex;
        justify-content: space-between;
        gap: 48px;
        margin-bottom: 36px;
      }
      .party { flex: 1; min-width: 0; }
      .party-title {
        font-weight: 700;
        margin-bottom: 10px;
        font-size: 14px;
      }
      .party p { margin: 0 0 2px; word-break: break-word; }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 36px;
        font-size: 14px;
      }
      th {
        background: #ececec;
        text-align: left;
        padding: 10px 14px;
        border: 1px solid #bbb;
        font-weight: 600;
      }
      td {
        padding: 10px 14px;
        border: 1px solid #bbb;
        vertical-align: top;
      }
      .detail-row td {
        border-top: none;
        padding-top: 4px;
        padding-bottom: 4px;
      }
      .detail-row + .detail-row td { border-top: none; }
      .spacer-row td {
        border-left: 1px solid #bbb;
        border-right: 1px solid #bbb;
        border-top: none;
        border-bottom: none;
        height: 12px;
        padding: 0;
      }
      .total-row td { font-weight: 700; }
      .footer { font-size: 14px; line-height: 1.9; }
      .footer p { margin: 0; }
      .footer strong { font-weight: 700; }
    </style>
  </head>
  <body>
    <div class="invoice" id="page-wrap">
      ${logoBlock}
      <div class="top-row">
        <div>Date: ${d.dateStr}</div>
        <div class="invoice-no">NO. ${d.invoiceNumber}</div>
      </div>

      <div class="parties">
        <div class="party">
          <div class="party-title">Billed to:</div>
          <p>${d.billedCompany}</p>
          <p>${d.billedName}</p>
          <p>${d.billedEmail}</p>
        </div>
        <div class="party">
          <div class="party-title">From:</div>
          <p>${d.fromName}</p>
          <p>${d.fromAddress}</p>
          <p>${d.fromEmail}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${d.itemName}</td>
            <td>${d.quantity}</td>
            <td>${d.price}</td>
            <td>${d.total}</td>
          </tr>
          ${hoursRow}
          ${rateRow}
          <tr class="spacer-row"><td colspan="4"></td></tr>
          <tr class="total-row">
            <td colspan="2"></td>
            <td>Total</td>
            <td>$${d.total}</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <p><strong>Payment method:</strong> ${d.paymentMethod}</p>
        <p><strong>Note:</strong> ${d.note}</p>
      </div>
    </div>
  </body>
</html>`;
};

export default invoiceTemplate;
