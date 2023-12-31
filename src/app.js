const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
var bodyParser = require('body-parser'); 


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));

app.use(bodyParser.urlencoded({limit: '5mb', extended: true, parameterLimit:5000}));

// const DB ="mongodb+srv://chohanahmad1:yDdnXCsBhW589yt7@cluster0.gmqtpc2.mongodb.net/duStake?retryWrites=true&w=majority";
const DB ="mongodb://test20:test12345@ac-zhh0vwi-shard-00-00.gmqtpc2.mongodb.net:27017,ac-zhh0vwi-shard-00-01.gmqtpc2.mongodb.net:27017,ac-zhh0vwi-shard-00-02.gmqtpc2.mongodb.net:27017/duStake?replicaSet=atlas-tzcc8a-shard-0&ssl=true&authSource=admin"
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
    verified:String,
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

    let add="0x0216b7486098CCD2DCFDf2060af7A9EE1Fe550A5"
    console.log("before");
    const result = await collection.find({Email : "ahmadchohan007@gmail.com"});
    console.log("aft");

    console.log(result);
}


app.get("/getdatabyaddress", async (req, res) => {

    try{
        const result = await collection.find({userAddress : req.query.userAddress});

        res.send(result);

    }
    catch(e){}


})

app.get("/getdatabymail", async (req, res) => {
    try{
        const result = await collection.find({Email : req.query.Email});

        res.send(result);

    }
    catch(e){}


})



app.post("/register", async (req, res) => {

  try{
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
        Image : req.body.Image,




    
    })
    const result =  await data.save();


res.send("User is Registerd");
  }
  catch(e){}


})



app.patch("/user/:id",async (req, res)=>{

    try{
        const _id=req.params.id;

        const updtaedata= await collection.findByIdAndUpdate(_id,req.body);
    
        res.send("its done");
    }
    catch(e){}


})

app.get("/getALLData", async (req, res) => {
    try{

        const result = await collection.find({verified : "underApproval"});

        res.send(result);
    }
    catch(e){}


})
app.get("/getdatabyphone", async (req, res) => {

    try{
        const result = await collection.find({phone : req.query.phone});
        res.send(result);

    }
    catch(e){}


})

app.get("/get", async (req, res) => {
    try
    {
        const result = await collection.find({userAddress : req.query.userAddress});
        res.send(result);
    }
    catch(e)
    {

    }


})

app.listen(port, () => {
        console.log("connection is live"+ port);
});

// InsertData();
// getData();








