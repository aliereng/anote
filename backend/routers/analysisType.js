const express = require("express")
const {createAnalysisType, getAllAnalysisType, updateAnalysisType, deleteAnalysisTypeById, deleteAllAnalysisTypes} = require("../controllers/analysisTypeController")
const router = express.Router();

router.get("/", getAllAnalysisType);
router.post("/", createAnalysisType);
router.put("/update", updateAnalysisType);
router.delete("/delete/:analysisTypeId", deleteAnalysisTypeById)
router.delete("/delete/all", deleteAllAnalysisTypes);

module.exports = router;

