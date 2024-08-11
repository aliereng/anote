const asyncHandler = require("express-async-handler")
const Sample = require("../models/SampleModel");


const getLastTenSample = asyncHandler(async(req,res,next) => {
    const lastTenSample = await Sample.find().sort({_id: -1}).limit(10).populate(
        {path: "sampleType", select:"name"}
    ).populate(
        {path:"parameters", select:"name"}
    );
    res.status(200).json({
        success: true,
        data: lastTenSample
    })
})
const getSampleBySampleName = asyncHandler(async(req,res,next) => {
    const {name} = req.body
    const sample = await Sample.findOne({name:name}).populate(
        {path: "sampleType", select:"name"}
    ).populate(
        {path:"parameters", select:"name"}
    );
    res.status(200).json({
        success: true,
        data: sample
    })
})
const getAllSample = asyncHandler(async(req,res,next) => {
    const samples = await Sample.find().populate(
        {path: "sampleType", select:"name"}
    ).populate(
        {path:"parameters", select:"name"}
    )
    res.status(200).json({
        success: true,
        data: samples
    })
})
const createSample = asyncHandler(async(req,res,next) => {

    const {name, sampleType, acceptDate, parameters} = req.body;
    const sample = await Sample.create({
        name,
        sampleType,
        acceptDate,
        parameters
    })

    res.status(200).json({
        success: true,
        data: sample
    })

})
const updateSample = asyncHandler(async(req, res, next) => {
    const {sampleId} = req.params
    const sample = await Sample.findByIdAndUpdate(sampleId, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        data: sample
    })
})
const deleteAllSamples = asyncHandler(async(req, res, next) => {
    await Sample.deleteMany();
    res.status(200).json({
        success: true
    })
})
const getSamplesBySampleType = asyncHandler(async(req,res,next) => {
    
    const {sampleTypeId} = req.params;
    const samples = await Sample.find().where({sampleType: sampleTypeId}).populate(
        {path: "sampleType", select:"name"}
    ).populate(
        {path:"parameters", select:"name"}
    )
   
    res.status(200).json({
        success: true,
        data: samples
    })
    
})

module.exports = {
    createSample,
    getLastTenSample,
    updateSample,
    deleteAllSamples,
    getAllSample,
    getSamplesBySampleType,
    getSampleBySampleName
}