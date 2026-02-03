import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from './models/user.model.js';

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/user-crud').then(() => console.log("Connected!"));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true  }));
app.use(express.json());

app.use(session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false,
}))

const checkLogin = (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        res.redirect('login');
    }
}

app.get('/',checkLogin, (req, res) => {
  res.send(`<h1>Home Page</h1> 
    <p>Hello, ${req.session.user}</p>
    <a href="/logout">Logout</a>
    `);
});

app.get('/profile',checkLogin, (req, res) => {
  res.send(`<h1>Profile Page</h1>
    <p>Hello, ${req.session.user}</p>
    <a href="/logout">Logout</a>
    `);
});
app.get('/login', (req, res) => {
    res.render('login', { error: null });
})

app.post('/login',async (req, res) => {
  const {username, userpassword} = req.body

  const user = await User.findOne({username})
  if(!user) return res.render('login', { error: 'User not found'})

  const isMatch = await bcrypt.compare(userpassword, user.userpassword)
  if(!isMatch) return res.render('login', { error: 'Invalid Password'})
    req.session.user = username;
    res.redirect('/')
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { username, userpassword } = req.body
    const hasedPassword = await bcrypt.hash(userpassword, 10)
    // res.send({username, hasedPassword})
    // res.send({username, userpassword: hasedPassword })
    await User.create({ username, userpassword: hasedPassword })
    res.redirect('/login')
})

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('login');
    })
})
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})