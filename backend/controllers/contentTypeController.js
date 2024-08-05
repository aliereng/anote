const asyncHandler = require("express-async-handler");
const ContentModel = require("../models/ContentModel")

const createContentModel = asyncHandler(async(req,res,next) => {
    const  {contentType, analysisTypeId} = req.body

    const content = await ContentModel.create({
        contentType,
        analysisTypeId
    })

    res.status(200).json({
        success: true,
        data: content
    })

})
const getAllContentType = asyncHandler(async(req, res, next) => {
    const contentTypes = await ContentModel.find();
    res.status(200).json({
        success: true,
        data: contentTypes
    })

})

const updateContentModel = asyncHandler(async(req,res, next) => {
    const {contentTypeId} = req.params
    const content = await ContentModel.findByIdAndUpdate(contentTypeId, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: content
    })
})

const deleteContentModel = asyncHandler(async(req, res, next) => {
    const {contentTypeId} = req.params
    await ContentModel.findByIdAndDelete(contentTypeId);
    res.status(200).json({
        success: true
    })
})
const deleteAllContentModels = asyncHandler(async(req, res, next) => {
    await ContentModel.deleteMany();
    res.status(200).json({
        success: true
    })
})

module.exports = {
    createContentModel,
    updateContentModel,
    deleteContentModel,
    deleteAllContentModels,
    getAllContentType
}