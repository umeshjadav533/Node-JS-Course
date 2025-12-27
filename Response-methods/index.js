import express from 'express'

const app = express();
const PORT = 3000 || 6000;

app.set("view engine", "ejs");
// 1. res.send()    =>    Text, HTML, Object, Array, Buffers
app.get('/', (req,res) => {
    // res.send("<h1>Hello World!</h1>");
    // res.send({name: "umesh", age: 18});
    res.send(["umesh", "Jayshree", "Nisha", "Akshay"]);
})

// 2. res.json()    =>    JSON(Javascript Object Notation)
app.get('/about', (req,res) => {
    res.json({name: "umesh", age: 18});
    // res.send(["umesh", "Jayshree", "Nisha", "Akshay"]);
})

// 3. res.jsonp()   =>    JSONP(JSON with padding)
app.get('/jsonpdata', (req,res) => {
    res.jsonp({name: "umesh", age: 18});
    // res.send(["umesh", "Jayshree", "Nisha", "Akshay"]);
})

// 4. res.redirect()
app.get('/redirect', (req,res) => {
    res.redirect("https://www.google.com/");
    // res.redirect("..");
})

// 5. res.render()  =>    Open HTML File using a template engine
app.get('/redner', (req,res) => {
    res.render('user');
})

// 6. res.download()  =>  PDF, Image, File, Music, Video, Excel etc...
app.get('/download', (req,res) => {
    res.download('./files/addidas.png');
})

// 7. res.sendFile()
app.get('/sendFile', (req,res) => {
    res.sendFile(import.meta.dirname + '/files/addidas.png');
})

// 8. res.end()
app.get('/end', (req,res) => {
    res.send("response end after this line");
    res.end();
})

// 9. res.sendStatus()
app.get('/error', (req,res) => {
    res.sendStatus(404);
})

// 10. res.headerSent()
app.get('/headerSent', (req,res) => {
    console.log(res.headersSent);
    res.send("Hello recieve reposne");
    console.log(res.headersSent);
})
// 11. res.set() and get()
app.get('/header', (req,res) => {
    res.set("custom-header", "Hello123");
    res.send(res.get("custom-header"));
    res.send("Header Sent");
})


app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
})