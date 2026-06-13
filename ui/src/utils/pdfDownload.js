import Axios from "axios";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import invoiceTemplate from "../invoiceTemplate";

async function downloadClientPdf(formData) {
  const html = invoiceTemplate(formData);
  const wrapper = document.createElement("div");
  wrapper.style.cssText =
    "position:fixed;left:-9999px;top:0;width:720px;background:#fff;";

  const parsed = new DOMParser().parseFromString(html, "text/html");
  const style = parsed.querySelector("style");
  if (style) wrapper.appendChild(style.cloneNode(true));

  const pageWrap = parsed.querySelector("#page-wrap");
  if (!pageWrap) throw new Error("Invoice template failed to render");

  wrapper.appendChild(pageWrap.cloneNode(true));
  document.body.appendChild(wrapper);

  await new Promise(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });

  try {
    const canvas = await html2canvas(wrapper, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff"
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`Invoice-${formData.invoiceNumber || "bill"}.pdf`);
  } finally {
    document.body.removeChild(wrapper);
  }
}

async function downloadServerPdf(formData) {
  await Axios.post("/create-pdf", formData);
  const res = await Axios.get("/fetch-pdf", { responseType: "arraybuffer" });
  const bytes = new Uint8Array(res.data);
  const header = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]);

  if (header !== "%PDF") {
    throw new Error("Server returned invalid PDF data");
  }

  const pdfBlob = new Blob([res.data], { type: "application/pdf" });
  saveAs(pdfBlob, `Invoice-${formData.invoiceNumber || "bill"}.pdf`);
}

async function hasPdfServer() {
  try {
    const res = await Axios.get("/api/status", { timeout: 3000 });
    return res.data && res.data.pdfEngine === true;
  } catch {
    return false;
  }
}

export async function generateInvoicePdf(formData) {
  if (await hasPdfServer()) {
    try {
      await downloadServerPdf(formData);
      return;
    } catch (serverErr) {
      console.warn("Server PDF failed, using browser fallback", serverErr);
    }
  }
  await downloadClientPdf(formData);
}
