import multer from "multer";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'resume/')
    },
    filename:(req,file,cb)=>{
        const name = Date.now().toString() + file.originalname;
        cb(null,name)
    }
})


export const uploadfile = multer({
    storage:storage
})