const mongoose = require("mongoose");

const SampleTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "numune türü alanı boş bırakılamaz"]
    }
})

module.exports = new mongoose.model("SampleType", SampleTypeSchema)