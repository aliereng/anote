const asyncHandler = require("express-async-handler")
// const ppdfMake = require("pdfmake/build/pdfmake")
// const pdfFonts = require('pdfmake/build/vfs_fonts');
const PdfPrinter = require('pdfmake')
const path = require('path');
const fs = require('fs');

const Sample = require("../models/SampleModel");
const SampleTypeModel = require("../models/SampleTypeModel");
const createPdf = asyncHandler(async(req,res,next) => {
    const {sampletype} = req.params
    let samples;
    let pdfContent;
    let lineText="";
    let rowTexts = [];

    const sampleTypeIds = await SampleTypeModel.find({name: "su"}).select("_id").exec();
    if(sampletype === "su"){
        samples = await Sample.find({sampleType:sampleTypeIds[0]._id}).populate(
            ["sampleType", {path:"parameters", select: "name analysisType contentType", populate: "contentType"}])
    }else{
        samples = await Sample.find({sampleType: {$ne : sampleTypeIds[0]._id}}).populate(
            ["sampleType", {path:"parameters", select: "name analysisType contentType" , populate:[{path:"analysisType", select:"name"},{path:"contentType", select:"contentType"}]}]);
    }
    if(samples){
        pdfContent = []
        rowTexts = []
    }
    samples.forEach(sample => {
        pdfContent.push(
            {text: `${sample.name} - ${sample.acceptDate.getDay()}.${sample.acceptDate.getMonth()}.${sample.acceptDate.getFullYear()}`, fontSize:14, style:'header',  margin: [0, 0, 0, 10]}
        )
        sample.parameters.forEach(parameter => {
            if(parameter.contentType){  
            const canvas = []
            parameter.contentType.contentType[1].columns[1].canvas.forEach(c=> {
                canvas.push({
                    type: c.type,
                    x1: c.x1,
                    x2: c.x2,
                    y1: c.y1,
                    y2: c.y2,
                    lineWidth: c.lineWidth

                })
            })
            parameter.contentType.contentType[0].text = parameter.name;
            
            if(parameter.contentType.contentType[1].columns[0].columns){
                rowTexts.push(
                    {...parameter.contentType.contentType[0]},
                    {columns: [
                        {columns: [
                            {...parameter.contentType.contentType[1].columns[0].columns[0]}, 
                            {...parameter.contentType.contentType[1].columns[0].columns[1]}]},
                            {canvas: canvas}
                        ]
                    }
                )
            }else{
                rowTexts.push(
                
                    {...parameter.contentType.contentType[0]},
                    {columns: [{...parameter.contentType.contentType[1].columns[0]},{canvas: canvas}]}
                )
            }
            }else{
                lineText += `${parameter.name}\t\t\t\t\t\t`

            }
            
        })

        pdfContent.push(lineText)
        pdfContent.push(rowTexts)
        rowTexts = []
        lineText = "";
    })

    
    
    const docDefinition = {
        content: pdfContent,
        pageMargins: [40, 60, 40, 60],
        styles: {
          header: {
            bold: true,
            fontSize: 12
          }
        },
       
        footer: function (currentPage, pageCount) {
          return {
            text: currentPage.toString() + ' / ' + pageCount,
            alignment: 'center',
            margin: [0,20, 0, 20],
          };
        },
    }

    const fonts = {
        Roboto: {
            normal: 'fonts/Roboto/Roboto-Medium.ttf',
            bold: "fonts/Roboto/Roboto-Bold.ttf"
        }
    };

    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    
    // Kayıt edilecek dosya yolu
    let outputPath ;
    if(sampletype === "su"){
        outputPath=path.join(__dirname,"..","public", 'su.pdf');
    }else{
        outputPath=path.join(__dirname,"..","public", 'atıksu.pdf');

    }
    const outputStream = fs.createWriteStream(outputPath);
    
    pdfDoc.pipe(outputStream);
    pdfDoc.end();

    outputStream.on('finish', () => {
        res.status(200).json({
            success: true,
            message: outputPath
        });
    });

    outputStream.on('error', (err) => {
        console.error('PDF kaydedilirken hata oluştu:', err);
        res.status(500).json({
            success: false,
            message: 'PDF kaydedilirken hata oluştu.'
        });
    });
});

const getPdfFile = asyncHandler(async( req, res, next) => {
    const pdfDirectory = path.join(__dirname, "..","public");
    const {sampletype} = req.params;
    let filePath;
     // Buraya PDF dosyasının ismini yazın
    if(sampletype==="su"){
        filePath = path.join(pdfDirectory, 'su.pdf');
    }else{
        filePath = path.join(pdfDirectory, 'atıksu.pdf');
    }
    res.sendFile(filePath);
})
module.exports = {
    createPdf,
    getPdfFile
}