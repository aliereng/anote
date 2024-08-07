const express = require("express")
const {getAllParameters, getAllParameterById,getAnalysisType,getName, createParameter, updateParameter, deleteAllParameters, deleteParameterById} = require("../controllers/parameterController")
const router = express.Router();

router.get("/", getAllParameters);
router.get("/:parameterId", getAllParameterById);
router.get("/filter/analysis-type/:analysisType",getAnalysisType );
router.get("/filter/parameter-name/:parameterName",getName );
router.post("/", createParameter);
router.put("/:parameterId", updateParameter);
router.delete("/:parameterId", deleteParameterById)
router.get("/delete/all", deleteAllParameters);

module.exports = router;

