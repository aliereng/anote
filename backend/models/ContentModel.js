const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
    contentType: {
        type: Array,
        required: [true, "pdf model alanı boş bırakılamaz."]
    },
    analysisTypeId: {
        type: mongoose.Schema.ObjectId,
        ref: "AnalysisTypeModel"
    }
})

module.exports = new mongoose.model("ContentModel", ContentSchema)