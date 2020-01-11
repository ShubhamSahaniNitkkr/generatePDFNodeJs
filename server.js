const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");
const PDF_Template = require("./sample_doc/index");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/create-pdf", (req, res) => {
  pdf.create(PDF_Template(req.body), {}).toFile("Invoice.pdf", err => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/Invoice.pdf`);
});
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
