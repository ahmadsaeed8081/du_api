const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
var bodyParser = require('body-parser'); 


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
})); 
const DB ="mongodb+srv://chohanahmad1:yDdnXCsBhW589yt7@cluster0.gmqtpc2.mongodb.net/duStake?retryWrites=true&w=majority";
// const DB1="mongodb://localhost:27017/myDB";

// mongoose.connect("mongodb://localhost:27017/myDB")
mongoose.connect(DB,{
    useNewUrlParser :true,
    useUnifiedTopology:true,
})
.then(()=>console.log("connecttion done"))
.catch((err)=>console.log("no onnection"+err));

const schema = new mongoose.Schema({
    userAddress : String,
    FName : String,
    LName :String,
    Email :String,
    password :String,
    Country :String,
    Phone: String,
    Ref_address:String,
    verified:Boolean,
    Image:String,

    date  :{
        type: Date,
        default : Date.now
    }

    

});


const collection = new mongoose.model("user",schema);



const InsertData = async () =>{
const data = new collection({
    userAddress : "8988788787",
    FName : "ahmad",
    LName :"Saeed",
    Email :"ahmadchohan007@gmail.com",
    password :"ahmad@pass",
    Country :"USA",
    Phone: "03234354339",
    Ref_address:"gkjbj96bmbuit7b"

})
  await data.save();
}

const getData = async () =>{

    const result = await collection.find({Email : "ahmadsaeed339@gmail.com"});
    console.log(result);
}


app.get("/getdatabyaddress", async (req, res) => {
    console.log("its working"+req.query.userAddress);

    // res.json({ userAddress: req.query.userAddress });
    const result = await collection.find({userAddress : req.query.userAddress});
    // console.log(result);

    res.send(result);

})

app.get("/getdatabymail", async (req, res) => {
    console.log("its working"+req.query.userAddress);

    // res.json({ userAddress: req.query.userAddress });
    const result = await collection.find({Email : req.query.Email});
    // console.log(result);

    res.send(result);

})



app.post("/register", async (req, res) => {
    console.log("its working");

  
        const data = new collection({
            userAddress : req.body.userAddress,
            FName : req.body.FName,
            LName : req.body.LName,
            Email : req.body.Email,
            password : req.body.password,
            Country : req.body.Country,
            Phone : req.body.Phone,
            Ref_address : req.body.Ref_address,
            verified : req.body.verified,




        
        })
        const result =  await data.save();


    res.send("User is Registerd");

})



app.patch("/user/:id",async (req, res)=>{

    const _id=req.params.id;

    const updtaedata= await collection.findByIdAndUpdate(_id,req.body);

    res.send("its done");

})



app.get("/get", async (req, res) => {

    const result = await collection.find({userAddress : req.query.userAddress});
    res.send(result);

})

app.listen(port, () => {
        console.log("connection is live"+ port);
});

// InsertData();
getData();








