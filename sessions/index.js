import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express();

app.use(session({
    secret: 'mySecretPassword',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: "mongodb://127.0.0.1:27017/sesion-database", 
        collectionName: "mySessions" 
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

app.get('/', (req, res) => {
  if(req.session.username){
    res.send(`<h1>Username from session is : ${req.session.username}</h1>`);
  }else{
    res.send('<h1>No username found in session.</h1>');
  }
});

app.get("/set-username", (req, res) => {
    req.session.username = "umesh jadav";
    res.send("<h1>username has been set in session</h1>");
})

app.get('/get-username', (req, res) => {
    if (req.session.username) {
        res.send(`<h1>Username from session is : ${req.session.username}</h1>`);
    } else {
        res.send('<h1>No username found in session.</h1>');
    }
})

app.get('/destroy', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.status(500).send('Failed to destroy session')
    }
    res.send('<h1>Session destroy successfully.</h1>');
  })
});

app.listen(3000, () => {
    console.log("Server is Running on port 3000");
})