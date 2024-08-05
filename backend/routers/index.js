const express = require("express");
const parametersRouter = require("./parameter")
const analysisTypeRouter = require("./analysisType")
const sampleTypeRouter = require("./sampleType")
const contentTypeRouter = require("./contentType")
const sampleRouter = require("./sample")
const pdfRouter = require(".//pdf")

const router = express.Router();

router.use("/parameters", parametersRouter)
router.use("/samples", sampleRouter)
router.use("/analysis-types", analysisTypeRouter)
router.use("/sample-types", sampleTypeRouter)
router.use("/content-types", contentTypeRouter)
router.use("/content-types", contentTypeRouter)
router.use("/pdf", pdfRouter)
module.exports = router;