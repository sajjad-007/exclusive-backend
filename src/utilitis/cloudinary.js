 const cloudinary = require("cloudinary").v2
 const fs = require("fs")

 // Configuration
 cloudinary.config({ 
    cloud_name:  "dyfxtlv1x", 
    api_key: 717948855457723 , 
    api_secret: "9JMjwcrY7LWzt3o2aQTQjs3zoK4" ,  // Click 'View API Keys' above to copy your API secret
});

 const fileCloudinaryUpload = async(filePath)=>{
    try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(filePath)
        if(uploadResult) {
            fs.unlinkSync(filePath)
        }
        return uploadResult
    } catch (error) {
        console.log("cloudinary upload file error:",error);   
    }
}

const fileDeleteCloudinary = async(filepath) =>{
    return await cloudinary.api
        .delete_resources([filepath], 
            { type: 'upload'})
}

module.exports = { fileCloudinaryUpload ,fileDeleteCloudinary}