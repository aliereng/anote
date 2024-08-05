const asyncHandler = require("express-async-handler");
const AnalysisType = require("../models/AnalysisTypeModel");

const createAnalysisType = asyncHandler(async(req, res, next) => {
    const {name} = req.body
    const analysisType = await AnalysisType.create({
        name
    })

    res.status(200).json({
        success: true,
        data: analysisType
    })
})
const getAllAnalysisType = asyncHandler(async(req,res,next) => {
    const analysisType = await AnalysisType.find();
    res.status(200).json({
        success: true,
        data: analysisType
    })
})
const updateAnalysisType = asyncHandler(async(req,res, next) => {
    const {analysisTypeId} = req.params
    const analysisType = await AnalysisType.findByIdAndUpdate(analysisTypeId, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: analysisType
    })
})

const deleteAnalysisTypeById = asyncHandler(async(req, res, next) => {
    const {analysisTypeId} = req.params
    await AnalysisType.findByIdAndDelete(analysisTypeId);
    res.status(200).json({
        success: true
    })
})
const deleteAllAnalysisTypes = asyncHandler(async(req, res, next) => {
    await AnalysisType.deleteMany();
    res.status(200).json({
        success:true
    })
})

module.exports = {
    createAnalysisType,
    updateAnalysisType,
    deleteAnalysisTypeById,
    deleteAllAnalysisTypes,
    getAllAnalysisType
}