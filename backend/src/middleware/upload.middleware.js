import multer from  "multer"
const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB

export const upload = multer({
    storage : multer.memoryStorage(),
    limits:{fileSize:MAX_FILE_SIZE},
    fileFilter:()=>{
        const isImage = file.mimetype.startsWith("image/")
        const isVideo = file.mimetype.startsWith("video/")

        if(!isImage && !isVideo){
            cb(new Error("Only Images and video can be uploads are allowed"))
        }
        cb(null,true)
    },
});