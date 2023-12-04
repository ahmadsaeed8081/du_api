const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
var bodyParser = require('body-parser'); 


const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
})); 
const DB="mongodb+srv://chohanahmad1:yCZyxLivMcF6laEJ@cluster0.vvhbr9g.mongodb.net/?retryWrites=true&w=majority";
// const DB1="mongodb://localhost:27017/myDB";

// mongoose.connect("mongodb://localhost:27017/myDB");
mongoose.connect(DB,{
    useNewUrlParser :true,
    useUnifiedTopology:true,
})
.then(()=>console.log("connecttion done"))
.catch((err)=>console.log("no onnection"+err));

const schema = new mongoose.Schema({
    userAddress : String,
    Name : String,
    image :String,
    date  :{
        type: Date,
        default : Date.now
    }
    

});



const collection = new mongoose.model("data",schema);



const InsertData = async () =>{
const data = new collection({
    userAddress : "0900",
    Name : "ahmad",
    image:"bkjkbkjbjk",


})
  await data.save();
}

const getData = async () =>{
    const result = await collection.find({_id : "6539cd40e118b75a2dcbf392"});
    console.log(result);
}

app.get("/get", async (req, res) => {
    console.log("its working"+req.query.userAddress);

    // res.json({ userAddress: req.query.userAddress });
    const result = await collection.find({userAddress : req.query.userAddress});
    // console.log(result);

    res.send(result);

})

app.patch("/user/:id",async (req, res)=>{

    const _id=req.params.id;

    const updtaedata= await collection.findByIdAndUpdate(_id,req.body);

    res.send("its done");

})

app.post("/add", async (req, res) => {
    console.log("its working");

  
        const data = new collection({
            userAddress : req.body.userAddress,
             Name : req.body.Name,
             image : req.body.image,

        
        })
        const result =  await data.save();


    res.send("dfwsgs dcedsgvfd dfcbv df ");

})

app.get("/latest", async(req,res)=>{

    const result = await collection.find().sort({$natural: -1 });
    res.send(result);

})


app.get("/latestwinner", async(req,res)=>{

    const result = await  collection.find().sort({$natural: -1 }).limit(1);
    res.send(result);

})

app.listen(port, () => {
        console.log("connection is live"+ port);
});

// InsertData();
getData();








