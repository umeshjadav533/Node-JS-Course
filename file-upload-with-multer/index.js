import express from 'express'
import multer from 'multer'
import path from 'path'

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.set("view engine", "ejs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },

    filename: (req, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const fileFilter = (req, file, cb) => {
  if(file.fieldname === 'userfile'){
    if(file.mimetype =='image/jpeg'  || file.mimetype == 'image/png'){
      cb(null, true)
    }else{
      cb(new Error('Only images are allowed!'), false)
    }
  }else if(file.fieldname === 'userdocuments'){
    if(file.mimetype =='application/pdf'){
      cb(null, true)
    }else{
      cb(new Error('Only PDF are allowed for documents'), false)
    }
  }else{
    cb(new Error('Unknown Field.'), false)
  }
}
const upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 3,
    fileFilter: fileFilter
})

app.get('/', (req, res) => {
    res.render("myform");
})

// app.post('/submit-form', upload.single("userfile"), (req,res) => {
// app.post('/submit-form', upload.array("userfile", 3), (req,res) => {
    app.post('/submit-form', upload.fields([
        {name: 'userfile', maxCount: 1},
        {name: 'userdocuments', maxCount: 5}
    ]), (req,res) => {
    if(!req.files || req.files.length === 0){
        return res.status(400).send("No file uploaded");
    }
    res.send(req.files);
}, (error, req, res, next) => {
    if(error instanceof multer.MulterError){
        if(error.code === 'LIMIT_UNEXPECTED_FILE'){
            return res.status(400).send(`Error: Too many files uploaded!`);
        }
        return res.status(400).send(`Multer error: ${error.message} : ${error.code}`)
    }else if(error){
        return res.status(500).send(`Something went wrong: ${error.message}`)
    }
    next()
})

// app.get('/submit-form', upload.array('userfile', ))
app.listen(3000, () => {
    console.log("Server Running on port 3000");
})