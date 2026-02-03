import express, { Router } from 'express'
import Students from "../models/students.model.js";
import multer from 'multer'
import path from 'path'
import fs from 'fs'

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
    if(file.mimetype.startsWith("image/")){
        cb(null, true);
    }else{
        cb(new Error("only Images are allowed!"), false);
    }
}
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 3
    }
})

const router = express.Router();

// get All Students
router.get('/', upload.single("profile_pic"), async (req, res) => {
    try {
        const students = await Students.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get Single Students
router.get('/:id', async (req, res) => {
    try {
        const student = await Students.findById(req.params.id);
        if(!student) return res.status(404).json({ message: "Students not Found." });
        res.send(student);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// add Students
router.post('/', upload.single('profile_pic'), async (req, res) => {
    try {
        console.log(req.body); 
        console.log(req.file); 

        const student = new Students(req.body);

        if (req.file) {
            student.profile_pic = req.file.filename;
        }

        const newStudent = await student.save();
        res.status(201).json(newStudent);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// update Students
router.put('/:id', upload.single('profile_pic'),async (req, res) => {
  try{
    const existingStudent = await Students.findById(req.params.id)
    if(!existingStudent){
      if(req.file.filename){
        const filepath = path.join('./uploads', req.file.filename)
        fs.unlink(filepath, (err) =>{
          if(err) console.log('Failed to Delete image: ', err)
        })
      }
      return res.status(404).json({message: 'Student not found' })
    } 

   if(req.file){
    if(existingStudent.profile_pic){
      const oldimagepath = path.join('./uploads', existingStudent.profile_pic)
        fs.unlink(oldimagepath, (err) =>{
          if(err) console.log('Failed to Delete old image: ', err)
        })
    }

    req.body.profile_pic = req.file.filename
   }   
    

    const updatedStudent = await Students.findByIdAndUpdate(req.params.id, req.body,
      { new: true}
    )
    res.json(updatedStudent)
  }catch(err){
    res.status(400).json({message: err.message })
  }
})


// delete Students
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Students.findByIdAndDelete(req.params.id);
        if(!deletedStudent) return res.status(404).json({ message: "Students not Found." });
        if(deletedStudent.profile_pic){
            const filePath = path.join('./uploads', deletedStudent.profile_pic);
            fs.unlink(filePath, (err) => {
                if(err) console.log("Failed to Delete", err);
            });
        }
        res.json({ message: "Student Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router;