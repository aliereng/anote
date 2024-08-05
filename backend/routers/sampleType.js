const express = require("express")
const {getAllSampleType, createSampleType, updateSampleType,deleteSampleTypeById, deleteAllSampleTypes} =require("../controllers/sampleTypeController")
const router = express.Router();

router.get("/", getAllSampleType);
router.post("/", createSampleType);
router.put("/:sampleTypeId", updateSampleType);
router.delete("/:sampleTypeId", deleteSampleTypeById)
router.delete("/all", deleteAllSampleTypes);

module.exports = router;

