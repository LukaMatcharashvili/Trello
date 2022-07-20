import cloudinary from 'cloudinary';

function convertImgToCloudinary(image){
    return cloudinary.v2.uploader.upload(image, {upload_preset: 'pv5ptgle'}, (error, result) => {
        if(result) {
            return result.url
        }else {
            return error
        }
    })
}

export {
    convertImgToCloudinary   
}