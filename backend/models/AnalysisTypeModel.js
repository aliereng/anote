const mongoose = require("mongoose");

const AnalysisTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "analiz tipi alanı boş bırakılamaz"]
    }
})

module.exports = new mongoose.model("AnalysisType", AnalysisTypeSchema)