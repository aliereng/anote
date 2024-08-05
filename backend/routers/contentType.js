const express = require("express")
const {createContentModel,getAllContentType,updateContentModel,deleteContentModel,deleteAllContentModels} = require("../controllers/contentTypeController")
const router = express.Router();

router.get("/", getAllContentType);
router.post("/", createContentModel);
router.put("/:contentTypeId", updateContentModel);
router.delete("/:contentTypeId", deleteContentModel)
router.delete("/all", deleteAllContentModels);

module.exports = router;

