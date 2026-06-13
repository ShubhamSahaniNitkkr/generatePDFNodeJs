const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const puppeteer = require("puppeteer");
const PDF_Template = require("./sample_doc/index");

const app = express();
const PORT = process.env.PORT || 8000;
const PDF_PATH = path.join(__dirname, "Invoice.pdf");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/status", (req, res) => {
  res.json({ pdfEngine: true });
});

async function generatePdf(html, outputPath) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" }
    });
  } finally {
    await browser.close();
  }
}

app.post("/create-pdf", async (req, res) => {
  const html = PDF_Template(req.body);

  try {
    await generatePdf(html, PDF_PATH);
    res.json({ success: true });
  } catch (err) {
    console.error("PDF generation failed:", err.message);
    res.status(500).json({ error: "PDF generation failed" });
  }
});

app.get("/fetch-pdf", (req, res) => {
  if (!fs.existsSync(PDF_PATH)) {
    return res.status(404).json({ error: "PDF not found" });
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="Invoice.pdf"');
  res.sendFile(PDF_PATH);
});

if (process.env.SERVE_UI === "true") {
  app.use(express.static(path.join(__dirname, "ui/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "ui/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
