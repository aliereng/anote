const asyncHandler = require("express-async-handler")
// const ppdfMake = require("pdfmake/build/pdfmake")
// const pdfFonts = require('pdfmake/build/vfs_fonts');
const PdfPrinter = require('pdfmake')
const path = require('path');
const fs = require('fs');

const Sample = require("../models/SampleModel");
const SampleTypeModel = require("../models/SampleTypeModel");
const { convert } = require("../helpers/convertPhotoToBase64");
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
    samples.forEach((sample, index) => {
        pdfContent.push(
            {text: `${sample.name} - ${("0" + sample.acceptDate.getDate()).slice(-2)}.${("0" + (sample.acceptDate.getMonth()+1)).slice(-2)}.${sample.acceptDate.getFullYear()}`, fontSize:14, style:'header',  margin: [0, 0, 0, 10]}
            // {text: `${sample.name} - ${sample.acceptDate}`, fontSize:14, style:'header',  margin: [0, 0, 0, 10]}

        )
        sample.parameters.forEach(parameter => {
            if(parameter.contentType){  
            const canvas = []
            const stack = []
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
                // rowTexts.push(
                //     {...parameter.contentType.contentType[0]},
                //     {columns: [
                //         {columns: [
                //             {...parameter.contentType.contentType[1].columns[0].columns[0]}, 
                //             {...parameter.contentType.contentType[1].columns[0].columns[1]}]},
                //             {canvas: canvas}
                //         ]
                //     }
                // )
                rowTexts.push({
                    stack: [
                        { ...parameter.contentType.contentType[0] },
                        {
                            columns: [
                                {
                                    columns: [
                                        { ...parameter.contentType.contentType[1].columns[0].columns[0] },
                                        { ...parameter.contentType.contentType[1].columns[0].columns[1] }
                                    ]
                                },
                                { canvas: canvas }
                            ]
                        }
                    ],
                    keepTogether: true // Tüm öğelerin aynı sayfada kalmasını sağla
                });
            }else{
                // rowTexts.push(
                
                //     {...parameter.contentType.contentType[0]},
                //     {columns: [{...parameter.contentType.contentType[1].columns[0]},{canvas: canvas}]}
                // )
                rowTexts.push({
                    stack: [
                        { ...parameter.contentType.contentType[0] },
                        { columns: [{ ...parameter.contentType.contentType[1].columns[0] }, { canvas: canvas }] }
                    ],
                    keepTogether: true // Tüm öğelerin aynı sayfada kalmasını sağla
                });
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
    // console.log(pdfContent)
    
    const logoBase64 = convert();
    const docDefinition = {
        header: function() {
            return {
                columns: [{
                    image: logoBase64,
                    width: 75
                },
                {
                    text: sampletype === "su"? ("Su Analiz Sonuç Hesaplama Defteri"):("Atıksu, Deniz Suyu, Toprak ve Atık Analizleri Sonuç Hesaplama Defteri"),
                    aligment: "center",
                    margin: [20,12.5,0,0]
                },
                {
                    canvas: [
                        {
                            type: 'rect', // Dikdörtgen çiz
                            x: 0, // X koordinatı (Sol)
                            y: 0, // Y koordinatı (Üst)
                            w: 515, // Genişlik (A4 kağıdının genişliği - marjinler)
                            h: 50, // Yükseklik
                            r: 0, // Köşe yarıçapı (0 ise düz köşeler)
                            lineWidth: 1, // Çizgi kalınlığı
                            lineColor: 'black' // Çizgi rengi
                            
                        }
                    ],
                    absolutePosition: { x: 35, y: 5 } // Dikdörtgenin yerleşimini ayarlamak için
                },
                {
                    canvas: [
                        {
                            type: 'line',
                            x1: 75, // Çizgi logosunun sağ kenarından başlar
                            y1: 5, // Çizginin üst ucu (Dikdörtgenin üst kısmına hizalanır)
                            x2: 75, // X koordinatında aynı kalır, böylece dikey bir çizgi olur
                            y2: 55, // Çizginin alt ucu (Dikdörtgenin alt kısmına hizalanır)
                            lineWidth: 1, // Çizgi kalınlığı
                            lineColor: 'black' // Çizgi rengi
                        }
                    ],
                    absolutePosition: { x: 50, y: 0 } // Dikey çizgiyi konumlandırmak için
                }
                    

                ],
                margin: [40,10,50,75]
            }
        },
        content: pdfContent,     
        pageMargins: [40, 60, 40, 60],
        styles: {
          header: {
            bold: true,
            fontSize: 12
          }
        },
       
    footer: function(currentPage, pageCount) {
        return {
            columns: [
                {
                    text: "NL.F.170/12.08.2024/Rev.02" , // Sol tarafa istediğiniz metni ekleyin
                    alignment: "left",
                    margin: [0, 0, 0, 0] // Sol, Üst, Sağ, Alt marjinleri
                },
                {
                    text: currentPage.toString() + ' / ' + pageCount, // Sayfa sayıları sağda
                    alignment: "right",
                    margin: [0, 0, 0, 0] // Sol, Üst, Sağ, Alt marjinleri
                }
            ],
            margin: [35, 20, 45, 20] // Footer marginleri
        };
    }
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