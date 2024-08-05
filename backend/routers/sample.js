const express = require("express")
const {getAllSample, getLastTenSample, createSample, updateSample, deleteAllSamples} = require("../controllers/sampleController")
const router = express.Router();

router.get("/", getAllSample);
router.get("/last-ten-sample", getLastTenSample);
router.post("/", createSample);
router.put("/:sampleId", updateSample);
router.delete("/all", deleteAllSamples);

module.exports = router;

