const asyncHandler = require("express-async-handler");
const SampleType = require("../models/SampleTypeModel");

const createSampleType = asyncHandler(async(req, res, next) => {
    const {name, } = req.body
    const sampleType = await SampleType.create({
        name
    })

    res.status(200).json({
        success: true,
        data: sampleType
    })
})
const getAllSampleType = asyncHandler(async(req, res, next) => {
    const sampleTypes = await SampleType.find()
    res.status(200).json({
        success: true,
        data: sampleTypes
    })
})

const updateSampleType = asyncHandler(async(req,res, next) => {
    const {sampleTypeId} = req.params
    const sampleType = await SampleType.findByIdAndUpdate(sampleTypeId, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: sampleType
    })
})

const deleteSampleTypeById = asyncHandler(async(req, res, next) => {
    const {sampleTypeId} = req.params
    await SampleType.findByIdAndDelete(sampleTypeId);
    res.status(200).json({
        success: true
    })
})
const deleteAllSampleTypes = asyncHandler(async(req, res, next) => {
    await SampleType.deleteMany();
    res.status(200).json({
        success:true
    })
})

module.exports = {
    createSampleType,
    updateSampleType,
    deleteSampleTypeById,
    deleteAllSampleTypes,
    getAllSampleType
}