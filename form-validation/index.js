import express from 'express'
import { body, validationResult } from 'express-validator';
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var validationRegistration = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3 })
    .withMessage("username is must be at least 3 charcter")
    .trim()
    .isAlpha().withMessage("user must containe only letters"),
  body("useremail").isEmail().withMessage("please provide valid email")
  .normalizeEmail(),
  body("userpassword")
    .isLength({ min: 3, max: 10 })
    .withMessage("password must be between 5 to 10 character long")
    .isStrongPassword().withMessage("Strong password create"),
  body("userage").isNumeric().withMessage("Age must be Numeric")
    .isInt({min:18}).withMessage("Age must be 18 years old"),
  body('usercity')
    .isIn(["Dhrangadhra", "Surendranagar", "Paldi"])
    .withMessage("City must be Dhrangadhra, Surendranagar or Paldi")
];

app.get("/myform", (Req, res) => {
  res.render("myform", { errors: [] });
});

app.post("/submitform", validationRegistration, (req, res) => {
    const errors = validationResult(req);  
    if (errors.isEmpty()) {
        return res.send(req.body);  
    }

    res.render("myform", {errors: errors.array()});
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});