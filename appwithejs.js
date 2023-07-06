const { name } = require('ejs');
const express= require('express');
const Massge = require('./mongodb');
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.set('view engine','ejs');


// app.get('/add', async (req,res)=>{
//     await Massge.create({name: "Ashif Ali", email: "Ashif123@gmail.com",psw:"ashif", psw_r:"ashif"});
//         res.send("noice");
// })


app.get('/success',(req,res)=>{
    res.render("success");
})

app.post('/registration', async(req, res)=>{
    const MassgeData = {name : req.body.name, email : req.body.email, psw : req.body.psw, psw_r : req.body.psw_r};
    //console.log(MassgeData)
   // await Massge.create(MassgeData)
    //res.redirect("/success");
    await Massge.insertMany([MassgeData])
    //alert('Thanks for to be a part of Developer Team');
    res.render("index");

})


// for login into site
app.post('/log', async(req, res)=>{
    res.cookie(req.body.name, req.body.psw,{
        httpOnly: true,
        expires: new Date(Date.now()+1*1000)
        
    });
    try{
        const check= await Massge.findOne({name : req.body.name});
        if(check.psw === req.body.psw){
            //alert('thaks')
            res.render("index");
        }else{
            res.end("Password does not match")
        }
    }catch{
        res.end('Invalid details..')
    }

 })

app.get('/', (req, res)=>{
    //res.send('<h1>Home Page</h1>');
    res.render("index");
})

// app.post('/log',(req,res)=>{
//     res.cookie("login", "name");
//     res.redirect('success')
// })

app.get('/loginform', (req, res)=>{
    //res.send('<h1>Home Page</h1>');
    res.render("loginform")
})

app.get('/aboutpage', (req, res)=>{
    //res.send('<h1>Home Page</h1>');
    res.render("aboutpage")
})

// redirect the page

app.get('/registation', (req, res)=>{
    //res.send('<h1>Home Page</h1>');
    res.render("registration")
})

// default sending page every time it will run
app.use((req, res)=>{
    //res.send('<h1>Home Page</h1tmlFiles>');
    res.render("404page")
})

app.listen(3000,()=>{
    console.log("Server is working......")
});