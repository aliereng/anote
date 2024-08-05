const mongoose = require("mongoose");

const SampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "numune kodu alanı boş bırakılamaz."]
    },
    sampleType: {
        type: mongoose.Schema.ObjectId,
        ref: "SampleType"
    },
    acceptDate: {
        type: Date,
        // required: [true, "numune kabul tarihi boş bırakılamaz."]
        default: Date.now
    },
    parameters:[{
        type: mongoose.Schema.ObjectId,
        ref: "Parameter"
    }]
})

module.exports = mongoose.model("Sample", SampleSchema)