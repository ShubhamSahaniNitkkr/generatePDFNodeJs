const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const PDF_Template = require("./sample_doc/index");

const app = express();
const PORT = process.env.PORT || 8000;
const isDemoMode = () => process.env.DEMO_MODE === "true";

let pdf;
try {
  pdf = require("html-pdf");
} catch (e) {
  console.log("html-pdf not available");
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/status", (req, res) => {
  res.json({ demoMode: isDemoMode(), pdfEngine: !!pdf });
});

app.post("/create-pdf", (req, res) => {
  const html = PDF_Template(req.body);

  if (isDemoMode() || !pdf) {
    fs.writeFileSync(path.join(__dirname, "Invoice.pdf"), html);
    return res.json({ success: true, demoMode: true });
  }

  pdf.create(html, {}).toFile(path.join(__dirname, "Invoice.pdf"), err => {
    if (err) {
      return res.status(500).json({ error: "PDF generation failed" });
    }
    res.json({ success: true });
  });
});

app.get("/fetch-pdf", (req, res) => {
  const filePath = path.join(__dirname, "Invoice.pdf");
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "PDF not found" });
  }
  res.sendFile(filePath);
});

if (process.env.SERVE_UI === "true") {
  app.use(express.static(path.join(__dirname, "ui/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "ui/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
  if (isDemoMode()) {
    console.log("DEMO_MODE: PDF saved as HTML fallback if html-pdf unavailable");
  }
});
