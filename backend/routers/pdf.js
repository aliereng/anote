const express = require("express")
const {createPdf, getPdfFile} = require("../controllers/pdfController")
const router = express.Router();

router.get("/create/:sampletype", createPdf);
router.get("/:sampletype", getPdfFile);
// router.post("/", createPdf);
// router.put("/:parameterId", updateParameter);
// router.delete("/:parameterId", deleteParameterById)
// router.delete("/all", deleteAllParameters);

module.exports = router;

