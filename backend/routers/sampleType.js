const express = require("express")
const {getAllSampleType, createSampleType, updateSampleType,deleteSampleTypeById, deleteAllSampleTypes} =require("../controllers/sampleTypeController")
const router = express.Router();

router.get("/", getAllSampleType);
router.post("/", createSampleType);
router.put("/update", updateSampleType);
router.delete("/delete/:sampleTypeId", deleteSampleTypeById)
router.delete("/delete/all", deleteAllSampleTypes);

module.exports = router;

