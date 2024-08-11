const express = require("express")
const {getAllSample, getLastTenSample, createSample, updateSample, deleteAllSamples, getSamplesBySampleType, getSampleBySampleName} = require("../controllers/sampleController")
const router = express.Router();

router.get("/", getAllSample);
router.post("/name", getSampleBySampleName)
router.get("/last-ten-sample", getLastTenSample);
router.get("/sample-type/:sampleTypeId", getSamplesBySampleType);

router.post("/", createSample);
router.put("/update/:sampleId", updateSample);
router.delete("/all", deleteAllSamples);

module.exports = router;

