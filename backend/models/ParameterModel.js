const mongoose = require("mongoose");
const ContentModel = require("./ContentModel")

const ParameterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "parametre adı boş bırakılamaz."],
        unique: [true, "parametre adı yalnızca bir defa kullanılabilir."]
    },
    analysisType: {
        type: mongoose.Schema.ObjectId,
        ref: "AnalysisType"
    },
    contentType: {
        type: mongoose.Schema.ObjectId,
        ref: "ContentModel"
    }
})
ParameterSchema.pre("save", async function (next){
    const contentType = await ContentModel.find({analysisTypeId:this.analysisType});
    if(contentType){
        this.contentType = contentType[0]._id;
    }
    next();
    
})

module.exports = mongoose.model("Parameter", ParameterSchema)