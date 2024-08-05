const asyncHandler = require("express-async-handler");
const Parameter = require("../models/ParameterModel");
const ParameterModel = require("../models/ParameterModel");

const createParameter = asyncHandler(async(req, res, next) => {
    const {name, analysisType, contentType} = req.body
    const parameter = await Parameter.create({
        name,
        analysisType,
        contentType
    })

    res.status(200).json({
        success: true,
        data: parameter
    })
})
const getAllParameters = asyncHandler(async(req,res,next) => {
    const parameters = await Parameter.find().sort("name");
    res.status(200).json({
        success: true,
        data: parameters
    })
})
const getAllParameterById = asyncHandler(async(req,res,next) => {
    const {parameterId} = req.params
    const parameter = await Parameter.findById(parameterId);
    res.status(200).json({
        success: true,
        data: parameter
    })
})
const getAnalysisType = asyncHandler(async(req,res,next) => {
    const {analysisType} = req.params;
    const parameters = await ParameterModel.find({analysisType:analysisType})
    res.status(200).json({
        success:true,
        data: parameters
    })
}) 
const getName = asyncHandler(async(req,res,next) => {
    const {parameterName} = req.params;
    const parameter = await ParameterModel.find({name:parameterName})
    res.status(200).json({
        success:true,
        data: parameter
    })
})  
const updateParameter = asyncHandler(async(req,res, next) => {
    const {parameterId} = req.params
    const parameter = await Parameter.findByIdAndUpdate(parameterId, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: parameter
    })
})

const deleteParameterById = asyncHandler(async(req, res, next) => {
    const {parameterId} = req.params
    await Parameter.findByIdAndDelete(parameterId);
    res.status(200).json({
        success: true
    })
})
const deleteAllParameters = asyncHandler(async(req, res, next) => {
    await Parameter.deleteMany();
    res.status(200).json({
        success:true
    })
})

module.exports = {
    createParameter,
    getAllParameters,
    getAllParameterById,
    updateParameter,
    deleteParameterById,
    deleteAllParameters,
    getAnalysisType,
    getName
}