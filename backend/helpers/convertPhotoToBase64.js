const fs = require("fs");
const path = require('path');


const convert = () => {
    const filePath = path.join(__dirname,"..","static","img", 'logo.jpg');
    const base64Image = fs.readFileSync(filePath, 'base64');
    return `data:image/jpeg;base64,${base64Image}`;
}

module.exports = {
    convert
}